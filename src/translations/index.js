// Centralized translations for the entire website
export const translations = {
  fr: {
    // Navigation
    nav: {
      about: 'À propos',
      services: 'Services',
      projects: 'Projets',
      contact: 'Contact',
      contactMe: 'Me contacter',
      skipToContent: 'Aller au contenu principal',
      backToHome: "Retour à l'accueil",
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      switchLanguage: 'Changer la langue',
      mainNavigation: 'Navigation principale',
      mobileMenu: 'Menu de navigation mobile',
      goToSection: 'Aller à la section',
    },
    
    // Hero Section
    hero: {
      greeting: "Salut, je suis",
      name: "Mohamed Lamine KONE",
      title: "Développeur FullStack\nDesigner UX/UI",
      description: "Développeur FullStack passionné avec une expertise dans la création d'applications web et mobiles performantes, sécurisées et centrées utilisateur. Je combine le développement technique avancé et le design UX/UI pour livrer des solutions numériques complètes et innovantes.",
      performance: "Performance 95+",
      security: "Sécurité A+",
      accessibility: "Accessibilité WCAG 2.1",
      github: "GITHUB",
      linkedin: "LINKEDIN",
      visitGithub: "Visiter mon profil GitHub",
      visitLinkedin: "Visiter mon profil LinkedIn",
    },
    
    // About Section
    about: {
      ariaLabel: "À propos de moi",
      yearsExperience: "années d'expérience",
      accomplishments: "réalisations",
      satisfiedCustomers: "clients satisfaits",
      efficientUX: "UX Efficace",
      beautifulUI: "UI Magnifique",
      softwareDevelopment: "Développement Logiciel",
      title: "Mohamed Lamine KONE",
      description1: "Je suis un Développeur FullStack et Designer UX/UI avec plus de 4 ans d'expérience. Passionné par la fusion du développement technique et du design, je crée des solutions innovantes, performantes et esthétiques pour chaque projet.",
      description2: "Ma polyvalence et mon écoute active me permettent de m'adapter rapidement à tout défi technique. Spécialisé dans le développement d'applications web et mobiles avec une approche centrée sur la performance, la sécurité et l'expérience utilisateur. Mon expertise couvre le développement frontend (React, Angular, Next.js), backend (Spring Boot, NestJS), et le design UX/UI (Figma, Design Systems).",
      tags: {
        fullstack: "Développement FullStack",
        uxui: "Design UX/UI",
        performance: "Optimisation Performance",
        security: "Bonnes Pratiques Sécurité",
      },
      roles: {
        uxui: "UX / UI\nDesigner",
        graphic: "Graphic\nDesigner",
        web: "Web\nDeveloper",
        mobile: "Mobile\nDeveloper",
      },
    },
    
    // Projects Section
    projects: {
      ariaLabel: "Projets",
      title: "Mes",
      titleHighlight: "projets",
      telecelUssd: {
        title: "TELECEL USSD ",
        description: "Une application mobile facilitant l’utilisation des codes USSD pour l’opérateur téléphonique Telecel (Mali). Il s’agit d’une application officieuse que j’ai développée pour un usage personnel afin d’optimiser et automatiser les saisies de codes USSD, avec une attention particulière portée à l’ergonomie et à la rapidité d’exécution",
      },
      evimo: {
        title: "EVIMO",
        description: "EVIMO, une plateforme de ticketing d’événements, intégrant la gestion des billets, la sécurisation des accès et une logique orientée expérience utilisateur",
      },
      documali: {
        title: "DocuMali",
        description: "DocuMali centralise les procédures, les documents à fournir et les étapes à suivre. Moins de stress, moins de déplacements inutiles : tout est expliqué clairement sur votre téléphone.",
      },
    },
    
    // Contact Section
    contact: {
      ariaLabel: "Contact",
      title: "Contacts",
      subtitle: "Discutons de quelque chose de cool ensemble",
      sendMessage: "M'envoyer un message",
      form: {
        name: "Nom",
        email: "Email",
        subject: "Sujet",
        message: "Message",
        namePlaceholder: "Votre nom",
        emailPlaceholder: "votre.email@exemple.com",
        subjectPlaceholder: "De quoi s'agit-il ?",
        messagePlaceholder: "Parlez-moi de votre projet...",
        required: "*",
        send: "Envoyer le message",
      },
    },
    
    // Service Section
    service: {
      title: "Mes services",
      subtitle: "Découvrez mes services soigneusement conçus pour répondre à vos besoins spécifiques et améliorer votre expérience utilisateur.",
      web: {
        title: "Développement Web",
        description: "De la conception de sites web modernes à la création d'applications web robustes, je crée des solutions évolutives et performantes pour les besoins de votre entreprise.",
        features: [
          "Application web",
          "Design web",
          "Développement Backend",
          "APIs RESTful",
          "Assurance qualité du code",
        ],
        experience: "années d'expérience",
      },
      mobile: {
        title: "Développement Mobile",
        description: "Je développe des applications mobiles innovantes pour les plateformes iOS et Android, offrant des expériences utilisateur fluides et des performances natives.",
        features: [
          "Application mobile",
          "Développement multiplateforme",
          "Optimisation UI/UX",
          "Déploiement d'applications",
          "Optimisation des performances",
        ],
        experience: "années d'expérience",
      },
      getInTouch: "Me contacter",
    },
    
    
    // MySkills Section
    skills: {
      title: "Technologies",
      titleHighlight: "quotidiennement\nmaîtrisées",
      subtitle: "Voici un aperçu des",
      subtitleHighlight: "technologies",
      subtitleEnd: "que j'utilise régulièrement",
      description: "Ma vie professionnelle est basée sur la maîtrise de plusieurs outils et langages qui convergent harmonieusement pour donner vie à mes projets.",
    },
    
    // UX/UI Expertise Section
    uxui: {
      title: "Expertise",
      titleHighlight: "UX/UI Design",
      subtitle: "Une approche centrée utilisateur combinant recherche, design et prototypage pour créer des expériences numériques mémorables et performantes",
      methodologies: {
        userResearch: {
          title: "Recherche Utilisateur",
          description: "Analyse approfondie des besoins utilisateurs avec personas, parcours utilisateurs et tests d'utilisabilité",
        },
        designThinking: {
          title: "Design Thinking",
          description: "Processus itératif d'empathie, définition, idéation, prototypage et test pour des solutions innovantes",
        },
        designSystem: {
          title: "Système de Design",
          description: "Création de systèmes de design cohérents avec composants réutilisables et directives complètes",
        },
        responsiveDesign: {
          title: "Design Responsive",
          description: "Interfaces adaptatives optimisées pour tous les appareils avec approche mobile-first",
        },
      },
      principles: {
        title: "Principes UX/UI",
        items: [
          "Accessibilité (WCAG 2.1 AA)",
          "Performance & Optimisation",
          "Micro-interactions fluides",
          "Hiérarchie visuelle claire",
          "Contraste et lisibilité",
          "Navigation intuitive",
        ],
      },
      tools: {
        title: "Outils de Design",
        figma: {
          name: "Figma",
          proficiency: "Expert",
          projects: "50+ projets",
        },
        photoshop: {
          name: "Adobe Photoshop",
          proficiency: "Avancé",
          projects: "30+ projets",
        },
        prototyping: {
          name: "Prototypage",
          proficiency: "Expert",
          projects: "40+ prototypes",
        },
        designSystems: {
          name: "Systèmes de Design",
          proficiency: "Avancé",
          projects: "10+ systèmes",
        },
      },
    },
    
    // Performance & Security Section
    performanceSecurity: {
      title: "Performance &",
      titleHighlight: "Sécurité",
      subtitle: "Une approche proactive pour garantir des applications rapides, sécurisées et conformes aux standards de l'industrie",
      performance: {
        title: "Optimisation Performance",
        features: {
          codeSplitting: {
            title: "Code Splitting & Lazy Loading",
            description: "Optimisation du bundle avec chargement dynamique des composants pour réduire le temps de chargement initial",
            metrics: "60% de réduction du bundle initial",
          },
          imageOptimization: {
            title: "Optimisation d'Images",
            description: "Utilisation de formats modernes (WebP, AVIF), lazy loading et images responsives pour des performances optimales",
            metrics: "95+ Performance Lighthouse",
          },
          caching: {
            title: "Stratégie de Cache",
            description: "Implémentation de stratégies de cache intelligentes (Service Workers, cache HTTP) pour une expérience fluide",
            metrics: "Temps de chargement < 2s",
          },
          monitoring: {
            title: "Monitoring Performance",
            description: "Surveillance continue avec Web Vitals, Lighthouse CI et analytics pour maintenir des performances optimales",
            metrics: "Core Web Vitals Optimisés",
          },
        },
      },
      security: {
        title: "Sécurité & Conformité",
        features: {
          codingPractices: {
            title: "Pratiques de Codage Sécurisé",
            description: "Application des principes OWASP, validation des entrées, protection contre XSS et injection SQL",
            practices: ["Validation des Entrées", "Encodage de Sortie", "Protection CSRF"],
          },
          authentication: {
            title: "Authentification & Autorisation",
            description: "Implémentation de systèmes d'authentification sécurisés avec JWT, OAuth 2.0 et gestion de session",
            practices: ["Tokens JWT", "OAuth 2.0", "Gestion de Session"],
          },
          dataProtection: {
            title: "Protection des Données",
            description: "Chiffrement des données sensibles, conformité RGPD et bonnes pratiques pour la gestion des données utilisateur",
            practices: ["Chiffrement des Données", "Conformité RGPD", "Privacy by Design"],
          },
          headers: {
            title: "Headers de Sécurité",
            description: "Configuration des headers de sécurité (CSP, HSTS, X-Frame-Options) pour protéger contre les attaques courantes",
            practices: ["Headers CSP", "HSTS", "Protection XSS"],
          },
        },
        rating: {
          title: "Note de Sécurité A+",
          subtitle: "Conformité aux standards OWASP & RGPD",
        },
      },
    },
    
    // Footer
    footer: {
      copyright: "Tous droits réservés.",
    },
    
    // Common
    common: {
      loading: "Chargement...",
      error: "Erreur",
      backToTop: "Retour en haut de la page",
    },
  },
  
  en: {
    // Navigation
    nav: {
      about: 'About me',
      services: 'Services',
      projects: 'Projects',
      contact: 'Contacts',
      contactMe: 'Contact me',
      skipToContent: 'Skip to main content',
      backToHome: 'Back to home',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      switchLanguage: 'Switch language',
      mainNavigation: 'Main navigation',
      mobileMenu: 'Mobile navigation menu',
      goToSection: 'Go to section',
    },
    
    // Hero Section
    hero: {
      greeting: "Hi, I'm",
      name: "Mohamed Lamine KONE",
      title: "FullStack Developer\nUX/UI Designer",
      description: "Passionate FullStack Developer with expertise in creating performant, secure and user-centered web and mobile applications. I combine advanced technical development and UX/UI design to deliver complete and innovative digital solutions.",
      performance: "Performance 95+",
      security: "Security A+",
      accessibility: "Accessibility WCAG 2.1",
      github: "GITHUB",
      linkedin: "LINKEDIN",
      visitGithub: "Visit my GitHub profile",
      visitLinkedin: "Visit my LinkedIn profile",
    },
    
    // About Section
    about: {
      ariaLabel: "About me",
      yearsExperience: "years of experience",
      accomplishments: "accomplishments",
      satisfiedCustomers: "satisfied customers",
      efficientUX: "Efficient UX",
      beautifulUI: "Beautifull UI",
      softwareDevelopment: "Software Development",
      title: "Mohamed Lamine KONE",
      description1: "I am a FullStack Developer and UX/UI Designer with over 4 years of experience. Passionate about the fusion of technical development and design, I create innovative, performant and aesthetic solutions for each project.",
      description2: "My versatility and active listening allow me to quickly adapt to any technical challenge. Specialized in web and mobile application development with an approach centered on performance, security and user experience. My expertise covers frontend development (React, Angular, Next.js), backend (Spring Boot, NestJS), and UX/UI design (Figma, Design Systems).",
      tags: {
        fullstack: "FullStack Development",
        uxui: "UX/UI Design",
        performance: "Performance Optimization",
        security: "Security Best Practices",
      },
      roles: {
        uxui: "UX / UI\nDesigner",
        graphic: "Graphic\nDesigner",
        web: "Web\nDeveloper",
        mobile: "Mobile\nDeveloper",
      },
    },
    
    // Projects Section
    projects: {
      ariaLabel: "Projects",
      title: "My",
      titleHighlight: "projects",
      telecelUssd: {
        title: "TELECEL USSD",
        description: "A mobile application facilitating the use of USSD codes for the telephone operator Telecel (Mali). It is an informal application that I developed for personal use to optimize and automate the entry of USSD codes, with particular attention paid to ergonomics and speed of execution",
      },
      evimo: {
        title: "EVIMO",
        description: "EVIMO, a ticketing platform, integrating ticket management, access security and user experience logic",
      },
      documali: {
        title: "DocuMali",
        description: "DocuMali centralizes the procedures, documents to be provided and steps to follow. Less stress, less unnecessary travel: everything is explained clearly on your phone.",
        },
    },
    
    // Contact Section
    contact: {
      ariaLabel: "Contact",
      title: "Contacts",
      subtitle: "Let's discuss something cool together",
      sendMessage: "Send me a message",
      form: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        namePlaceholder: "Your name",
        emailPlaceholder: "your.email@example.com",
        subjectPlaceholder: "What's this about?",
        messagePlaceholder: "Tell me about your project...",
        required: "*",
        send: "Send Message",
      },
    },
    
    // Service Section
    service: {
      title: "My services",
      subtitle: "Explore my services carefully designed to meet your specific needs and improve your user experience.",
      web: {
        title: "Web Development",
        description: "From designing modern websites to building robust web applications, I create scalable and performant solutions for your business needs.",
        features: [
          "Web application",
          "Web design",
          "Backend Development",
          "RESTful APIs",
          "Code QA",
        ],
        experience: "years experience",
      },
      mobile: {
        title: "Mobile Development",
        description: "I develop innovative mobile applications for iOS and Android platforms, delivering seamless user experiences and native performance.",
        features: [
          "Mobile application",
          "Cross-platform development",
          "UI/UX optimization",
          "App deployment",
          "Performance optimization",
        ],
        experience: "years experience",
      },
      getInTouch: "Get in touch with me",
    },
    
    
    // MySkills Section
    skills: {
      title: "Technologies",
      titleHighlight: "daily\nmastered",
      subtitle: "Here is an overview of the",
      subtitleHighlight: "technologies",
      subtitleEnd: "I use regularly",
      description: "My professional life is based on the mastery of several tools and languages that harmoniously converge to give life to my projects.",
    },
    
    // UX/UI Expertise Section
    uxui: {
      title: "Expertise",
      titleHighlight: "UX/UI Design",
      subtitle: "A user-centered approach combining research, design and prototyping to create memorable and performant digital experiences",
      methodologies: {
        userResearch: {
          title: "User Research",
          description: "In-depth analysis of user needs with personas, user journeys and usability testing",
        },
        designThinking: {
          title: "Design Thinking",
          description: "Iterative process of empathy, definition, ideation, prototyping and testing for innovative solutions",
        },
        designSystem: {
          title: "Design System",
          description: "Creation of consistent design systems with reusable components and comprehensive guidelines",
        },
        responsiveDesign: {
          title: "Responsive Design",
          description: "Adaptive interfaces optimized for all devices with mobile-first approach",
        },
      },
      principles: {
        title: "UX/UI Principles",
        items: [
          "Accessibility (WCAG 2.1 AA)",
          "Performance & Optimization",
          "Smooth micro-interactions",
          "Clear visual hierarchy",
          "Contrast and readability",
          "Intuitive navigation",
        ],
      },
      tools: {
        title: "Design Tools",
        figma: {
          name: "Figma",
          proficiency: "Expert",
          projects: "50+ projects",
        },
        photoshop: {
          name: "Adobe Photoshop",
          proficiency: "Advanced",
          projects: "30+ projects",
        },
        prototyping: {
          name: "Prototyping",
          proficiency: "Expert",
          projects: "40+ prototypes",
        },
        designSystems: {
          name: "Design Systems",
          proficiency: "Advanced",
          projects: "10+ systems",
        },
      },
    },
    
    // Performance & Security Section
    performanceSecurity: {
      title: "Performance &",
      titleHighlight: "Security",
      subtitle: "A proactive approach to ensure fast, secure and industry-standard compliant applications",
      performance: {
        title: "Performance Optimization",
        features: {
          codeSplitting: {
            title: "Code Splitting & Lazy Loading",
            description: "Bundle optimization with dynamic component loading to reduce initial load time",
            metrics: "60% reduction in initial bundle",
          },
          imageOptimization: {
            title: "Image Optimization",
            description: "Use of modern formats (WebP, AVIF), lazy loading and responsive images for optimal performance",
            metrics: "95+ Lighthouse Performance",
          },
          caching: {
            title: "Caching Strategy",
            description: "Implementation of smart caching strategies (Service Workers, HTTP caching) for a smooth experience",
            metrics: "Load time < 2s",
          },
          monitoring: {
            title: "Performance Monitoring",
            description: "Continuous monitoring with Web Vitals, Lighthouse CI and analytics to maintain optimal performance",
            metrics: "Optimized Core Web Vitals",
          },
        },
      },
      security: {
        title: "Security & Compliance",
        features: {
          codingPractices: {
            title: "Secure Coding Practices",
            description: "Application of OWASP principles, input validation, protection against XSS and SQL injection",
            practices: ["Input Validation", "Output Encoding", "CSRF Protection"],
          },
          authentication: {
            title: "Authentication & Authorization",
            description: "Implementation of secure authentication systems with JWT, OAuth 2.0 and session management",
            practices: ["JWT Tokens", "OAuth 2.0", "Session Management"],
          },
          dataProtection: {
            title: "Data Protection",
            description: "Encryption of sensitive data, GDPR compliance and best practices for user data management",
            practices: ["Data Encryption", "GDPR Compliance", "Privacy by Design"],
          },
          headers: {
            title: "Security Headers",
            description: "Configuration of security headers (CSP, HSTS, X-Frame-Options) to protect against common attacks",
            practices: ["CSP Headers", "HSTS", "XSS Protection"],
          },
        },
        rating: {
          title: "A+ Security Rating",
          subtitle: "Compliance with OWASP & GDPR standards",
        },
      },
    },
    
    // Footer
    footer: {
      copyright: "All rights reserved.",
    },
    
    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      backToTop: "Back to top",
    },
  },
};
