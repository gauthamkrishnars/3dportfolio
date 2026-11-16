# 3D Portfolio - Project State & Architecture Handoff

> **Date:** November 17, 2026  
> **Repository:** `https://github.com/gauthamkrishnars/3dportfolio.git` (`main`)  
> **Hosting & CI/CD:** AWS Amplify Hosting (Automatic edge build on push to `origin main`)  
> **Local Dev Server:** Python HTTP server running on port `8000` (`http://localhost:8000`)

---

## 1. Executive Summary & Current Stand

All visual design, timeline milestones, external profile links, works covers, and loading animations are complete, verified across desktop and mobile, committed, and pushed to `origin main` (latest commit `43fb4e1`). 

Tomorrow's primary task is updating the **3D Avatar GLB Model** with the user's custom Blender additions (including the One Piece nose sticker and minor character refinements).

---

## 2. Core Architecture & File Map

| File | Purpose & Role |
| :--- | :--- |
| `index.html` | Entry point. Contains the loader DOM elements and cache-busting script tags (`index-Xi6D-mUj.js?v=39`, `index-CYaUks6u.css?v=12`). |
| `assets/index-Xi6D-mUj.js` | Production bundle (React, Three.js, GSAP, Framer Motion). Houses timeline data (`M0e`), works sections (`Lbe`), and camera anchor targets (`R0e`). |
| `assets/index-CYaUks6u.css` | All styling rules including `.tl-logo-chip`, `.tl-logo`, `.wk-card`, and liquid fill keyframes. |
| `images/` | Static project assets (avatars, logos, icons). |
| `works/covers/` | Showcase card cover images for the Works section. |
| `models/` | 3D avatar models loaded by Three.js GLTFLoader. |

---

## 3. The 3D Avatar & Loading Experience

### Animation Sequence
1. **Grayscale Foundation:** The initial view displays the avatar without glasses (`images/avatar_without_glasses.png`) in high-contrast grayscale.
2. **Liquid Rising Fill:** An overlay with glasses (`images/avatar_with_glasses.png`) fills from bottom to top using dynamic SVG/CSS clip-path masking (`polygon` / liquid wave animation).
3. **Seamless Hand-off to 3D Scene:**
   - Once full saturation is reached, the pre-rendered loading card scales and cross-dissolves directly into the active Three.js canvas.
   - Zero black bars, zero flashing, and perfectly matching camera coordinates between the pre-rendered asset and the 3D Three.js viewport on both desktop (1080p+) and mobile (390px+).

---

## 4. Résumé Timeline Configuration (`assets/index-Xi6D-mUj.js` $\rightarrow$ `M0e`)

The interactive 3D timeline is mapped across 5 milestones with synchronized Three.js camera anchor points:

### Entry 0: Education
- **Period:** `2026 – Present`
- **Place:** `SCT College of Engineering`
- **Role:** `B.Tech in Computer Science & Engineering`
- **Anchor:** `point-sysu`

### Entry 1: DevCore Studio
- **Period:** `2026 – Present`
- **Place:** `DevCore Studio · Kerala`
- **Role:** `Founder & Lead Architect`
- **Logo Chip:** `images/devcore.png` (Updated with official teal & silver `DC` monogram).
- **Points:** Full-stack engineering, bespoke commercial web applications, client deliveries.
- **Redirect Icon:** Circular glassmorphism button redirecting to `https://devcorestudio.xyz/`.
- **Anchor:** `point-hotsar`

### Entry 2: College Bunker
- **Period:** `2026 – Active`
- **Place:** `College Bunker`
- **Role:** `Creator & Lead Engineer`
- **Logo Chip:** `images/collegebunker.png` (`noBg: true`).
- **Points:** Attendance tracker, 50+ active student users across SCTCE/MBCET/MIC, bunking margin radar.
- **Redirect Icon:** Circular glassmorphism button redirecting to `https://collegebunker.xyz/`.
- **Anchor:** `point-badprinter`

