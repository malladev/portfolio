import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-transparent">
      <div className="mx-auto max-w-5xl py-5 mb-5 border-t-2 border-black">
        <div className="md:order-1">
          <p className="text-center text-xs leading-5 text-gray-700">
            &copy; {new Date().getFullYear()} Mohamed Lamine KONE. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
