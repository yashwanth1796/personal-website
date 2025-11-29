# Yashwanth Kumar Vandanapu - Portfolio Website

A modern, responsive personal portfolio website built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Showcases professional experience, technical skills, AI/LLM project work, and contact information.

## 🚀 Live Demo

Deploy your own instance to see it live!

## ✨ Features

- **Responsive Design** - Optimized for all device sizes
- **Dark Theme** - Modern dark aesthetic with accent colors
- **Accessible** - WCAG 2.1 compliant markup
- **SEO Optimized** - Meta tags, Open Graph, semantic HTML
- **Smooth Animations** - Subtle entrance and hover animations
- **Fast Performance** - Next.js with optimized fonts and assets
- **Resume Downloads** - Direct PDF download links

## 📦 Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first styling
- [Google Fonts](https://fonts.google.com/) - Syne, DM Sans, JetBrains Mono

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy this portfolio is using [Vercel](https://vercel.com):

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

3. **Configure (Optional)**
   - Add a custom domain in Vercel dashboard
   - Environment variables (if needed in future)

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `out` folder (after adding `output: 'export'` to next.config.ts)
   - Or connect your Git repository

### Deploy to GitHub Pages

1. **Update next.config.ts**
   ```typescript
   const nextConfig = {
     output: 'export',
     basePath: '/<repo-name>',
     images: { unoptimized: true },
   };
   ```

2. **Build and deploy**
   ```bash
   npm run build
   # The static site will be in the 'out' folder
   ```

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── Resume - Frontend.pdf
│   └── Resume - FullStack.pdf
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles & theme
│   │   ├── layout.tsx       # Root layout with metadata
│   │   └── page.tsx         # Main page component
│   └── components/
│       ├── Header.tsx       # Navigation header
│       ├── Hero.tsx         # Hero section
│       ├── About.tsx        # About section
│       ├── Skills.tsx       # Technical skills grid
│       ├── Experience.tsx   # Work experience timeline
│       ├── Projects.tsx     # Projects showcase
│       ├── Contact.tsx      # Contact info & resume downloads
│       └── Footer.tsx       # Site footer
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Customization

### Colors

Edit the theme variables in `src/app/globals.css`:

```css
@theme {
  --color-accent: #10b981;      /* Primary accent (emerald) */
  --color-secondary: #8b5cf6;   /* Secondary accent (violet) */
  --color-midnight: #0a0a0f;    /* Background dark */
  /* ... more colors */
}
```

### Fonts

The site uses:
- **Syne** - Headings (display)
- **DM Sans** - Body text
- **JetBrains Mono** - Code/technical text

Update fonts in `src/app/layout.tsx` and `src/app/globals.css`.

### Content

Update personal information in:
- `src/components/Hero.tsx` - Name, title, summary
- `src/components/About.tsx` - Bio, stats, links
- `src/components/Skills.tsx` - Technical skills
- `src/components/Experience.tsx` - Work history
- `src/components/Projects.tsx` - Project showcase
- `src/components/Contact.tsx` - Contact methods
- `src/app/layout.tsx` - SEO metadata

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

- **Email**: yashwanth.vandanapu@gmail.com
- **LinkedIn**: [Yashwanth Vandanapu](https://linkedin.com/in/Yashwanth-Vandanapu)
- **Phone**: 416-820-5970

---

Built with ❤️ using Next.js and Tailwind CSS
