import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher({ locales }: { locales: string[] }) {
    const { i18n } = useTranslation();

    const changeLocale = (locale: string) => {
        router.post(
            '/locale',
            { locale },
            {
                preserveState: true,
                onSuccess: () => i18n.changeLanguage(locale),
            },
        );
    };

    return (
        <select
            onChange={(e) => changeLocale(e.target.value)}
            defaultValue={i18n.language}
        >
            {locales.map((l) => (
                <option key={l} value={l}>
                    {l.toUpperCase()}
                </option>
            ))}
        </select>
    );
}

export default LanguageSwitcher;
