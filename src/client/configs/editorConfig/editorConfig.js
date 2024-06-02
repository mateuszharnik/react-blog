import EasyMDE from 'easymde';
import { i18nService as i18next } from '@client/services/i18nService';
import { sanitize } from '@client/utils/sanitizeUtils';

const { t } = i18next;

const PATH = 'dictionary.editor';

export const editorConfig = {
  autoDownloadFontAwesome: false,
  initialValue: '',
  showIcons: ['code', 'table', 'strikethrough', 'redo', 'undo'],
  placeholder: t(`${PATH}.PLACEHOLDER`),
  hideIcons: ['side-by-side', 'fullscreen', 'guide'],
  spellChecker: false,
  minHeight: '300px',
  maxHeight: '300px',
  status: false,
  toolbar: [
    {
      name: 'bold',
      action: EasyMDE.toggleBold,
      className: 'fa fa-bold',
      title: t(`${PATH}.BOLD`),
    },
    {
      name: 'italic',
      action: EasyMDE.toggleItalic,
      className: 'fa fa-italic',
      title: t(`${PATH}.ITALIC`),
    },
    {
      name: 'strikethrough',
      action: EasyMDE.toggleStrikethrough,
      className: 'fa fa-strikethrough',
      title: t(`${PATH}.STRIKETHROUGH`),
    },
    {
      name: 'heading',
      action: EasyMDE.toggleHeadingSmaller,
      className: 'fa fa-header fa-heading',
      title: t(`${PATH}.HEADING`),
    },
    '|',
    {
      name: 'code',
      action: EasyMDE.toggleCodeBlock,
      className: 'fa fa-code',
      title: t(`${PATH}.CODE`),
    },
    {
      name: 'quote',
      action: EasyMDE.toggleBlockquote,
      className: 'fa fa-quote-left',
      title: t(`${PATH}.QUOTE`),
    },
    {
      name: 'unordered-list',
      action: EasyMDE.toggleUnorderedList,
      className: 'fa fa-list-ul',
      title: t(`${PATH}.UNORDERED_LIST`),
    },
    {
      name: 'ordered-list',
      action: EasyMDE.toggleOrderedList,
      className: 'fa fa-list-ol',
      title: t(`${PATH}.ORDERED_LIST`),
    },
    '|',
    {
      name: 'link',
      action: EasyMDE.drawLink,
      className: 'fa fa-link',
      title: t(`${PATH}.LINK`),
    },
    {
      name: 'image',
      action: EasyMDE.drawImage,
      className: 'fa fa-image',
      title: t(`${PATH}.IMAGE`),
    },
    {
      name: 'table',
      action: EasyMDE.drawTable,
      className: 'fa fa-table',
      title: t(`${PATH}.TABLE`),
    },
    {
      name: 'horizontal-rule',
      action: EasyMDE.drawHorizontalRule,
      className: 'fa fa-minus',
      title: t(`${PATH}.HORIZONTAL_RULE`),
    },
    '|',
    {
      name: 'preview',
      action: EasyMDE.togglePreview,
      className: 'fa fa-eye no-disable',
      title: t(`${PATH}.PREVIEW`),
    },
    '|',
    {
      name: 'undo',
      action: EasyMDE.undo,
      className: 'fa fa-undo',
      title: t(`${PATH}.UNDO`),
    },
    {
      name: 'redo',
      action: EasyMDE.redo,
      className: 'fa fa-repeat fa-redo',
      title: t(`${PATH}.REDO`),
    },
  ],
  renderingConfig: {
    sanitizerFunction: (renderedHTML) => sanitize(renderedHTML),
  },
};
