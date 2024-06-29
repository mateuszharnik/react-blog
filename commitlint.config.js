const ticketId = 'RB';
const emojis = ['tada', 'toolbox', 'fire', 'bug', 'book', 'sparkles', 'rocket', 'bookmark'];

const emojiPattern = emojis.join('|');
const headerRegexp = new RegExp(`^:(${emojiPattern}): \\[${ticketId}-\\d+\\] [A-Z].+$`);
const errorMessage = `Header must match the pattern ':emoji: [${ticketId}-123] Sentence case commit message'. Allowed emojis: ${emojis.join(', ')}`;

module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [{
    rules: {
      'header-pattern': ({ header }) => {
        const isValid = headerRegexp.test(header);

        return [isValid, isValid ? '' : errorMessage];
      },
    },
  }],
  rules: {
    'header-pattern': [2, 'always'],
    'header-max-length': [2, 'always', 100],
    'header-case': [0],
    'type-enum': [0],
    'type-case': [0],
    'type-empty': [0],
    'type-max-length': [0],
    'type-min-length': [0],
    'subject-case': [0],
    'subject-empty': [0],
    'subject-full-stop': [0],
    'subject-max-length': [0],
    'subject-min-length': [0],
    'scope-enum': [0],
    'scope-case': [0],
    'scope-empty': [0],
    'scope-max-length': [0],
    'scope-min-length': [0],
  },
};
