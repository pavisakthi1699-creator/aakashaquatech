import React, { useState } from 'react';
import { Layers, ArrowRight, FolderPlus, Plus, ChevronRight } from 'lucide-react';
import { AdminStats } from '../services/api';

interface CategoriesViewProps {
  stats: AdminStats | null;
  onSelectCategory: (category: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ stats, onSelectCategory }) => {
  const [newCatName, setNewCatName] = useState('');
  const [newCatParent, setNewCatParent] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const [categoriesHierarchy, setCategoriesHierarchy] = useState([
    {
      parent: 'Industrial RO System',
      desc: 'Heavy-duty reverse osmosis plants for factories, hospitals, and high-flow facilities',
      count: 23,
      children: [
        { name: '250 LPH', count: 4 },
        { name: '500 LPH', count: 5 },
        { name: '1000 LPH', count: 6 },
        { name: '2000 LPH', count: 4 },
        { name: '3000 LPH', count: 2 },
        { name: '5000 LPH', count: 2 }
      ]
    },
    {
      parent: 'Domestic RO',
      desc: 'Residential and corporate water purification systems across all major brands',
      count: 108,
      children: [
        { name: 'AO SMITH (RO & UV)', count: 33 },
        { name: 'Aquaguard (RO & UV)', count: 21 },
        { name: 'kent (RO & UV)', count: 14 },
        { name: 'Wave', count: 25 },
        { name: 'ZeroB (Hydrolife & Alkaline)', count: 16 },
        { name: 'Purella', count: 5 }
      ]
    },
    {
      parent: 'Domestic Ro Aakash',
      desc: 'Aakash Aqua Tech proprietary domestic purifiers & 12 LPH systems',
      count: 60,
      children: [
        { name: 'Domestic RO System (12 LPH)', count: 29 },
        { name: 'Aakash Purifier', count: 31 }
      ]
    },
    {
      parent: 'Water Treatment',
      desc: 'Ion-exchange softeners, demineralizers, and wastewater recycling plants',
      count: 15,
      children: [
        { name: 'Softner (Automatic & Manual)', count: 9 },
        { name: 'DM Plant (Dual Bed)', count: 4 },
        { name: 'STP / ETP Wastewater', count: 2 }
      ]
    },
    {
      parent: 'Under Sink',
      desc: 'Under-counter space-saving reverse osmosis drinking water units',
      count: 18,
      children: [
        { name: 'Alkaline Machines', count: 8 },
        { name: 'ZeroB Hydrolife', count: 10 }
      ]
    },
    {
      parent: 'SS WATER DISPENSER',
      desc: 'Heavy gauge stainless steel commercial drinking water coolers',
      count: 19,
      children: [
        { name: '20 to 50 Liters', count: 9 },
        { name: '100 to 200 Liters', count: 10 }
      ]
    },
    {
      parent: 'Spares & Consumables',
      desc: 'Genuine Dow Filmtec membranes, pumps, vessels, and multiport valves',
      count: 52,
      children: [
        { name: 'RO Membranes (4040 / 8040)', count: 20 },
        { name: 'High Pressure Pumps', count: 12 },
        { name: 'Multiport Valves & Media', count: 20 }
      ]
    },
    {
      parent: 'FRP Pressure Vessels',
      desc: 'High test pressure fiberglass composite filter vessels',
      count: 8,
      children: [
        { name: '1054 / 1354 Standard Vessels', count: 5 },
        { name: '1465 / 1665 Industrial Vessels', count: 3 }
      ]
    }
  ]);

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    const catName = newCatName.trim();

    if (newCatParent) {
      setCategoriesHierarchy(prev => prev.map(group => {
        if (group.parent === newCatParent) {
          return {
            ...group,
            children: [...group.children, { name: catName, count: 0 }],
            count: group.count + 1
          };
        }
        return group;
      }));
    } else {
      setCategoriesHierarchy(prev => [
        ...prev,
        {
          parent: catName,
          desc: 'Custom created category',
          count: 0,
          children: []
        }
      ]);
    }

    setNewCatName('');
    setNewCatParent('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Parent & Child Categories</h2>
          <p className="text-xs text-slate-500 mt-1">
            Complete hierarchical taxonomy of Aakash Aqua Tech equipment and components
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/25 flex items-center gap-2"
        >
          <FolderPlus className="w-4 h-4" />
          <span>+ Add Category</span>
        </button>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <div className="p-6 rounded-2xl bg-white border border-sky-200 shadow-sm space-y-4">
          <div className="text-sm font-bold text-slate-900">Add New Category</div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category Name *</label>
              <input
                type="text"
                placeholder="e.g. Commercial Softeners"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Parent Category (Optional)</label>
              <select
                value={newCatParent}
                onChange={(e) => setNewCatParent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold focus:outline-none focus:border-sky-500 focus:bg-white"
              >
                <option value="">-- None (Top Level Parent Category) --</option>
                {categoriesHierarchy.map((c) => (
                  <option key={c.parent} value={c.parent}>{c.parent}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCategory}
              className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm"
            >
              Save Category
            </button>
          </div>
        </div>
      )}

      {/* Categories Cards with Parent and Child Hierarchy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoriesHierarchy.map((group, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-sky-300 transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-100 font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      {group.parent}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-semibold">Parent Category</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-sky-50 border border-sky-200 text-sky-800">
                  {group.count} Products
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {group.desc}
              </p>

              {/* Child Subcategories */}
              {group.children && group.children.length > 0 && (
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Child Subcategories
                  </span>
                  
                  <div className="flex flex-wrap gap-2">
                    {group.children.map((child, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => onSelectCategory(group.parent)}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-sky-50 hover:text-sky-700 text-slate-700 text-xs font-semibold border border-slate-200 hover:border-sky-200 transition-colors flex items-center gap-1.5"
                      >
                        <span>{child.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold">({child.count})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onSelectCategory(group.parent)}
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-sky-600 text-slate-700 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-200 hover:border-sky-600"
            >
              <span>Filter Products in {group.parent}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};