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
import Link from '@client/router/components/Link';
import Logo from '@client/components/Images/Logo';
import Box from '@client/components/Box';
import List from '@client/components/Lists/List';
import ListItem from '@client/components/Lists/ListItem';

const year = new Date().getFullYear();

const PATH = 'footer';

const Footer = memo((props) => {
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
    <Box
      as="footer"
      className="footer"
      {...props}
    >
      {shouldRender && (
        <Box className="footer-links mx-auto mb-4">
          <List className="footer-links__list m-0 p-0 d-flex justify-content-center">
            {contact?.email && config?.show_email && (
              <ListItem className="footer-links__item">
                <Box
                  as="span"
                  className="visually-hidden"
                >
                  {t(`${PATH}.email.EMAIL_LABEL`)}
                </Box>
                <Link
                  to={mailTo}
                  title={t(`${PATH}.email.EMAIL_TITLE`)}
                  className="footer-links__link"
                >
                  <Box
                    as="span"
                    className="visually-hidden"
                  >
                    {contact?.email}
                  </Box>{' '}
                  <Box
                    as="span"
                    className="footer-links__icon"
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      fixedWidth
                    />
                  </Box>
                </Link>
              </ListItem>
            )}
            {contact?.facebook_url && config?.show_social_media && (
              <ListItem className="footer-links__item">
                <Box
                  as="span"
                  className="visually-hidden"
                >
                  {t(`${PATH}.socialMedia.facebook.FACEBOOK_LABEL`)}
                </Box>
                <Link
                  to={contact?.facebook_url}
                  title={t(`${PATH}.socialMedia.facebook.FACEBOOK_TITLE`)}
                  className="footer-links__link"
                >
                  <Box
                    as="span"
                    className="visually-hidden"
                  >
                    {contact?.facebook_url}
                  </Box>{' '}
                  <Box
                    as="span"
                    className="footer-links__icon"
                  >
                    <FontAwesomeIcon
                      icon={faFacebook}
                      fixedWidth
                    />
                  </Box>
                </Link>
              </ListItem>
            )}
            {contact?.github_url && config?.show_social_media && (
              <ListItem className="footer-links__item">
                <Box
                  as="span"
                  className="visually-hidden"
                >
                  {t(`${PATH}.socialMedia.github.GITHUB_LABEL`)}
                </Box>
                <Link
                  to={contact?.github_url}
                  title={t(`${PATH}.socialMedia.github.GITHUB_TITLE`)}
                  className="footer-links__link"
                >
                  <Box
                    as="span"
                    className="visually-hidden"
                  >
                    {contact?.github_url}
                  </Box>{' '}
                  <Box
                    as="span"
                    className="footer-links__icon"
                  >
                    <FontAwesomeIcon
                      icon={faGithub}
                      fixedWidth
                    />
                  </Box>
                </Link>
              </ListItem>
            )}
            {contact?.instagram_url && config?.show_social_media && (
              <ListItem className="footer-links__item">
                <Box
                  as="span"
                  className="visually-hidden"
                >
                  {t(`${PATH}.socialMedia.instagram.INSTAGRAM_LABEL`)}
                </Box>
                <Link
                  to={contact?.instagram_url}
                  title={t(`${PATH}.socialMedia.instagram.INSTAGRAM_TITLE`)}
                  className="footer-links__link"
                >
                  <Box
                    as="span"
                    className="visually-hidden"
                  >
                    {contact?.instagram_url}
                  </Box>{' '}
                  <Box
                    as="span"
                    className="footer-links__icon"
                  >
                    <FontAwesomeIcon
                      icon={faInstagram}
                      fixedWidth
                    />
                  </Box>
                </Link>
              </ListItem>
            )}
            {contact?.twitter_url && config?.show_social_media && (
              <ListItem className="footer-links__item">
                <Box
                  as="span"
                  className="visually-hidden"
                >
                  {t(`${PATH}.socialMedia.twitter.TWITTER_LABEL`)}
                </Box>
                <Link
                  to={contact?.twitter_url}
                  title={t(`${PATH}.socialMedia.twitter.TWITTER_TITLE`)}
                  className="footer-links__link"
                >
                  <Box
                    as="span"
                    className="visually-hidden"
                  >
                    {contact?.twitter_url}
                  </Box>{' '}
                  <Box
                    as="span"
                    className="footer-links__icon"
                  >
                    <FontAwesomeIcon
                      icon={faTwitter}
                      fixedWidth
                    />
                  </Box>
                </Link>
              </ListItem>
            )}
          </List>
        </Box>
      )}
      <Box className="text-center mb-4">
        <Logo />
      </Box>
      <Box className="text-center">
        {t(`${PATH}.COPYRIGHT`, { year })}
      </Box>
    </Box>
  );
});

Footer.displayName = 'Footer';

export default Footer;
