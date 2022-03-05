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

    const lines = codeElement.innerHTML.trim().split('\n');

    let linesWrapper = '<span class="language-lines">';

    lines.forEach((_, index) => {
      linesWrapper += `<span>${index + 1}</span>`;
    });

    linesWrapper += '</span>';

    codeElement.innerHTML += linesWrapper;

    return codeElement;
  });

  return sanitize(wrapperElement.innerHTML);
};

export default markdownToHTML;
