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
        title: t('projects.telecelUssd.title'),
        description: t('projects.telecelUssd.description'),
        link: "https://apkpure.com/p/com.malladev.telecel_ussd",
        techs: [{ name: ["Flutter"] }, { name: ["Dart"] }, { name: ["Shared Preferences"] }, { name: ["USSD"] }]
    },
    {
        title: t('projects.evimo.title'),
        description: t('projects.evimo.description'),
        link: "https://apkpure.com/p/com.malladev.evimomobile",
        techs: [{ name: ["Flutter"] }, { name: ["Dart"] }, { name: ["Firebase"] }, { name: ["Firebase SDK Admin"] }, { name: ["Shared Preferences"] }, { name: ["Flutter Secure Storage"] }]
    },
    {
        title: t('projects.documali.title'),
        description: t('projects.documali.description'),
        link: "https://documali.vercel.app/",
        techs: [{ name: ["Flutter"] }, { name: ["Tailwind CSS"] }, { name: ["Next Js"] }, { name: ["Firebase"] }, { name: ["CloudFare"] }]
    }
];
