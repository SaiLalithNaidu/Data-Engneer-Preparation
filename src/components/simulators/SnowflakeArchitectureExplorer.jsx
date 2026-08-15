import React, { useState } from 'react';
import { Cloud, Cpu, Database, Server, Zap, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SnowflakeArchitectureExplorer() {
  const [activeLayer, setActiveLayer] = useState('COMPUTE');

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-extrabold text-slate-100">Snowflake 3-Layer Architecture Explorer</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Explore Snowflake's unique multi-cluster shared data architecture with decoupled storage, compute, and services.
          </p>
        </div>
      </div>

      {/* Layer Selector Stack */}
      <div className="space-y-3">
        
        {/* Layer 1: Cloud Services */}
        <button
          onClick={() => setActiveLayer('SERVICES')}
          className={`w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
            activeLayer === 'SERVICES' 
              ? 'bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border-purple-500 shadow-lg shadow-purple-500/10' 
              : 'bg-slate-900/50 border-slate-800 hover:border-purple-500/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-100">Layer 1: Cloud Services Layer</h3>
                <p className="text-xs text-slate-400">Metadata management, security, access control, query optimizer & parsing</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950 px-2.5 py-1 rounded-full border border-purple-800">
              Brain of Snowflake
            </span>
          </div>
        </button>

        {/* Layer 2: Compute (Virtual Warehouses) */}
        <button
          onClick={() => setActiveLayer('COMPUTE')}
          className={`w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
            activeLayer === 'COMPUTE' 
              ? 'bg-gradient-to-r from-cyan-900/60 to-blue-900/60 border-cyan-500 shadow-lg shadow-cyan-500/10' 
              : 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-100">Layer 2: Query Processing (Virtual Warehouses)</h3>
                <p className="text-xs text-slate-400">Independent MPP compute clusters (XS to 4XL). Zero resource contention!</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800">
              Elastic Compute
            </span>
          </div>
        </button>

        {/* Layer 3: Storage */}
        <button
          onClick={() => setActiveLayer('STORAGE')}
          className={`w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
            activeLayer === 'STORAGE' 
              ? 'bg-gradient-to-r from-emerald-900/60 to-teal-900/60 border-emerald-500 shadow-lg shadow-emerald-500/10' 
              : 'bg-slate-900/50 border-slate-800 hover:border-emerald-500/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-100">Layer 3: Centralized Database Storage Layer</h3>
                <p className="text-xs text-slate-400">Immutable, hybrid columnar micro-partitions stored in cloud blob storage</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
              Cloud Blob Storage
            </span>
          </div>
        </button>

      </div>

      {/* Layer Detail Inspector */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
        {activeLayer === 'SERVICES' && (
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-purple-300 flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-400" /> Cloud Services Deep Dive
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
              <li className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="font-bold text-purple-300 block mb-1">Metadata Management</span>
                Tracks all micro-partition min/max value statistics for instant query pruning without scanning storage files.
              </li>
              <li className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="font-bold text-purple-300 block mb-1">Zero Resource Contention</span>
                Cloud services runs on dedicated infrastructure shared globally without competing with Virtual Warehouse queries.
              </li>
            </ul>
          </div>
        )}

        {activeLayer === 'COMPUTE' && (
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-cyan-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Virtual Warehouses Deep Dive
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
              <li className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="font-bold text-cyan-300 block mb-1">Scale Up & Scale Out</span>
                Resize sizes dynamically (X-Small to 4X-Large) or scale out multi-cluster warehouses during peak workload spikes.
              </li>
              <li className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="font-bold text-cyan-300 block mb-1">Auto-Suspend & Auto-Resume</span>
                Automatically pauses compute when idle to save credits and resumes instantly on incoming queries.
              </li>
            </ul>
          </div>
        )}

        {activeLayer === 'STORAGE' && (
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-emerald-300 flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" /> Micro-Partitions Deep Dive
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
              <li className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="font-bold text-emerald-300 block mb-1">Micro-Partitions</span>
                Data is divided into continuous 50MB to 150MB compressed, encrypted columnar files automatically created upon load.
              </li>
              <li className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="font-bold text-emerald-300 block mb-1">Time Travel & Zero-Copy Cloning</span>
                Immutable micro-partitions allow querying past states (up to 90 days) and cloning databases instantly without data duplication.
              </li>
            </ul>
          </div>
        )}
      </div>

    </div>
  );
}
