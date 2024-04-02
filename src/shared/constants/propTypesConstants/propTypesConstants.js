import toastsConstants from '../toastsConstants';

export default {
  TEXT_TYPES: {
    PARAGRAPH: 'p',
    STRONG: 'strong',
  },
  HEADING_TYPES: {
    H1: 'h1',
    H2: 'h2',
    H3: 'h3',
    H4: 'h4',
    H5: 'h5',
    H6: 'h6',
  },
  FLOATING_POSITIONS: {
    RIGHT: 'right',
    LEFT: 'left',
    TOP: 'top',
    BOTTOM: 'bottom',
  },
  TOOLTIP_COLORS: {
    DARK: 'dark',
    LIGHT: 'light',
  },
  LABEL_TYPES: {
    INPUT: 'input',
    CHECK: 'check',
  },
  FORM_GROUP_TYPES: {
    BUTTON: 'button',
    INPUT: 'input',
  },
  BOX_TYPES: {
    DIV: 'div',
    SPAN: 'span',
    MAIN: 'main',
    SECTION: 'section',
    ARTICLE: 'article',
    ASIDE: 'aside',
    HEADER: 'header',
    FOOTER: 'footer',
    NAV: 'nav',
  },
  BUTTON_COLORS: {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    SUCCESS: 'success',
    WARNING: 'warning',
    DANGER: 'danger',
    INFO: 'info',
    LINK: 'link',
  },
  BUTTON_VARIANTS: {
    OUTLINE: 'outline',
    SOLID: 'solid',
  },
  BUTTON_SIZES: {
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg',
  },
  BUTTON_TYPES: {
    BUTTON: 'button',
    SUBMIT: 'submit',
    RESET: 'reset',
  },
  LIST_TYPES: {
    UNORDERED: 'ul',
    ORDERED: 'ol',
  },
  TOAST_TYPES: toastsConstants.TYPE,
  TOAST_POSITIONS: toastsConstants.POSITIONS,
};
