import { describe, it, expect } from 'vitest';
import { filterProducts } from '@/pages/CategoryPage';
import { products } from '@/data/products';

// utility that counts items matching a predicate
const count = (arr: any[], fn: (x: any) => boolean) => arr.filter(fn).length;

describe('category filtering logic', () => {
  it('`/category/gifting` should only return products in the gifting category', () => {
    const results = filterProducts(products, 'gifting', 'All', 'All', 0, 'featured');
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(p => p.category.toLowerCase() === 'gifting')).toBe(true);

    // compare with dataset global count
    const expected = count(products, p => p.category.toLowerCase() === 'gifting');
    expect(results.length).toBe(expected);
  });

  it('gender filter works inside gifting', () => {
    const women = filterProducts(products, 'gifting', 'Women', 'All', 0, 'featured');
    expect(women.every(p => p.category.toLowerCase() === 'gifting' && p.gender === 'women')).toBe(true);

    const men = filterProducts(products, 'gifting', 'Men', 'All', 0, 'featured');
    expect(men.every(p => p.category.toLowerCase() === 'gifting' && p.gender === 'men')).toBe(true);

    // counts should add up to total gifting products or lower if some items lack gender
    expect(women.length + men.length).toBeLessThanOrEqual(
      count(products, p => p.category.toLowerCase() === 'gifting')
    );
  });

  it('other categories still filter correctly (smoke check)', () => {
    const jew = filterProducts(products, 'jewelry', 'All', 'All', 0, 'featured');
    expect(jew.every(p => p.category.toLowerCase() === 'jewellery')).toBe(true);

    const under150 = filterProducts(products, 'under-150', 'All', 'All', 0, 'featured');
    expect(under150.every(p => p.price < 150)).toBe(true);
  });
});
