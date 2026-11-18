# 🚀 Gautham Krishna R S | Interactive 3D Portfolio

[![AWS Architecture](https://img.shields.io/badge/AWS-Amplify%20%7C%20CloudFront%20%7C%20S3-FF9900?logo=amazon-aws&logoColor=white)](https://aws.amazon.com)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL%203D-black?logo=three.js)](https://threejs.org)
[![React Three Fiber](https://img.shields.io/badge/R3F-React%20Three%20Fiber-478CBF?logo=react)](https://docs.pmnd.rs/react-three-fiber)
[![Vite](https://img.shields.io/badge/Bundled%20with-Vite-646CFF?logo=vite)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

> **Built for the AWS SCTCE Portfolio Hackathon**  
> Live Production URL: [https://main.dumibcrgodudl.amplifyapp.com/](https://main.dumibcrgodudl.amplifyapp.com/)  
> An immersive, high-performance 3D portfolio that bridges WebGL visual computing with production-grade AWS cloud architecture.

---

## 🌟 Overview & Highlights

This project is an interactive, scroll-driven 3D developer portfolio. As the user navigates the site, the 3D scene responds kinetically to scroll depth, dynamic camera choreography, cursor gaze tracking, and section milestones.

### ✨ Key Features

1. **Signature Cinematic Preloader**
   - High-contrast grayscale portrait transitioning smoothly into full color using a real-time SVG/CSS liquid clip-path wave animation.
   - Dynamic glow line tracking asset loading progress from 0% to 100%.
   - Seamless cross-dissolve directly into the active Three.js canvas in the exact same pose and framing with zero flash or black bars.

2. **Photorealistic 3D Avatar & Reactive Kinematics**
   - High-fidelity 3D mesh with clay PBR material shaders, ambient occlusion, and reflection mapping (`/models/testmodel.glb`).
   - Dynamic, scroll-linked rotation matrix that naturally turns the avatar's gaze toward resume milestones as the user reads.
   - Natural idle breathing physics and random interval eyelid blinking.
   - Smooth mouse cursor tracking and interactive click reactions with synthesized audio feedback.

3. **Scroll-Driven Kinetic Sunglasses Flight Trajectory**
   - Modern sunglasses (`stylish_modern_high_quality_sunglasses.glb`) calibrated to the avatar's facial landmarks.
   - Exponential easing curve where sunglasses lift off the nose bridge and ascend smoothly out of the viewport on initial scroll, revealing the portrait beneath.

4. **Synchronized 5-Milestone 3D Résumé Timeline**
   - **SCT College of Engineering**: B.Tech in Computer Science & Engineering, algorithms, AI, and community work.
   - **DevCore Studio**: Founder & Lead Architect directing commercial full-stack web engineering across Kerala.
   - **College Bunker**: Creator & Lead Engineer of `collegebunker.xyz`, serving 50+ active campus students.
   - **AWS SCTCE Community & Cloud**: Direct link to AWS Builder Center profile (`@gauthamkrishnars`) and cloud architecture highlights.
   - **Anime & Gaming (One Piece)**: Macro zoom camera anchor (`point-zooop`) framing the character's facial detailing.

5. **Works Showcase & Live Client Deployments**
   - **Client Projects**: Live production websites shipped under DevCore Studio, including Jumayira International (Kovalam resort), Lakeside Meadows (Kollam), and Mahika Homestay.
   - **College Bunker**: Dedicated attendance radar and bunking margin analytics platform.
   - **DevCore Studio Hub**: Bespoke client web engineering and serverless proxy systems.

6. **Standalone 3D Model Inspector (`avatar_viewer.html`)**
   - Standalone Three.js canvas with OrbitControls, directional studio lighting, and HDRI environment reflections.
   - Interactive UI overlay allowing judges and developers to toggle sunglasses and switch lighting modes on the fly.
   - Live Leva spatial positioning controls for fine-tuning coordinates in real time.

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

- **AWS Amplify Hosting**: Continuous deployment automatically triggered on every push to the `main` branch.
- **Amazon CloudFront**: Global content distribution network delivering 3D binary assets, scripts, and media with ultra-low latency.
- **Amazon S3**: High-durability object storage for multi-megabyte 3D binary models (`.glb`) with optimized cache-control headers.
- **Amazon Route 53**: Scalable DNS management with custom domain mapping and automatic ACM certificate management.

---

## 🛠️ Tech Stack

- **Core Frameworks**: React 18, React Three Fiber (R3F), Three.js, GSAP
- **3D Tooling & Controls**: `@react-three/drei`, GLTF / GLB Pipeline, ACESFilmic Tone Mapping
- **Typography**: Mansalva, Cormorant Upright, and Chiron GoRound
- **Cloud Infrastructure**: AWS Amplify, CloudFront, S3, Route 53
- **Build & Bundle**: Vite

---

## 📁 Repository Structure

```tree
3dportfolio/
├── assets/                  # Production Vite JS and CSS bundles
├── css/                     # Global stylesheet definitions
├── images/                  # Authentic branding logos, avatars, and hero photography
├── js/                      # Main client bootstrap logic
├── models/                  # Optimized 3D assets (PBR avatar, sunglasses, GLBs)
│   ├── base_basic_pbr.glb
│   ├── base_basic_shaded.glb
│   ├── gautham_pbr.glb
│   ├── man2.glb
│   ├── rayban_sunglasses.glb
│   ├── stylish_modern_high_quality_sunglasses.glb
│   └── testmodel.glb
├── public/                  # Static asset directory for R3F Vite servers
├── src/                     # React source files and AvatarViewer component
├── textures/                # HDRI environment texture (env.hdr)
├── works/                   # Portfolio showcase media and client cover images
├── .gitignore               # Clean git exclusions (archives, planning notes)
├── AvatarViewer.jsx         # Standalone root R3F component with Leva
├── avatar_viewer.html       # Standalone interactive 3D model inspector
├── favicon.ico              # Multi-resolution avatar face favicon (16px - 256px)
├── favicon.png              # High-resolution avatar face favicon
├── index.html               # Main application entry point
└── README.md                # Project documentation and AWS architecture
```

---

## ⚡ Quick Start & Local Development

### 1. Clone the repository
```bash
git clone https://github.com/gauthamkrishnars/3dportfolio.git
cd 3dportfolio
```

### 2. Run with any local HTTP server
Since the production bundle is self-contained, you can serve it immediately:

```bash
# Using Python
python -m http.server 8000

# Or using npx serve
npx serve .
```

Visit `http://localhost:8000` in your browser.

### 3. Open the Interactive 3D Avatar Inspector
Navigate to `http://localhost:8000/avatar_viewer.html` to inspect the 3D avatar with live OrbitControls, lighting mode toggles, and spatial positioning.

---

## 👤 Author

**Gautham Krishna R S**  
- **Role**: Founder @DevCore Studio & AWS Builder  
- **College**: SCT College of Engineering (SCTCE), Computer Science & Engineering  
- **Community**: Active member of AWS SCTCE Community  
- **GitHub**: [@gauthamkrishnars](https://github.com/gauthamkrishnars)  
- **AWS Builder Center**: [@gauthamkrishnars](https://builder.aws.com/community/@gauthamkrishnars)  
- **DevCore Studio**: [devcorestudio.xyz](https://devcorestudio.xyz/)  
- **Featured Platform**: [College Bunker (collegebunker.xyz)](https://collegebunker.xyz)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
