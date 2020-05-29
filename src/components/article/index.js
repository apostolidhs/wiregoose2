import React, {memo, useEffect} from 'react';
import {Box, Paragraph as P, Heading as H} from 'grommet';
import ImageComponent from 'components/image';
import {useAdSenseDispatch} from 'providers/adsense';
import {enabledAdSense} from 'helpers/environment';
import {useScreenSize} from 'providers/theme/selectors';

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

const AdSense = () => {
  const {isSmall} = useScreenSize();
  const {update} = useAdSenseDispatch();

  useEffect(() => {
    if (!enabledAdSense()) return;
    update();
  }, []);

  return (
    <Box width={isSmall ? '100%' : '528px'}>
      <ins
        className="adsbygoogle"
        style={{display: 'block', textAlign: 'center'}}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-3571483150053473"
        data-ad-slot="1796676796"></ins>
    </Box>
  );
};

export const Image = ({src, ...rest}) => (
  <Box height={{min: '200px', max: '400px'}} {...rest}>
    <ImageComponent width="100%" src={src} fit="contain" />
  </Box>
);

//"//www.youtube.com/embed/yCOY82UdFrw"
const Video = ({src}) => (
  <Box height={{min: 'initial'}}>
    <iframe src={src} title="Βίντεο" frameBorder="0" allowFullScreen className="video" />
  </Box>
);

const types = {
  p: Paragraph,
  h: Header,
  img: Image,
  video: Video,
  adSence: AdSense
};

const filterContent = content => content.filter(section => types[section.type]);

const Article = ({content, ...rest}) => (
  <Box gap="large" align="center" height={{min: 'initial'}} flex="grow" {...rest}>
    {filterContent(content).map(({type, ...rest}, index) => {
      const Component = types[type];
      return <Component key={index} {...rest} />;
    })}
  </Box>
);

export default memo(Article);
