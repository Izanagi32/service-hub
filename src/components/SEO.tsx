import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { absoluteSiteUrl } from "../env";
import { BUSINESS_INFO } from "../siteContent";

interface Breadcrumb {
  name: string;
  path: string;
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
  type?: string;
  schema?: Record<string, unknown>;
  breadcrumb?: Breadcrumb[];
  noindex?: boolean;
}

/** Removes the Vite base path so canonical URLs always point at the site root. */
const withoutBase = (pathname: string): string => {
  const base = import.meta.env.BASE_URL;
  const clean = pathname.startsWith(base) ? pathname.slice(base.length - 1) : pathname;
  return clean.startsWith("/") ? clean : `/${clean}`;
};

export const SEO = ({
  title,
  description,
  keywords,
  image,
  imageAlt,
  type = "website",
  schema,
  breadcrumb,
  noindex = false,
}: SEOProps) => {
  const location = useLocation();
  const fullTitle = `${title} — ${BUSINESS_INFO.brand}`;
  const path = withoutBase(location.pathname);
  const canonicalUrl = noindex ? null : absoluteSiteUrl(path);
  const ogImage = absoluteSiteUrl(image ?? `${import.meta.env.BASE_URL}og-image.jpg`);

  const breadcrumbSchema =
    breadcrumb && breadcrumb.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumb.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteSiteUrl(item.path),
          })),
        }
      : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="author" content={BUSINESS_INFO.brand} />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content="uk_UA" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt ?? `${BUSINESS_INFO.brand} — ${title}`} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content={BUSINESS_INFO.brand} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="geo.region" content="UA-07" />
      <meta name="geo.placename" content={BUSINESS_INFO.city} />

      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
    </Helmet>
  );
};
