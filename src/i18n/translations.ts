export const languages = {
  es: "Español",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "es";

export const translations = {
  es: {
    // Nav
    "nav.home": "Inicio",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.skills": "Skills",
    "nav.contact": "Contacto",
    "nav.blog": "Blog",

    // Hero
    "hero.available": "Disponible para trabajo remoto",
    "hero.role": "Full Stack Engineer",
    "hero.description":
      "Especializado en Node.js, NestJS, TypeScript y ecosistemas cloud (GCP, AWS). Apasionado por la integración de inteligencia artificial en productos reales, incluyendo chatbots, automatización de flujos y modelos LLM.",
    "hero.cta": "Ver experiencia",
    "hero.download": "Descargar CV",

    // Terminal
    "terminal.cmd1": "whoami",
    "terminal.out1": "Daniel Santiago Silva Fonseca",
    "terminal.cmd2": "cat role.txt",
    "terminal.out2": "Full Stack Engineer",
    "terminal.cmd3": "cat stack.json | jq '.main'",
    "terminal.out3": '"Node.js, NestJS, TypeScript, Go"',
    "terminal.cmd4": "echo $CLOUD",
    "terminal.out4": "GCP · AWS · Docker",
    "terminal.cmd5": "cat passion.md",
    "terminal.out5": "AI integration · Chatbots · LLM · Automation",

    // Experience
    "experience.subtitle": "Trayectoria",
    "experience.title": "Experiencia profesional",

    // Experience items
    "exp.estrellas.company": "Estrellas App",
    "exp.estrellas.role": "Backend Engineer",
    "exp.estrellas.period": "Jul 2025 – Actualidad",
    "exp.estrellas.desc1":
      "Desarrollo de servicios backend escalables con Node.js y TypeScript, aplicando arquitecturas limpias, principios SOLID y Clean Code orientados a microservicios.",
    "exp.estrellas.desc2":
      "Integración con Google Cloud Platform (GCP) para infraestructura cloud y despliegue de servicios, garantizando alta disponibilidad y escalabilidad.",
    "exp.estrellas.desc3":
      "Diseño e implementación de soluciones con bases de datos MongoDB y PostgreSQL según los requerimientos del negocio.",
    "exp.estrellas.desc4":
      "Desarrollo de servicios complementarios con Go, contribuyendo al rendimiento y eficiencia del sistema.",

    "exp.fox.company": "FOX Analytics",
    "exp.fox.role": "Full Stack Engineer",
    "exp.fox.period": "Ene 2025 – Jun 2025",
    "exp.fox.desc1":
      "Diseñé e implementé servicios backend escalables con NestJS y MySQL para un chatbot de atención al cliente en WhatsApp, integrando las API de Meta y OpenAI, y automatizando agendamiento vía Google Calendar.",
    "exp.fox.desc2":
      "Diseñé e implementé una solución full-stack con NestJS, ReactJS y MySQL, aplicando SOLID, Clean Code, optimización SQL, CORS, Swagger, autenticación segura, email, AWS S3, aumentando la gestión de tareas en un 40%.",

    "exp.tcc.company": "Tecnología con Conciencia SAS",
    "exp.tcc.role": "Backend Engineer (Freelance)",
    "exp.tcc.period": "Sep 2024 – Dic 2024",
    "exp.tcc.desc1":
      "Diseñé y desarrollé servicios backend utilizando NestJS y PostgreSQL, enfocados en la gestión de tareas y actividades de Puerto Antioquia en Colombia.",
    "exp.tcc.desc2":
      "Participé en el desarrollo completo de una plataforma web desde cero empleando AstroJS, NestJS y PostgreSQL, integrando una pasarela de pagos segura para reserva de citas médicas.",

    "exp.gsm.company": "Global Service Maintenance",
    "exp.gsm.role": "Web Developer (Freelance)",
    "exp.gsm.period": "Ago 2023 – May 2024",
    "exp.gsm.desc1":
      "Desarrollé una aplicación web con AstroJS, Tailwind CSS y Node.js incluyendo información de empresa, servicios, booking, get quote y SEO.",

    // Projects
    "projects.subtitle": "Portfolio",
    "projects.title": "Proyectos destacados",

    // Skills
    "skills.subtitle": "Stack técnico",
    "skills.title": "Habilidades técnicas",
    "skills.languages": "Lenguajes",
    "skills.backend": "Backend",
    "skills.frontend": "Frontend",
    "skills.databases": "Bases de datos",
    "skills.cloud": "Cloud & DevOps",
    "skills.integrations": "Integraciones",

    // Education
    "education.subtitle": "Formación",
    "education.title": "Educación",
    "education.degree": "Ingeniería de Sistemas y Computación",
    "education.university":
      "Universidad Pedagógica y Tecnológica de Colombia",
    "education.topics":
      "Ingeniería de Software, Arquitectura de Sistemas, Bases de Datos, Metodologías Ágiles, Seguridad Informática.",

    // Contact
    "contact.subtitle": "Contacto",
    "contact.title": "Trabajemos juntos",
    "contact.description":
      "Full Stack Engineer con sede en Sogamoso, Colombia. Disponible para oportunidades remotas. Comprometido con buenas prácticas de ingeniería, principios SOLID, CI/CD y entrega continua de valor al negocio.",

    // Metrics
    "metrics.title": "Impacto",
    "metrics.subtitle": "Resultados medibles",

    // 404
    "404.title": "Página no encontrada",
    "404.description": "La página que buscas no existe o fue movida.",
    "404.cta": "Volver al inicio",

    // Blog
    "blog.subtitle": "Blog",
    "blog.title": "Artículos y reflexiones",
    "blog.read": "Leer artículo",
  },
  en: {
    // Nav
    "nav.home": "Home",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",
    "nav.blog": "Blog",

    // Hero
    "hero.available": "Available for remote work",
    "hero.role": "Full Stack Engineer",
    "hero.description":
      "Specialized in Node.js, NestJS, TypeScript and cloud ecosystems (GCP, AWS). Passionate about integrating artificial intelligence into real products, including chatbots, workflow automation and LLM models.",
    "hero.cta": "View experience",
    "hero.download": "Download CV",

    // Terminal
    "terminal.cmd1": "whoami",
    "terminal.out1": "Daniel Santiago Silva Fonseca",
    "terminal.cmd2": "cat role.txt",
    "terminal.out2": "Full Stack Engineer",
    "terminal.cmd3": "cat stack.json | jq '.main'",
    "terminal.out3": '"Node.js, NestJS, TypeScript, Go"',
    "terminal.cmd4": "echo $CLOUD",
    "terminal.out4": "GCP · AWS · Docker",
    "terminal.cmd5": "cat passion.md",
    "terminal.out5": "AI integration · Chatbots · LLM · Automation",

    // Experience
    "experience.subtitle": "Career",
    "experience.title": "Professional experience",

    // Experience items
    "exp.estrellas.company": "Estrellas App",
    "exp.estrellas.role": "Backend Engineer",
    "exp.estrellas.period": "Jul 2025 – Present",
    "exp.estrellas.desc1":
      "Development of scalable backend services with Node.js and TypeScript, applying clean architectures, SOLID principles and Clean Code oriented to microservices.",
    "exp.estrellas.desc2":
      "Integration with Google Cloud Platform (GCP) for cloud infrastructure and service deployment, ensuring high availability and scalability.",
    "exp.estrellas.desc3":
      "Design and implementation of database solutions with MongoDB and PostgreSQL according to business requirements.",
    "exp.estrellas.desc4":
      "Development of complementary services with Go, contributing to system performance and efficiency.",

    "exp.fox.company": "FOX Analytics",
    "exp.fox.role": "Full Stack Engineer",
    "exp.fox.period": "Jan 2025 – Jun 2025",
    "exp.fox.desc1":
      "Designed and implemented scalable backend services with NestJS and MySQL for a WhatsApp customer service chatbot, integrating Meta and OpenAI APIs, and automating scheduling via Google Calendar.",
    "exp.fox.desc2":
      "Designed and implemented a full-stack solution with NestJS, ReactJS and MySQL, applying SOLID, Clean Code, SQL optimization, CORS, Swagger, secure auth, email, AWS S3, increasing task management by 40%.",

    "exp.tcc.company": "Tecnología con Conciencia SAS",
    "exp.tcc.role": "Backend Engineer (Freelance)",
    "exp.tcc.period": "Sep 2024 – Dec 2024",
    "exp.tcc.desc1":
      "Designed and developed backend services using NestJS and PostgreSQL, focused on task and activity management for Puerto Antioquia in Colombia.",
    "exp.tcc.desc2":
      "Participated in the complete development of a web platform from scratch using AstroJS, NestJS and PostgreSQL, integrating a secure payment gateway for medical appointment booking.",

    "exp.gsm.company": "Global Service Maintenance",
    "exp.gsm.role": "Web Developer (Freelance)",
    "exp.gsm.period": "Aug 2023 – May 2024",
    "exp.gsm.desc1":
      "Developed a web application with AstroJS, Tailwind CSS and Node.js including company info, services, booking, quote system and SEO.",

    // Projects
    "projects.subtitle": "Portfolio",
    "projects.title": "Featured projects",

    // Skills
    "skills.subtitle": "Tech stack",
    "skills.title": "Technical skills",
    "skills.languages": "Languages",
    "skills.backend": "Backend",
    "skills.frontend": "Frontend",
    "skills.databases": "Databases",
    "skills.cloud": "Cloud & DevOps",
    "skills.integrations": "Integrations",

    // Education
    "education.subtitle": "Education",
    "education.title": "Education",
    "education.degree": "Systems and Computer Engineering",
    "education.university":
      "Pedagogical and Technological University of Colombia",
    "education.topics":
      "Software Engineering, Systems Architecture, Databases, Agile Methodologies, Information Security.",

    // Contact
    "contact.subtitle": "Contact",
    "contact.title": "Let's work together",
    "contact.description":
      "Full Stack Engineer based in Sogamoso, Colombia. Available for remote opportunities. Committed to engineering best practices, SOLID principles, CI/CD and continuous value delivery.",

    // Metrics
    "metrics.title": "Impact",
    "metrics.subtitle": "Measurable results",

    // 404
    "404.title": "Page not found",
    "404.description":
      "The page you're looking for doesn't exist or has been moved.",
    "404.cta": "Back to home",

    // Blog
    "blog.subtitle": "Blog",
    "blog.title": "Articles & thoughts",
    "blog.read": "Read article",
  },
} as const;

export function t(lang: Lang, key: keyof (typeof translations)["es"]): string {
  return translations[lang][key] ?? translations[defaultLang][key] ?? key;
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in translations) return lang as Lang;
  return defaultLang;
}
