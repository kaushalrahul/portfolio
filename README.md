# Rahul Kaushal — Portfolio


<p align="center">
  <img src="assets/banner.png" alt="Rahul Kaushal Portfolio Banner" width="100%">
</p>

<p align="center">
  🔗 <strong>Live Portfolio:</strong> 
  <a href="https://kaushalrahul.github.io/portfolio/" target="_blank">
    https://kaushalrahul.github.io/portfolio/
  </a>
</p>

A modern, responsive, animated personal portfolio website built with pure HTML, CSS, and JavaScript. Designed for GitHub Pages deployment with zero build step required.

## 🚀 Live Demo

<!-- > Replace with your GitHub Pages URL after deployment: -->
> `https://kaushalrahul.github.io/portfolio`

## 📁 Project Structure

```
portfolio/
├── index.html       # Single-page site with all sections
├── css/
│   └── style.css    # Dark theme, glassmorphism, responsive design
├── js/
│   └── main.js      # Animations, typing effect, scroll reveal
└── README.md
```

## ✨ Features

- **Dark Professional Theme** with blue/purple accent gradients
- **Glassmorphism** card design with backdrop blur
- **Typing Effect** cycling through skills
- **Scroll Reveal** animations (IntersectionObserver-based)
- **Animated Skill Bars** that fill on scroll
- **Timeline Experience** section
- **Project Cards** with hover lift effects
- **Floating Particles** in hero section
- **Mobile-First** responsive design
- **SEO Optimized** with meta tags and semantic HTML
- **Accessible** with ARIA labels and keyboard navigation

## 🖥️ Local Preview

Open `index.html` directly in your browser, **or** use a local server for best results:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using VS Code
# Install "Live Server" extension → Right-click index.html → "Open with Live Server"
```

## 🌐 Deploy to GitHub Pages

1. **Create a GitHub repository** named `portfolio` (or any name you like).

2. **Push the code:**
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/kaushalrahul/portfolio.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings → Pages**
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - Click **Save**

4. Your site will be live at `https://kaushalrahul.github.io/portfolio` within a few minutes.

## 🎨 Customization

| What | Where |
|------|-------|
| Colors & fonts | `css/style.css` → `:root` custom properties |
| Typing phrases | `js/main.js` → `phrases` array in `initTypingEffect()` |
| Content & sections | `index.html` |
| Project links | `index.html` → `.project-links a` href attributes |

## 📄 License

MIT — free to use and modify.
