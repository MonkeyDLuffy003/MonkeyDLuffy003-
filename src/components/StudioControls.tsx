import React, { useState } from 'react';
import { BannerConfig, BannerTheme, AspectRatioOption } from '../types';
import { BANNER_THEMES, ASPECT_RATIOS } from '../utils/themePresets';
import {
  Sliders,
  Palette,
  Layers,
  Type,
  Cpu,
  Sparkles,
  Download,
  Copy,
  Plus,
  X,
  FileCode,
  Shield,
  Eye,
  RefreshCw,
} from 'lucide-react';

interface StudioControlsProps {
  config: BannerConfig;
  onChangeConfig: (newConfig: BannerConfig) => void;
  activeTheme: BannerTheme;
  activeAspectRatio: AspectRatioOption;
  onExport: (format: 'png' | 'webp') => void;
  onOpenMarkdownModal: () => void;
  onOpenCharacterLore: () => void;
}

export const StudioControls: React.FC<StudioControlsProps> = ({
  config,
  onChangeConfig,
  activeTheme,
  activeAspectRatio,
  onExport,
  onOpenMarkdownModal,
  onOpenCharacterLore,
}) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'text' | 'blueprints' | 'fx' | 'badges'>('themes');
  const [newBadgeText, setNewBadgeText] = useState('');

  const updateConfig = (key: keyof BannerConfig, value: any) => {
    onChangeConfig({
      ...config,
      [key]: value,
    });
  };

  const handleAddBadge = () => {
    if (!newBadgeText.trim()) return;
    const cleanBadge = newBadgeText.trim().toUpperCase();
    if (!config.customBadges.includes(cleanBadge)) {
      updateConfig('customBadges', [...config.customBadges, cleanBadge]);
    }
    setNewBadgeText('');
  };

  const handleRemoveBadge = (badgeToRemove: string) => {
    updateConfig(
      'customBadges',
      config.customBadges.filter((b) => b !== badgeToRemove)
    );
  };

  const presetTags = ['PYTORCH', 'SOLIDWORKS', 'ROS2', 'AEROSPACE', 'CUDA', 'ANSYS', 'PINN', 'ROBOTICS'];

  return (
    <div className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl">
      {/* Control Tabs Header */}
      <div className="flex border-b border-slate-800/80 bg-slate-900/50 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('themes')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-mono font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'themes'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Themes & Aspect</span>
        </button>

        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-mono font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'text'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <Type className="w-4 h-4" />
          <span>Typography & Text</span>
        </button>

        <button
          onClick={() => setActiveTab('blueprints')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-mono font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'blueprints'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Holo Blueprints</span>
        </button>

        <button
          onClick={() => setActiveTab('fx')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-mono font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'fx'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Cinematic FX</span>
        </button>

        <button
          onClick={() => setActiveTab('badges')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-mono font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'badges'
              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Tech Badges</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-4 sm:p-5">
        {/* TAB 1: THEMES & ASPECT RATIO */}
        {activeTab === 'themes' && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2 font-semibold uppercase tracking-wider">
                Cinematic Color Grading Presets
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {BANNER_THEMES.map((theme) => {
                  const isSelected = theme.id === config.themeId;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => updateConfig('themeId', theme.id)}
                      className={`text-left p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-900/20'
                          : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold font-mono text-slate-200">{theme.name}</span>
                        <div className="flex items-center gap-1">
                          <span
                            className="w-3 h-3 rounded-full border border-black/40"
                            style={{ backgroundColor: theme.primaryGlow }}
                          />
                          <span
                            className="w-3 h-3 rounded-full border border-black/40"
                            style={{ backgroundColor: theme.accentGlow }}
                          />
                          <span
                            className="w-3 h-3 rounded-full border border-black/40"
                            style={{ backgroundColor: theme.rimColorRight }}
                          />
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{theme.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-900">
              <label className="block text-xs font-mono text-slate-400 mb-2 font-semibold uppercase tracking-wider">
                Banner Dimension & Aspect Ratio
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ASPECT_RATIOS.map((aspect) => {
                  const isSelected = aspect.id === config.aspectRatio;
                  return (
                    <button
                      key={aspect.id}
                      onClick={() => updateConfig('aspectRatio', aspect.id)}
                      className={`text-left p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/30'
                          : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono font-bold text-slate-200">{aspect.label}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {aspect.width}×{aspect.height}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">{aspect.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TYPOGRAPHY & TEXT */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
                  Main Name / Heading
                </label>
                <input
                  type="text"
                  value={config.title}
                  onChange={(e) => updateConfig('title', e.target.value)}
                  placeholder="A TEJA"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
                <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                  Displayed in bold futuristic Orbitron typography
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
                  Subtitle (Three Pillars)
                </label>
                <input
                  type="text"
                  value={config.subtitle}
                  onChange={(e) => updateConfig('subtitle', e.target.value)}
                  placeholder="AI • MECHANICAL • FUTURE"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
                <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                  Laser separated sub-headline beneath the main title
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Tagline / Specialization
                </label>
                <input
                  type="text"
                  value={config.tagline}
                  onChange={(e) => updateConfig('tagline', e.target.value)}
                  placeholder="AI BUILDER • MECHANICAL RESEARCH"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Telemetry Coordinates
                </label>
                <input
                  type="text"
                  value={config.coordinateText}
                  onChange={(e) => updateConfig('coordinateText', e.target.value)}
                  placeholder="13.0827° N, 80.2707° E"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  System Status Flag
                </label>
                <input
                  type="text"
                  value={config.systemStatus}
                  onChange={(e) => updateConfig('systemStatus', e.target.value)}
                  placeholder="ALL SYSTEMS OPTIMAL"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: HOLOGRAPHIC BLUEPRINTS */}
        {activeTab === 'blueprints' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400 font-mono mb-2">
              Toggle futuristic engineering holographic schematics projected behind the three characters:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showBlueprintTurbine}
                  onChange={(e) => updateConfig('showBlueprintTurbine', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-950 border-slate-700"
                />
                <div>
                  <span className="text-xs font-bold font-mono text-slate-200 block">
                    Aerospace Jet Turbine Schematic
                  </span>
                  <span className="text-[11px] text-slate-400">
                    High-bypass stage compressor, concentric pitch rings, and Mach flow vectors (Left).
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showBlueprintNeuralNet}
                  onChange={(e) => updateConfig('showBlueprintNeuralNet', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-950 border-slate-700"
                />
                <div>
                  <span className="text-xs font-bold font-mono text-slate-200 block">
                    Quantum AI Neural Network
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Multi-layer deep learning synaptic graph with real-time pulsing latent weights (Center).
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showBlueprintRobotics}
                  onChange={(e) => updateConfig('showBlueprintRobotics', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-950 border-slate-700"
                />
                <div>
                  <span className="text-xs font-bold font-mono text-slate-200 block">
                    6-Axis Robotics Articulation
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Kinematic linkage arm with hydraulic actuators, torque readouts & laser targeter (Right).
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showCircuitTraces}
                  onChange={(e) => updateConfig('showCircuitTraces', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-950 border-slate-700"
                />
                <div>
                  <span className="text-xs font-bold font-mono text-slate-200 block">
                    PCB Micro-Circuit Highway
                  </span>
                  <span className="text-[11px] text-slate-400">
                    High-speed bus traces with animated electron packets across the laboratory ceiling.
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* TAB 4: CINEMATIC FX */}
        {activeTab === 'fx' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-mono text-slate-300">Glow Intensity</label>
                  <span className="text-xs font-mono text-cyan-400">{Math.round(config.glowIntensity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="1.5"
                  step="0.05"
                  value={config.glowIntensity}
                  onChange={(e) => updateConfig('glowIntensity', parseFloat(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <span className="text-[10px] text-slate-500 font-mono">Reactor core & rim light bloom</span>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-mono text-slate-300">Atmospheric Fog</label>
                  <span className="text-xs font-mono text-cyan-400">{Math.round(config.fogDensity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={config.fogDensity}
                  onChange={(e) => updateConfig('fogDensity', parseFloat(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <span className="text-[10px] text-slate-500 font-mono">Volumetric mist & lab atmosphere</span>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-mono text-slate-300">Floating Particles</label>
                  <span className="text-xs font-mono text-cyan-400">{config.particleCount}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={config.particleCount}
                  onChange={(e) => updateConfig('particleCount', parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-400"
                />
                <span className="text-[10px] text-slate-500 font-mono">Sparks & cyber data motes</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-900 flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showCharacterAuras}
                  onChange={(e) => updateConfig('showCharacterAuras', e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-700"
                />
                <span>Character Energy Auras</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showHudTelemetry}
                  onChange={(e) => updateConfig('showHudTelemetry', e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-700"
                />
                <span>Corner Telemetry Brackets & Crosshairs</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showVignette}
                  onChange={(e) => updateConfig('showVignette', e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-700"
                />
                <span>Cinematic Letterbox Vignette</span>
              </label>
            </div>
          </div>
        )}

        {/* TAB 5: TECH BADGES */}
        {activeTab === 'badges' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
                Bottom Banner Tech Badges
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newBadgeText}
                  onChange={(e) => setNewBadgeText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddBadge()}
                  placeholder="e.g. JAX, SIMULINK, CUDA..."
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={handleAddBadge}
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Tag</span>
                </button>
              </div>
            </div>

            {/* Current Active Badges */}
            <div>
              <span className="text-[11px] font-mono text-slate-400 block mb-2">Active Badges on Banner:</span>
              <div className="flex flex-wrap gap-2">
                {config.customBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/40"
                  >
                    <span>{badge}</span>
                    <button
                      onClick={() => handleRemoveBadge(badge)}
                      className="text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Add Suggestions */}
            <div className="pt-2 border-t border-slate-900">
              <span className="text-[11px] font-mono text-slate-500 block mb-1.5">Quick Add Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {presetTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      if (!config.customBadges.includes(tag)) {
                        updateConfig('customBadges', [...config.customBadges, tag]);
                      }
                    }}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Persistent Bottom Action Bar */}
      <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onOpenCharacterLore}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>Character Lore & Universe Specs</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenMarkdownModal}
            className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-cyan-400" />
            <span>Copy README Code</span>
          </button>

          <button
            onClick={() => onExport('webp')}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="Download lightweight WebP format"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>WebP</span>
          </button>

          <button
            onClick={() => onExport('png')}
            className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download High-Res 3:1 PNG</span>
          </button>
        </div>
      </div>
    </div>
  );
};
