import React, {useMemo, memo} from 'react';
import {Box, Paragraph as P, Heading as H} from 'grommet';
import {makeProxyUri} from 'helpers/image';
import ImageComponent from 'components/image';
import placeholderImg from 'assets/placeholder.jpg';

const Paragraph = ({text}) => (
  <P size="large" margin="none">
    {text}
  </P>
);

const Header = ({text}) => (
  <H margin="none" level="3">
    {text}
  </H>
);

export const Image = ({src, ...rest}) => {
  const proxySrc = useMemo(() => makeProxyUri(src), [src]);
  return (
    <Box height={{min: '200px'}} {...rest}>
      <ImageComponent height="100%" src={proxySrc} fallback={placeholderImg} fit="contain" />
    </Box>
  );
};

const Video = ({src}) => (
  <Box height={{min: 'initial'}}>
    <iframe src="//www.youtube.com/embed/yCOY82UdFrw" frameborder="0" allowfullscreen class="video" />
  </Box>
);

const types = {
  p: Paragraph,
  h: Header,
  img: Image,
  video: Video
};

const filterContent = content => content.filter(section => types[section.type]);

const Article = ({content, ...rest}) => (
  <Box gap="large" height={{min: 'initial'}} {...rest}>
    {filterContent(content).map(({type, ...rest}, index) => {
      const Component = types[type];
      return <Component key={index} {...rest} />;
    })}
  </Box>
);

export default memo(Article);
