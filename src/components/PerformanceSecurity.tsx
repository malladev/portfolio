import React from "react";
import Layout from "./Layout";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  BoltIcon,
  LockClosedIcon,
  ChartBarIcon,
  ServerIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "../contexts/LanguageContext.jsx";

// Function to get performance features with translations
const getPerformanceFeatures = (t) => [
  {
    title: t('performanceSecurity.performance.features.codeSplitting.title'),
    description: t('performanceSecurity.performance.features.codeSplitting.description'),
    icon: <BoltIcon className="w-6 h-6" />,
    metrics: t('performanceSecurity.performance.features.codeSplitting.metrics'),
  },
  {
    title: t('performanceSecurity.performance.features.imageOptimization.title'),
    description: t('performanceSecurity.performance.features.imageOptimization.description'),
    icon: <EyeIcon className="w-6 h-6" />,
    metrics: t('performanceSecurity.performance.features.imageOptimization.metrics'),
  },
  {
    title: t('performanceSecurity.performance.features.caching.title'),
    description: t('performanceSecurity.performance.features.caching.description'),
    icon: <ServerIcon className="w-6 h-6" />,
    metrics: t('performanceSecurity.performance.features.caching.metrics'),
  },
  {
    title: t('performanceSecurity.performance.features.monitoring.title'),
    description: t('performanceSecurity.performance.features.monitoring.description'),
    icon: <ChartBarIcon className="w-6 h-6" />,
    metrics: t('performanceSecurity.performance.features.monitoring.metrics'),
  },
];

// Function to get security features with translations
const getSecurityFeatures = (t) => [
  {
    title: t('performanceSecurity.security.features.codingPractices.title'),
    description: t('performanceSecurity.security.features.codingPractices.description'),
    icon: <LockClosedIcon className="w-6 h-6" />,
    practices: t('performanceSecurity.security.features.codingPractices.practices'),
  },
  {
    title: t('performanceSecurity.security.features.authentication.title'),
    description: t('performanceSecurity.security.features.authentication.description'),
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    practices: t('performanceSecurity.security.features.authentication.practices'),
  },
  {
    title: t('performanceSecurity.security.features.dataProtection.title'),
    description: t('performanceSecurity.security.features.dataProtection.description'),
    icon: <LockClosedIcon className="w-6 h-6" />,
    practices: t('performanceSecurity.security.features.dataProtection.practices'),
  },
  {
    title: t('performanceSecurity.security.features.headers.title'),
    description: t('performanceSecurity.security.features.headers.description'),
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    practices: t('performanceSecurity.security.features.headers.practices'),
  },
];

export default function PerformanceSecurity() {
  const { t } = useLanguage();
  const performanceFeatures = getPerformanceFeatures(t);
  const securityFeatures = getSecurityFeatures(t);

  return (
    <div className="relative isolate overflow-hidden bg-gray-950 py-20">
      <div className="absolute h-full w-full flex justify-center items-start -top-8">
        <img src="./triangle-down.svg" alt="" aria-hidden="true" className="w-20 white-icon" />
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
            <span className="text-white">{t('performanceSecurity.title')} </span>
            <span className="from-indigo-500 bg-gradient-to-r to-green-500 text-transparent bg-clip-text">
              {t('performanceSecurity.titleHighlight')}
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            {t('performanceSecurity.subtitle')}
          </p>
        </motion.div>

        {/* Performance Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500">
              <BoltIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white">Performance Optimization</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {performanceFeatures.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-500/20 text-indigo-400 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-400 mb-3 leading-relaxed">{feature.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                      <ChartBarIcon className="w-4 h-4" />
                      {feature.metrics}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Security Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-pink-500">
              <ShieldCheckIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white">{t('performanceSecurity.security.title')}</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityFeatures.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-red-500/20 text-red-400 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-400 mb-4 leading-relaxed">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.practices.map((practice) => (
                        <span
                          key={practice}
                          className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium border border-red-500/30"
                        >
                          {practice}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Security Score Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <ShieldCheckIcon className="w-12 h-12 text-white" />
            <div>
              <div className="text-4xl font-bold text-white mb-1">{t('performanceSecurity.security.rating.title')}</div>
              <div className="text-gray-200">{t('performanceSecurity.security.rating.subtitle')}</div>
            </div>
          </div>
        </motion.div>
      </Layout>
    </div>
  );
}
