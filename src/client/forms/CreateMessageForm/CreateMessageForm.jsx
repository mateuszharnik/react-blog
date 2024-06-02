import { memo, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { useForm } from '@client/hooks/useForm';
import { useMessages } from '@client/store/messages';
import { createMessageSchema } from '@client/schemas/createMessageSchemas';
import FormContext from '@client/contexts/FormContext';
import FormTextInput from '@client/contexts/FormContext/components/FormTextInput';
import FormTextareaInput from '@client/contexts/FormContext/components/FormTextareaInput';
import FormGroup from '@client/contexts/FormContext/components/FormGroup';
import Box from '@client/components/Box';
import Button from '@client/components/Buttons/Button';

const FORMS_PATH = 'forms';
const PATH = 'forms.createMessageForm';

const CreateMessageForm = memo((props) => {
  const { t } = useTranslation();

  const {
    actions: { createMessage },
    utils: { createMessageMetadata, resetCreateMessageMetadata },
  } = useMessages();

  const icon = useMemo(() => (
    createMessageMetadata.isFetching ? faCircleNotch : faPaperPlane
  ), [createMessageMetadata.isFetching]);

  const initialValues = useMemo(() => ({
    first_name: '',
    last_name: '',
    email: '',
    subject: '',
    contents: '',
  }), []);

  const validationSchema = useMemo(() => createMessageSchema, []);

  const form = useForm({
    initialValues,
    validationSchema,
    onSubmit: async (payload, { resetForm }) => {
      await createMessage({
        payload,
        onSuccess: () => {
          resetForm();
        },
      });
    },
  });

  useEffect(() => () => {
    resetCreateMessageMetadata();
  }, []);

  return (
    <FormContext
      form={form}
      {...props}
    >
      <FormGroup className="col-md-6">
        <FormTextInput
          field="first_name"
          label={t(`${PATH}.firstName.LABEL`)}
          placeholder={t(`${PATH}.firstName.PLACEHOLDER`)}
        />
      </FormGroup>
      <FormGroup className="col-md-6">
        <FormTextInput
          field="last_name"
          label={t(`${PATH}.lastName.LABEL`)}
          placeholder={t(`${PATH}.lastName.PLACEHOLDER`)}
        />
      </FormGroup>
      <FormGroup>
        <FormTextInput
          field="email"
          label={t(`${PATH}.email.LABEL`)}
          placeholder={t(`${PATH}.email.PLACEHOLDER`)}
        />
      </FormGroup>
      <FormGroup>
        <FormTextInput
          field="subject"
          label={t(`${PATH}.subject.LABEL`)}
          placeholder={t(`${PATH}.subject.PLACEHOLDER`)}
        />
      </FormGroup>
      <FormGroup>
        <FormTextareaInput
          field="contents"
          label={t(`${PATH}.contents.LABEL`)}
          placeholder={t(`${PATH}.contents.PLACEHOLDER`)}
        />
      </FormGroup>
      <FormGroup
        className="text-center"
        type="button"
      >
        <Button
          type="submit"
          variant="solid"
          className="px-4"
          rounded
          title={t(`${FORMS_PATH}.SEND_MESSAGE`)}
          disabled={createMessageMetadata.isFetching}
        >
          <Box as="span">
            {t(`${FORMS_PATH}.SEND`)}
          </Box>{' '}
          <Box
            as="span"
            className="ms-1"
          >
            <FontAwesomeIcon
              spin={createMessageMetadata.isFetching}
              icon={icon}
            />
          </Box>
        </Button>
      </FormGroup>
    </FormContext>
  );
});

CreateMessageForm.displayName = 'CreateMessageForm';

export default CreateMessageForm;
