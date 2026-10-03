import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Sparkles, Terminal, Download } from 'lucide-react';
import { BannerConfig } from '../types';
import { generateReadmeMarkdown, copyToClipboard } from '../utils/exportHelpers';

interface MarkdownSnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BannerConfig;
  onExport: (format: 'png' | 'webp') => void;
}

export const MarkdownSnippetModal: React.FC<MarkdownSnippetModalProps> = ({
  isOpen,
  onClose,
  config,
  onExport,
}) => {
  const [copiedType, setCopiedType] = useState<'snippet' | 'full' | null>(null);

  if (!isOpen) return null;

  const quickSnippet = `<div align="center">
  <img src="./assets/banner.png" alt="${config.title} — ${config.subtitle}" width="100%" />
</div>`;

  const fullReadme = generateReadmeMarkdown(config);

  const handleCopy = async (text: string, type: 'snippet' | 'full') => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-7 text-slate-200 space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <FileCode className="w-4 h-4" />
            <span>GitHub Profile README Code</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-['Orbitron'] text-white">
            Embed In Your GitHub Profile
          </h2>
          <p className="text-xs text-slate-400">
            Copy the markdown snippet below and place it at the very top of your special GitHub profile repository README (<code className="text-cyan-400 font-mono">ateja/ateja</code>).
          </p>
        </div>

        {/* Option 1: Quick Image Embed Snippet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-300">
              1. Quick Image Snippet (Top of README.md)
            </span>
            <button
              onClick={() => handleCopy(quickSnippet, 'snippet')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors"
            >
              {copiedType === 'snippet' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
            <pre>{quickSnippet}</pre>
          </div>
        </div>

        {/* Option 2: Full Complete Profile README Template */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-300">
              2. Complete Developer Profile README Template
            </span>
            <button
              onClick={() => handleCopy(fullReadme, 'full')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              {copiedType === 'full' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Copied Template!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Full Template</span>
                </>
              )}
            </button>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-[11px] text-slate-300 max-h-48 overflow-y-auto">
            <pre>{fullReadme}</pre>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 text-xs text-slate-400 space-y-1.5">
          <span className="font-mono text-cyan-400 font-semibold block">Instructions:</span>
          <ol className="list-decimal list-inside space-y-1 text-[11px]">
            <li>Click <strong>&quot;Download High-Res 3:1 PNG&quot;</strong> below and save as <code className="text-slate-200">banner.png</code>.</li>
            <li>In your GitHub repo (e.g. <code className="text-slate-200">username/username</code>), create an <code className="text-slate-200">assets</code> folder and upload <code className="text-slate-200">banner.png</code>.</li>
            <li>Paste the markdown code at the top of your <code className="text-slate-200">README.md</code> and commit changes.</li>
          </ol>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200"
          >
            Close
          </button>
          <button
            onClick={() => {
              onExport('png');
              onClose();
            }}
            className="px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-lg shadow-cyan-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Download Banner Image Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
