import React from "react";
import Layout from "./Layout";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  LightBulbIcon,
  PaintBrushIcon,
  DevicePhoneMobileIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const methodologies = [
  {
    title: "User Research",
    description: "In-depth analysis of user needs with personas, user journeys and usability testing",
    icon: <UserGroupIcon className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Design Thinking",
    description: "Iterative process of empathy, definition, ideation, prototyping and testing for innovative solutions",
    icon: <LightBulbIcon className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Design System",
    description: "Creation of consistent design systems with reusable components and comprehensive guidelines",
    icon: <PaintBrushIcon className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Responsive Design",
    description: "Adaptive interfaces optimized for all devices with mobile-first approach",
    icon: <DevicePhoneMobileIcon className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
  },
];

const uxPrinciples = [
  "Accessibility (WCAG 2.1 AA)",
  "Performance & Optimization",
  "Smooth micro-interactions",
  "Clear visual hierarchy",
  "Contrast and readability",
  "Intuitive navigation",
];

const designTools = [
  { name: "Figma", proficiency: "Expert", projects: "50+ projects" },
  { name: "Adobe Photoshop", proficiency: "Advanced", projects: "30+ projects" },
  { name: "Prototyping", proficiency: "Expert", projects: "40+ prototypes" },
  { name: "Design Systems", proficiency: "Advanced", projects: "10+ systems" },
];

export default function UXUIExpertise() {
  return (
    <div className="relative isolate overflow-hidden bg-white py-20">
      <div className="absolute h-full w-full flex justify-center items-start -top-8">
        <img src="./triangle-down.svg" alt="" aria-hidden="true" className="w-20 black-icon" />
      </div>

      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
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
            <span className="text-gray-900">Expertise </span>
            <span className="from-indigo-500 bg-gradient-to-r to-purple-500 text-transparent bg-clip-text">
              UX/UI Design
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            A user-centered approach combining research, design and prototyping to create 
            memorable and performant digital experiences
          </p>
        </motion.div>

        {/* Methodologies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {methodologies.map((method, idx) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {method.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-gray-600 leading-relaxed">{method.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* UX Principles */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-2xl p-8 border border-gray-800"
          >
            <div className="flex items-center gap-3 mb-6">
              <SparklesIcon className="w-8 h-8 text-indigo-400" />
              <h3 className="text-2xl font-bold text-white">UX/UI Principles</h3>
            </div>
            <ul className="space-y-4">
              {uxPrinciples.map((principle, idx) => (
                <motion.li
                  key={principle}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircleIcon className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{principle}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Design Tools */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <PaintBrushIcon className="w-8 h-8 text-indigo-600" />
              <h3 className="text-2xl font-bold text-gray-900">Design Tools</h3>
            </div>
            <div className="space-y-4">
              {designTools.map((tool, idx) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-gray-900">{tool.name}</div>
                    <div className="text-sm text-gray-500">{tool.projects}</div>
                  </div>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {tool.proficiency}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Layout>
    </div>
  );
}
