import React from 'react';
import {Edit} from 'grommet-icons';
import Back from 'components/back';
import Main from 'components/main';
import TextedIcon from 'components/textedIcon';

const Explore = () => {
  return (
    <Main>
      <Back absolute />
      <TextedIcon Icon={Edit}>Δημιουργοί</TextedIcon>
    </Main>
  );
};

export default Explore;
