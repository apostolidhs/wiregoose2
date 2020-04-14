import React, {useEffect, useState} from 'react';
import {Main, Heading, Box, Image, Text, Button} from 'grommet';
import Link from 'components/link';
import SurlicatorImg from 'assets/suricato.png';

const refresh = () => window.location.reload();

const Error500 = () => {
  return (
    <Main pad="medium" height="initial" overflow="initial">
      <Heading textAlign="center" level="2" margin="none">
        Ουπς, συνέβει κάποιο σφάλμα
      </Heading>
      <Image src={SurlicatorImg} width="100" margin={{top: 'large', bottom: 'medium'}} alignSelf="center" />
      <Text textAlign="center" size="large">
        Δοκιμάστε να <Button onClick={refresh} label="ανανεώσετε την σελίδα" plain color="neutral-3" /> η δοκιμάσετε
        ξανά σε λίγο.
      </Text>
      <Text textAlign="center" size="large" margin={{top: 'large'}}>
        <Link to="/" label="Αρχική σελίδα" plain color="neutral-3" />
      </Text>
    </Main>
  );
};

export default Error500;
