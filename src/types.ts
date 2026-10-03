export type BannerThemeId = 'cyber-quantum' | 'stark-titanium' | 'solar-vanguard' | 'neon-ronin' | 'stealth-monolith';

export interface BannerTheme {
  id: BannerThemeId;
  name: string;
  description: string;
  primaryGlow: string;
  secondaryGlow: string;
  accentGlow: string;
  textColor: string;
  bgDark: string;
  bgMid: string;
  rimColorLeft: string;
  rimColorCenter: string;
  rimColorRight: string;
}

export type AspectRatioId = '3:1' | '16:9' | '4:1' | '3:1-compact';

export interface AspectRatioOption {
  id: AspectRatioId;
  label: string;
  width: number;
  height: number;
  description: string;
}

export interface BannerConfig {
  title: string;
  subtitle: string;
  tagline: string;
  themeId: BannerThemeId;
  aspectRatio: AspectRatioId;
  glowIntensity: number; // 0.2 to 1.5
  fogDensity: number; // 0 to 1
  particleCount: number; // 0 to 150
  showBlueprintTurbine: boolean;
  showBlueprintRobotics: boolean;
  showBlueprintNeuralNet: boolean;
  showCircuitTraces: boolean;
  showHudTelemetry: boolean;
  showCharacterAuras: boolean;
  showVignette: boolean;
  typographyStyle: 'futuristic-bold' | 'minimal-clean' | 'cyber-hud' | 'cinematic-serif';
  customBadges: string[];
  systemStatus: string;
  coordinateText: string;
}

export interface PinnedRepo {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  tags: string[];
}
