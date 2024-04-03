import { memo, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { useForm } from '@client/hooks/useForm';
import { useAbout } from '@client/store/about';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import { updateAboutSchema } from '@client/schemas/updateAboutSchemas';
import FormContext from '@client/contexts/FormContext';
import FormGroup from '@client/contexts/FormContext/components/FormGroup';
import FormLabel from '@client/contexts/FormContext/components/FormLabel';
import FormHelpText from '@client/contexts/FormContext/components/FormHelpText';
import Error from '@client/components/Errors/Error';
import Spinner from '@client/components/Spinner';
import Box from '@client/components/Box';
import Button from '@client/components/Buttons/Button';

const Editor = lazyLoad({
  loader: () => import(/* webpackChunkName: 'editor' */ '@client/components/Editor'),
  loading: Spinner,
  error: Error,
});

const FORMS_PATH = 'forms';
const PATH = 'forms.updateAboutForm';

const UpdateAboutForm = memo((props) => {
  const { t } = useTranslation();

  const {
    about,
    actions: { updateAbout },
    utils: { updateAboutMetadata, resetUpdateAboutMetadata },
  } = useAbout({ key: 'update' });

  const icon = useMemo(() => (
    updateAboutMetadata.isFetching ? faCircleNotch : faPaperPlane
  ), [updateAboutMetadata.isFetching]);

  const initialValues = useMemo(() => ({
    contents: about?.contents,
  }), [about]);

  const validationSchema = useMemo(() => updateAboutSchema, []);

  const form = useForm({
    initialValues,
    validationSchema,
    onSubmit: async (payload) => {
      await updateAbout({ payload });
    },
  });

  useEffect(() => () => {
    resetUpdateAboutMetadata();
  }, []);

  return (
    <FormContext
      form={form}
      {...props}
    >
      <FormGroup>
        <FormLabel htmlFor="contents">
          {t(`${PATH}.contents.LABEL`)}{' '}
        </FormLabel>
        <Box
          className="d-flex justify-content-center align-items-center flex-wrap"
          style={{ minHeight: '300px' }}
        >
          <Editor
            id="contents"
            name="contents"
            ariaDescribedBy="contentsHelp"
            placeholder={t(`${PATH}.contents.PLACEHOLDER`)}
            initialValue={form.values.contents}
            errors={form.errors.contents}
            touched={form.touched.contents}
            setValues={form.setValues}
            setTouched={form.setTouched}
          />
        </Box>
        <FormHelpText id="contentsHelp">
          {t(`${PATH}.contents.HELPER`)}
        </FormHelpText>
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
          title={t(`${FORMS_PATH}.SAVE_CHANGES`)}
          disabled={updateAboutMetadata.isFetching}
        >
          <Box as="span">
            {t(`${FORMS_PATH}.SAVE`)}
          </Box>{' '}
          <Box
            as="span"
            className="ms-1"
          >
            <FontAwesomeIcon
              spin={updateAboutMetadata.isFetching}
              icon={icon}
            />
          </Box>
        </Button>
      </FormGroup>
    </FormContext>
  );
});

UpdateAboutForm.displayName = 'UpdateAboutForm';

export default UpdateAboutForm;
