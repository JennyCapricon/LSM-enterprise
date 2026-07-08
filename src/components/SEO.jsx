import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
  const siteName = 'JAY';
  const defaultDescription = 'Modern fashion for everyone. Discover curated collections of apparel and accessories for women, men, and children. International shipping worldwide.';
  const defaultImage = '/images/Drip.jpg';

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteName}` : `${siteName} – Modern Fashion for Everyone`}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || 'https://jayfabrics.com'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {url && <link rel="canonical" href={url} />}
    </Helmet>
  );
};

export default SEO;
