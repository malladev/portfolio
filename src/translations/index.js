// Centralized translations for the entire website
export const translations = {
  fr: {
    nav: {
      about: "À propos",
      process: "Méthode",
      projects: "Projets",
      recent: "En cours",
      services: "Services",
      contactMe: "Me contacter",
      skipToContent: "Aller au contenu principal",
      backToHome: "Retour à l'accueil",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      switchLanguage: "Passer le site en anglais",
      mainNavigation: "Navigation principale",
      mobileMenu: "Menu de navigation",
    },

    hero: {
      greeting: "Salut, je suis",
      name: "Mohamed Lamine KONE",
      roleDev: "Développeur FullStack",
      roleDesign: "Designer UX/UI",
      line1: "Je dessine vos produits,",
      line2: "puis je les code.",
      description:
        "Je crée des applications web et mobiles de bout en bout : de la recherche utilisateur à la mise en ligne, sans perdre le fil entre les deux.",
      ctaProjects: "Voir mes projets",
      ctaContact: "Me contacter",
      lensHint: "Passez le curseur sur le titre pour voir le plan",
      visitGithub: "Visiter mon profil GitHub",
      visitLinkedin: "Visiter mon profil LinkedIn",
    },

    about: {
      ariaLabel: "À propos de moi",
      label: "À propos",
      manifesto:
        "Entre la maquette et le code, un projet perd souvent ce qui faisait sa qualité. Je travaille des deux côtés : je dessine l'expérience, puis je la construis moi-même, avec la même exigence.",
      detail:
        "Spécialisé dans les applications web et mobiles, je m'adapte vite aux défis techniques. Mon expertise couvre le frontend (React, Angular, Next.js), le backend (Spring Boot, NestJS), le mobile (Flutter) et le design UX/UI (Figma, systèmes de design).",
      yearsExperience: "années d'expérience",
      accomplishments: "réalisations",
      satisfiedCustomers: "clients satisfaits",
      efficientUX: "UX efficace",
      beautifulUI: "UI soignée",
      softwareDevelopment: "Développement logiciel",
      result: "Un seul interlocuteur",
    },

    process: {
      ariaLabel: "Ma méthode de travail",
      label: "Méthode",
      title: "Une seule idée, de la première question à la mise en ligne.",
      steps: [
        {
          title: "Comprendre.",
          description:
            "Personas, parcours et tests d'utilisabilité : je pars des besoins réels avant de dessiner quoi que ce soit.",
        },
        {
          title: "Esquisser.",
          description:
            "De l'idée au prototype, par itérations rapides, pour tester les solutions avant de les construire.",
        },
        {
          title: "Structurer.",
          description:
            "Un système de design cohérent : composants réutilisables, règles claires, interface prévisible.",
        },
        {
          title: "Livrer.",
          description:
            "Le code reprend la maquette au détail près, puis s'adapte à chaque écran, du téléphone au bureau.",
        },
      ],
      notes: ["Qui ?", "Pourquoi ?", "Quel besoin ?"],
      deployed: "En ligne",
      mockTitle: "Bienvenue.",
      mockCta: "Commencer",
    },

    projects: {
      ariaLabel: "Projets",
      label: "Projets",
      title: "Ce que j'ai construit.",
      hint: "Continuez à défiler",
      open: "Ouvrir le projet",
      opensNewTab: "(nouvel onglet)",
      visit: "Voir le projet",
      claireFontaine: {
        title: "La Claire Fontaine",
        kind: "Site & back-office",
        description:
          "La plateforme d'un établissement scolaire de Bamako : une landing page qui présente l'école et ses cinq cycles, de la crèche au lycée, et un back-office pour gérer l'établissement au quotidien.",
        features: ["Landing page", "Back-office de gestion"],
        alt: "Page d'accueil du site La Claire Fontaine",
      },
      lakanaPlus: {
        title: "LAKANA PLUS",
        kind: "Site d'entreprise",
        description:
          "Le site d'une entreprise malienne de sécurité : il présente ses expertises en formation, audit, conseil et solutions digitales, puis conduit le visiteur vers une demande de devis.",
        features: ["Site vitrine", "Demande de devis"],
        alt: "Page d'accueil du site LAKANA PLUS",
      },
      telecelUssd: {
        title: "TELECEL USSD",
        kind: "Application mobile",
        description:
          "Une application officieuse, développée pour un usage personnel, qui automatise la saisie des codes USSD de l'opérateur Telecel (Mali), avec une attention portée à l'ergonomie et à la rapidité.",
      },
      evimo: {
        title: "EVIMO",
        kind: "Plateforme de billetterie",
        description:
          "Une plateforme de billetterie d'événements qui intègre la gestion des billets, la sécurisation des accès et une logique orientée expérience utilisateur.",
        scan: "Accès validé",
      },
      documali: {
        title: "DocuMali",
        kind: "Service en ligne",
        description:
          "DocuMali centralise les procédures, les documents à fournir et les étapes à suivre. Moins de stress, moins de déplacements inutiles : tout est expliqué clairement sur votre téléphone.",
        steps: ["Documents à fournir", "Étapes à suivre", "Dossier prêt"],
      },
    },

    recent: {
      label: "En cours de développement",
      title: "Sur ma table à dessin.",
      subtitle: "Deux projets récents, déjà en ligne, sur lesquels je travaille encore.",
      status: "En développement",
      bko: {
        title: "BKO Gosp·N Grill",
        kind: "Site d'événement",
        description:
          "Trois jours de gospel et de grillades à Bamako : compte à rebours, programme, infos pratiques et une affiche « J'y serai » que chacun crée et partage.",
        features: ["Générateur d'affiche", "Compte à rebours"],
        alt: "Page d'accueil du site BKO Gosp·N Grill",
      },
      mille: {
        title: "MILLE EMOTIONS",
        kind: "Créateur de sites d'événements",
        description:
          "Un outil pour créer le site d'un mariage, de fiançailles ou d'une conférence : on choisit un modèle, on le personnalise, puis on l'envoie aux invités en un seul lien.",
        features: ["Modèles personnalisables", "Sans compétence technique"],
        alt: "Page d'accueil du site MILLE EMOTIONS",
      },
    },

    service: {
      ariaLabel: "Mes services",
      label: "Services",
      title: "Deux terrains, le même soin.",
      experience: "années d'expérience",
      getInTouch: "En parler ensemble",
      web: {
        title: "Web",
        description:
          "Du site moderne à l'application robuste, je crée des solutions évolutives et performantes pour les besoins de votre entreprise.",
        features: [
          "Applications web",
          "Design web",
          "Développement backend",
          "APIs RESTful",
          "Assurance qualité du code",
        ],
      },
      mobile: {
        title: "Mobile",
        description:
          "Je développe des applications iOS et Android qui offrent des expériences fluides et des performances natives.",
        features: [
          "Applications mobiles",
          "Développement multiplateforme",
          "Optimisation UI/UX",
          "Déploiement d'applications",
          "Optimisation des performances",
        ],
      },
    },

    contact: {
      ariaLabel: "Contact",
      label: "Contact",
      title: "Un projet en tête ?",
      titleAccent: "Parlons-en.",
      subtitle: "Écrivez-moi directement, ou décrivez votre besoin ici.",
      copy: "Copier l'adresse",
      copied: "Adresse copiée",
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
        requiredHint: "* Champs obligatoires",
        send: "Continuer dans ma messagerie",
        errors: {
          required: "Ce champ est obligatoire.",
          email: "Saisissez une adresse e-mail valide, par exemple nom@domaine.com.",
        },
        mailBody: "Message de",
        sent: "Votre messagerie s'ouvre avec le message prêt à envoyer. Rien ne s'ouvre ? Écrivez-moi directement à",
      },
    },

    footer: {
      copyright: "Tous droits réservés.",
      backToTop: "Retour en haut",
    },

    common: {
      pauseAnimation: "Mettre en pause le défilement",
      playAnimation: "Reprendre le défilement",
    },
  },

  en: {
    nav: {
      about: "About",
      process: "Process",
      projects: "Projects",
      recent: "In progress",
      services: "Services",
      contactMe: "Contact me",
      skipToContent: "Skip to main content",
      backToHome: "Back to home",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      switchLanguage: "Switch the site to French",
      mainNavigation: "Main navigation",
      mobileMenu: "Navigation menu",
    },

    hero: {
      greeting: "Hi, I'm",
      name: "Mohamed Lamine KONE",
      roleDev: "FullStack Developer",
      roleDesign: "UX/UI Designer",
      line1: "I design your products,",
      line2: "then I code them.",
      description:
        "I build web and mobile applications end to end: from user research to launch, without losing the thread between the two.",
      ctaProjects: "See my projects",
      ctaContact: "Contact me",
      lensHint: "Move your cursor over the title to see the blueprint",
      visitGithub: "Visit my GitHub profile",
      visitLinkedin: "Visit my LinkedIn profile",
    },

    about: {
      ariaLabel: "About me",
      label: "About",
      manifesto:
        "Between the mockup and the code, a project often loses what made it good. I work on both sides: I design the experience, then I build it myself, to the same standard.",
      detail:
        "Specialized in web and mobile applications, I adapt quickly to technical challenges. My expertise covers frontend (React, Angular, Next.js), backend (Spring Boot, NestJS), mobile (Flutter) and UX/UI design (Figma, design systems).",
      yearsExperience: "years of experience",
      accomplishments: "accomplishments",
      satisfiedCustomers: "satisfied customers",
      efficientUX: "Efficient UX",
      beautifulUI: "Refined UI",
      softwareDevelopment: "Software development",
      result: "One point of contact",
    },

    process: {
      ariaLabel: "How I work",
      label: "Process",
      title: "One idea, from the first question to launch.",
      steps: [
        {
          title: "Understand.",
          description:
            "Personas, user journeys and usability tests: I start from real needs before drawing anything.",
        },
        {
          title: "Sketch.",
          description:
            "From idea to prototype, in quick iterations, to test solutions before building them.",
        },
        {
          title: "Structure.",
          description:
            "A consistent design system: reusable components, clear rules, a predictable interface.",
        },
        {
          title: "Ship.",
          description:
            "The code follows the design down to the detail, then adapts to every screen, from phone to desktop.",
        },
      ],
      notes: ["Who?", "Why?", "What need?"],
      deployed: "Live",
      mockTitle: "Welcome.",
      mockCta: "Get started",
    },

    projects: {
      ariaLabel: "Projects",
      label: "Projects",
      title: "What I've built.",
      hint: "Keep scrolling",
      open: "Open project",
      opensNewTab: "(new tab)",
      visit: "View project",
      claireFontaine: {
        title: "La Claire Fontaine",
        kind: "Website & back office",
        description:
          "The platform of a school in Bamako: a landing page presenting the school and its five levels, from nursery to high school, and a back office to run the establishment day to day.",
        features: ["Landing page", "Management back office"],
        alt: "Home page of the La Claire Fontaine website",
      },
      lakanaPlus: {
        title: "LAKANA PLUS",
        kind: "Company website",
        description:
          "The website of a Malian security company: it presents its expertise in training, auditing, consulting and digital solutions, then leads visitors to a quote request.",
        features: ["Showcase website", "Quote request"],
        alt: "Home page of the LAKANA PLUS website",
      },
      telecelUssd: {
        title: "TELECEL USSD",
        kind: "Mobile app",
        description:
          "An unofficial app, built for personal use, that automates entering USSD codes for the operator Telecel (Mali), with particular attention to ergonomics and speed.",
      },
      evimo: {
        title: "EVIMO",
        kind: "Ticketing platform",
        description:
          "An event ticketing platform that brings together ticket management, access security and a user-experience-first logic.",
        scan: "Access granted",
      },
      documali: {
        title: "DocuMali",
        kind: "Online service",
        description:
          "DocuMali centralizes procedures, required documents and the steps to follow. Less stress, fewer wasted trips: everything is explained clearly on your phone.",
        steps: ["Required documents", "Steps to follow", "File ready"],
      },
    },

    recent: {
      label: "In development",
      title: "On my drawing board.",
      subtitle: "Two recent projects, already online, that I am still working on.",
      status: "In development",
      bko: {
        title: "BKO Gosp·N Grill",
        kind: "Event website",
        description:
          "Three days of gospel and grilled food in Bamako: countdown, programme, practical information and an \"I'll be there\" poster that everyone can create and share.",
        features: ["Poster generator", "Countdown"],
        alt: "Home page of the BKO Gosp·N Grill website",
      },
      mille: {
        title: "MILLE EMOTIONS",
        kind: "Event website builder",
        description:
          "A tool to create the website of a wedding, an engagement or a conference: pick a template, personalize it, then send it to guests in a single link.",
        features: ["Customizable templates", "No technical skills needed"],
        alt: "Home page of the MILLE EMOTIONS website",
      },
    },

    service: {
      ariaLabel: "My services",
      label: "Services",
      title: "Two fields, the same care.",
      experience: "years of experience",
      getInTouch: "Let's talk about it",
      web: {
        title: "Web",
        description:
          "From modern websites to robust applications, I create scalable, high-performing solutions for your business needs.",
        features: [
          "Web applications",
          "Web design",
          "Backend development",
          "RESTful APIs",
          "Code quality assurance",
        ],
      },
      mobile: {
        title: "Mobile",
        description:
          "I develop iOS and Android applications that deliver smooth experiences and native performance.",
        features: [
          "Mobile applications",
          "Cross-platform development",
          "UI/UX optimization",
          "App deployment",
          "Performance optimization",
        ],
      },
    },

    contact: {
      ariaLabel: "Contact",
      label: "Contact",
      title: "Got a project in mind?",
      titleAccent: "Let's talk.",
      subtitle: "Write to me directly, or describe what you need here.",
      copy: "Copy the address",
      copied: "Address copied",
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
        requiredHint: "* Required fields",
        send: "Continue in my mail app",
        errors: {
          required: "This field is required.",
          email: "Enter a valid email address, for example name@domain.com.",
        },
        mailBody: "Message from",
        sent: "Your mail app is opening with the message ready to send. Nothing happening? Write to me directly at",
      },
    },

    footer: {
      copyright: "All rights reserved.",
      backToTop: "Back to top",
    },

    common: {
      pauseAnimation: "Pause the scrolling logos",
      playAnimation: "Resume the scrolling logos",
    },
  },
};
