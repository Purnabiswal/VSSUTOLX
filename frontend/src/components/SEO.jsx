import { Helmet } from 'react-helmet-async';
import { pageTitle, seoDefaults } from '../utils/seo';

export default function SEO({ title, description = seoDefaults.description, image = seoDefaults.image }) {
  const resolvedTitle = title ? pageTitle(title) : seoDefaults.title;
  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
