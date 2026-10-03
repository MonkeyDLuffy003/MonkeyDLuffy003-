import { BannerConfig, BannerTheme } from '../types';

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
}

export function createParticles(count: number, width: number, height: number, theme: BannerTheme): Particle[] {
  const particles: Particle[] = [];
  const colors = [theme.primaryGlow, theme.secondaryGlow, theme.accentGlow, '#ffffff', '#ef4444', '#f59e0b'];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.8 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.1,
      alpha: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulseSpeed: Math.random() * 0.05 + 0.02,
      pulsePhase: Math.random() * Math.PI * 2,
    });
  }
  return particles;
}

export function drawBanner(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  config: BannerConfig,
  theme: BannerTheme,
  particles: Particle[],
  time: number = 0
) {
  ctx.clearRect(0, 0, width, height);

  // 1. Deep Metallic Dark Laboratory Environment
  drawLaboratoryBackdrop(ctx, width, height, theme);

  // 2. Perspective sci-fi floor with runway lights
  drawLaboratoryFloor(ctx, width, height, theme);

  // 3. Volumetric Light Beams & Laboratory Gantries
  drawVolumetricLightShafts(ctx, width, height, theme, config.glowIntensity, time);

  // 4. Subtle Blueprints & Schematics
  if (config.showCircuitTraces) {
    drawCircuitTraces(ctx, width, height, theme, config.glowIntensity, time);
  }
  if (config.showBlueprintTurbine) {
    drawAerospaceTurbineSchematic(ctx, width * 0.14, height * 0.38, height * 0.36, theme, time);
  }
  if (config.showBlueprintNeuralNet) {
    drawNeuralNetworkSchematic(ctx, width * 0.5, height * 0.45, width * 0.28, height * 0.42, theme, time);
  }
  if (config.showBlueprintRobotics) {
    drawRoboticsBlueprint(ctx, width * 0.86, height * 0.38, height * 0.36, theme, time);
  }

  // 5. THE THREE CHARACTERS:
  // - LEFT: Iron Man / Tony Stark (Tech, Armor, Arc Reactor, Holographic AI)
  // - CENTER-LEFT: Monkey D. Luffy (Adventurous Anime Energy, Straw Hat, Freedom Aura)
  // - RIGHT: Prabhas (Powerful Cinematic Indian Hero, Rugged Exoskeleton, Movie-Poster Intensity)
  drawIronManCharacter(ctx, width, height, theme, config, time);
  drawLuffyCharacter(ctx, width, height, theme, config, time);
  drawPrabhasCharacter(ctx, width, height, theme, config, time);

  // 6. Atmospheric Fog & Mist
  if (config.fogDensity > 0) {
    drawAtmosphericFog(ctx, width, height, theme, config.fogDensity, time);
  }

  // 7. Floating Glowing Particles & Cyber Embers
  drawParticles(ctx, particles, width, height, time);

  // 8. Cinematic Vignette
  if (config.showVignette) {
    drawCinematicVignette(ctx, width, height);
  }

  // 9. Sci-Fi HUD Telemetry & Brackets
  if (config.showHudTelemetry) {
    drawHudTelemetry(ctx, width, height, theme, config);
  }

  // 10. Elegant Futuristic Typography: "A TEJA" & "AI • MECHANICAL • FUTURE"
  drawCinematicTypography(ctx, width, height, config, theme, time);
}

// --------------------------------------------------------------------------
// ENVIRONMENT & LIGHTING
// --------------------------------------------------------------------------

function drawLaboratoryBackdrop(ctx: CanvasRenderingContext2D, width: number, height: number, theme: BannerTheme) {
  // Deep obsidian metallic gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#020408');
  bgGrad.addColorStop(0.5, theme.bgMid);
  bgGrad.addColorStop(1, '#03060a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle metallic horizontal panel seams
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
  ctx.lineWidth = 1;
  for (let y = 0; y < height * 0.65; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Ceiling gantry trusses
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
  ctx.lineWidth = 2;
  ctx.strokeRect(width * 0.08, -10, width * 0.84, 50);
  for (let x = width * 0.1; x < width * 0.9; x += 90) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 45, 40);
    ctx.lineTo(x + 90, 0);
    ctx.stroke();
  }
  ctx.restore();
}

