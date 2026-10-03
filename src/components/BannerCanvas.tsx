import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { BannerConfig, BannerTheme, AspectRatioOption } from '../types';
import { drawBanner, createParticles, Particle } from '../utils/drawBanner';
import { Play, Pause, Maximize2, Sparkles, Check, Download } from 'lucide-react';
import { downloadCanvasImage } from '../utils/exportHelpers';

interface BannerCanvasProps {
  config: BannerConfig;
  theme: BannerTheme;
  aspectRatioOption: AspectRatioOption;
  onOpenExportModal?: () => void;
}

export interface BannerCanvasHandle {
  getCanvas: () => HTMLCanvasElement | null;
  exportImage: (format: 'png' | 'webp') => void;
}

export const BannerCanvas = forwardRef<BannerCanvasHandle, BannerCanvasProps>(
  ({ config, theme, aspectRatioOption, onOpenExportModal }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    // Initialize particles when count or theme changes
    useEffect(() => {
      particlesRef.current = createParticles(
        config.particleCount,
        aspectRatioOption.width,
        aspectRatioOption.height,
        theme
      );
    }, [config.particleCount, aspectRatioOption.width, aspectRatioOption.height, theme]);

    // Expose handle methods to parent
    useImperativeHandle(ref, () => ({
      getCanvas: () => canvasRef.current,
      exportImage: (format: 'png' | 'webp') => {
        if (!canvasRef.current) return;
        const filename = `ateja-github-banner-${aspectRatioOption.width}x${aspectRatioOption.height}`;
        downloadCanvasImage(canvasRef.current, filename, format);
      },
    }));

    // Animation & Drawing loop
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let startTime = performance.now();

      const render = (now: number) => {
        const elapsed = now - startTime;
        drawBanner(
          ctx,
          aspectRatioOption.width,
          aspectRatioOption.height,
          config,
          theme,
          particlesRef.current,
          isPlaying ? elapsed : 0
        );

        if (isPlaying) {
          animationFrameRef.current = requestAnimationFrame(render);
        }
      };

      if (isPlaying) {
        animationFrameRef.current = requestAnimationFrame(render);
      } else {
        // Draw static frame
        drawBanner(
          ctx,
          aspectRatioOption.width,
          aspectRatioOption.height,
          config,
          theme,
          particlesRef.current,
          0
        );
      }

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [config, theme, aspectRatioOption, isPlaying]);

    // Handle Quick Export
    const handleQuickDownload = () => {
      if (!canvasRef.current) return;
      const filename = `a-teja-github-banner-${aspectRatioOption.width}x${aspectRatioOption.height}`;
      downloadCanvasImage(canvasRef.current, filename, 'png');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    };

    return (
      <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800 shadow-2xl shadow-cyan-950/30 group">
        {/* Top Control Bar Over Canvas */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-slate-900/90 backdrop-blur-md text-cyan-300 border border-cyan-500/30 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              {aspectRatioOption.label.split(' ')[0]} ({aspectRatioOption.width} × {aspectRatioOption.height}px)
            </span>
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono text-slate-400 bg-slate-900/80 backdrop-blur-md border border-slate-800">
              RETINA 4K READY
            </span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Play/Pause Animation */}
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 backdrop-blur-md transition-colors"
              title={isPlaying ? 'Pause Particle Animation' : 'Play Live Animation'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline text-[11px]">Pause Motion</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline text-[11px]">Play Motion</span>
                </>
              )}
            </button>

            {/* Quick PNG Download */}
            <button
              onClick={handleQuickDownload}
              className="px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Download Ultra-Res PNG (3:1)"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Export PNG</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* The High-Resolution Banner Canvas */}
        <div className="w-full flex items-center justify-center p-2 sm:p-4 bg-gradient-to-b from-slate-950 via-[#03060c] to-black">
          <canvas
            ref={canvasRef}
            width={aspectRatioOption.width}
            height={aspectRatioOption.height}
            className="w-full h-auto rounded-lg shadow-2xl object-contain border border-slate-800/80 transition-all duration-300 hover:border-cyan-500/30"
            style={{
              aspectRatio: `${aspectRatioOption.width} / ${aspectRatioOption.height}`,
            }}
          />
        </div>

        {/* Bottom Metadata Ribbon */}
        <div className="px-4 py-2.5 bg-slate-950/90 border-t border-slate-900 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THEME: {theme.name.toUpperCase()}</span>
            </span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="hidden md:inline text-slate-400">
              CHARACTERS: EXPLORER (PIRATE) • ARCHITECT (AI MECH) • STRATEGIST (ACTION HERO)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500">FORMAT: 3:1 ULTRA-WIDE</span>
            <span className="text-cyan-400 font-semibold">GITHUB READY</span>
          </div>
        </div>
      </div>
    );
  }
);
BannerCanvas.displayName = 'BannerCanvas';
