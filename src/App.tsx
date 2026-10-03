import React, { useState, useRef } from 'react';
import { BannerConfig, BannerThemeId, AspectRatioId } from './types';
import { BANNER_THEMES, ASPECT_RATIOS } from './utils/themePresets';
import { BannerCanvas, BannerCanvasHandle } from './components/BannerCanvas';
import { StudioControls } from './components/StudioControls';
import { GitHubProfilePreview } from './components/GitHubProfilePreview';
import { Header } from './components/Header';
import { CharacterDetailModal } from './components/CharacterDetailModal';
import { MarkdownSnippetModal } from './components/MarkdownSnippetModal';
import {
  Sparkles,
  Download,
  Copy,
  Layout,
  Github,
  Shield,
  Zap,
  Cpu,
  Layers,
  Flame,
  Compass,
} from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<BannerConfig>({
    title: 'A TEJA',
    subtitle: 'AI • MECHANICAL • FUTURE',
    tagline: 'AI BUILDER • MECHANICAL RESEARCH',
    themeId: 'cyber-quantum',
    aspectRatio: '3:1',
    glowIntensity: 1.0,
    fogDensity: 0.35,
    particleCount: 65,
    showBlueprintTurbine: true,
    showBlueprintRobotics: true,
    showBlueprintNeuralNet: true,
    showCircuitTraces: true,
    showHudTelemetry: true,
    showCharacterAuras: true,
    showVignette: true,
    typographyStyle: 'futuristic-bold',
    customBadges: ['PYTORCH', 'SOLIDWORKS', 'ROS2', 'AEROSPACE', 'CUDA'],
    systemStatus: 'ALL SYSTEMS OPTIMAL',
    coordinateText: '13.0827° N, 80.2707° E',
  });

  const [currentView, setCurrentView] = useState<'studio' | 'github-preview'>('studio');
  const [isLoreModalOpen, setIsLoreModalOpen] = useState(false);
  const [isMarkdownModalOpen, setIsMarkdownModalOpen] = useState(false);

  const canvasHandleRef = useRef<BannerCanvasHandle | null>(null);
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);

  // Active Theme & Aspect Ratio Objects
  const activeTheme = BANNER_THEMES.find((t) => t.id === config.themeId) || BANNER_THEMES[0];
  const activeAspectRatio = ASPECT_RATIOS.find((a) => a.id === config.aspectRatio) || ASPECT_RATIOS[0];

  const handleExport = (format: 'png' | 'webp') => {
    if (canvasHandleRef.current) {
      canvasHandleRef.current.exportImage(format);
    }
  };

  return (
    <div className="min-h-screen bg-[#03060c] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header */}
      <Header
        currentView={currentView}
        onSelectView={setCurrentView}
        onExport={handleExport}
        onOpenMarkdownModal={() => setIsMarkdownModalOpen(true)}
        onOpenCharacterLore={() => setIsLoreModalOpen(true)}
        activeAspectRatio={activeAspectRatio}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Quick Crossover Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>THE CROSSOVER TRINITY:</span>
            </span>
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-500/30 flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                <span>Iron Man (Left: Tech & AI)</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                <Compass className="w-3 h-3" />
                <span>Luffy (Center: Freedom & Drive)</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Flame className="w-3 h-3" />
                <span>Prabhas (Right: Cinematic Power)</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsLoreModalOpen(true)}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
          >
            Read Universe Design Specs →
          </button>
        </div>

        {/* VIEW 1: STUDIO CANVAS & CONTROLS */}
        {currentView === 'studio' && (
          <div className="space-y-6">
            {/* The Ultra-Wide Banner Viewport */}
            <BannerCanvas
              ref={(handle) => {
                canvasHandleRef.current = handle;
                if (handle) {
                  canvasElementRef.current = handle.getCanvas();
                }
              }}
              config={config}
              theme={activeTheme}
              aspectRatioOption={activeAspectRatio}
              onOpenExportModal={() => setIsMarkdownModalOpen(true)}
            />

            {/* Interactive Control Deck */}
            <StudioControls
              config={config}
              onChangeConfig={setConfig}
              activeTheme={activeTheme}
              activeAspectRatio={activeAspectRatio}
              onExport={handleExport}
              onOpenMarkdownModal={() => setIsMarkdownModalOpen(true)}
              onOpenCharacterLore={() => setIsLoreModalOpen(true)}
            />
          </div>
        )}

        {/* VIEW 2: REALISTIC GITHUB PROFILE PREVIEW */}
        {currentView === 'github-preview' && (
          <div className="space-y-6">
            {/* Hidden canvas renderer to keep dataURL active */}
            <div className="hidden">
              <BannerCanvas
                ref={(handle) => {
                  canvasHandleRef.current = handle;
                  if (handle) {
                    canvasElementRef.current = handle.getCanvas();
                  }
                }}
                config={config}
                theme={activeTheme}
                aspectRatioOption={activeAspectRatio}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-['Orbitron'] text-white">
                  GitHub Profile Live Simulator
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Exact proportions, typography, and contrast as viewed at the top of your GitHub developer README.
                </p>
              </div>

              <button
                onClick={() => setCurrentView('studio')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                ← Back to Studio Editor
              </button>
            </div>

            <GitHubProfilePreview
              config={config}
              theme={activeTheme}
              aspectRatioOption={activeAspectRatio}
              canvasRef={canvasElementRef}
              onExport={handleExport}
            />
          </div>
        )}

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-900 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
            <span className="font-mono font-bold text-cyan-400 block">3:1 Ultra-Wide Resolution</span>
            <p className="text-slate-400 leading-relaxed">
              Standard 3:1 banner proportion (2400×800 px) calibrated specifically for GitHub desktop retina displays and responsive mobile previews.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
            <span className="font-mono font-bold text-cyan-400 block">Clean Negative Space Typography</span>
            <p className="text-slate-400 leading-relaxed">
              &quot;A TEJA&quot; and &quot;AI • MECHANICAL • FUTURE&quot; with subtle laser backing plate, maintaining 100% legibility on light and dark GitHub backgrounds.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
            <span className="font-mono font-bold text-cyan-400 block">Holographic Blueprints</span>
            <p className="text-slate-400 leading-relaxed">
              Layered aerospace jet turbine compressors, 6-axis robotic kinematic arms, quantum AI neural networks, and PCB circuit traces.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-900 text-center text-xs font-mono text-slate-500">
        <p>A TEJA — Cinematic GitHub Developer Profile Banner Studio</p>
        <p className="text-[10px] text-slate-600 mt-1">
          Inspired by Iron Man (Tech), Monkey D. Luffy (Freedom), and Prabhas (Cinematic Power)
        </p>
      </footer>

      {/* Modals */}
      <CharacterDetailModal
        isOpen={isLoreModalOpen}
        onClose={() => setIsLoreModalOpen(false)}
      />

      <MarkdownSnippetModal
        isOpen={isMarkdownModalOpen}
        onClose={() => setIsMarkdownModalOpen(false)}
        config={config}
        onExport={handleExport}
      />
    </div>
  );
}
