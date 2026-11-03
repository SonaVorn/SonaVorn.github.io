/* Sona Vorn Portfolio — interactions: theme toggle, nav, scroll effects, typing effect and the Gione chatbot.
   To change chatbot answers, edit getPortfolioAnswer(question) below. */
const root = document.documentElement;
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const scrollProgress = document.getElementById("scrollProgress");
const backTop = document.getElementById("backTop");
const navLinks = [...document.querySelectorAll("nav a")];
const sections = [...document.querySelectorAll("main section[id]")];

const sunPath = '<circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="4.9" y1="4.9" x2="6.3" y2="6.3"></line><line x1="17.7" y1="17.7" x2="19.1" y2="19.1"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line><line x1="4.9" y1="19.1" x2="6.3" y2="17.7"></line><line x1="17.7" y1="6.3" x2="19.1" y2="4.9"></line>';
const moonPath = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';

function updateThemeIcon() {
  themeIcon.innerHTML = root.getAttribute("data-theme") === "dark" ? moonPath : sunPath;
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("sv-theme", next);
  updateThemeIcon();
});

navToggle.addEventListener("click", () => {
  const open = navList.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.textContent = open ? "✕" : "☰";
});

navLinks.forEach(a => a.addEventListener("click", () => {
  navList.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.textContent = "☰";
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold:0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const isActive = link.getAttribute("href") === "#" + entry.target.id;
        link.classList.toggle("active", isActive);
        if (isActive) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }
  });
}, { rootMargin:"-42% 0px -48% 0px" });
sections.forEach(section => sectionObserver.observe(section));

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  scrollProgress.style.width = pct + "%";
  backTop.classList.toggle("show", window.scrollY > 650);
}, { passive:true });

backTop.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));
document.getElementById("year").textContent = new Date().getFullYear();

const typingText = document.getElementById("typingText");
const roles = [
  "Information Technology Student",
  "Aspiring Network & Cybersecurity Analyst",
  "Networking Enthusiast",
  "Web Development Learner"
];
let roleIndex = 0;
let charIndex = roles[0].length;
let deleting = true;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (deleting) {
    charIndex--;
    typingText.textContent = currentRole.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  } else {
    charIndex++;
    typingText.textContent = roles[roleIndex].slice(0, charIndex);
    if (charIndex === roles[roleIndex].length) {
      deleting = true;
      setTimeout(typeRole, 1500);
      return;
    }
  }

  setTimeout(typeRole, deleting ? 42 : 72);
}

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typingText.textContent = roles[0];
} else {
  setTimeout(typeRole, 1500);
}

// Portfolio assistant: answers common questions without exposing an API key.
const chatbotLauncher = document.getElementById("chatbotLauncher");
const chatbotGreeting = document.getElementById("chatbotGreeting");
const chatbotPanel = document.getElementById("chatbotPanel");
const chatbotMinimise = document.getElementById("chatbotMinimise");
const chatbotForm = document.getElementById("chatbotForm");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotMessages = document.getElementById("chatbotMessages");

function setChatOpen(open) {
  chatbotPanel.classList.toggle("open", open);
  chatbotPanel.setAttribute("aria-hidden", String(!open));
  chatbotLauncher.setAttribute("aria-expanded", String(open));
  chatbotLauncher.setAttribute("aria-label", open ? "Close portfolio assistant" : "Open portfolio assistant");
  chatbotGreeting.classList.remove("show");
  if (open) setTimeout(() => chatbotInput.focus(), 120);
}

chatbotLauncher.addEventListener("click", () => setChatOpen(!chatbotPanel.classList.contains("open")));
chatbotGreeting.addEventListener("click", () => setChatOpen(true));
chatbotMinimise.addEventListener("click", () => setChatOpen(false));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && chatbotPanel.classList.contains("open")) setChatOpen(false);
});

