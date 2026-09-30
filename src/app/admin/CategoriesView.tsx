import React from 'react';
import { Layers, ArrowRight, Package } from 'lucide-react';
import { AdminStats } from '../services/api';

interface CategoriesViewProps {
  stats: AdminStats | null;
  onSelectCategory: (category: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ stats, onSelectCategory }) => {
  const categoriesList = [
    { name: 'Industrial RO', desc: 'Commercial & heavy-duty reverse osmosis plants (250 LPH to 50,000 LPH)', count: stats?.categories?.['Industrial RO'] || 23 },
    { name: 'Domestic RO', desc: 'Residential under-sink and wall-mounted drinking water purifiers', count: stats?.categories?.['Domestic RO'] || 108 },
    { name: 'Water Softeners', desc: 'Automatic ion-exchange water softeners for hard water and scaling removal', count: stats?.categories?.['Water Softeners'] || 9 },
    { name: 'DM Plants', desc: 'Demineralization plants for battery, pharmaceutical and chemical manufacturing', count: 4 },
    { name: 'STP / ETP', desc: 'Sewage and effluent wastewater treatment with PCB compliance', count: 6 },
    { name: 'Spares & Consumables', desc: 'Original RO membranes (Filmtec, Hydranautics), pumps, valves, and filter media', count: stats?.categories?.['Spares & Consumables'] || 52 },
    { name: 'Under Sink RO', desc: 'Compact under-counter domestic purifiers with hydro-pneumatic tanks', count: stats?.categories?.['Under Sink RO'] || 18 },
    { name: 'Water Dispensers', desc: 'Stainless steel commercial hot, cold, and normal water cooling dispensers', count: stats?.categories?.['Water Dispensers'] || 19 },
    { name: 'FRP Vessels', desc: 'High-pressure fiberglass reinforced plastic filter vessels for sand and carbon filters', count: stats?.categories?.['FRP Vessels'] || 8 },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Product Categories & Taxonomy</h2>
        <p className="text-xs text-slate-400 mt-1">
          Catalog grouping for Aakash Aqua Tech water treatment systems
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesList.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-all flex flex-col justify-between group shadow-lg space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-sky-600/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-slate-950 border border-slate-800 text-sky-400">
                  {cat.count} Items
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {cat.desc}
              </p>
            </div>

            <button
              onClick={() => onSelectCategory(cat.name)}
              className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-sky-600 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-800 hover:border-sky-600"
            >
              <span>View Products in Category</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};