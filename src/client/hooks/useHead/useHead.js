import { useEffect } from 'react';

const useHead = ({
  title = '',
  description = '',
  keywords = '',
  imageAlt = '',
  siteName = '',
}) => {
  useEffect(() => {
    const trimmedSiteName = siteName.trim();

    if (trimmedSiteName) {
      document.querySelector('meta[property="og:site_name"]')?.setAttribute('content', trimmedSiteName);
    }
  }, [siteName]);

  useEffect(() => {
    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      document.title = trimmedTitle;
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', trimmedTitle);
      document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', trimmedTitle);
    }
  }, [title]);

  useEffect(() => {
    const trimmedDescription = description.trim();

    if (trimmedDescription) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', trimmedDescription);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', trimmedDescription);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', trimmedDescription);
    }
  }, [description]);

  useEffect(() => {
    const trimmedImageAlt = imageAlt.trim();

    if (trimmedImageAlt) {
      document.querySelector('meta[property="og:image:alt"]')?.setAttribute('content', trimmedImageAlt);
    }
  }, [imageAlt]);

  useEffect(() => {
    const trimmedKeywords = keywords.trim();

    if (trimmedKeywords) {
      document.querySelector('meta[name="keywords"]')?.setAttribute('content', trimmedKeywords);
    }
  }, [keywords]);
};

export default useHead;
