import React, { useState } from 'react';
import { BannerConfig, BannerTheme, AspectRatioOption } from '../types';
import { DEFAULT_PINNED_REPOS } from '../utils/themePresets';
import {
  Moon,
  Sun,
  BookOpen,
  FolderGit2,
  LayoutGrid,
  Package,
  Star,
  GitFork,
  MapPin,
  Link as LinkIcon,
  Twitter,
  Users,
  Building,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

interface GitHubProfilePreviewProps {
  config: BannerConfig;
  theme: BannerTheme;
  aspectRatioOption: AspectRatioOption;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onExport: (format: 'png' | 'webp') => void;
}

export const GitHubProfilePreview: React.FC<GitHubProfilePreviewProps> = ({
  config,
  theme,
  aspectRatioOption,
  canvasRef,
  onExport,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'repos'>('overview');

  const bannerDataUrl = canvasRef.current ? canvasRef.current.toDataURL('image/png') : '';

  return (
    <div
      className={`w-full rounded-2xl border transition-all overflow-hidden shadow-2xl ${
        isDarkMode
          ? 'bg-[#0d1117] text-[#c9d1d9] border-[#30363d]'
          : 'bg-[#ffffff] text-[#24292f] border-[#d0d7de]'
      }`}
    >
      {/* Top GitHub Navigation Bar Mockup */}
      <div
        className={`px-4 sm:px-6 py-3 border-b flex items-center justify-between text-xs font-sans ${
          isDarkMode
            ? 'bg-[#161b22] border-[#30363d] text-[#c9d1d9]'
            : 'bg-[#f6f8fa] border-[#d0d7de] text-[#24292f]'
        }`}
      >
        <div className="flex items-center gap-3">
          {/* GitHub Octocat Icon */}
          <div className="flex items-center gap-2 font-semibold">
            <svg
              height="22"
              aria-hidden="true"
              viewBox="0 0 16 16"
              version="1.1"
              width="22"
              className={isDarkMode ? 'fill-white' : 'fill-[#24292f]'}
            >
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
            <span className="font-mono text-sm">ateja</span>
          </div>

          <div
            className={`hidden md:flex items-center px-3 py-1 rounded-md text-xs border ${
              isDarkMode
                ? 'bg-[#0d1117] border-[#30363d] text-slate-400'
                : 'bg-white border-[#d0d7de] text-slate-500'
            }`}
          >
            Type <kbd className="mx-1 px-1 rounded bg-slate-800 text-[10px] text-slate-300">Ctrl</kbd> +{' '}
            <kbd className="mx-1 px-1 rounded bg-slate-800 text-[10px] text-slate-300">K</kbd> to search
          </div>
        </div>

        {/* Dark/Light mode toggle for GitHub simulator */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400">GitHub Theme:</span>
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border transition-colors ${
              isDarkMode
                ? 'bg-[#21262d] border-[#30363d] text-yellow-300 hover:bg-[#30363d]'
                : 'bg-white border-[#d0d7de] text-slate-800 hover:bg-slate-100'
            }`}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-yellow-400" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-700" />
                <span>Light Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* GitHub Profile Navigation Tabs */}
      <div
        className={`px-4 sm:px-8 border-b flex items-center gap-6 text-sm overflow-x-auto ${
          isDarkMode ? 'border-[#30363d]' : 'border-[#d0d7de]'
        }`}
      >
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 py-3 border-b-2 font-medium whitespace-nowrap ${
            activeTab === 'overview'
              ? isDarkMode
                ? 'border-[#f78166] text-white font-semibold'
                : 'border-[#fd8c73] text-black font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('repos')}
          className={`flex items-center gap-2 py-3 border-b-2 font-medium whitespace-nowrap ${
            activeTab === 'repos'
              ? isDarkMode
                ? 'border-[#f78166] text-white font-semibold'
                : 'border-[#fd8c73] text-black font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Repositories</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-xs font-mono ${
              isDarkMode ? 'bg-[#21262d] text-slate-300' : 'bg-slate-200 text-slate-700'
            }`}
          >
            42
          </span>
        </button>

        <div className="hidden sm:flex items-center gap-2 py-3 text-slate-400">
          <LayoutGrid className="w-4 h-4" />
          <span>Projects</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 py-3 text-slate-400">
          <Package className="w-4 h-4" />
          <span>Packages</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 py-3 text-slate-400">
          <Star className="w-4 h-4" />
          <span>Stars</span>
        </div>
      </div>

      {/* Main Profile Layout: Left Sidebar + Main README Content */}
      <div className="p-4 sm:p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Developer Profile Bio */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative inline-block group">
            {/* Developer Avatar */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-[#30363d] bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-950 p-1 shadow-xl">
              <div className="w-full h-full rounded-full flex flex-col items-center justify-center bg-slate-950 text-center relative overflow-hidden">
                {/* Arc reactor & anime energy background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-transparent to-amber-500/20" />
                <span className="font-['Orbitron'] text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-amber-400">
                  AT
                </span>
                <span className="text-[10px] font-mono tracking-widest text-cyan-300 mt-1 uppercase">
                  A TEJA
                </span>
                {/* Micro tech rings */}
                <div className="w-24 h-24 rounded-full border border-cyan-500/30 absolute animate-spin" style={{ animationDuration: '20s' }} />
              </div>
            </div>

            {/* Glowing Status badge */}
            <div
              className={`absolute bottom-3 right-4 px-2.5 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 shadow-lg border ${
                isDarkMode
                  ? 'bg-[#161b22] border-[#30363d] text-cyan-300'
                  : 'bg-white border-[#d0d7de] text-cyan-600'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Building</span>
            </div>
          </div>

          <div>
            <h1 className={`text-2xl font-bold font-sans ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              A TEJA
            </h1>
            <p className="text-sm font-mono text-slate-400">@ateja</p>
          </div>

          <p className="text-sm leading-relaxed">
            AI Builder & Mechanical Engineer. Integrating deep reinforcement learning with generative CAD,
            autonomous robotics, and futuristic aerospace research.
          </p>

          <button
            className={`w-full py-1.5 rounded-md text-xs font-semibold border transition-colors ${
              isDarkMode
                ? 'bg-[#21262d] border-[#30363d] text-slate-200 hover:bg-[#30363d]'
                : 'bg-[#f6f8fa] border-[#d0d7de] text-slate-800 hover:bg-slate-100'
            }`}
          >
            Edit profile
          </button>

          {/* Profile Metadata */}
          <div className="space-y-2 text-xs text-slate-400 pt-2 font-sans">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-500" />
              <span>Futuristic Robotics & AI Lab</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span>{config.coordinateText || '13.0827° N, 80.2707° E'}</span>
            </div>
            <div className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-slate-500" />
              <span className="text-cyan-400 hover:underline cursor-pointer">ateja.dev</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-500" />
              <span>
                <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>1.4k</strong> followers •{' '}
                <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>382</strong> following
              </span>
            </div>
          </div>

          {/* Badges preview */}
          <div className="pt-3 border-t border-[#30363d]/50">
            <span className="text-xs font-mono text-slate-400 block mb-2 font-semibold">Specializations</span>
            <div className="flex flex-wrap gap-1.5">
              {config.customBadges.map((badge) => (
                <span
                  key={badge}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                    isDarkMode
                      ? 'bg-[#161b22] border-[#30363d] text-cyan-300'
                      : 'bg-slate-100 border-slate-300 text-cyan-700'
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: README.md Section with LIVE BANNER */}
        <div className="lg:col-span-8 space-y-6">
          {/* GitHub README Container */}
          <div
            className={`rounded-xl border overflow-hidden shadow-sm ${
              isDarkMode ? 'border-[#30363d] bg-[#0d1117]' : 'border-[#d0d7de] bg-white'
            }`}
          >
            {/* README Header Bar */}
            <div
              className={`px-4 py-2.5 border-b flex items-center justify-between text-xs font-mono ${
                isDarkMode
                  ? 'bg-[#161b22] border-[#30363d] text-slate-400'
                  : 'bg-[#f6f8fa] border-[#d0d7de] text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold">ateja / README.md</span>
              </div>
              <span className="text-[10px] text-slate-500">LIVE RENDER</span>
            </div>

            {/* README Content Body */}
            <div className="p-4 sm:p-6 space-y-6">
              {/* THE ULTRA-WIDE CINEMATIC BANNER (3:1) */}
              <div className="relative rounded-lg overflow-hidden border border-[#30363d] shadow-lg group">
                {bannerDataUrl ? (
                  <img
                    src={bannerDataUrl}
                    alt={`${config.title} — ${config.subtitle}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[3/1] bg-slate-900 flex items-center justify-center text-slate-500 font-mono text-xs">
                    Rendering Banner Preview...
                  </div>
                )}

                {/* Banner Dimension Badge in Preview */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                  3:1 GitHub Retina Banner ({aspectRatioOption.width}×{aspectRatioOption.height})
                </div>
              </div>

              {/* README Text Content */}
              <div className="space-y-4 font-sans">
                <div className="text-center space-y-2 pt-2">
                  <h2 className={`text-xl sm:text-2xl font-bold font-['Orbitron'] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {config.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-mono tracking-widest text-cyan-400">
                    {config.subtitle}
                  </p>
                  <p className="text-xs text-slate-400 italic">
                    &quot;Bridging autonomous intelligence, advanced robotics, and next-generation aerospace mechanics.&quot;
                  </p>
                </div>

                <div className="flex justify-center gap-2 flex-wrap">
                  {config.customBadges.map((badge) => (
                    <span
                      key={badge}
                      className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#161b22] text-cyan-400 border border-[#30363d]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Quick GitHub Markdown Snippet Box */}
                <div
                  className={`p-3 rounded-lg border text-xs font-mono ${
                    isDarkMode
                      ? 'bg-[#161b22] border-[#30363d] text-slate-300'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span>Markdown code for your README:</span>
                    <button
                      onClick={() => onExport('png')}
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" /> Download Banner
                    </button>
                  </div>
                  <code>
                    &lt;img src=&quot;./assets/banner.png&quot; alt=&quot;{config.title} Banner&quot; width=&quot;100%&quot; /&gt;
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Pinned Repositories Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-sm font-semibold font-sans ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Pinned Engineering Repositories
              </h3>
              <span className="text-xs text-slate-500 font-mono">Customize pins</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DEFAULT_PINNED_REPOS.map((repo) => (
                <div
                  key={repo.name}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all hover:border-cyan-500/50 ${
                    isDarkMode
                      ? 'border-[#30363d] bg-[#161b22] hover:bg-[#1c2128]'
                      : 'border-[#d0d7de] bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs font-bold text-cyan-400 hover:underline cursor-pointer">
                        {repo.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{repo.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 mt-2 border-t border-[#30363d]/40">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: repo.languageColor }}
                      />
                      <span>{repo.language}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 hover:text-cyan-400 cursor-pointer">
                        <Star className="w-3 h-3" />
                        <span>{repo.stars}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        <span>{repo.forks}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
