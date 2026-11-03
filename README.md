# Sona Vorn — Portfolio

> My personal portfolio website, and the project where I **learned how to use AI to develop a website**.

🔗 **Live site:** https://sonavorn.github.io/

---

## About this project

I'm an Information Technology student aiming to become a Network and Cybersecurity Analyst. I built this portfolio to showcase my skills, projects and experience, and to teach myself how to build a real website with the help of AI.

I did not start as a web developer. My technical knowledge has come from hands-on work and self-directed learning, and this project is where I learned to use AI as a **tutor and pair programmer**: asking it to explain things, generate a first version, and help me fix and improve the result. I stayed in charge of the decisions, the content and the testing.

## What I learned about using AI to build a website

- **AI is a tool, not an autopilot.** It can write a lot of code quickly, but I still have to understand what it does, check it, and decide whether it is right for my site.
- **Good prompts get better results.** Describing the goal, the context and the constraints ("a responsive portfolio with light and dark mode, no API keys in the browser") works much better than a vague request.
- **Small steps beat big requests.** Building one section at a time (header, about, projects, chatbot) made it easier to test, spot mistakes and learn.
- **Always test what AI gives me.** I open the page, resize the window, try the buttons, and check for broken links and images before I trust any change.
- **Ask "why?"** When I did not understand a piece of HTML, CSS or JavaScript, I asked the AI to explain it, then changed it myself to see what happened.
- **Think about security and privacy.** The chatbot answers from prepared text inside the page, so no secret API key is ever exposed in the browser, and I chose what personal information to publish.
- **Quality matters as much as features.** Accessibility, performance and mobile layout needed deliberate attention. AI helped, but only when I asked for them.

### My workflow

My approach is the same one shown on the site: **Learn → Build → Test → Improve**.

1. **Learn** — understand the concept (for example, how CSS variables make dark mode work).
2. **Build** — ask the AI for a first version of one small piece.
3. **Test** — try it in the browser on desktop and mobile; read the code to see how it works.
4. **Improve** — report what is wrong or missing, refine the prompt, and repeat.
5. **Save** — commit the working version to GitHub so I can always go back.

## Features

- Responsive layout that works on phones, tablets and desktops
- Light and dark theme, remembered between visits and following the device setting by default
- Typing effect, scroll progress bar, reveal-on-scroll animations and a subtle rain background
- **Gione**, a built-in portfolio chatbot that answers questions about my skills, projects and experience, with no server or API key
- Accessibility basics: skip link, keyboard navigation, ARIA labels, and respect for "reduce motion" settings
- Downloadable CV and social/contact links
- SEO and social-sharing metadata (Open Graph and Twitter cards)

## Tech stack

- HTML5, CSS3 (custom properties, grid, flexbox) and vanilla JavaScript — no frameworks and no build step
- Canvas API for the rain animation
- Google Fonts (Sora and Inter)
- Git and GitHub Pages for version control and hosting
- AI assistants for explanation, code generation and debugging

## Project structure

```
Portfolio/
├── index.html              # Page structure and content
├── README.md
└── assets/
    ├── css/
    │   └── style.css       # All styles, including light/dark theme variables
    ├── js/
    │   ├── main.js         # Theme toggle, navigation, scroll effects, typing effect, chatbot
    │   └── rain.js         # Rain background animation (canvas, no library)
    ├── images/
    │   ├── favicon.png
    │   ├── logo.png
    │   ├── gione.png       # Chatbot avatar
    │   ├── music.jpg
    │   ├── football.jpg
    │   └── preview.jpg     # Social-sharing preview image
    └── docs/
        └── Sona-Vorn-resume.pdf
```

## Run it locally

No installation is needed. Open `index.html` in a browser.

To run it the way a real web server would, from the project folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Customise it

| I want to change… | Where |
| --- | --- |
| Text, projects, experience, links | `index.html` |
| Colours (light and dark) | The `:root` and `html[data-theme="dark"]` blocks at the top of `assets/css/style.css` |
| Chatbot answers | Search for `function getPortfolioAnswer(question)` in `assets/js/main.js` |
| Chatbot quick-reply buttons | The `chat-quick-replies` block in `index.html` |
| Typing-effect roles | The `roles` list in `assets/js/main.js` |
| Rain amount | `DROP_COUNT` at the top of `assets/js/rain.js` |
| Photos, logo or CV | Replace the files in `assets/images/` or `assets/docs/` (keep the same file names, or update the paths in `index.html`) |

## Deploy to GitHub Pages

1. Push the project to a GitHub repository named exactly `<username>.github.io` (mine is `SonaVorn.github.io`). This special name makes GitHub serve the site from the root address.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then pick `main` and `/ (root)`.
4. After a minute the site is live at `https://<username>.github.io/` (mine: https://sonavorn.github.io/).

## Recent improvements

- Moved all assets into an organised `assets/` folder (CSS, JavaScript, images and documents)
- Split the single 1,500-line HTML file into separate HTML, CSS and JavaScript files
- Compressed the images from about 9.5 MB to under 1 MB, so the page loads much faster
- Replaced the p5.js library (about 1 MB) with a small canvas script, so the rain effect works offline and respects "reduce motion"
- Added richer SEO and social-sharing metadata, plus a no-JavaScript fallback so content stays visible
- Fixed link details: new-tab safety attributes, a stray `#` in the GitHub link, and placeholder accessibility labels
- Marked the active navigation link for screen readers

These changes were made with the help of an AI assistant, and I reviewed and tested each one before keeping it.

## Ideas for next steps

- Add screenshots and write-ups for each project
- Add screenshots and a playable link for the Grab & Dash game
- Add a short case study about building this site with AI
- Learn Git branching and pull requests by working on features in separate branches

## Contact

- Email: sonavorn7179@gmail.com
- GitHub: [SonaVorn](https://github.com/SonaVorn)
- LinkedIn: [Sona Vorn](https://www.linkedin.com/in/sona-vorn-11719b372/)

© Sona Vorn. All rights reserved.
