import Layout from "./Layout";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function MySkills() {
  const { t } = useLanguage();
  return (
    <div id="tech">
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-10 hover:text-indigo-500 hover:duration-500 hover:transition-colors text-white py-4 text-center text-4xl font-bold tracking-tight md:text-6xl"
      >
        {t('skills.title')} <span className="from-indigo-500 bg-gradient-to-r to-slate-200 text-transparent bg-clip-text whitespace-pre-line">{t('skills.titleHighlight')}</span> 
      </motion.h1>
      <Layout>
        <div className="md:mt-20 mt-5">
          <div className="relative">
            <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
            <div className="grid grid-cols-1 items-start gap-x-8 gap-y-16 lg:grid-cols-2">
              <div className="mx-auto w-full lg:mx-0">
                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  {t('skills.subtitle')} <span className="text-indigo-500">{t('skills.subtitleHighlight')}</span> {t('skills.subtitleEnd')}
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-400">
                  {t('skills.description')}
                </p>
              </div>
              <div className="mx-auto grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-2 sm:gap-x-10 items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
                {tech.map((t) => (
                  <div key={t.name} className="flex items-center gap-2">
                    <img
                      className="sm:w-10 w-8 object-contain object-left"
                      src={t.picture}
                      alt={`Logo ${t.name}`}
                      loading="lazy"
                      width="40"
                      height="40"
                    />
                    <span className="text-white text-lg sm:text-2xl">
                      {t.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

const tech = [
  {
    picture: "./assets/tech/white/angular.png",
    name: "Angular",
  },
  {
    picture: "./assets/tech/white/figma.png",
    name: "Figma",
  },
  {
    picture: "./assets/tech/white/react.png",
    name: "React Native",
  },
  {
    picture: "./assets/tech/white/springboot.png",
    name: "Spring Boot",
  },
  {
    picture: "./assets/tech/white/tailwind.png",
    name: "Tailwind CSS",
  },
  {
    picture: "./assets/tech/white/next.png",
    name: "Next JS",
  },
  {
    picture: "./assets/tech/white/photoshop.png",
    name: "Photoshp",
  },{
    picture: "./assets/tech/white/nest.png",
    name: "Nest JS",
  },
];
