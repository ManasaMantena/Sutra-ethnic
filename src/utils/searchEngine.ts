import type { Product } from '@/types';

// semantic mapping used by the search layer
export const semanticMap: Record<string, string[]> = {
  summer: ['cotton', 'linen', 'lightweight', 'handloom'],
  winter: ['silk', 'banarasi'],
  festive: ['zari', 'embroidery'],
  breathable: ['cotton', 'linen'],
};

/**
 * Performs a local "semantic" search over a product list.
 *
 * Results are ranked in three buckets:
 *   1. exact matches (entire query matches key fields)
 *   2. semantic matches (query keyword is a semantic key and mapped
 *      terms appear in fabric/tags/description)
 *   3. partial matches (query substring appears anywhere in searchable text)
 *
 * Only products that satisfy at least one of the above are returned.
 *
 * @param query user provided search string
 * @param products full product list
 * @returns filtered and ranked results
 */
export function searchProducts(query: string, products: Product[]): Product[] {
  const q = query.trim().toLowerCase();
  if (q.length < 3) {
    return [];
  }

  const exact: Product[] = [];
  const semantic: Product[] = [];
  const partial: Product[] = [];

  // detect if query directly corresponds to one of our semantic keys
  const matchingSemanticKeys = Object.keys(semanticMap).filter((k) => q.includes(k));

  products.forEach((p) => {
    // prepare searchable strings
    const name = p.name?.toLowerCase() || '';
    const category = p.category?.toLowerCase() || '';
    const subcategory = p.subcategory?.toLowerCase() || '';
    const fabric = p.fabric?.toLowerCase() || '';
    const description = p.description?.toLowerCase() || '';
    const tags = (p.tags || []).map((t) => t.toLowerCase());
    const haystack = [name, category, subcategory, ...tags].join(' ');

    // exact match check
    if (haystack === q) {
      exact.push(p);
      return;
    }

    // semantic match check
    let added = false;
    for (const key of matchingSemanticKeys) {
      const mapped = semanticMap[key];
      const containsMapped = mapped.some((term) => {
        return (
          fabric.includes(term) ||
          description.includes(term) ||
          tags.some((t) => t.includes(term))
        );
      });
      if (containsMapped) {
        semantic.push(p);
        added = true;
        break;
      }
    }
    if (added) {
      return;
    }

    // partial match (anywhere)
    if (
      haystack.includes(q) ||
      fabric.includes(q) ||
      description.includes(q)
    ) {
      partial.push(p);
    }
  });

  return [...exact, ...semantic, ...partial];
}