### Entry 3: AWS SCTCE Community & Cloud
- **Period:** `2026 – Active`
- **Place:** `AWS SCTCE Community`
- **Role:** `Cloud Builder & Hackathon Participant`
- **Heading:** `AWS Cloud Architecture` (Amplify · CloudFront · S3 · Lambda · API Gateway).
- **Redirect Icon:** Circular glassmorphism button pointing directly to user's AWS Builder Center profile:  
  **`https://builder.aws.com/community/@gauthamkrishnars`** (Alias: `@gauthamkrishnars`).
- **Anchor:** `point-busyzheng`

### Entry 4: Anime & Gaming (One Piece Feature)
- **Period:** `All Time`
- **Logo + Title:** Official One Piece logo (`images/onepiece.png` from logos-world) + `Anime & Gaming`
- **Role:** `THE ONE PIECE IS REAL!!!!`
- **Points:**
  1. *In love with Eiichiro Oda's Masterpiece*
  2. *Screentime greater than Sleeptime*
  3. *Couldn't find the pirate token in fortnite 🥀*
- **Links:** None (external wiki link intentionally removed).
- **3D Camera Focus:** **`point-zooop`** at coordinates `[0, 1.15, 0.28]`. This anchor zooms tightly into the avatar's nose, specifically prepared for tomorrow's One Piece nose sticker.

---

## 5. Works Section Configuration (`Lbe.en.sections`)

Accessed via the Works drawer/scroll:

1. **`01 Client Projects` (Tagline: `DevCore Studio`)**
   - **Cover (`works/covers/ad.jpg`):** High-resolution 3:2 Kerala homestay building photo framing the tile roof, upper balcony, pink doors, and entrance flower pots.
   - **Showcase Items:** Jumayira International (3-Star Hotel Kovalam), Lakeside Meadows (Diamond Homestay Kollam), Mahika Homestay (Gold Homestay Peroorkada).
   - **Badge:** `Real Projects · 5 Shipped Sites · 100% Performance`.

2. **`02 College Bunker` (Tagline: `collegebunker.xyz · 50+ Users`)**
   - **Cover (`works/covers/maker.jpg`):** 2x zoomed-in crop framing the College Bunker UI and metrics, eliminating the previous excess border whitespace.
   - **Showcase Items:** College Bunker Web App, Real-Time Attendance Radar, Bunking Margin Calculator.

3. **`03 DevCore Studio` (Tagline: `Building Custom Websites, Apps, AI Agents and Softwares`)**
   - **Cover (`works/covers/product.jpg`):** Clean 3:2 layout centered on the new official DevCore Studio logo.
   - **Showcase Items:**
     - `DevCore Studio Hub` — *Client Web Engineering* (`https://devcorestudio.xyz/`)
     - `You Say, We Build` — *Focused on Performance and Conversions* (`https://devcorestudio.xyz/`)

---

## 6. Tomorrow's Guide: Updating the 3D Avatar

When you update the model in Blender tomorrow:

1. **Export Settings:**
   - Export format: `.glb` (Binary glTF).
   - Textures: Embedded or linked, Draco compression enabled if reducing file size.
   - Check origin/pivot: Keep the model origin identical so camera anchors (`point-zooop` at `[0, 1.15, 0.28]` for the nose) stay aligned without recalculation.
2. **Replacing the Model File:**
   - Place the exported `.glb` into `models/` (matching the existing filename or updating the model path in `assets/index-Xi6D-mUj.js`).
3. **Updating the Pre-Rendered Loading Cards (If Needed):**
   - If the nose sticker should also appear during the loading animation, capture/export:
     - Grayscale avatar without glasses $\rightarrow$ `images/avatar_without_glasses.png`
     - Colored avatar with glasses + nose sticker $\rightarrow$ `images/avatar_with_glasses.png`
4. **Deploying:**
   - Bump cachebuster in `index.html` (`v=40`).
   - Run `git add .`, commit, and `git push origin main`.
