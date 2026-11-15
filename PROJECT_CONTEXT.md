# 3D Portfolio — Project Context & Handover

> **Date:** November 16, 2026  
> **Author:** Gautham Krishna R S  
> **Status:** Live & Production Ready on AWS Amplify  
> **Live Production URL:** [https://main.dumibcrgodudl.amplifyapp.com/](https://main.dumibcrgodudl.amplifyapp.com/)  
> **GitHub Repository:** [https://github.com/gauthamkrishnars/3dportfolio](https://github.com/gauthamkrishnars/3dportfolio) (`main` branch)  
> **Local Dev Server:** `http://localhost:8000/` (`python -m http.server 8000`)

---

## 1. Project Overview & Architecture

An interactive 3D WebGL developer portfolio featuring reactive avatar kinematics, clay/PBR shading, and scroll-driven timeline storytelling.

* **Frontend Engine:** Three.js / React Three Fiber / Drei / Vite bundle (`assets/index-Xi6D-mUj.js`, `assets/index-CYaUks6u.css`).
* **3D Asset:** Custom clay avatar model with PBR material shaders located at `models/gautham_pbr.glb` (~19.5 MB).
* **Hosting & CI/CD:** AWS Amplify linked to GitHub `main` branch. Any `git push origin main` triggers an automatic build and deploy via `amplify.yml`.

---

## 2. Key Completed Milestones

### A. Layout & Header Navigation
* **GitHub Integration:** Positioned the GitHub logo on the far right of the top navigation bar, linking directly to the portfolio repository `https://github.com/gauthamkrishnars/3dportfolio` (`target="_blank"`).
* **Header Alignment:** Subtitle *"AWS SCTCE — 2026"* positioned just to the left of the GitHub icon without overlapping.
* **Hero Title Positioning:** *"About Gautham"* title positioned right below the avatar's lip line (`transform: translateY(clamp(45px, 6.5vh, 65px))`).

### B. Visual Identity & Lighting
* **Shaded Lighting Mode:** Upgraded the 3D avatar rendering from flat studio lighting to rich, deep shaded PBR lighting (`gautham_pbr.glb`).
* **Tagline & Chrome Copy:**
  * Top-left: `Founder @DevCore Studio & AWS Builder`
  * Bottom-left: `Code · Art · Coffee`

### C. Authentic Branding & Badges
Replaced placeholder icon circles with transparent, high-res authentic PNG badges:
* **SCTCE Logo:** Official emblem (`images/sctce.png`).
* **DevCore Studio Logo:** Official geometric monogram (`images/devcore.png`).
* **College Bunker Logo:** Cleaned app icon with container outline removed (`images/collegebunker.png`).
* **AWS Community Logo:** Official AWS builder badge (`images/aws.png`).

### D. Résumé & Career Milestones
* **SCTCE Milestone:** Focused on Data Structures & Algorithms, AI, and Python.
* **DevCore Studio Milestone:** 3 high-impact executive bullet points:
  1. *Founder & Lead Architect · Directing full-stack web engineering, UI/UX architecture, and cloud deployment across Kerala*
  2. *Engineered and shipped 5+ bespoke commercial web applications from concept to live production with 100% performance*
  3. *Delivered high-converting digital platforms for clients including Jumayira International (Kovalam), Lakeside Meadows (Kollam), and Mahika Homestay*
* **College Bunker Milestone:** Highlighted 50+ active student users across SCTCE, MBCET, and MIC campuses.
* **AWS Community Milestone:** Role specified as *Cloud Builder & Hackathon Participant*.

### E. Works Gallery & Real Client Projects
* **Removed Category 04:** Completely deleted *"Category 04: Creative Experiments"*, leaving 3 focused cards.
* **Card 01 — Client Projects (DevCore Studio):**
  * Real photo of Jumayira International resort (`works/covers/ad.jpg`).
  * Clickable live client projects:
    * **Jumayira International** ➔ `https://jumayirainternational.com/`
    * **Lakeside Meadows** ➔ `https://lakesidemeadows.netlify.app/`
    * **Mahika Homestay** ➔ `https://mahikahomestay.netlify.app/`
* **Card 02 — College Bunker:**
  * Official master poster (`works/covers/maker.jpg`).
  * Live link ➔ `https://collegebunker.xyz/`
* **Card 03 — DevCore Studio:**
  * Official studio banner (`works/covers/product.jpg`).
  * Live link ➔ `https://devcorestudio.xyz/`
* **Interactive Navigation:** Modified component `mO` in `assets/index-Xi6D-mUj.js` to render `<a className="wk-line-btn" href={link} target="_blank" rel="noopener noreferrer">` so every project row opens in a new tab with zero styling breaks.

### F. SEO & Deployment
* **Rich Metadata:** Added Open Graph tags (`og:title`, `og:description`), meta description, and author attribution in `index.html`.
* **Zero-Config Hosting:** Added `amplify.yml` configuring single-page app build and deployment.
* **Synchronized Content File:** `WEBSITE_CONTENT.txt` contains all extracted website copy for quick future revisions.

---

## 3. Current Working Tree & Loading Screen State

* **Loading Screen:** Reverted cleanly to the stable original spinner loader. Working tree is completely clean and synced with `origin/main` at commit `02e6a90`.
* **Avatar Source Images (Preserved in Chat Brain for Redesign):**
  * Raw avatar (without glasses): `uploaded_media_0_1794772370736.jpg`
  * Cool avatar (with glasses): `uploaded_media_1_1794772370736.jpg`

---

## 4. Agenda for Tomorrow

1. **Loading Screen Redesign:**
   * Review Gautham's new concept/direction for the loading sequence.
   * Prototype and test with live Three.js asset loading progress.
2. **Domain & Final Polish:**
   * Custom domain setup on AWS Amplify / Route 53 (if desired).
   * Mobile touch interaction & responsive review.
