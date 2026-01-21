import { PlusIcon } from "@heroicons/react/20/solid";
import Layout from "./Layout";
import { IconEqual } from "@tabler/icons-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="relative isolate overflow-hidden py-20" aria-label="About me">
      <div className="md:flex -z-10 hidden item-center -rotate-12 -left-6 gap-1 top-[40%] absolute leading-5 ring-1 ring-gray-200 p-2 rounded">
        <div className="md:py-1 py-0 px-6 bg-blue-200"></div>
        <h1 className="text-gray-400 md:text-base text-xs whitespace-pre-line">
          {t('about.roles.uxui')}
        </h1>
      </div>
      <div className="md:flex -z-10 hidden item-center -rotate-12 -left-6 top-[60%] gap-1 absolute leading-5 ring-1 ring-gray-200 p-2 rounded">
        <div className="md:py-1 py-0 px-6 bg-indigo-400"></div>
        <h1 className="text-gray-400 md:text-base text-xs whitespace-pre-line">
          {t('about.roles.graphic')}
        </h1>
      </div>
      <div className="md:flex -z-10 hidden item-center rotate-12 flex-row-reverse top-[40%] text-right -right-6 gap-1 absolute leading-5 ring-1 ring-gray-200 p-2 rounded">
        <div className="md:py-1 py-0 px-6 bg-yellow-200"></div>
        <h1 className="text-gray-400 md:text-base text-xs whitespace-pre-line">
          {t('about.roles.web')}
        </h1>
      </div>
      <div className="md:flex -z-10 hidden item-center flex-row-reverse text-right rotate-12 -right-6 top-[60%] gap-1 absolute leading-5 ring-1 ring-gray-200 p-2 rounded">
        <div className="md:py-1 py-0 px-6 bg-green-400"></div>
        <h1 className="text-gray-400 md:text-base text-xs whitespace-pre-line">
          {t('about.roles.mobile')}
        </h1>
      </div>
      <div className="absolute h-full -z-10 w-full flex justify-center items-start -top-8">
        <img
          src="./triangle-down.svg"
          alt=""
          aria-hidden="true"
          className="w-20 black-icon"
          loading="lazy"
          width="80"
          height="80"
        />
      </div>
      <div
        className="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(70%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>
      <Layout>
        {/* Statistique */}
        <div className="flex sm:flex-row flex-col items-center justify-center md:gap-10 lg:gap-32 gap-5">
          <div className="md:h-60 w-full h-44 px-5 text-center border-4 flex flex-col items-center justify-center gap-3 border-green-500 bg-green-100 border-dashed rounded-lg">
            <span className="md:text-6xl sm:text-4xl text-6xl font-semibold text-gray-700 tracking-tighter">
              4+
            </span>
            <h4 className="text-xl text-gray-700">{t('about.yearsExperience')}</h4>
          </div>
          <div className="md:h-60 w-full h-44 px-5 text-center border-4 flex flex-col items-center justify-center gap-3 border-blue-500 bg-blue-200 border-dashed rounded-lg">
            <span className="md:text-6xl sm:text-4xl text-6xl font-semibold text-gray-700 tracking-tighter">
              20+
            </span>
            <h4 className="text-xl text-gray-700">{t('about.accomplishments')}</h4>
          </div>
          <div className="md:h-60 w-full h-44 px-5 text-center border-4 flex flex-col items-center justify-center gap-3 border-yellow-500 bg-yellow-100 border-dashed rounded-lg">
            <span className="md:text-6xl sm:text-4xl text-6xl font-semibold text-gray-700 tracking-tighter">
              30+
            </span>
            <h4 className="text-xl text-gray-700">{t('about.satisfiedCustomers')}</h4>
          </div>
        </div>

        {/* About */}
        <section className="flex-col mt-16 flex items-center justify-center text-center gap-10" aria-label={t('about.ariaLabel')}>
          <h2 className="text-3xl font-normal">{t('about.efficientUX')}</h2>
          <div className="bg-indigo-300 rounded-full p-2">
            <PlusIcon className="w-5 h-5" />
          </div>
          <h2 className="text-3xl font-normal">{t('about.beautifulUI')}</h2>
          <div className="bg-green-300 rounded-full p-2">
            <PlusIcon className="w-5 h-5" />
          </div>
          <h2 className="text-3xl font-normal">{t('about.softwareDevelopment')}</h2>
          <div className="bg-red-300 rounded-full p-2">
            <IconEqual className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-4xl font-semibold ">{t('about.title')}</h2>
            <p className="text-gray-500 max-w-4xl text-lg">
              {t('about.description1')}
            </p>

            <p className="text-gray-400 max-w-4xl mt-5">
              {t('about.description2')}
            </p>
            
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {t('about.tags.fullstack')}
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {t('about.tags.uxui')}
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {t('about.tags.performance')}
              </span>
              <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                {t('about.tags.security')}
              </span>
            </div>
          </div>
        </section>
      </Layout>
    </section>
  );
}
