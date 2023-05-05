import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { useContact } from '@client/store/contact';
import { useConfig } from '@client/store/config';
import Logo from '@client/components/Logo';

const year = new Date().getFullYear();

const PATH = 'footer';

const Footer = memo(() => {
  const { t } = useTranslation();
  const { contact } = useContact();
  const { config } = useConfig();

  const mailTo = useMemo(() => `mailto:${contact?.email}`, [contact]);

  const shouldRender = useMemo(() => {
    const contactExist = contact ? Object.keys(contact)
      .filter((key) => key === 'email' || key.includes('_url'))
      .filter((key) => contact[key]).length : null;

    return !!contactExist && (config?.show_email || config?.show_social_media);
  }, [contact, config]);

  return (
    <footer className="footer">
      {shouldRender && (
        <div className="footer-links mx-auto mb-4">
          <ul className="footer-links__list m-0 p-0 d-flex justify-content-center">
            {contact?.email && config?.show_email && (
              <li className="footer-links__item">
                <span className="visually-hidden">
                  {t(`${PATH}.email.EMAIL_LABEL`)}
                </span>
                <a
                  href={mailTo}
                  title={t(`${PATH}.email.EMAIL_TITLE`)}
                  className="footer-links__link"
                >
                  <span className="visually-hidden">
                    {contact?.email}
                  </span>{' '}
                  <span className="footer-links__icon">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      fixedWidth
                    />
                  </span>
                </a>
              </li>
            )}
            {contact?.facebook_url && config?.show_social_media && (
              <li className="footer-links__item">
                <span className="visually-hidden">
                  {t(`${PATH}.socialMedia.facebook.FACEBOOK_LABEL`)}
                </span>
                <a
                  href={contact?.facebook_url}
                  title={t(`${PATH}.socialMedia.facebook.FACEBOOK_TITLE`)}
                  className="footer-links__link"
                >
                  <span className="visually-hidden">
                    {contact?.facebook_url}
                  </span>{' '}
                  <span className="footer-links__icon">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      fixedWidth
                    />
                  </span>
                </a>
              </li>
            )}
            {contact?.github_url && config?.show_social_media && (
              <li className="footer-links__item">
                <span className="visually-hidden">
                  {t(`${PATH}.socialMedia.github.GITHUB_LABEL`)}
                </span>
                <a
                  href={contact?.github_url}
                  title={t(`${PATH}.socialMedia.github.GITHUB_TITLE`)}
                  className="footer-links__link"
                >
                  <span className="visually-hidden">
                    {contact?.github_url}
                  </span>{' '}
                  <span className="footer-links__icon">
                    <FontAwesomeIcon
                      icon={faGithub}
                      fixedWidth
                    />
                  </span>
                </a>
              </li>
            )}
            {contact?.instagram_url && config?.show_social_media && (
              <li className="footer-links__item">
                <span className="visually-hidden">
                  {t(`${PATH}.socialMedia.instagram.INSTAGRAM_LABEL`)}
                </span>
                <a
                  href={contact?.instagram_url}
                  title={t(`${PATH}.socialMedia.instagram.INSTAGRAM_TITLE`)}
                  className="footer-links__link"
                >
                  <span className="visually-hidden">
                    {contact?.instagram_url}
                  </span>{' '}
                  <span className="footer-links__icon">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      fixedWidth
                    />
                  </span>
                </a>
              </li>
            )}
            {contact?.twitter_url && config?.show_social_media && (
              <li className="footer-links__item">
                <span className="visually-hidden">
                  {t(`${PATH}.socialMedia.twitter.TWITTER_LABEL`)}
                </span>
                <a
                  href={contact?.twitter_url}
                  title={t(`${PATH}.socialMedia.twitter.TWITTER_TITLE`)}
                  className="footer-links__link"
                >
                  <span className="visually-hidden">
                    {contact?.twitter_url}
                  </span>{' '}
                  <span className="footer-links__icon">
                    <FontAwesomeIcon
                      icon={faTwitter}
                      fixedWidth
                    />
                  </span>
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
      <div className="text-center mb-4">
        <Logo />
      </div>
      <div className="text-center">
        {t(`${PATH}.COPYRIGHT`, { year })}
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
