import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
  const siteName = 'LSM Enterprise';
  const defaultDescription = 'Premium African fashion fabrics marketplace. Source quality jonkoso, lace, silk, scuba, duchess, crepe, stockflow, stripe, cubana, vintage, and more from verified vendors.';
  const defaultImage = '/images/Drip.jpg';

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteName}` : `${siteName} – Premium African Fashion Fabrics Marketplace`}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || 'https://lsmenterprise.com'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {url && <link rel="canonical" href={url} />}
    </Helmet>
  );
};

export default SEO;
