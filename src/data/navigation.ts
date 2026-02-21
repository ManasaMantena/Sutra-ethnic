import type { NavCategory } from '@/types';

export const navigationData: NavCategory[] = [
  {
    label: 'Women',
    href: '/category/women',
    columns: [
      {
        title: 'Sarees',
        links: [
          { label: 'Silk Sarees', href: '/category/women/sarees/silk' },
          { label: 'Cotton Sarees', href: '/category/women/sarees/cotton' },
          { label: 'Banarasi Sarees', href: '/category/women/sarees/banarasi' },
          { label: 'Kanjeevaram Sarees', href: '/category/women/sarees/kanjeevaram' },
          { label: 'Designer Sarees', href: '/category/women/sarees/designer' },
        ],
      },
      {
        title: 'Lehengas',
        links: [
          { label: 'Bridal Lehengas', href: '/category/women/lehengas/bridal' },
          { label: 'Party Wear', href: '/category/women/lehengas/party' },
          { label: 'Festive Lehengas', href: '/category/women/lehengas/festive' },
          { label: 'Sangeet Collection', href: '/category/women/lehengas/sangeet' },
        ],
      },
      {
        title: 'Suits & Kurtas',
        links: [
          { label: 'Anarkali Suits', href: '/category/women/suits/anarkali' },
          { label: 'Palazzo Sets', href: '/category/women/suits/palazzo' },
          { label: 'Sharara Sets', href: '/category/women/suits/sharara' },
          { label: 'Straight Suits', href: '/category/women/suits/straight' },
        ],
      },
      {
        title: 'By Occasion',
        links: [
          { label: 'Wedding Guest', href: '/category/women/occasion/wedding' },
          { label: 'Festival Wear', href: '/category/women/occasion/festival' },
          { label: 'Casual Ethnic', href: '/category/women/occasion/casual' },
          { label: 'Office Ethnic', href: '/category/women/occasion/office' },
        ],
      },
    ],
  },
  {
    label: 'Men',
    href: '/category/men',
    columns: [
      {
        title: 'Sherwanis',
        links: [
          { label: 'Wedding Sherwanis', href: '/category/men/sherwanis/wedding' },
          { label: 'Reception Sherwanis', href: '/category/men/sherwanis/reception' },
          { label: 'Designer Sherwanis', href: '/category/men/sherwanis/designer' },
        ],
      },
      {
        title: 'Kurtas',
        links: [
          { label: 'Silk Kurtas', href: '/category/men/kurtas/silk' },
          { label: 'Cotton Kurtas', href: '/category/men/kurtas/cotton' },
          { label: 'Kurta Sets', href: '/category/men/kurtas/sets' },
          { label: 'Nehru Jackets', href: '/category/men/kurtas/nehru-jackets' },
        ],
      },
      {
        title: 'Indo-Western',
        links: [
          { label: 'Bandhgalas', href: '/category/men/indo-western/bandhgala' },
          { label: 'Waistcoats', href: '/category/men/indo-western/waistcoats' },
          { label: 'Jodhpuri Suits', href: '/category/men/indo-western/jodhpuri' },
        ],
      },
      {
        title: 'By Occasion',
        links: [
          { label: 'Groom Wear', href: '/category/men/occasion/groom' },
          { label: 'Wedding Guest', href: '/category/men/occasion/wedding-guest' },
          { label: 'Festive Wear', href: '/category/men/occasion/festive' },
          { label: 'Casual Ethnic', href: '/category/men/occasion/casual' },
        ],
      },
    ],
  },
  {
    label: 'Jewelry',
    href: '/category/jewelry',
    columns: [
      {
        title: 'Bridal',
        links: [
          { label: 'Bridal Sets', href: '/category/jewelry/bridal-sets' },
          { label: 'Kundan', href: '/category/jewelry/kundan' },
          { label: 'Polki', href: '/category/jewelry/polki' },
        ],
      },
      {
        title: 'Everyday',
        links: [
          { label: 'Earrings', href: '/category/jewelry/earrings' },
          { label: 'Necklaces', href: '/category/jewelry/necklaces' },
          { label: 'Bangles', href: '/category/jewelry/bangles' },
        ],
      },
    ],
  },
  {
    label: 'Wedding',
    href: '/category/wedding',
    columns: [
      {
        title: 'Bride',
        links: [
          { label: 'Bridal Lehengas', href: '/category/wedding/bridal-lehengas' },
          { label: 'Bridal Sarees', href: '/category/wedding/bridal-sarees' },
          { label: 'Bridal Jewelry', href: '/category/wedding/bridal-jewelry' },
        ],
      },
      {
        title: 'Groom',
        links: [
          { label: 'Groom Sherwanis', href: '/category/wedding/groom-sherwanis' },
          { label: 'Groom Accessories', href: '/category/wedding/groom-accessories' },
        ],
      },
      {
        title: 'Wedding Functions',
        links: [
          { label: 'Mehendi', href: '/category/wedding/mehendi' },
          { label: 'Sangeet', href: '/category/wedding/sangeet' },
          { label: 'Haldi', href: '/category/wedding/haldi' },
          { label: 'Reception', href: '/category/wedding/reception' },
        ],
      },
    ],
  },
  {
    label: 'Festive',
    href: '/category/festive',
    columns: [
      {
        title: 'Festivals',
        links: [
          { label: 'Diwali Collection', href: '/category/festive/diwali' },
          { label: 'Navratri Special', href: '/category/festive/navratri' },
          { label: 'Eid Collection', href: '/category/festive/eid' },
          { label: 'Pongal & Onam', href: '/category/festive/pongal-onam' },
        ],
      },
      {
        title: 'Gift Sets',
        links: [
          { label: 'Under $100', href: '/category/festive/gifts-under-100' },
          { label: 'Under $250', href: '/category/festive/gifts-under-250' },
          { label: 'Luxury Gifts', href: '/category/festive/luxury-gifts' },
        ],
      },
    ],
  },
];

export const secondaryNavLinks = [
  { label: 'Under $150', href: '/category/under-150' },
  { label: 'NRI Favorites', href: '/category/nri-favorites' },
  { label: 'Gifting', href: '/category/gifting' },
  { label: 'Our Story', href: '/story' },
];
