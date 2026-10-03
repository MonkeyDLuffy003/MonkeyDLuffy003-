import React from 'react';
import { Sparkles, Download, Copy, Eye, Layout, Shield, Github } from 'lucide-react';
import { AspectRatioOption } from '../types';

interface HeaderProps {
  currentView: 'studio' | 'github-preview';
  onSelectView: (view: 'studio' | 'github-preview') => void;
  onExport: (format: 'png' | 'webp') => void;
  onOpenMarkdownModal: () => void;
  onOpenCharacterLore: () => void;
  activeAspectRatio: AspectRatioOption;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  onExport,
  onOpenMarkdownModal,
  onOpenCharacterLore,
  activeAspectRatio,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-amber-500 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full rounded-[11px] bg-slate-950 flex items-center justify-center font-['Orbitron'] font-black text-sm text-cyan-400">
              AT
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Orbitron'] font-black text-sm sm:text-base text-white tracking-wider">
                A TEJA
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                3:1 BANNER
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
              AI BUILDER • MECHANICAL ENGINEER • RESEARCHER
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900/80 border border-slate-800">
          <button
            onClick={() => onSelectView('studio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              currentView === 'studio'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Studio</span>
          </button>

          <button
            onClick={() => onSelectView('github-preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              currentView === 'github-preview'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub Mockup</span>
            <span className="sm:hidden">GitHub</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCharacterLore}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
            title="Iron Man, Luffy, and Prabhas crossover breakdown"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Lore</span>
          </button>

          <button
            onClick={onOpenMarkdownModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-cyan-400" />
            <span>README Code</span>
          </button>

          <button
            onClick={() => onExport('png')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export 3:1 PNG</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};
