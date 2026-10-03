import React from 'react';
import { X, Shield, Sparkles, Zap, Flame, Compass, Cpu, ExternalLink } from 'lucide-react';

interface CharacterDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterDetailModal: React.FC<CharacterDetailModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Cinematic Universe Lore & Tri-Archetype Breakdown</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-['Orbitron'] text-white">
            A TEJA // CROSSOVER UNIVERSE
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Three iconic titans united into a single, cohesive cinematic laboratory universe representing
            the pillars of modern engineering, artificial intelligence, and fearless ambition.
          </p>
        </div>

        {/* The 3 Character Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. IRON MAN / TONY STARK */}
          <div className="p-5 rounded-xl border border-sky-500/30 bg-gradient-to-b from-sky-950/20 via-slate-900/40 to-slate-950 space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-500/30">
                POSITION: LEFT
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold font-['Orbitron'] text-white">
                Iron Man / Stark
              </h3>
              <p className="text-xs font-mono text-sky-400">Advanced Technology & Mechanical Mastery</p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Represents the technological apex: glowing arc reactor chest power, advanced exoskeleton titanium armor,
              holographic AI neural interfaces (JARVIS / FRIDAY), and relentless mechanical innovation.
            </p>

            <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Core Element:</span>
                <span className="text-sky-300 font-semibold">Arc Reactor Fusion</span>
              </div>
              <div className="flex justify-between">
                <span>Domain:</span>
                <span className="text-sky-300 font-semibold">AI Synthesis & Robotics</span>
              </div>
              <div className="flex justify-between">
                <span>Visual Accent:</span>
                <span className="text-sky-300 font-semibold">Cobalt / Cyan Hologram</span>
              </div>
            </div>
          </div>

          {/* 2. MONKEY D. LUFFY */}
          <div className="p-5 rounded-xl border border-rose-500/30 bg-gradient-to-b from-rose-950/20 via-slate-900/40 to-slate-950 space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-500/30">
                POSITION: CENTER-LEFT
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold font-['Orbitron'] text-white">
                Monkey D. Luffy
              </h3>
              <p className="text-xs font-mono text-rose-400">Freedom, Determination & Creative Drive</p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Represents unbounded creativity and unyielding determination: iconic straw hat, open crimson vest,
              fearless grin, and crackling freedom aura that breaks through any impossible engineering frontier.
            </p>

            <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Core Element:</span>
                <span className="text-rose-300 font-semibold">Straw Hat & Willpower</span>
              </div>
              <div className="flex justify-between">
                <span>Domain:</span>
                <span className="text-rose-300 font-semibold">Exploration & Autonomy</span>
              </div>
              <div className="flex justify-between">
                <span>Visual Accent:</span>
                <span className="text-rose-300 font-semibold">Crimson & Gold Energy</span>
              </div>
            </div>
          </div>

          {/* 3. PRABHAS */}
          <div className="p-5 rounded-xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-slate-900/40 to-slate-950 space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30">
                POSITION: RIGHT
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold font-['Orbitron'] text-white">
                Prabhas
              </h3>
              <p className="text-xs font-mono text-amber-400">Cinematic Power & Iron Discipline</p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Represents larger-than-life cinematic impact (Kalki 2898 AD / Salaar / Baahubali aesthetic): rugged
              masculine jawline, groomed beard, intense gaze, tactical cyber-exo harness, and immense ambition.
            </p>

            <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Core Element:</span>
                <span className="text-amber-300 font-semibold">Tactical Exo-Harness</span>
              </div>
              <div className="flex justify-between">
                <span>Domain:</span>
                <span className="text-amber-300 font-semibold">Aerospace & Heavy Tech</span>
              </div>
              <div className="flex justify-between">
                <span>Visual Accent:</span>
                <span className="text-amber-300 font-semibold">Solar Gold Rim Light</span>
              </div>
            </div>
          </div>
        </div>

        {/* Negative Space & GitHub Readability Callout */}
        <div className="mt-6 p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/10 flex items-start gap-3">
          <Shield className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1 text-slate-300">
            <strong className="text-cyan-300 font-mono block">Engineered for GitHub Profile READMEs:</strong>
            <p>
              The top-center region preserves clean, unobstructed negative space behind &quot;A TEJA&quot; and &quot;AI • MECHANICAL • FUTURE&quot;,
              guaranteeing razor-sharp legibility on both desktop retina screens and mobile GitHub apps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
