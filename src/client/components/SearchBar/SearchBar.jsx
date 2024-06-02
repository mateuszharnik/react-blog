import {
  memo, useEffect, useRef, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@client/components/Box';
import Button from '@client/components/Buttons/Button';
import KeyboardKey from '@client/components/KeyboardKey';

const PATH = 'home.searchBar';

const SearchBar = memo(() => {
  const searchBarRef = useRef(null);

  const { t } = useTranslation();

  const focusSearchBar = useCallback((event) => {
    if (event.ctrlKey && event.key === '/') {
      searchBarRef?.current.focus();
    }
  }, [searchBarRef]);

  useEffect(() => {
    document.addEventListener('keydown', focusSearchBar);

    return () => {
      document.removeEventListener('keydown', focusSearchBar);
    };
  }, [focusSearchBar]);

  return (
    <form role="search">
      <Box>
        <label
          htmlFor="search"
          className="form-label visually-hidden"
        >
          {t(`${PATH}.SEARCH`)}
        </label>
        <Box className="form-search">
          <input
            ref={searchBarRef}
            type="text"
            className="form-control form-control__search"
            id="search"
            name="search"
            placeholder={t(`${PATH}.SEARCH_PLACEHOLDER`)}
            aria-describedby="search-help"
          />
        </Box>
        <Box
          id="search-help"
          className="form-text text-center"
        >
          {t(`${PATH}.searchHelp.PRESS`)}
          {' '}
          <KeyboardKey>
            <KeyboardKey>
              {t(`${PATH}.searchHelp.CTRL_KEY`)}
            </KeyboardKey>
          </KeyboardKey>
          {' '}
          {t(`${PATH}.searchHelp.PLUS_KEY`)}
          {' '}
          <KeyboardKey>
            <KeyboardKey>
              {t(`${PATH}.searchHelp.SLASH_KEY`)}
            </KeyboardKey>
          </KeyboardKey>
          {' '}
          {t(`${PATH}.searchHelp.TO_FOCUS`)}
        </Box>
      </Box>
      <Button
        type="submit"
        title={t(`${PATH}.SEARCH`)}
        className="d-none"
      >
        {t(`${PATH}.SEARCH`)}
      </Button>
    </form>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