function addChatMessage(text, sender) {
  const row = document.createElement("div");
  row.className = `chat-message ${sender}`;
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  bubble.textContent = text;
  row.appendChild(bubble);
  chatbotMessages.appendChild(row);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getPortfolioAnswer(question) {
  const q = question.toLowerCase();

  // =========================
  // GREETINGS
  // =========================

  if (/hello|\bhi\b|hey|good morning|good afternoon|good evening/.test(q)) {
    return "Hi! 👋 I'm Sona's portfolio assistant. Ask me about his skills, projects, education, work experience, football, music, or career goals.";
  }

  if (/how are you|how's it going|how are things/.test(q)) {
    return "I'm doing great! 🤖 Ready to tell you about Sona. What would you like to know?";
  }

  // =========================
  // ABOUT SONA
  // =========================

  if (/who (is|are) sona|about sona|introduce sona|tell me about (him|sona)|what does sona do/.test(q)) {
    return "Sona Vorn is an Information Technology student and aspiring Network and Cybersecurity Analyst. He has hands-on experience in CCTV installation, networking, troubleshooting, web development, customer service, and football leadership.";
  }

  if (/name|full name|what is his name|what's his name/.test(q)) {
    return "His name is Sona Vorn.";
  }

  if (/passion|passionate|interest|interested/.test(q)) {
    return "Sona is passionate about technology, especially networking, cybersecurity, web development, and solving real-world technical problems.";
  }

  if (/personality|what is sona like|what's sona like/.test(q)) {
    return "Sona is curious, practical, independent, and motivated to learn. He enjoys exploring technology, building projects, solving problems, and developing new skills.";
  }

  // =========================
  // EDUCATION
  // =========================

  if (/education|study|studying|college|university|diploma|school/.test(q)) {
    return "Sona is currently studying a Diploma of Information Technology at Griffith College. Before moving into IT, he completed a Foundation Year in International Business Management at the Royal University of Phnom Penh in 2025.";
  }

  if (/why it|why information technology|why did sona choose it/.test(q)) {
    return "Sona became interested in Information Technology through practical experience with websites, coding, networking, and IP camera systems. These experiences motivated him to pursue IT as a career.";
  }

  if (/change career|career change|switched to it|switch to it/.test(q)) {
    return "Sona originally studied International Business Management before moving toward Information Technology. His practical experiences with websites, coding, networking, and IP cameras helped him discover that IT was the field he wanted to pursue.";
  }

  // =========================
  // TECHNICAL SKILLS
  // =========================

  if (/skill|skills|technology|technologies|tech stack|what can sona do/.test(q)) {
    return "Sona's technical skills include HTML, CSS, JavaScript, Git, GitHub, responsive web design, IP addressing, network configuration, network cabling, router configuration, IP cameras, DVR/NVR systems, and troubleshooting. He is also developing his knowledge of cybersecurity, network security, system security, and security awareness. His professional skills include communication, teamwork, leadership, customer service, time management, adaptability, problem-solving, and independent learning.";
  }

  if (/technical experience|technical background/.test(q)) {
    return "Sona's technical background includes web development, networking, IP camera systems, CCTV installation, DVR/NVR configuration, network cabling, router configuration, troubleshooting, Git, and GitHub.";
  }

  if (/problem solving|problem-solving|troubleshoot|troubleshooting/.test(q)) {
    return "Problem-solving is one of Sona's strengths. His experience with websites, networking, IP cameras, and servers has required him to identify problems, test solutions, and troubleshoot technical issues.";
  }

  if (/learning|self[- ]?taught|self learning|learns|independent learning/.test(q)) {
    return "Sona enjoys learning independently. He has developed technical skills by researching, experimenting, troubleshooting problems, and building practical projects.";
  }

  // =========================
  // WEB DEVELOPMENT
  // =========================

  if (/web development|web developer|web design|website|web project|coding|programming/.test(q)) {
    return "Sona is interested in web development and has experience building websites using HTML, CSS, and JavaScript. His projects include digital wedding invitations, portfolio websites, and websites supporting business projects.";
  }

  if (/html|hypertext markup/.test(q)) {
    return "Sona uses HTML to structure websites and has applied it in several personal and practical web-development projects.";
  }

  if (/css|styling|stylesheet/.test(q)) {
    return "Sona uses CSS to design and style websites, including layouts, responsive designs, spacing, typography, and visual presentation.";
  }

  if (/javascript|java script|\bjs\b/.test(q)) {
    return "Sona uses JavaScript to add interactive features and dynamic behaviour to his websites.";
  }

  if (/responsive|mobile website|mobile friendly/.test(q)) {
    return "Sona is interested in responsive web design and building websites that work across different screen sizes and devices.";
  }

  if (/github|git/.test(q)) {
    return "Sona uses Git and GitHub to manage and publish web-development projects. He has used GitHub for projects such as his digital wedding invitation website.";
  }

  // =========================
  // PROJECTS
  // =========================

  if (/wedding|invitation website/.test(q)) {
    return "Sona designed and developed a digital wedding invitation website for his brother using HTML, CSS, JavaScript, GitHub, and web-design skills. Building the project helped strengthen his interest in coding and web development.";
  }

  if (/grab\s*(&|and)?\s*dash|game project|school assessment|school project/.test(q)) {
    return "Grab & Dash is a game Sona developed for a school assessment. It let him apply his programming and problem-solving skills to take a project from idea to a finished, playable game.";
  }

  if (/camera project|ip camera|network setup|network installation/.test(q)) {
    return "Sona's IP Camera and Network Setup work included network cabling, network configuration, IP camera installation, DVR/NVR configuration, remote monitoring, and troubleshooting connectivity problems.";
  }

  if (/project|projects/.test(q)) {
    return "Sona's main projects include a digital wedding invitation website, IP camera and network setups, the Grab & Dash game he developed for a school assessment, and other web-development projects. Ask me about any one of them for more detail.";
  }

  // =========================
  // NETWORKING
  // =========================

  if (/networking|network|router|ip address|cabling|network infrastructure/.test(q)) {
    return "Networking is one of Sona's main areas of interest. He has practical experience with IP addressing, network cabling, router configuration, IP cameras, connectivity troubleshooting, and network setup.";
  }

  if (/why networking|why network/.test(q)) {
    return "Sona became interested in networking through practical projects involving routers, network cabling, IP cameras, and connectivity troubleshooting. He enjoys understanding how different devices communicate with each other.";
  }

  // =========================
  // CYBERSECURITY
  // =========================

  if (/cybersecurity|cyber security|network security|system security|security awareness/.test(q)) {
    return "Sona is passionate about cybersecurity and wants to build a career in network and cybersecurity. He is currently developing his knowledge of network security, system security, security awareness, and cybersecurity fundamentals.";
  }

  if (/why cybersecurity|why cyber security/.test(q)) {
    return "Sona is interested in cybersecurity because he enjoys understanding how networks and systems work and wants to learn how to protect them from security threats.";
  }

  // =========================
  // CCTV
  // =========================

  if (/cctv|cctv technician|camera technician|technician/.test(q)) {
    return "Sona worked independently as a CCTV Installation Technician from January 2022 to May 2026. His work included installing CCTV and IP camera systems, planning network cabling and camera placement, configuring DVR/NVR systems and remote monitoring, troubleshooting connectivity issues, communicating with customers, and managing installations independently.";
  }

  if (/dvr|nvr|recording system/.test(q)) {
    return "Sona has practical experience configuring DVR and NVR systems as part of CCTV installation and security-camera projects.";
  }

  // =========================
  // BARISTA / CAFE
  // =========================

  if (/barista|cafe|café|customer service/.test(q)) {
    return "Sona has part-time experience as a barista and café all-rounder. This experience has developed his customer service, communication, teamwork, multitasking, time management, consistency, and ability to work under pressure.";
  }

  if (/barista experience|cafe experience|coffee experience/.test(q)) {
    return "Sona has around 3 months of part-time experience working as a barista and café all-rounder. This experience has strengthened his customer-service, communication, teamwork, and time-management skills.";
  }

  // =========================
  // FOOTBALL
  // =========================

  if (/football|ei ya yo|captain|sport|leadership/.test(q)) {
    return "Sona is the founder and captain of EI YA YO Football. The team trains and plays together several times per week, and Sona helped lead the team to a top-three tournament finish in 2024. This experience strengthened his leadership, communication, teamwork, and decision-making skills.";
  }

  if (/football achievement|football achievements|tournament/.test(q)) {
    return "One of Sona's football achievements was helping EI YA YO finish in the top three of a tournament in 2024.";
  }

  if (/teamwork|team player|working in a team/.test(q)) {
    return "Sona has developed teamwork skills through football and café work. He understands the importance of communication, supporting teammates, sharing responsibilities, and working toward a common goal.";
  }

  if (/leadership|leader|lead/.test(q)) {
    return "Sona has developed leadership experience as the founder and captain of EI YA YO Football. Leading a team has helped him improve communication, decision-making, teamwork, and responsibility.";
  }

  // =========================
  // MUSIC
  // =========================

  if (/music|piano|guitar|roneat|kong vong|instrument|pinpeat/.test(q)) {
    return "Outside IT, Sona enjoys music. He plays piano and guitar and has experience with traditional Pinpeat instruments, including Roneat and Kong Vong Toch. Music is one of his creative interests.";
  }

  if (/piano/.test(q)) {
    return "Sona enjoys playing piano and has spent time recording and experimenting with music.";
  }

  if (/guitar/.test(q)) {
    return "Guitar is one of Sona's favourite instruments, and he enjoys playing and learning music in his free time.";
  }

  // =========================
  // GAMING
  // =========================

  if (/gaming|games|minecraft|game|fav game/.test(q)) {
    return "Sona enjoys gaming, especially Minecraft. He has experience with Minecraft servers, modpacks, multiplayer setups, and troubleshooting. However one of his favorite is Just Cause 2";
  }

  // =========================
  // WORK & EXPERIENCE
  // =========================

  if (/experience|work|job|employment/.test(q)) {
    return "Sona has experience as a self-employed CCTV Installation Technician and as a part-time barista/café all-rounder. He is also the founder and captain of EI YA YO Football. These experiences have developed his technical, customer-service, teamwork, communication, and leadership skills.";
  }

  if (/customer|customers|client|clients/.test(q)) {
    return "Sona has customer-service experience from café work and CCTV installation. He has experience communicating with customers, understanding their needs, explaining solutions, and providing professional service.";
  }

  // =========================
  // PROFESSIONAL SKILLS
  // =========================

  if (/communication|communicate/.test(q)) {
    return "Sona has developed communication skills through customer service, football leadership, technical work, and working with clients during CCTV installations.";
  }

  if (/time management|manage time|multitask|multitasking/.test(q)) {
    return "Sona has developed time-management and multitasking skills by balancing IT study, part-time café work, personal projects, and other responsibilities.";
  }

  if (/adaptability|adaptable|flexible/.test(q)) {
    return "Sona considers adaptability an important skill. His experience across IT projects, CCTV installation, café work, football leadership, and study has required him to adapt to different environments and challenges.";
  }

  if (/strength|strengths|good at/.test(q)) {
    return "Sona's strengths include problem-solving, independent learning, adaptability, teamwork, communication, leadership, customer service, and a strong interest in technology.";
  }

  if (/professional skills|professional/.test(q)) {
    return "Sona's professional skills include communication, customer service, teamwork, leadership, problem-solving, time management, adaptability, multitasking, and independent learning.";
  }

  // =========================
  // CAREER
  // =========================

  if (/goal|goals|career|future|network analyst/.test(q)) {
    return "Sona's long-term goal is to become a Network and Cybersecurity Analyst. He is currently strengthening his networking, cybersecurity, and web-development skills through formal study and practical projects.";
  }

  if (/career path|career pathway/.test(q)) {
    return "Sona is building his career toward networking and cybersecurity. He is developing a combination of practical networking experience, IT education, cybersecurity knowledge, and web-development skills.";
  }

  if (/why hire sona|hire sona|why should i hire|hire/.test(q)) {
    return "Sona brings a combination of technical, customer-service, teamwork, and leadership experience. He is an IT student who enjoys learning, solving problems, working with technology, and developing practical skills.";
  }

  // =========================
  // HOBBIES
  // =========================

  if (/hobby|hobbies|free time|outside (of )?it/.test(q)) {
    return "Outside IT, Sona enjoys football, music, gaming, and technology projects. He founded and captains EI YA YO Football and enjoys playing piano and guitar.";
  }

  // =========================
  // PERSONAL / PRIVATE
  // =========================

  if (/single|girlfriend|boyfriend|relationship|dating|married/.test(q)) {
    return "Haha, that information is classified! 😄 This assistant focuses on Sona's professional portfolio, but you can ask him personally.";
  }

  if (/where|location|australia/.test(q)) {
    return "This portfolio does not publish Sona's exact location. Please use the Contact section if you would like to get in touch with him.";
  }

  // =========================
  // PORTFOLIO / CONTACT
  // =========================

  if (/portfolio|this website/.test(q)) {
    return "This portfolio showcases Sona's education, technical skills, projects, work experience, interests, and career goals in Information Technology.";
  }

  if (/contact|email|linkedin|hire|reach/.test(q)) {
    return "You can use the Contact section of this portfolio to get in touch with Sona.";
  }

  if (/resume|cv|curriculum vitae/.test(q)) {
    return "You can find Sona's CV in the Contact section of this portfolio.";
  }

  // =========================
  // CHATBOT
  // =========================

  if (/are you real|are you sona|are you a human/.test(q)) {
    return "I'm Sona's portfolio assistant 🤖 — not Sona himself. I'm here to help you learn about his background, skills, projects, and experience.";
  }

  if (/who are you|what are you/.test(q)) {
    return "I'm Sona's personal portfolio chatbot. I can answer questions about his education, technical skills, projects, work experience, hobbies, and career goals.";
  }

  if (/help|what can i ask|questions/.test(q)) {
    return "You can ask me about Sona's education, skills, networking, cybersecurity, web development, projects, CCTV experience, café work, football, music, hobbies, or career goals.";
  }

  // =========================
  // GENERAL
  // =========================

  if (/thank|thanks|thank you/.test(q)) {
    return "You're welcome! 😊 Feel free to ask me anything else about Sona.";
  }

  if (/bye|goodbye|see you/.test(q)) {
    return "Goodbye! 👋 Thanks for visiting Sona's portfolio.";
  }

  if (/joke|funny/.test(q)) {
    return "Why did the network engineer bring a ladder? To reach the cloud! 😄";
  }

  if (/fun fact|interesting fact|tell me something interesting/.test(q)) {
    return "Fun fact: Sona's interest in IT grew through hands-on projects. Working with websites and IP camera systems helped him discover how much he enjoys technology and problem-solving.";
  }

  return "I don't know that detail yet. Try asking about Sona's skills, projects, education, networking, cybersecurity, web development, CCTV experience, café work, football, music, hobbies, or career goals.";
}

function submitChatQuestion(question) {
  const cleaned = question.trim();
  if (!cleaned) return;
  addChatMessage(cleaned, "user");
  chatbotInput.value = "";
  window.setTimeout(() => addChatMessage(getPortfolioAnswer(cleaned), "bot"), 280);
}

chatbotForm.addEventListener("submit", event => {
  event.preventDefault();
  submitChatQuestion(chatbotInput.value);
});

document.querySelectorAll(".chat-quick-reply").forEach(button => {
  button.addEventListener("click", () => submitChatQuestion(button.dataset.question || button.textContent));
});

// Show the small greeting automatically without opening the full chat.
window.setTimeout(() => chatbotGreeting.classList.add("show"), 1200);
window.setTimeout(() => chatbotGreeting.classList.remove("show"), 8500);
