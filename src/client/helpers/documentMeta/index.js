export const homeMeta = ({
  title = 'Mateusz Harnik | Blog o kodowaniu',
  description = 'Blog o kodowaniu założony przez Mateusza Harnik. Znajdziesz tutaj informacje, porady oraz wiedzę o kodowaniu stron internetowych.',
  image = '',
  url = '',
  twitterType = 'summary',
  ogType = 'website',
  keywords = 'Mateusz Harnik, front-end, back-end, blog, kodowanie, strony internetowe',
} = {}) => ({
  keywords,
  description,
  'og:title': title,
  'og:description': description,
  'og:image': image,
  'og:type': ogType,
  'twitter:title': title,
  'twitter:description': description,
  'twitter:image': image,
  'og:url': url,
  'twitter:card': twitterType,
});

export const contactMeta = ({
  title = 'Kontakt',
  description = 'Zobacz jak można się ze mną skontaktować.',
} = {}) => ({
  description,
  'og:title': title,
  'og:description': description,
  'twitter:title': title,
  'twitter:description': description,
});

export const aboutMeta = ({
  title = 'O blogu',
  description = 'Dowiedz się czegoś o blogu oraz o jego autorach.',
} = {}) => ({
  description,
  'og:title': title,
  'og:description': description,
  'twitter:title': title,
  'twitter:description': description,
});

export const faqMeta = ({
  title = 'Najczęściej zadawane pytania',
  description = 'Sprawdź najczęściej zadawane pytania.',
} = {}) => ({
  description,
  'og:title': title,
  'og:description': description,
  'twitter:title': title,
  'twitter:description': description,
});

export const postsMeta = ({
  title = 'Wszystkie posty',
  description = 'Zobacz wszystkie posty.',
} = {}) => ({
  description,
  'og:title': title,
  'og:description': description,
  'twitter:title': title,
  'twitter:description': description,
});

export const profileMeta = ({
  title = 'Profil użytkownika',
  description = 'Podgląd profilu.',
} = {}) => ({
  description,
  'og:title': title,
  'og:description': description,
  'twitter:title': title,
  'twitter:description': description,
});

export const settingsMeta = ({
  title = 'Ustawienia',
  description = 'Ustawienia profilu.',
} = {}) => ({
  description,
  'og:title': title,
  'og:description': description,
  'twitter:title': title,
  'twitter:description': description,
});

export const dashboardMeta = ({
  title = 'Panel administratora',
  description = 'Zarządzaj blogiem.',
} = {}) => ({
  description,
  'og:title': title,
  'og:description': description,
  'twitter:title': title,
  'twitter:description': description,
});

export const adminSignInMeta = ({
  title = 'Zaloguj się',
  description = 'Zaloguj się do konta administratora.',
} = {}) => ({
  description,
  'og:title': title,
  'og:description': description,
  'twitter:title': title,
  'twitter:description': description,
});

export const signInMeta = ({
  title = 'Zaloguj się',
  description = 'Zaloguj się do konta.',
} = {}) => ({
  description,
  'og:title': title,
  'og:description': description,
  'twitter:title': title,
  'twitter:description': description,
});

export const signUpMeta = ({
  title = 'Zarejestruj się',
  description = 'Utwórz nowe konto.',
} = {}) => ({
  description,
  'og:title': title,
  'og:description': description,
  'twitter:title': title,
  'twitter:description': description,
});

export const notFoundMeta = ({ title = '404', description = 'Nie znaleziono strony.' } = {}) => ({
  description,
  'og:title': title,
  'og:description': description,
  'twitter:title': title,
  'twitter:description': description,
});

export const docsMeta = ({ title = 'Dokumentacja', description = 'Zaloguj się do dokumentacji API.' } = {}) => ({
  description,
  'og:title': title,
  'og:description': description,
  'twitter:title': title,
  'twitter:description': description,
});

export const setTitle = (title = 'Mateusz Harnik') => {
  const newTitle = title.trim();

  if (!newTitle) return null;

  document.title = newTitle;

  return newTitle;
};

export const setMeta = (meta = {}) => {
  const defaultMeta = Object.assign(homeMeta(), meta);

  Object.keys(defaultMeta).forEach((key) => {
    if (!defaultMeta[key]) return;

    const element = document.querySelector(
      `meta[${key.startsWith('og:') ? 'property' : 'name'}="${key}"]`,
    );

    if (!element || element?.getAttribute('content') === defaultMeta[key]) return;

    element?.setAttribute('content', defaultMeta[key]);
  });
};
