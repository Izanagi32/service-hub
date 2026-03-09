import { Helmet } from "react-helmet-async";
import { env } from "../env";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: Record<string, unknown>;
}

export const SEO = ({
  title,
  description,
  keywords,
  image,
  url = env.siteUrl,
  type = "website",
  schema,
}: SEOProps) => {
  const siteTitle = "ServiceHub | Преміальний детейлінг та сервіс";
  const fullTitle = `${title} | ${siteTitle}`;
  const ogImage = image ?? `${env.siteUrl}/logo.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="ServiceHub" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
};