function drawLaboratoryFloor(ctx: CanvasRenderingContext2D, width: number, height: number, theme: BannerTheme) {
  const horizonY = height * 0.58;
  ctx.save();

  // Polished reflective dark floor
  const floorGrad = ctx.createLinearGradient(0, horizonY, 0, height);
  floorGrad.addColorStop(0, 'rgba(8, 14, 26, 0.7)');
  floorGrad.addColorStop(0.5, 'rgba(3, 6, 12, 0.95)');
  floorGrad.addColorStop(1, '#010204');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, horizonY, width, height - horizonY);

  // Perspective Grid Lines
  const vpX = width * 0.5;
  const vpY = horizonY - 60;
  ctx.lineWidth = 1;

  for (let x = -width * 0.3; x <= width * 1.3; x += width * 0.045) {
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
    ctx.beginPath();
    ctx.moveTo(vpX, vpY);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Horizontal floor depth markers
  for (let i = 1; i <= 8; i++) {
    const t = Math.pow(i / 8, 2);
    const lineY = horizonY + t * (height - horizonY);
    ctx.strokeStyle = `rgba(56, 189, 248, ${0.02 + t * 0.07})`;
    ctx.beginPath();
    ctx.moveTo(0, lineY);
    ctx.lineTo(width, lineY);
    ctx.stroke();
  }

  // Runway reflection strips
  const stripGrad = ctx.createLinearGradient(vpX - 60, horizonY, vpX + 60, horizonY);
  stripGrad.addColorStop(0, 'transparent');
  stripGrad.addColorStop(0.5, `${theme.primaryGlow}15`);
  stripGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = stripGrad;
  ctx.beginPath();
  ctx.moveTo(vpX - 25, horizonY);
  ctx.lineTo(vpX + 25, horizonY);
  ctx.lineTo(vpX + 140, height);
  ctx.lineTo(vpX - 140, height);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawVolumetricLightShafts(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  theme: BannerTheme,
  intensity: number,
  time: number
) {
  ctx.save();
  ctx.globalCompositeOperation = 'screen';

  // Three primary volumetric god rays illuminating the three heroes
  const rays = [
    { x: width * 0.2, color: '#38bdf8', angle: 0.15, width: 220 }, // Iron Man cyan spotlight
    { x: width * 0.44, color: '#f87171', angle: 0.04, width: 180 }, // Luffy crimson/amber spotlight
    { x: width * 0.78, color: '#f59e0b', angle: -0.16, width: 240 }, // Prabhas golden cinematic spotlight
  ];

  rays.forEach((ray, idx) => {
    const pulse = Math.sin(time * 0.0018 + idx * 1.5) * 0.15 + 0.85;
    const rayGrad = ctx.createRadialGradient(
      ray.x,
      -30,
      10,
      ray.x + ray.angle * height,
      height * 0.85,
      height * 0.75
    );
    rayGrad.addColorStop(0, `${ray.color}${Math.floor(0.18 * intensity * pulse * 255).toString(16).padStart(2, '0')}`);
    rayGrad.addColorStop(0.5, `${ray.color}${Math.floor(0.05 * intensity * pulse * 255).toString(16).padStart(2, '0')}`);
    rayGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = rayGrad;
    ctx.beginPath();
    ctx.moveTo(ray.x - 25, -20);
    ctx.lineTo(ray.x + 25, -20);
    ctx.lineTo(ray.x + ray.angle * height + ray.width, height);
    ctx.lineTo(ray.x + ray.angle * height - ray.width, height);
    ctx.closePath();
    ctx.fill();
  });

  ctx.restore();
}

function drawCircuitTraces(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  theme: BannerTheme,
  intensity: number,
  time: number
) {
  ctx.save();
  ctx.strokeStyle = `${theme.primaryGlow}18`;
  ctx.lineWidth = 1;
  ctx.shadowColor = theme.primaryGlow;
  ctx.shadowBlur = 4 * intensity;

  const traces = [
    [
      { x: 30, y: 35 },
      { x: 160, y: 35 },
      { x: 200, y: 75 },
      { x: 340, y: 75 },
      { x: 370, y: 45 },
      { x: 500, y: 45 },
    ],
    [
      { x: width - 30, y: 35 },
      { x: width - 160, y: 35 },
      { x: width - 200, y: 75 },
      { x: width - 340, y: 75 },
      { x: width - 370, y: 45 },
      { x: width - 500, y: 45 },
    ],
  ];

  traces.forEach((path) => {
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();

    path.forEach((pt, pIdx) => {
      if (pIdx === 0 || pIdx === path.length - 1 || pIdx % 2 === 0) {
        ctx.fillStyle = `${theme.primaryGlow}55`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  });

  // Animated data pulses
  const pulseT = (time * 0.0008) % 1;
  const pulseX = 30 + pulseT * 470;
  ctx.fillStyle = theme.accentGlow;
  ctx.beginPath();
  ctx.arc(pulseX, 35 + Math.sin(pulseT * 10) * 8, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawAerospaceTurbineSchematic(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  theme: BannerTheme,
  time: number
) {
  ctx.save();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
  ctx.lineWidth = 1;

  [0.25, 0.48, 0.72, 0.92, 1.0].forEach((rRatio) => {
    ctx.beginPath();
    ctx.arc(cx, cy, radius * rRatio, 0, Math.PI * 2);
    ctx.stroke();
  });

  const bladeCount = 16;
  const rotAngle = time * 0.0004;
  for (let i = 0; i < bladeCount; i++) {
    const angle = (i * Math.PI * 2) / bladeCount + rotAngle;
    const innerR = radius * 0.25;
    const outerR = radius * 0.88;

    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
    ctx.quadraticCurveTo(
      cx + Math.cos(angle + 0.28) * (innerR + outerR) * 0.5,
      cy + Math.sin(angle + 0.28) * (innerR + outerR) * 0.5,
      cx + Math.cos(angle + 0.14) * outerR,
      cy + Math.sin(angle + 0.14) * outerR
    );
    ctx.stroke();
  }

  ctx.font = '8px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
  ctx.fillText('AEROSPACE PROPULSION // BYPASS 12:1', cx - radius * 0.75, cy - radius * 0.95);
  ctx.restore();
}

function drawNeuralNetworkSchematic(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  boxWidth: number,
  boxHeight: number,
  theme: BannerTheme,
  time: number
) {
  ctx.save();
  const layerCounts = [3, 5, 6, 5, 3];
  const layerSpacing = boxWidth / (layerCounts.length - 1);
  const startX = cx - boxWidth * 0.5;

  const nodes: { x: number; y: number }[][] = [];
  layerCounts.forEach((count, lIdx) => {
    const lx = startX + lIdx * layerSpacing;
    const layerHeight = boxHeight * 0.6;
    const ySpacing = layerHeight / (count - 1);
    const startY = cy - layerHeight * 0.5;

    const layerNodes = [];
    for (let n = 0; n < count; n++) {
      layerNodes.push({ x: lx, y: startY + n * ySpacing });
    }
    nodes.push(layerNodes);
  });

  for (let l = 0; l < nodes.length - 1; l++) {
    nodes[l].forEach((n1, i) => {
      nodes[l + 1].forEach((n2, j) => {
        if ((i + j) % 2 === 0) {
          ctx.strokeStyle = `${theme.primaryGlow}15`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      });
    });
  }

  nodes.forEach((layer) => {
    layer.forEach((node) => {
      ctx.fillStyle = `${theme.primaryGlow}45`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  ctx.restore();
}

function drawRoboticsBlueprint(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  theme: BannerTheme,
  time: number
) {
  ctx.save();
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.22)';
  ctx.lineWidth = 1;

  const j1X = cx;
  const j1Y = cy + radius * 0.6;
  const j2X = j1X - radius * 0.45;
  const j2Y = j1Y - radius * 0.6;
  const j3X = j2X + radius * 0.55;
  const j3Y = j2Y - radius * 0.25;

  ctx.strokeRect(j1X - 30, j1Y, 60, 14);
  ctx.beginPath();
  ctx.arc(j1X, j1Y, 12, 0, Math.PI * 2);
  ctx.moveTo(j1X, j1Y);
  ctx.lineTo(j2X, j2Y);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(j2X, j2Y, 10, 0, Math.PI * 2);
  ctx.moveTo(j2X, j2Y);
  ctx.lineTo(j3X, j3Y);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(j3X, j3Y, 7, 0, Math.PI * 2);
  ctx.stroke();

  ctx.font = '8px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(245, 158, 11, 0.5)';
  ctx.fillText('6-DOF KINEMATICS // TORQUE 340Nm', cx - 70, cy + radius * 0.95);
  ctx.restore();
}

// --------------------------------------------------------------------------
// CHARACTER 1 (LEFT): IRON MAN / TONY STARK
// Futuristic technology, glowing arc-reactor chest lighting, advanced armor,
// holographic AI interfaces and mechanical engineering.
// --------------------------------------------------------------------------
function drawIronManCharacter(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  theme: BannerTheme,
  config: BannerConfig,
  time: number
) {
  ctx.save();
  const cx = width * 0.19;
  const cy = height * 0.62;
  const scale = height * 0.0013;

  ctx.translate(cx, cy);

  // Tech aura
  if (config.showCharacterAuras) {
    const aura = ctx.createRadialGradient(0, -scale * 110, 15, 0, -scale * 110, scale * 260);
    aura.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
    aura.addColorStop(0.5, 'rgba(239, 68, 68, 0.08)');
    aura.addColorStop(1, 'transparent');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(0, -scale * 110, scale * 260, 0, Math.PI * 2);
    ctx.fill();
  }

  // 1. Sleek Crimson & Gold Titanium Exoskeleton Armor Silhouette
  ctx.fillStyle = '#0a0d14';
  ctx.beginPath();
  ctx.moveTo(-scale * 55, scale * 150); // leg left
  ctx.lineTo(-scale * 35, scale * 20);  // waist
  ctx.lineTo(-scale * 68, -scale * 75); // shoulder pauldron left
  ctx.lineTo(-scale * 24, -scale * 105);// neck collar
  ctx.lineTo(scale * 24, -scale * 105);
  ctx.lineTo(scale * 68, -scale * 75);  // shoulder pauldron right
  ctx.lineTo(scale * 35, scale * 20);
  ctx.lineTo(scale * 55, scale * 150);  // leg right
  ctx.closePath();
  ctx.fill();

  // Crimson & Titanium Gold Plating Accents
  ctx.fillStyle = '#7f1d1d'; // Crimson primary
  ctx.beginPath();
  ctx.moveTo(-scale * 22, -scale * 100);
  ctx.lineTo(-scale * 62, -scale * 75);
  ctx.lineTo(-scale * 42, -scale * 20);
  ctx.lineTo(-scale * 15, -scale * 30);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(scale * 22, -scale * 100);
  ctx.lineTo(scale * 62, -scale * 75);
  ctx.lineTo(scale * 42, -scale * 20);
  ctx.lineTo(scale * 15, -scale * 30);
  ctx.closePath();
  ctx.fill();

  // Gold Titanium bevels on collar & chest
  ctx.fillStyle = '#b45309';
  ctx.fillRect(-scale * 20, -scale * 102, scale * 40, scale * 8);

  // 2. GLOWING ARC REACTOR IN CHEST
  const reactorY = -scale * 62;
  const pulse = Math.sin(time * 0.0035) * 0.15 + 0.85;

  ctx.save();
  ctx.translate(0, reactorY);

  // Arc reactor outer housing ring
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.5 * scale;
  ctx.shadowColor = '#00f2fe';
  ctx.shadowBlur = 18 * config.glowIntensity * pulse;
  ctx.beginPath();
  ctx.arc(0, 0, scale * 20, 0, Math.PI * 2);
  ctx.stroke();

  // Inner containment ring
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.2 * scale;
  ctx.beginPath();
  ctx.arc(0, 0, scale * 13, 0, Math.PI * 2);
  ctx.stroke();

  // Glowing blue fusion core
  const arcGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, scale * 12);
  arcGrad.addColorStop(0, '#ffffff');
  arcGrad.addColorStop(0.4, '#00f2fe');
  arcGrad.addColorStop(1, 'rgba(0, 242, 254, 0.2)');
  ctx.fillStyle = arcGrad;
  ctx.beginPath();
  ctx.arc(0, 0, scale * 12, 0, Math.PI * 2);
  ctx.fill();

  // Arc core triangular/octagonal energy nodes
  for (let a = 0; a < 8; a++) {
    const angle = (a * Math.PI) / 4 + time * 0.001;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * scale * 13, Math.sin(angle) * scale * 13);
    ctx.lineTo(Math.cos(angle) * scale * 19, Math.sin(angle) * scale * 19);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Futuristic Helmet & Glowing Visor Slits
  ctx.fillStyle = '#1c1917';
  ctx.fillRect(-scale * 14, -scale * 120, scale * 28, scale * 20);

  // Helmet outer shell (Crimson & Gold faceplate silhouette)
  ctx.fillStyle = '#991b1b';
  ctx.beginPath();
  ctx.moveTo(-scale * 20, -scale * 135);
  ctx.lineTo(-scale * 24, -scale * 162);
  ctx.lineTo(-scale * 14, -scale * 180);
  ctx.lineTo(scale * 14, -scale * 180);
  ctx.lineTo(scale * 24, -scale * 162);
  ctx.lineTo(scale * 20, -scale * 135);
  ctx.lineTo(0, -scale * 118); // chin apex
  ctx.closePath();
  ctx.fill();

  // Gold faceplate mask inlay
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.moveTo(-scale * 14, -scale * 132);
  ctx.lineTo(-scale * 18, -scale * 155);
  ctx.lineTo(0, -scale * 170);
  ctx.lineTo(scale * 18, -scale * 155);
  ctx.lineTo(scale * 14, -scale * 132);
  ctx.lineTo(0, -scale * 120);
  ctx.closePath();
  ctx.fill();

  // Luminous Eye Slits (Bright white/cyan optic sensors)
  const visorY = -scale * 146;
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#00f2fe';
  ctx.shadowBlur = 10 * config.glowIntensity;

  // Left eye slit
  ctx.beginPath();
  ctx.moveTo(-scale * 14, visorY - scale * 2);
  ctx.lineTo(-scale * 4, visorY - scale * 1);
  ctx.lineTo(-scale * 5, visorY + scale * 1);
  ctx.lineTo(-scale * 13, visorY);
  ctx.closePath();
  ctx.fill();

  // Right eye slit
  ctx.beginPath();
  ctx.moveTo(scale * 4, visorY - scale * 1);
  ctx.lineTo(scale * 14, visorY - scale * 2);
  ctx.lineTo(scale * 13, visorY);
  ctx.lineTo(scale * 5, visorY + scale * 1);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;

  // 4. Raised Gauntlet with Glowing Palm Repulsor
  const repulsorX = -scale * 75;
  const repulsorY = -scale * 15;
  ctx.save();
  ctx.translate(repulsorX, repulsorY);

  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(-scale * 12, -scale * 20, scale * 24, scale * 40);

  // Palm repulsor node
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5 * scale;
  ctx.shadowColor = '#00f2fe';
  ctx.shadowBlur = 12 * config.glowIntensity;
  ctx.beginPath();
  ctx.arc(0, 0, scale * 9, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, scale * 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 5. Floating Cyan Holographic AI Interfaces (J.A.R.V.I.S. style)
  drawJarvisHoloInterface(ctx, -scale * 60, -scale * 90, scale, theme, time);

  // Label
  ctx.font = '700 9px "Orbitron", sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.textAlign = 'center';
  ctx.fillText('01 // IRON MAN • TECH', 0, scale * 170);
  ctx.font = '500 8px "JetBrains Mono", monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('AI ARCHITECT • MECHANICAL CAD', 0, scale * 184);

  ctx.restore();
}

function drawJarvisHoloInterface(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  theme: BannerTheme,
  time: number
) {
  ctx.save();
  ctx.translate(x, y + Math.sin(time * 0.002) * 5);

  ctx.strokeStyle = 'rgba(0, 242, 254, 0.6)';
  ctx.lineWidth = 1;
  ctx.shadowColor = '#00f2fe';
  ctx.shadowBlur = 6;

  // Arc HUD Ring
  ctx.beginPath();
  ctx.arc(0, 0, scale * 34, -0.8, 1.8);
  ctx.stroke();

  // Secondary dashed ring
  ctx.setLineDash([3, 4]);
  ctx.beginPath();
  ctx.arc(0, 0, scale * 40, -1.2, 0.9);
  ctx.stroke();
  ctx.setLineDash([]);

  // Telemetry code
  ctx.font = '7px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(0, 242, 254, 0.85)';
  ctx.textAlign = 'left';
  ctx.fillText('JARVIS // MK-85', -scale * 28, -scale * 14);
  ctx.fillText('ARMOR INTEGRITY: 100%', -scale * 28, -scale * 4);
  ctx.fillText('ARC OUTPUT: 12.4 GW', -scale * 28, scale * 6);

  ctx.restore();
}

// --------------------------------------------------------------------------
// CHARACTER 2 (CENTER-LEFT): MONKEY D. LUFFY (ONE PIECE)
// Adventurous anime energy, determination, freedom, iconic pirate presence,
// straw hat, red vest, fearless grin, golden/crimson freedom energy aura.
// --------------------------------------------------------------------------
function drawLuffyCharacter(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  theme: BannerTheme,
  config: BannerConfig,
  time: number
) {
  ctx.save();
  const cx = width * 0.42;
  const cy = height * 0.63;
  const scale = height * 0.00128;

  ctx.translate(cx, cy);

  // Conqueror's Freedom Aura (Golden & Crimson Sparks)
  if (config.showCharacterAuras) {
    const luffyAura = ctx.createRadialGradient(0, -scale * 115, 20, 0, -scale * 115, scale * 250);
    luffyAura.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
    luffyAura.addColorStop(0.4, 'rgba(251, 191, 36, 0.12)');
    luffyAura.addColorStop(1, 'transparent');
    ctx.fillStyle = luffyAura;
    ctx.beginPath();
    ctx.arc(0, -scale * 115, scale * 250, 0, Math.PI * 2);
    ctx.fill();

    // Crackling freedom lightning embers around Luffy
    const emberCount = 5;
    for (let e = 0; e < emberCount; e++) {
      const eAngle = time * 0.003 + (e * Math.PI * 2) / emberCount;
      const ex = Math.cos(eAngle) * scale * 75;
      const ey = -scale * 100 + Math.sin(eAngle * 1.5) * scale * 60;
      ctx.fillStyle = '#fbbf24';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // 1. Body Silhouette: Athletic Anime Stance, Open Crimson Vest & Blue Denim / Tech shorts
  ctx.fillStyle = '#080c14';
  ctx.beginPath();
  ctx.moveTo(-scale * 45, scale * 150); // left leg
  ctx.lineTo(-scale * 28, scale * 15);  // waist
  ctx.lineTo(-scale * 48, -scale * 70); // shoulder left
  ctx.lineTo(-scale * 16, -scale * 95); // neck left
  ctx.lineTo(scale * 16, -scale * 95);  // neck right
  ctx.lineTo(scale * 48, -scale * 70);  // shoulder right
  ctx.lineTo(scale * 28, scale * 15);
  ctx.lineTo(scale * 45, scale * 150);  // right leg
  ctx.closePath();
  ctx.fill();

  // Iconic Open Sleeveless Red Vest
  ctx.fillStyle = '#dc2626';
  // Left vest flap
  ctx.beginPath();
  ctx.moveTo(-scale * 16, -scale * 95);
  ctx.lineTo(-scale * 48, -scale * 70);
  ctx.lineTo(-scale * 38, scale * 10);
  ctx.lineTo(-scale * 18, scale * 10);
  ctx.lineTo(-scale * 14, -scale * 50);
  ctx.closePath();
  ctx.fill();

  // Right vest flap
  ctx.beginPath();
  ctx.moveTo(scale * 16, -scale * 95);
  ctx.lineTo(scale * 48, -scale * 70);
  ctx.lineTo(scale * 38, scale * 10);
  ctx.lineTo(scale * 18, scale * 10);
  ctx.lineTo(scale * 14, -scale * 50);
  ctx.closePath();
  ctx.fill();

  // Sculpted Torso & Iconic X-Scar Across Chest
  ctx.fillStyle = '#273142'; // Torso skin tone in sci-fi lab lighting
  ctx.beginPath();
  ctx.moveTo(-scale * 14, -scale * 85);
  ctx.lineTo(scale * 14, -scale * 85);
  ctx.lineTo(scale * 16, scale * 10);
  ctx.lineTo(-scale * 16, scale * 10);
  ctx.closePath();
  ctx.fill();

  // Subtle X-Scar
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2 * scale;
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 4;
  ctx.beginPath();
  ctx.moveTo(-scale * 14, -scale * 65);
  ctx.lineTo(scale * 14, -scale * 35);
  ctx.moveTo(scale * 14, -scale * 65);
  ctx.lineTo(-scale * 14, -scale * 35);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Yellow Sash around waist
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(-scale * 28, scale * 10, scale * 56, scale * 12);

  // 2. Head, Messy Anime Hair, Fearless Confident Grin
  // Neck
  ctx.fillStyle = '#1e2838';
  ctx.fillRect(-scale * 12, -scale * 115, scale * 24, scale * 22);

  // Face outline
  ctx.fillStyle = '#263449';
  ctx.beginPath();
  ctx.moveTo(-scale * 16, -scale * 125);
  ctx.lineTo(-scale * 12, -scale * 95);
  ctx.lineTo(0, -scale * 82); // chin
  ctx.lineTo(scale * 12, -scale * 95);
  ctx.lineTo(scale * 16, -scale * 125);
  ctx.closePath();
  ctx.fill();

  // Iconic Big Fearless Anime Grin (Wide teeth smile)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, -scale * 92, scale * 11, 0.1, Math.PI - 0.1, false);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2 * scale;
  ctx.stroke();

  // Anime Eyes (Wide, expressive, fearless round eyes)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-scale * 11, -scale * 112, scale * 7, scale * 6);
  ctx.fillRect(scale * 4, -scale * 112, scale * 7, scale * 6);

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(-scale * 7.5, -scale * 109, scale * 2.5, 0, Math.PI * 2);
  ctx.arc(scale * 7.5, -scale * 109, scale * 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Small eye scar under left eye
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2 * scale;
  ctx.beginPath();
  ctx.moveTo(-scale * 11, -scale * 102);
  ctx.lineTo(-scale * 5, -scale * 102);
  ctx.stroke();

  // Spiky Messy Black Anime Hair
  ctx.fillStyle = '#06090e';
  ctx.beginPath();
  ctx.moveTo(-scale * 20, -scale * 120);
  ctx.lineTo(-scale * 32, -scale * 138);
  ctx.lineTo(-scale * 22, -scale * 132);
  ctx.lineTo(-scale * 34, -scale * 155);
  ctx.lineTo(-scale * 18, -scale * 148);
  ctx.lineTo(-scale * 14, -scale * 170);
  ctx.lineTo(0, -scale * 152);
  ctx.lineTo(scale * 14, -scale * 170);
  ctx.lineTo(scale * 18, -scale * 148);
  ctx.lineTo(scale * 34, -scale * 155);
  ctx.lineTo(scale * 22, -scale * 132);
  ctx.lineTo(scale * 32, -scale * 138);
  ctx.lineTo(scale * 20, -scale * 120);
  ctx.closePath();
  ctx.fill();

  // 3. ICONIC STRAW HAT WITH RED RIBBON
  // Tilted stylishly on head / back with wide circular brim
  const hatY = -scale * 162;
  ctx.save();
  ctx.translate(0, hatY);
  ctx.rotate(-0.06);

  // Straw Hat Wide Brim (Golden yellow)
  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.ellipse(0, 0, scale * 52, scale * 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hat texture weave
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1 * scale;
  ctx.stroke();

  // Hat Dome / Crown
  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.ellipse(0, -scale * 14, scale * 26, scale * 18, 0, Math.PI, 0);
  ctx.fill();
  ctx.stroke();

  // Iconic Red Ribbon Band
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(-scale * 26, -scale * 14, scale * 52, scale * 7);

  // Hat string lanyard around neck
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.2 * scale;
  ctx.beginPath();
  ctx.moveTo(-scale * 30, scale * 5);
  ctx.quadraticCurveTo(0, scale * 45, scale * 30, scale * 5);
  ctx.stroke();

  ctx.restore();

  // Rim lighting on Luffy
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 1.5 * scale;
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 6;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Label
  ctx.font = '700 9px "Orbitron", sans-serif';
  ctx.fillStyle = '#f87171';
  ctx.textAlign = 'center';
  ctx.fillText('02 // LUFFY • FREEDOM', 0, scale * 170);
  ctx.font = '500 8px "JetBrains Mono", monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('DETERMINATION • BOUNDLESS CREATIVITY', 0, scale * 184);

  ctx.restore();
}

// --------------------------------------------------------------------------
// CHARACTER 3 (RIGHT): PRABHAS
// Powerful cinematic Indian hero presence (inspired by Kalki 2898 AD /
// Salaar / Baahubali), rugged masculine styling, chiseled beard, intense gaze,
// tactical sci-fi exo-harness, magnetic movie-poster power and discipline.
// --------------------------------------------------------------------------
function drawPrabhasCharacter(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  theme: BannerTheme,
  config: BannerConfig,
  time: number
) {
  ctx.save();
  const cx = width * 0.77;
  const cy = height * 0.61;
  const scale = height * 0.00135; // Towering, commanding heroic stature

  ctx.translate(cx, cy);

  // Cinematic Solar / Amber Power Halo
  if (config.showCharacterAuras) {
    const prabhasHalo = ctx.createRadialGradient(0, -scale * 115, 20, 0, -scale * 115, scale * 270);
    prabhasHalo.addColorStop(0, 'rgba(245, 158, 11, 0.28)');
    prabhasHalo.addColorStop(0.5, 'rgba(217, 119, 6, 0.1)');
    prabhasHalo.addColorStop(1, 'transparent');
    ctx.fillStyle = prabhasHalo;
    ctx.beginPath();
    ctx.arc(0, -scale * 115, scale * 270, 0, Math.PI * 2);
    ctx.fill();
  }

  // 1. Broad, Imposing Muscular Silhouette & Tactical Cyber-Techwear
  ctx.fillStyle = '#06090e';
  ctx.beginPath();
  ctx.moveTo(-scale * 60, scale * 155); // leg left
  ctx.lineTo(-scale * 42, scale * 15);  // waist
  ctx.lineTo(-scale * 72, -scale * 75); // broad commanding shoulder left
  ctx.lineTo(-scale * 26, -scale * 100);// collar
  ctx.lineTo(scale * 26, -scale * 100);
  ctx.lineTo(scale * 72, -scale * 75);  // broad commanding shoulder right
  ctx.lineTo(scale * 42, scale * 15);
  ctx.lineTo(scale * 60, scale * 155);  // leg right
  ctx.closePath();
  ctx.fill();

  // Heavy Tactical Exoskeleton Harness & Metallic Armored Braces (Kalki 2898 AD / Sci-Fi style)
  ctx.fillStyle = '#151c28';
  ctx.beginPath();
  ctx.moveTo(-scale * 30, -scale * 70);
  ctx.lineTo(scale * 30, -scale * 70);
  ctx.lineTo(scale * 24, scale * 10);
  ctx.lineTo(-scale * 24, scale * 10);
  ctx.closePath();
  ctx.fill();

  // Amber conduits and carbon harness straps
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.2 * scale;
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 8 * config.glowIntensity;
  ctx.beginPath();
  ctx.moveTo(-scale * 50, -scale * 70);
  ctx.lineTo(scale * 16, scale * 15);
  ctx.moveTo(scale * 50, -scale * 70);
  ctx.lineTo(-scale * 16, scale * 15);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Heavy Aerospace Gauntlet on Right Forearm
  const gauntletX = scale * 68;
  const gauntletY = -scale * 5;
  ctx.save();
  ctx.translate(gauntletX, gauntletY);
  ctx.fillStyle = '#1c2433';
  ctx.fillRect(-scale * 14, -scale * 32, scale * 28, scale * 65);

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.8 * scale;
  ctx.strokeRect(-scale * 14, -scale * 32, scale * 28, scale * 65);

  // Glowing amber power core cell
  ctx.fillStyle = '#fbbf24';
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(0, 0, scale * 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();

  // 2. Head: Chiseled Indian Action Hero, Rugged Groomed Beard, Intense Gaze
  // Muscular neck
  ctx.fillStyle = '#1f2736';
  ctx.fillRect(-scale * 16, -scale * 115, scale * 32, scale * 26);

  // Biometric tactical collar
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5 * scale;
  ctx.strokeRect(-scale * 18, -scale * 98, scale * 36, scale * 6);

  // Sculpted Masculine Jawline & Chiseled Chin
  ctx.fillStyle = '#252f40';
  ctx.beginPath();
  ctx.moveTo(-scale * 20, -scale * 125);
  ctx.lineTo(-scale * 16, -scale * 98);
  ctx.lineTo(0, -scale * 82); // pronounced chiseled jaw
  ctx.lineTo(scale * 16, -scale * 98);
  ctx.lineTo(scale * 20, -scale * 125);
  ctx.closePath();
  ctx.fill();

  // Signature Groomed Rugged Beard & Mustache (Prabhas aesthetic)
  ctx.fillStyle = '#080c12';
  ctx.beginPath();
  ctx.moveTo(-scale * 18, -scale * 105);
  ctx.lineTo(-scale * 12, -scale * 87);
  ctx.lineTo(0, -scale * 81);
  ctx.lineTo(scale * 12, -scale * 87);
  ctx.lineTo(scale * 18, -scale * 105);
  ctx.lineTo(scale * 14, -scale * 98);
  ctx.lineTo(0, -scale * 88);
  ctx.lineTo(-scale * 14, -scale * 98);
  ctx.closePath();
  ctx.fill();

  // Intense, Piercing Action Hero Eyes (Focused discipline and calm power)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-scale * 11, -scale * 118, scale * 7, scale * 3);
  ctx.fillRect(scale * 4, -scale * 118, scale * 7, scale * 3);

  // Golden-amber magnetic iris reflection
  ctx.fillStyle = '#f59e0b';
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 6;
  ctx.beginPath();
  ctx.arc(-scale * 7.5, -scale * 116.5, scale * 1.8, 0, Math.PI * 2);
  ctx.arc(scale * 7.5, -scale * 116.5, scale * 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Prominent brow line
  ctx.strokeStyle = '#05070a';
  ctx.lineWidth = 2 * scale;
  ctx.beginPath();
  ctx.moveTo(-scale * 14, -scale * 122);
  ctx.lineTo(-scale * 2, -scale * 120);
  ctx.moveTo(scale * 2, -scale * 120);
  ctx.lineTo(scale * 14, -scale * 122);
  ctx.stroke();

  // Styled Modern Swept-Back Action Hero Hair (High volume, dynamic silhouette)
  ctx.fillStyle = '#06080c';
  ctx.beginPath();
  ctx.moveTo(-scale * 21, -scale * 124);
  ctx.lineTo(-scale * 24, -scale * 148);
  ctx.lineTo(-scale * 14, -scale * 168);
  ctx.lineTo(scale * 4, -scale * 172);
  ctx.lineTo(scale * 20, -scale * 165);
  ctx.lineTo(scale * 24, -scale * 145);
  ctx.lineTo(scale * 21, -scale * 124);
  ctx.closePath();
  ctx.fill();

  // Dramatic Golden Rim Light along hair, shoulder and jaw
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.2 * scale;
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 10 * config.glowIntensity;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Label
  ctx.font = '700 9px "Orbitron", sans-serif';
  ctx.fillStyle = '#f59e0b';
  ctx.textAlign = 'center';
  ctx.fillText('03 // PRABHAS • CINEMATIC POWER', 0, scale * 170);
  ctx.font = '500 8px "JetBrains Mono", monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('IRON DISCIPLINE • LARGER-THAN-LIFE AMBITION', 0, scale * 184);

  ctx.restore();
}

// --------------------------------------------------------------------------
// ATMOSPHERE, PARTICLES & VIGNETTE
// --------------------------------------------------------------------------

function drawAtmosphericFog(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  theme: BannerTheme,
  density: number,
  time: number
) {
  ctx.save();
  ctx.globalCompositeOperation = 'screen';

  const fogY = height * 0.72;
  const fogGrad = ctx.createLinearGradient(0, fogY, 0, height);
  const alphaHex = Math.floor(density * 45).toString(16).padStart(2, '0');
  fogGrad.addColorStop(0, 'transparent');
  fogGrad.addColorStop(0.5, `${theme.secondaryGlow}${alphaHex}`);
  fogGrad.addColorStop(1, `${theme.primaryGlow}${Math.floor(density * 55).toString(16).padStart(2, '0')}`);

  ctx.fillStyle = fogGrad;
  ctx.fillRect(0, fogY, width, height - fogY);

  ctx.restore();
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  ctx.globalCompositeOperation = 'screen';

  particles.forEach((p) => {
    p.y += p.speedY;
    p.x += p.speedX + Math.sin(time * 0.001 + p.pulsePhase) * 0.15;

    if (p.y < 0) p.y = height;
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;

    const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.3 + 0.7;
    const alpha = p.alpha * pulse;

    ctx.fillStyle = p.color;
    ctx.globalAlpha = alpha;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = p.size * 3;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

function drawCinematicVignette(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const radius = Math.max(width, height) * 0.7;
  const vigGrad = ctx.createRadialGradient(width * 0.5, height * 0.5, radius * 0.42, width * 0.5, height * 0.5, radius);
  vigGrad.addColorStop(0, 'transparent');
  vigGrad.addColorStop(0.75, 'rgba(0, 0, 0, 0.5)');
  vigGrad.addColorStop(1, 'rgba(0, 0, 0, 0.92)');

  ctx.fillStyle = vigGrad;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawHudTelemetry(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  theme: BannerTheme,
  config: BannerConfig
) {
  ctx.save();
  const pad = 36;
  const bracketLen = 28;

  ctx.strokeStyle = `${theme.primaryGlow}50`;
  ctx.lineWidth = 1.5;

  // Four corner brackets
  ctx.beginPath();
  ctx.moveTo(pad + bracketLen, pad);
  ctx.lineTo(pad, pad);
  ctx.lineTo(pad, pad + bracketLen);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(width - pad - bracketLen, pad);
  ctx.lineTo(width - pad, pad);
  ctx.lineTo(width - pad, pad + bracketLen);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(pad, height - pad - bracketLen);
  ctx.lineTo(pad, height - pad);
  ctx.lineTo(pad + bracketLen, height - pad);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(width - pad - bracketLen, height - pad);
  ctx.lineTo(width - pad, height - pad);
  ctx.lineTo(width - pad, height - pad - bracketLen);
  ctx.stroke();

  // Telemetry labels
  ctx.font = '600 10px "JetBrains Mono", monospace';
  ctx.fillStyle = `${theme.primaryGlow}88`;

  ctx.textAlign = 'left';
  ctx.fillText('SYS.CROSSOVER // TRINITY PROTOCOL', pad + 38, pad + 10);
  ctx.fillText(`LOC // ${config.coordinateText || '13.0827° N, 80.2707° E'}`, pad + 38, pad + 24);

  ctx.textAlign = 'right';
  ctx.fillText(`STATUS // ${config.systemStatus || 'ALL SYSTEMS OPTIMAL'}`, width - pad - 38, pad + 10);
  ctx.fillText('GITHUB PROFILE MATRIX // SYNCHRONIZED', width - pad - 38, pad + 24);

  // Bottom badges
  if (config.customBadges && config.customBadges.length > 0) {
    ctx.textAlign = 'left';
    let badgeX = pad + 38;
    const badgeY = height - pad - 12;

    config.customBadges.forEach((badge) => {
      ctx.font = '700 9px "JetBrains Mono", monospace';
      const textWidth = ctx.measureText(badge).width;
      const pillWidth = textWidth + 16;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.strokeStyle = `${theme.primaryGlow}40`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY - 14, pillWidth, 18, 4);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = theme.textColor;
      ctx.fillText(badge, badgeX + 8, badgeY);

      badgeX += pillWidth + 8;
    });
  }

  ctx.restore();
}

// --------------------------------------------------------------------------
// ELEGANT FUTURISTIC TYPOGRAPHY (CLEAN NEGATIVE SPACE AT TOP/CENTER)
// --------------------------------------------------------------------------
function drawCinematicTypography(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  config: BannerConfig,
  theme: BannerTheme,
  time: number
) {
  ctx.save();
  const centerX = width * 0.5;

  // Clean negative space placed at the top-center
  const textCenterY = height * 0.22;

  // 1. Subtle glowing dark backdrop to guarantee 100% legibility over any background
  const textPlateGrad = ctx.createRadialGradient(
    centerX,
    textCenterY,
    10,
    centerX,
    textCenterY,
    width * 0.32
  );
  textPlateGrad.addColorStop(0, 'rgba(2, 4, 8, 0.85)');
  textPlateGrad.addColorStop(0.7, 'rgba(2, 4, 8, 0.45)');
  textPlateGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = textPlateGrad;
  ctx.fillRect(centerX - width * 0.35, textCenterY - 70, width * 0.7, 140);

  // 2. Micro-Overline
  ctx.font = '700 10px "JetBrains Mono", monospace';
  ctx.letterSpacing = '6px';
  ctx.fillStyle = `${theme.primaryGlow}cc`;
  ctx.textAlign = 'center';
  ctx.fillText('AI BUILDER • MECHANICAL RESEARCHER', centerX, textCenterY - 42);

  // 3. MAIN TITLE: "A TEJA"
  const titleText = config.title || 'A TEJA';
  const titleSize = height >= 800 ? 58 : Math.floor(height * 0.12);

  ctx.font = `900 ${titleSize}px "Orbitron", sans-serif`;
  ctx.letterSpacing = '12px';

  // Titanium gradient for "A TEJA"
  const textGrad = ctx.createLinearGradient(0, textCenterY - titleSize * 0.5, 0, textCenterY + titleSize * 0.5);
  textGrad.addColorStop(0, '#ffffff');
  textGrad.addColorStop(0.4, theme.textColor);
  textGrad.addColorStop(0.7, '#cbd5e1');
  textGrad.addColorStop(1, theme.primaryGlow);

  ctx.fillStyle = textGrad;
  ctx.shadowColor = theme.primaryGlow;
  ctx.shadowBlur = 18 * config.glowIntensity;
  ctx.textAlign = 'center';
  ctx.fillText(titleText, centerX, textCenterY + 12);
  ctx.shadowBlur = 0;

  // 4. Laser Underline divider with center diamond
  const lineHalfLen = width * 0.18;
  const lineY = textCenterY + 28;

  const lineGradLeft = ctx.createLinearGradient(centerX - lineHalfLen, lineY, centerX, lineY);
  lineGradLeft.addColorStop(0, 'transparent');
  lineGradLeft.addColorStop(1, theme.primaryGlow);
  ctx.strokeStyle = lineGradLeft;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(centerX - lineHalfLen, lineY);
  ctx.lineTo(centerX - 12, lineY);
  ctx.stroke();

  const lineGradRight = ctx.createLinearGradient(centerX, lineY, centerX + lineHalfLen, lineY);
  lineGradRight.addColorStop(0, theme.primaryGlow);
  lineGradRight.addColorStop(1, 'transparent');
  ctx.strokeStyle = lineGradRight;
  ctx.beginPath();
  ctx.moveTo(centerX + 12, lineY);
  ctx.lineTo(centerX + lineHalfLen, lineY);
  ctx.stroke();

  // Center glowing diamond
  ctx.fillStyle = theme.accentGlow;
  ctx.shadowColor = theme.accentGlow;
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.moveTo(centerX, lineY - 3.5);
  ctx.lineTo(centerX + 4, lineY);
  ctx.lineTo(centerX, lineY + 3.5);
  ctx.lineTo(centerX - 4, lineY);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;

  // 5. SUBTITLE: "AI • MECHANICAL • FUTURE"
  const subText = config.subtitle || 'AI • MECHANICAL • FUTURE';
  ctx.font = '600 13px "Rajdhani", sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillStyle = '#f8fafc';
  ctx.shadowColor = theme.primaryGlow;
  ctx.shadowBlur = 6 * config.glowIntensity;
  ctx.fillText(subText, centerX, lineY + 24);
  ctx.shadowBlur = 0;

  // 6. Optional tagline
  if (config.tagline) {
    ctx.font = '400 9px "JetBrains Mono", monospace';
    ctx.letterSpacing = '3px';
    ctx.fillStyle = `${theme.primaryGlow}99`;
    ctx.fillText(config.tagline.toUpperCase(), centerX, lineY + 40);
  }

  ctx.restore();
}
