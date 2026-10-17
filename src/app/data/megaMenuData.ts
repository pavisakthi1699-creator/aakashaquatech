import { assetUrl } from '../utils/asset';

export interface MegaMenuItem {
  id: string;
  title: string;
  tagline: string;
  badge?: string;
  badgeColor?: string;
  image: string;
  categoryFilter: string;
}

export interface MegaMenuCategory {
  navKey: string;
  title: string;
  subtitle: string;
  viewAllLabel: string;
  categoryFilter: string;
  items: MegaMenuItem[];
}

export const MEGA_MENUS: Record<string, MegaMenuCategory> = {
  'domestic-ro': {
    navKey: 'domestic-ro',
    title: 'Domestic RO Purifiers',
    subtitle: 'Advanced 10-Stage Multi-Stage Alkaline & Mineral Water Purifiers for Home Kitchens',
    viewAllLabel: 'Explore All Domestic Purifiers',
    categoryFilter: 'Domestic RO',
    items: [
      {
        id: 'ro-purifiers',
        title: 'RO Water Purifiers',
        tagline: 'Multi-Stage Mineral RO',
        badge: 'Best Seller',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        image: assetUrl('/images/mega-menu/ro-water-purifiers.png'),
        categoryFilter: 'Domestic RO',
      },
      {
        id: 'uv-purifiers',
        title: 'UV Water Purifiers',
        tagline: 'Instant UV Sterilization',
        badge: 'Zero Wastage',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
        image: assetUrl('/images/mega-menu/uv-water-purifiers.png'),
        categoryFilter: 'UV Water Purifiers',
      },
      {
        id: 'alkaline-purifiers',
        title: 'Alkaline RO',
        tagline: 'Active Antioxidant pH+',
        badge: 'Copper Infused',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        image: assetUrl('/images/mega-menu/alkaline.png'),
        categoryFilter: 'Alkaline',
      },
      {
        id: 'gravity-purifiers',
        title: 'Gravity Purifiers',
        tagline: 'Non-Electric Micro-Filter',
        badge: 'Eco Safe',
        badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
        image: assetUrl('/images/mega-menu/gravity-water-purifiers.png'),
        categoryFilter: 'Gravity',
      },
      {
        id: 'under-sink',
        title: 'Under Sink RO',
        tagline: 'Concealed Kitchen Modular',
        badge: 'Space Saver',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        image: assetUrl('/images/mega-menu/under-sink.png'),
        categoryFilter: 'Under Sink',
      },
    ],
  },
  'water-treatment': {
    navKey: 'water-treatment',
    title: 'Water Treatment Plants',
    subtitle: 'Industrial & Whole-House Water Softeners, Sand Filters & Iron Removal Solutions',
    viewAllLabel: 'Explore All Treatment Plants',
    categoryFilter: 'Water Treatment Plant',
    items: [
      {
        id: 'softner',
        title: 'Water Softener',
        tagline: 'Zero Hardness & Limescale',
        badge: 'Auto Backwash',
        badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
        image: assetUrl('/images/mega-menu/softner.png'),
        categoryFilter: 'Softner',
      },
      {
        id: 'iron-remover',
        title: 'Iron Remover Filter',
        tagline: 'High Iron & Rust Eliminator',
        badge: 'Multi-Media',
        badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
        image: assetUrl('/images/mega-menu/iron-remover.png'),
        categoryFilter: 'Iron Remover',
      },
      {
        id: 'sand-filter',
        title: 'Sand Filter',
        tagline: 'Deep Turbidity Clarifier',
        badge: 'Heavy Duty',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
        image: assetUrl('/images/mega-menu/sand-filter.png'),
        categoryFilter: 'Sand Filter',
      },
      {
        id: 'vessel',
        title: 'FRP Vessels',
        tagline: 'High-Pressure Composite Tanks',
        badge: 'Pentair Grade',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        image: assetUrl('/images/mega-menu/vessel.png'),
        categoryFilter: 'Vessel',
      },
      {
        id: 'ss-tank',
        title: 'SS Storage Tank',
        tagline: 'Grade 304 Stainless Steel',
        badge: 'Anti-Bacterial',
        badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
        image: assetUrl('/images/mega-menu/ss-tank.png'),
        categoryFilter: 'SS Tank',
      },
      {
        id: 'dm-plant',
        title: 'DM Plant',
        tagline: 'Zero Conductivity Demineralizer',
        badge: 'Industrial Grade',
        badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
        image: assetUrl('/images/mega-menu/dm-plant.png'),
        categoryFilter: 'DM Plant',
      },
    ],
  },
};
