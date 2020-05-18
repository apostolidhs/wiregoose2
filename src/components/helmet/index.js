import React, {memo} from 'react';
import {Helmet as ReactHelmet} from 'react-helmet';
import logoImg from 'assets/logo.png';

const Helmet = ({
  title,
  description,
  url = `${process.env.PUBLIC_URL}${window.location.pathname}`,
  image = logoImg,
  section,
  author,
  published,
  type = 'website',
  keywords = []
}) => {
  return (
    <ReactHelmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta property="twitter:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="twitter:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="twitter:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="twitter:image" content={image} />
      <meta property="og:site_name" content="Wiregoose" /> />
      <meta property="fb:app_id" content="821271344594009" />
      <meta name="twitter:site" content="@wiregoose" />
      <meta property="twitter:card" content="summary" />
      <meta name="keywords" content={keywords.join(',')} />
      {author && <meta property="og:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {published && <meta property="article:published_time" content={published} />}
      {type && <meta property="og:type" content={type} />}
    </ReactHelmet>
  );
};

export default memo(Helmet);
