import confetti from 'canvas-confetti';
import { BannerConfig } from '../types';

export function downloadCanvasImage(
  canvas: HTMLCanvasElement,
  filename: string,
  format: 'png' | 'webp' = 'png',
  quality: number = 0.95
) {
  const mimeType = format === 'webp' ? 'image/webp' : 'image/png';
  const dataUrl = canvas.toDataURL(mimeType, quality);

  const link = document.createElement('a');
  link.download = `${filename}.${format}`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Trigger celebratory confetti
  confetti({
    particleCount: 60,
    spread: 70,
    origin: { y: 0.7 },
    colors: ['#00f2fe', '#38bdf8', '#f59e0b', '#ffd200', '#ffffff'],
  });
}

export function generateReadmeMarkdown(config: BannerConfig): string {
  const badgesList = config.customBadges
    .map(
      (b) =>
        `![${b}](https://img.shields.io/badge/${encodeURIComponent(b)}-090d16?style=for-the-badge&logoColor=00f2fe&labelColor=04070d)`
    )
    .join(' ');

  return `<!-- ========================================== -->
<!-- A TEJA - GITHUB DEVELOPER PROFILE BANNER   -->
<!-- ========================================== -->

<div align="center">
  <img src="./assets/banner.png" alt="${config.title} — ${config.subtitle}" width="100%" />
</div>

<div align="center">

# ${config.title}
### ${config.subtitle}

${badgesList ? `${badgesList}\n\n` : ''}
> *Bridging autonomous intelligence, advanced robotics, and next-generation aerospace mechanics.*

[ 🚀 Pinned Projects ](#-featured-projects) &nbsp;•&nbsp; [ 🔬 Research ](#-research-domains) &nbsp;•&nbsp; [ 🛠 Tech Stack ](#-engineering-arsenal) &nbsp;•&nbsp; [ 📬 Connect ](#-connect)

</div>

---

### 🔬 Core Specializations

| Domain | Focus Areas | Key Tooling |
| :--- | :--- | :--- |
| **Artificial Intelligence** | Generative CAD, PINNs, Reinforcement Learning, Computer Vision | PyTorch, JAX, TensorRT, CUDA |
| **Mechanical Engineering** | Topology Optimization, Kinematics, FEA, CFD Dynamics | SolidWorks, ANSYS, ROS2, MATLAB |
| **Futuristic Research** | Hypersonic Aerodynamics, High-Temp Ceramics, Swarm Robotics | Julia, Rust, C++, Gazebo |

---

<div align="center">
  <sub>Generated with A TEJA Cinematic Banner Studio • ${config.coordinateText || '13.0827° N, 80.2707° E'}</sub>
</div>
`;
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  } else {
    // Fallback
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return Promise.resolve(true);
    } catch {
      document.body.removeChild(textArea);
      return Promise.resolve(false);
    }
  }
}
