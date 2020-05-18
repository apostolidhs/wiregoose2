import React from 'react';
import {Main, Heading, Image, Text} from 'grommet';
import Link from 'components/link';
import SurlicatorImg from 'assets/suricato.png';

const Error404 = () => {
  return (
    <Main pad="medium" height="initial" overflow="initial">
      <Heading textAlign="center" level="2" margin="none">
        Το άρθρο δεν υπάρχει
      </Heading>
      <Image src={SurlicatorImg} width="100" margin={{top: 'large', bottom: 'medium'}} alignSelf="center" />
      <Text textAlign="center" size="large">
        Μπορειτε να συνεχίσετε την <Link to="/" label="ανάγνωση από εδώ" plain color="neutral-3" />
      </Text>
    </Main>
  );
};

export default Error404;
