import DOMPurify from 'dompurify';

export const sanitize = (text = '') => DOMPurify.sanitize(text, {
  FORBID_TAGS: [
    'style',
    'script',
    'picture',
    'video',
    'audio',
    'iframe',
    'table',
    'input',
    'form',
    'textarea',
  ],
  FORBID_ATTR: [
    'style',
    'onerror',
    'onload',
  ],
});
