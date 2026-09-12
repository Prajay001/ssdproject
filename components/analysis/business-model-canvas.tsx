"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { BusinessModelCanvas as BMCType } from "@/types";
import { LayoutGrid, Plus, Trash2, Edit2, Check } from "lucide-react";
import { useState } from "react";

export function BusinessModelCanvasGrid({ initialCanvas }: { initialCanvas: BMCType }) {
  const [canvas, setCanvas] = useState<BMCType>(initialCanvas);
  const [editingSection, setEditingSection] = useState<keyof BMCType | null>(null);
  const [newItemText, setNewItemText] = useState("");

  const handleAddItem = (section: keyof BMCType) => {
    if (!newItemText.trim()) return;
    setCanvas((prev) => ({
      ...prev,
      [section]: [...prev[section], newItemText.trim()],
    }));
    setNewItemText("");
  };

  const handleRemoveItem = (section: keyof BMCType, index: number) => {
    setCanvas((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const sections: { key: keyof BMCType; title: string; colSpan?: string; bg: string }[] = [
    { key: "keyPartners", title: "1. Key Partners", bg: "bg-blue-500/5 border-blue-500/20" },
    { key: "keyActivities", title: "2. Key Activities", bg: "bg-indigo-500/5 border-indigo-500/20" },
    { key: "valuePropositions", title: "3. Value Propositions", colSpan: "row-span-2", bg: "bg-purple-500/5 border-purple-500/20" },
    { key: "customerRelationships", title: "4. Customer Relationships", bg: "bg-pink-500/5 border-pink-500/20" },
    { key: "customerSegments", title: "5. Customer Segments", colSpan: "row-span-2", bg: "bg-emerald-500/5 border-emerald-500/20" },
    { key: "keyResources", title: "6. Key Resources", bg: "bg-amber-500/5 border-amber-500/20" },
    { key: "channels", title: "7. Channels", bg: "bg-cyan-500/5 border-cyan-500/20" },
    { key: "costStructure", title: "8. Cost Structure", colSpan: "col-span-1 md:col-span-2.5", bg: "bg-rose-500/5 border-rose-500/20" },
    { key: "revenueStreams", title: "9. Revenue Streams", colSpan: "col-span-1 md:col-span-2.5", bg: "bg-emerald-500/5 border-emerald-500/20" },
  ];

  return (
    <GlassCard glow="primary" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <LayoutGrid className="w-4 h-4" />
          <span>Interactive Business Model Canvas</span>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          9-Box Strategic Grid (Editable)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
        {/* Top 7 Boxes Grid */}
        <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Key Partners */}
          <CanvasBox
            title="1. Key Partners"
            items={canvas.keyPartners}
            bg="bg-blue-500/5 border-blue-500/20"
            onAdd={(text) => {
              setCanvas((prev) => ({ ...prev, keyPartners: [...prev.keyPartners, text] }));
            }}
            onRemove={(idx) => handleRemoveItem("keyPartners", idx)}
          />

          {/* Key Activities & Resources Column */}
          <div className="space-y-3">
            <CanvasBox
              title="2. Key Activities"
              items={canvas.keyActivities}
              bg="bg-indigo-500/5 border-indigo-500/20"
              onAdd={(text) => setCanvas((prev) => ({ ...prev, keyActivities: [...prev.keyActivities, text] }))}
              onRemove={(idx) => handleRemoveItem("keyActivities", idx)}
            />
            <CanvasBox
              title="6. Key Resources"
              items={canvas.keyResources}
              bg="bg-amber-500/5 border-amber-500/20"
              onAdd={(text) => setCanvas((prev) => ({ ...prev, keyResources: [...prev.keyResources, text] }))}
              onRemove={(idx) => handleRemoveItem("keyResources", idx)}
            />
          </div>

          {/* Value Propositions */}
          <CanvasBox
            title="3. Value Propositions"
            items={canvas.valuePropositions}
            bg="bg-purple-500/10 border-purple-500/30 font-semibold"
            onAdd={(text) => setCanvas((prev) => ({ ...prev, valuePropositions: [...prev.valuePropositions, text] }))}
            onRemove={(idx) => handleRemoveItem("valuePropositions", idx)}
          />

          {/* Customer Relationships & Channels Column */}
          <div className="space-y-3">
            <CanvasBox
              title="4. Customer Relationships"
              items={canvas.customerRelationships}
              bg="bg-pink-500/5 border-pink-500/20"
              onAdd={(text) => setCanvas((prev) => ({ ...prev, customerRelationships: [...prev.customerRelationships, text] }))}
              onRemove={(idx) => handleRemoveItem("customerRelationships", idx)}
            />
            <CanvasBox
              title="7. Channels"
              items={canvas.channels}
              bg="bg-cyan-500/5 border-cyan-500/20"
              onAdd={(text) => setCanvas((prev) => ({ ...prev, channels: [...prev.channels, text] }))}
              onRemove={(idx) => handleRemoveItem("channels", idx)}
            />
          </div>

          {/* Customer Segments */}
          <CanvasBox
            title="5. Customer Segments"
            items={canvas.customerSegments}
            bg="bg-emerald-500/5 border-emerald-500/20"
            onAdd={(text) => setCanvas((prev) => ({ ...prev, customerSegments: [...prev.customerSegments, text] }))}
            onRemove={(idx) => handleRemoveItem("customerSegments", idx)}
          />
        </div>

        {/* Bottom 2 Financial Boxes */}
        <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
          <CanvasBox
            title="8. Cost Structure"
            items={canvas.costStructure}
            bg="bg-rose-500/5 border-rose-500/20"
            onAdd={(text) => setCanvas((prev) => ({ ...prev, costStructure: [...prev.costStructure, text] }))}
            onRemove={(idx) => handleRemoveItem("costStructure", idx)}
          />
          <CanvasBox
            title="9. Revenue Streams"
            items={canvas.revenueStreams}
            bg="bg-emerald-500/5 border-emerald-500/20"
            onAdd={(text) => setCanvas((prev) => ({ ...prev, revenueStreams: [...prev.revenueStreams, text] }))}
            onRemove={(idx) => handleRemoveItem("revenueStreams", idx)}
          />
        </div>
      </div>
    </GlassCard>
  );
}

function CanvasBox({
  title,
  items,
  bg,
  onAdd,
  onRemove,
}: {
  title: string;
  items: string[];
  bg: string;
  onAdd: (text: string) => void;
  onRemove: (idx: number) => void;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const handleSave = () => {
    if (inputVal.trim()) {
      onAdd(inputVal.trim());
      setInputVal("");
      setIsAdding(false);
    }
  };

  return (
    <div className={`p-4 rounded-xl border flex flex-col justify-between h-full min-h-[160px] ${bg}`}>
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
            {title}
          </span>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="p-1 rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-500"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <ul className="space-y-1.5">
          {items.map((item, idx) => (
            <li key={idx} className="group flex items-start justify-between gap-1 text-[11px] text-slate-700 dark:text-slate-300">
              <span className="leading-tight">• {item}</span>
              <button
                onClick={() => onRemove(idx)}
                className="opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-600 transition-opacity p-0.5"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isAdding && (
        <div className="mt-2 flex items-center gap-1">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Add point..."
            className="w-full px-2 py-1 bg-white/80 dark:bg-slate-900/80 rounded border border-slate-300 dark:border-slate-700 text-[11px] focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
          <button onClick={handleSave} className="p-1 rounded bg-blue-500 text-white">
            <Check className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
