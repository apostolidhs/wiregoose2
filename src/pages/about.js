import React from 'react';
import {Info} from 'grommet-icons';
import Back from 'components/back';
import Main from 'components/main';
import TextedIcon from 'components/textedIcon';

const Explore = () => {
  return (
    <Main>
      <Back absolute />
      <TextedIcon Icon={Info}>Σχετικά</TextedIcon>
    </Main>
  );
};

export default Explore;
