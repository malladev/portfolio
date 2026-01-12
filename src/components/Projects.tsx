import React from "react";
import { HoverEffect } from "./ui/ProjectUI.tsx";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext.jsx";


export function Projects() {
    const { t } = useLanguage();
    return (
        <section id="project" className="bg-gray-900 py-10 relative" aria-label={t('projects.ariaLabel')}>
            <div className="absolute h-full w-full flex justify-center items-start -top-8">
                <img src="./triangle-down.svg" alt="" aria-hidden="true" className="w-20 white-icon" />
            </div>

            <div className="max-w-5xl z-50 mx-auto mt-20 lg:p-0 px-5">
                <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className=" text-gray-200 py-4 text-center text-4xl font-bold tracking-tight md:text-6xl"
                >
                    {t('projects.title')} <span className="from-indigo-500 bg-gradient-to-r to-gray-200 text-transparent bg-clip-text">{t('projects.titleHighlight')}</span>
                </motion.h1>
                <HoverEffect items={getProjects(t)} />
            </div>
        </section>
    );
}

// Function to get projects with translations
export const getProjects = (t) => [
    {
        title: t('projects.assuranceLafia.title'),
        description: t('projects.assuranceLafia.description'),
        link: "#",
        techs: [{ name: ["Angular JS"] }, { name: ["Tailwind CSS"] }, { name: ["Spring Boot"] }, { name: ["MySql"] }]
    },
    {
        title: t('projects.eshop.title'),
        description: t('projects.eshop.description'),
        link: "#",
        techs: [{ name: ["Next JS"] }, { name: ["Tailwind CSS"] }, { name: ["Nest JS"] }, { name: ["MongoDB"] }, { name: ["Prisma"] }]
    },
    {
        title: t('projects.hubScolaire.title'),
        description: t('projects.hubScolaire.description'),
        link: "#",
        techs: [{ name: ["React Native"] }, { name: ["Tailwind CSS"] }, { name: ["MongoDB"] }]
    }
];
