import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollToSection } from '@client/hooks/useScrollToSection';
import PageContainer from '@client/layouts/PageContainer';
import CreateMessageForm from '@client/forms/CreateMessageForm';
import Heading from '@client/components/Typography/Heading';

const PATH = 'contact';

const ContactContent = memo(() => {
  const { t } = useTranslation();

  useScrollToSection({ id: '#text' });

  return (
    <PageContainer>
      <Heading
        id="text"
        as="h2"
        className="text-center fw-bold"
      >
        {t(`${PATH}.HEADER`)}
      </Heading>
      <CreateMessageForm />
    </PageContainer>
  );
});

ContactContent.displayName = 'ContactContent';

export default ContactContent;
