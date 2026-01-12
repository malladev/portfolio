import React from "react";
import Layout from "./Layout";
import { motion } from "framer-motion";
import { 
  CodeBracketIcon, 
  ServerIcon, 
  PaintBrushIcon,
  ShieldCheckIcon,
  BoltIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: {
    name: string;
    level: number; // 0-100
    years?: string;
  }[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Development",
    icon: <CodeBracketIcon className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React / Next.js", level: 90, years: "3+ ans" },
      { name: "TypeScript", level: 85, years: "2+ ans" },
      { name: "Angular", level: 80, years: "2+ ans" },
      { name: "Tailwind CSS", level: 95, years: "3+ ans" },
      { name: "React Native", level: 85, years: "2+ ans" },
      { name: "Flutter", level: 75, years: "1+ an" },
    ],
  },
  {
    name: "Backend Development",
    icon: <ServerIcon className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Spring Boot", level: 85, years: "2+ ans" },
      { name: "NestJS", level: 80, years: "2+ ans" },
      { name: "Node.js", level: 85, years: "2+ ans" },
      { name: "RESTful APIs", level: 90, years: "3+ ans" },
      { name: "GraphQL", level: 70, years: "1+ an" },
      { name: "Microservices", level: 75, years: "1+ an" },
    ],
  },
  {
    name: "UX/UI Design",
    icon: <PaintBrushIcon className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Figma", level: 95, years: "3+ ans" },
      { name: "Adobe Photoshop", level: 85, years: "2+ ans" },
      { name: "Design System", level: 90, years: "3+ ans" },
      { name: "User Research", level: 80, years: "2+ ans" },
      { name: "Prototyping", level: 90, years: "3+ ans" },
      { name: "Accessibility (WCAG)", level: 85, years: "2+ ans" },
    ],
  },
  {
    name: "Performance & Security",
    icon: <ShieldCheckIcon className="w-8 h-8" />,
    color: "from-red-500 to-orange-500",
    skills: [
      { name: "Code Optimization", level: 88, years: "3+ ans" },
      { name: "Security Best Practices", level: 85, years: "2+ ans" },
      { name: "Performance Monitoring", level: 80, years: "2+ ans" },
      { name: "SEO Optimization", level: 85, years: "2+ ans" },
      { name: "Lighthouse Optimization", level: 90, years: "2+ ans" },
      { name: "PWA Development", level: 80, years: "1+ an" },
    ],
  },
  {
    name: "DevOps & Tools",
    icon: <BoltIcon className="w-8 h-8" />,
    color: "from-yellow-500 to-amber-500",
    skills: [
      { name: "Git / GitHub", level: 90, years: "3+ ans" },
      { name: "Docker", level: 75, years: "1+ an" },
      { name: "CI/CD", level: 80, years: "2+ ans" },
      { name: "Testing (Jest, Cypress)", level: 85, years: "2+ ans" },
      { name: "Database Design", level: 85, years: "2+ ans" },
      { name: "MongoDB / MySQL", level: 85, years: "2+ ans" },
    ],
  },
];

const SkillBar = ({ skill, delay }: { skill: { name: string; level: number; years?: string }; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium text-sm sm:text-base">{skill.name}</span>
          {skill.years && (
            <span className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">
              {skill.years}
            </span>
          )}
        </div>
        <span className="text-indigo-400 font-semibold text-sm">{skill.level}%</span>
      </div>
      <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full relative"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: delay + 0.8, duration: 0.5 }}
            viewport={{ once: true }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function SkillsDetailed() {
  return (
    <div id="skills" className="relative isolate overflow-hidden bg-gray-950 py-20">
      <div className="absolute h-full w-full flex justify-center items-start -top-8">
        <img src="./triangle-down.svg" alt="triangle-down" className="w-20 white-icon" />
      </div>
      
      <Layout>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-white">Compétences </span>
            <span className="from-indigo-500 bg-gradient-to-r to-gray-200 text-transparent bg-clip-text">
              Techniques
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Une maîtrise approfondie des technologies modernes avec une approche axée sur la performance, 
            la sécurité et l'expérience utilisateur
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {skillCategories.map((category, categoryIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIdx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${category.color} mb-6`}>
                <div className="text-white">
                  {category.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-6">{category.name}</h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIdx) => (
                  <SkillBar 
                    key={skill.name} 
                    skill={skill} 
                    delay={categoryIdx * 0.1 + skillIdx * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Performance Score", value: "95+", icon: <ChartBarIcon className="w-6 h-6" /> },
            { label: "Security Score", value: "A+", icon: <ShieldCheckIcon className="w-6 h-6" /> },
            { label: "Accessibility", value: "WCAG 2.1", icon: <BoltIcon className="w-6 h-6" /> },
            { label: "Code Quality", value: "95%", icon: <CodeBracketIcon className="w-6 h-6" /> },
          ].map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 text-center hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-500/20 text-indigo-400 mb-3">
                {metric.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Layout>
    </div>
  );
}
