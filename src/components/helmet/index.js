import React, {memo} from 'react';
import {Helmet as ReactHelmet} from 'react-helmet';
import logoImg from 'assets/logo.png';

const types = {
  title: content => ({
    meta: [
      {property: 'og:title', content},
      {property: 'twitter:title', content}
    ]
  }),
  description: content => ({
    meta: [
      {name: 'description', content},
      {property: 'og:description', content},
      {property: 'twitter:description', content}
    ]
  }),
  url: content => ({
    link: [{rel: 'canonical', href: content}],
    meta: [
      {property: 'og:url', content},
      {property: 'twitter:url', content}
    ]
  }),
  image: content => ({
    meta: [
      {property: 'og:image', content},
      {property: 'twitter:image', content}
    ]
  })
};

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
  const props = [
    title && types.title(title),
    description && types.description(description),
    url && types.url(url),
    image && types.image(image)
  ]
    .filter(Boolean)
    .reduce((h, {meta, link = []}) => ({meta: [...h.meta, ...meta], link: [...h.link, ...link]}), {meta: [], link: []});

  return (
    <ReactHelmet title={title} {...props}>
      <meta property="og:site_name" content="Wiregoose" />
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
