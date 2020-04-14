import React from 'react';
import {Heading, Anchor, Paragraph, Box} from 'grommet';
import {Edit, Mail, Linkedin} from 'grommet-icons';
import Back from 'components/back';
import Main from 'components/main';
import TextedIcon from 'components/textedIcon';

const Explore = () => {
  return (
    <Main>
      <Back absolute />
      <TextedIcon Icon={Edit}>Δημιουργοί</TextedIcon>
      <Box pad={{horizontal: 'small', vertical: 'medium'}} justify="center" gap="small">
        <Paragraph size="large" textAlign="center" justify="center" width="100%" margin={{top: 'none', bottom: 'none'}}>
          Εμπνεύστηκε, Σχεδιάστηκε, Αναπτύχθηκε από τον Γιάννη Αποστολίδη
        </Paragraph>
        <Box direction="row" justify="center" gap="medium">
          <Anchor
            icon={<Mail size="large" color="neutral-3" />}
            href="mailto:john.apostolidi@gmail.com"
            target="_blank"
          />
          <Anchor
            icon={<Linkedin size="large" color="neutral-3" />}
            href="https://www.linkedin.com/in/giannisapostolidis"
            target="_blank"
          />
        </Box>
      </Box>
    </Main>
  );
};

export default Explore;
