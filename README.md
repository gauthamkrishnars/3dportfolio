# 🚀 Gautham Krishna R S — Interactive 3D Portfolio

[![AWS Architecture](https://img.shields.io/badge/AWS-Amplify%20%7C%20CloudFront%20%7C%20S3-FF9900?logo=amazon-aws&logoColor=white)](https://aws.amazon.com)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL%203D-black?logo=three.js)](https://threejs.org)
[![React Three Fiber](https://img.shields.io/badge/R3F-React%20Three%20Fiber-478CBF?logo=react)](https://docs.pmnd.rs/react-three-fiber)
[![Vite](https://img.shields.io/badge/Bundled%20with-Vite-646CFF?logo=vite)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

> **Built for the AWS SCTCE Portfolio Hackathon**  
> An immersive, high-performance 3D portfolio that bridges cutting-edge WebGL aesthetics with production-grade AWS cloud architecture.

---

## 🌟 Overview & Highlights

This project showcases a creative developer portfolio featuring an interactive, scroll-driven 3D avatar experience. As you navigate the site, the 3D scene responds kinetically to scroll depth, camera choreography, and section milestones.

### ✨ Key Features

1. **Photorealistic 3D Avatar & Reactive Kinematics**
   - High-fidelity 3D PBR mesh with custom PBR shading, ambient occlusion, and reflection mapping (`/models/gautham_pbr.glb`).
   - Dynamic, scroll-linked rotation matrix that naturally turns the avatar's gaze towards resume milestones (SCTCE, College Bunker, AWS Cloud Architecture).

2. **Scroll-Driven Sunglasses Flight Trajectory**
   - High-fashion sunglasses (`stylish_modern_high_quality_sunglasses.glb`) calibrated to the avatar's facial landmarks.
   - Custom easing curve where sunglasses lift off the bridge and ascend out of the viewport on initial scroll, smoothly revealing the clean portrait beneath.

3. **Standalone Dual-Mode 3D Inspector (`AvatarViewer.jsx`)**
   - Modular React Three Fiber canvas component with `@react-three/drei`.
   - Real-time parameter tuning with Leva controls (X/Y/Z offsets, scale).
   - High-contrast interactive UI overlay to switch between PBR material environment lighting and unlit/shaded modes.

4. **Production Web Performance**
   - 60 FPS smooth rendering loop using WebGL hardware acceleration.
   - Zero sticker artifacts on the avatar mesh.
   - Responsive layout adapting gracefully from ultra-wide monitors down to mobile viewports.

---

## ☁️ AWS Cloud Architecture

Engineered following the AWS Well-Architected Framework for maximum reliability, speed, and cost efficiency:

```
[ Developer / Git Push ]
           │
           ▼
   [ AWS Amplify CI/CD ]
           │
     ┌─────┴──────────────┐
     ▼                    ▼
[ Amazon S3 ]    [ CloudFront CDN ] ──► [ Global Edge Cache (<30ms TTFB) ]
(Static Assets   (SSL/TLS Termination,               │
 & 3D GLBs)       HTTP/3, Edge Routing)               ▼
                                              [ End User Browser ]
```

- **AWS Amplify Hosting**: Continuous deployment triggered on every push to the `main` branch.
- **Amazon CloudFront**: Global content distribution network delivering static 3D GLB bundles, scripts, and media with ultra-low latency.
- **Amazon S3**: High-durability object storage for multi-megabyte 3D binary assets with cache-control headers.
- **Amazon Route 53**: Scalable DNS management with custom domain mapping and automatic ACM certificate management.

---

## 🛠️ Tech Stack

- **Core Frameworks**: React 18, React Three Fiber (R3F), Three.js
- **3D Tooling & Controls**: `@react-three/drei`, Leva Controls, GLTF / GLB Pipeline
- **Styling & Motion**: Custom modern CSS, Cormorant Upright & Chiron GoRound Typography
- **Cloud Infrastructure**: AWS Amplify, CloudFront, S3, Route 53

---

## 📁 Repository Structure

```tree
3dportfolio/
├── assets/                  # Production Vite JS and CSS bundles
├── css/                     # Global stylesheet definitions
├── images/                  # Project previews, icons, and hero photography
├── js/                      # Main client bootstrap logic
├── models/                  # Optimized 3D assets (PBR avatar, sunglasses, GLBs)
│   ├── base_basic_pbr.glb
│   ├── base_basic_shaded.glb
│   ├── gautham_pbr.glb
│   ├── man2.glb
│   ├── rayban_sunglasses.glb
│   └── stylish_modern_high_quality_sunglasses.glb
├── public/                  # Static asset directory for R3F Vite servers
├── src/                     # React source files & AvatarViewer component
│   ├── components/
│   │   └── AvatarViewer.jsx # Interactive R3F canvas component
│   └── AvatarViewer.jsx
├── textures/                # HDRI environment texture (env.hdr)
├── works/                   # Portfolio showcase media
├── .gitignore               # Clean git exclusions (_archive, node_modules)
├── AvatarViewer.jsx         # Standalone root R3F component with Leva
├── avatar_viewer.html       # Standalone interactive 3D viewer
├── favicon.ico
├── index.html               # Main application entry point
└── README.md
```

---

## ⚡ Quick Start & Local Development

### 1. Clone the repository
```bash
git clone https://github.com/gauthamkrishnars/3dportfolio.git
cd 3dportfolio
```

### 2. Run with any local HTTP server
Since the production bundle is pre-built and self-contained, you can serve it immediately:

```bash
# Using Python
python -m http.server 8000

# Or using npx serve
npx serve .
```

Visit `http://localhost:8000` in your browser.

### 3. Open the Interactive 3D Avatar Inspector
Navigate to `http://localhost:8000/avatar_viewer.html` to inspect the 3D avatar with live OrbitControls, lighting mode toggles, and Leva spatial positioning.

---

## 👤 Author

**Gautham Krishna R S**  
- **Role**: Creative Technologist & AWS Builder  
- **College**: SCT College of Engineering (SCTCE), Computer Science & Engineering  
- **Community**: Active member of AWS SCTCE Community  
- **GitHub**: [@gauthamkrishnars](https://github.com/gauthamkrishnars)  
- **Featured Project**: [College Bunker (collegebunker.xyz)](https://collegebunker.xyz)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
