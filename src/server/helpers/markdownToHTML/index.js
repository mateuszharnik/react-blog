import unescape from 'lodash/unescape';
import { highlightAuto } from 'highlight.js';
import { decode } from 'he';
import { parse } from 'marked';
import sanitize from '@server/helpers/purify';
import window from '@server/helpers/jsdom';

const markdownToHTML = (markdown = '') => {
  if (!markdown) return markdown;

  const wrapperElement = window.document.createElement('div');

  wrapperElement.innerHTML = parse(unescape(markdown));

  const codeElements = wrapperElement.querySelectorAll('code');

  Array.from(codeElements)?.map((codeElement) => {
    codeElement.innerHTML = codeElement.innerHTML.trim();

    codeElement.innerHTML = highlightAuto(decode(codeElement.innerHTML)).value;

    const rows = codeElement.innerHTML.trim().split('\n');

    let lines = '<span class="language-lines">';

    rows.forEach((line, index) => {
      lines += `<span>${index + 1}</span>`;
    });

    lines += '</span>';

    codeElement.innerHTML += lines;

    return codeElement;
  });

  return sanitize(wrapperElement.innerHTML);
};

export default markdownToHTML;
