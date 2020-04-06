import React, {useMemo, memo} from 'react';
import {Box, Paragraph as P, Heading as H} from 'grommet';
import ImageComponent from 'components/image';

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

export const Image = ({src, ...rest}) => (
  <Box height={{min: '200px'}} {...rest}>
    <ImageComponent height="100%" src={src} fit="contain" />
  </Box>
);

//"//www.youtube.com/embed/yCOY82UdFrw"
const Video = ({src}) => (
  <Box height={{min: 'initial'}}>
    <iframe src={src} frameborder="0" allowfullscreen class="video" />
  </Box>
);

const types = {
  p: Paragraph,
  h: Header,
  img: Image,
  video: Video,
};

const filterContent = (content) => content.filter((section) => types[section.type]);

const Article = ({content, ...rest}) => (
  <Box gap="large" height={{min: 'initial'}} {...rest}>
    {filterContent(content).map(({type, ...rest}, index) => {
      const Component = types[type];
      return <Component key={index} {...rest} />;
    })}
  </Box>
);

export default memo(Article);
