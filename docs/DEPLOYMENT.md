# Vercel Deployment Guide: মাঠের ডাক্তার

This guide details the step-by-step instructions to deploy **মাঠের ডাক্তার (Mather Daktar)** onto the Vercel platform on the free tier.

---

## 1. Prerequisites

- A GitHub, GitLab, or Bitbucket account.
- A free Vercel account ([vercel.com](https://vercel.com)).
- An AI API key:
  - **Google AI Studio Key** (Recommended): [aistudio.google.com](https://aistudio.google.com)
  - Or an **Anthropic Claude Key**: [console.anthropic.com](https://console.anthropic.com)

---

## 2. Step-by-Step Vercel Deployment

### Option A: Deploy via Vercel Web Dashboard (Simplest)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Mather Daktar production app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/mather-daktar.git
   git push -u origin main
   ```

2. **Import Project into Vercel**:
   - Go to your Vercel Dashboard and click **"Add New..." -> "Project"**.
   - Select your repository `mather-daktar` and click **"Import"**.

3. **Configure Environment Variables**:
   In the **"Environment Variables"** section, add:
   - `AI_API_KEY` : `[Your Google AI Studio or Anthropic API Key]`
   - `AI_PROVIDER` : `gemini` (or `anthropic`)
   - `AI_MODEL` : `gemini-2.5-flash` (or your preferred model string)

4. **Deploy**:
   - Click **"Deploy"**.
   - Vercel will run `npm run build`, run TypeScript typecheck, optimize assets, and deploy the app in under 60 seconds.

---

### Option B: Deploy via Vercel CLI

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy to production
vercel --prod
```
During the prompt, select the default settings. When asked, add your `AI_API_KEY` as an environment variable or set it via the dashboard.

---

## 3. Environment Variables Reference

| Variable | Required? | Default | Description |
|---|---|---|---|
| `AI_API_KEY` | **Yes** | — | Secret API key for Google AI Studio or Anthropic Claude |
| `AI_PROVIDER` | No | `gemini` | `gemini` or `anthropic` |
| `AI_MODEL` | No | `gemini-2.5-flash` | Model identifier string (e.g. `gemini-2.5-flash` or `claude-3-5-sonnet-20241022`) |

---

## 4. Custom Domain Configuration (Optional)

1. In the Vercel Dashboard, navigate to **Project Settings -> Domains**.
2. Enter your custom domain (e.g., `matherdaktar.org` or `app.matherdaktar.com`).
3. Follow the DNS instructions to add the required `CNAME` or `A` record at your registrar.
4. Vercel automatically provisions and renews SSL certificates (HTTPS) free of charge.

---

## 5. Post-Deployment Verification Checklist

Once deployed, run through this verification checklist on a mobile device:

- [ ] **Navbar Sticker**: Verify that the official buildathon sticker is clearly visible at `/sticker.png` on the top navbar without horizontal scrolling.
- [ ] **Doctor Tab (`/`)**: Select a crop, upload a leaf photo, verify that the animated leaf loading state appears, and confirm diagnosis arrives within seconds.
- [ ] **Result Screen (`/result/[id]`)**: Check that problem name, colored confidence bar, "এখনই কী করবেন", and "কী করবেন না" render cleanly.
- [ ] **Read Aloud**: Tap "শুনুন" (if device has Bangla TTS support) and verify spoken playback.
- [ ] **Share Card**: Tap "শেয়ার করুন" and verify PNG card generation and WhatsApp sharing.
- [ ] **Ask Tab (`/ask`)**: Ask a follow-up question via typing or voice recording (`bn-BD`).
- [ ] **Season Tab (`/season`)**: Verify that the current Bengali month (e.g. কার্তিক / অগ্রহায়ণ) and Rabi season risks display accurately.
- [ ] **History Tab (`/history`)**: Verify that past diagnoses are listed with thumbnails and Bangla dates, and can be deleted.
- [ ] **Help Tab (`/help`)**: Verify the 3-step guide and click on the Krishi Call Center `16123` link.
