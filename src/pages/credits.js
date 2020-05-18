import React from 'react';
import {Anchor, Paragraph, Box} from 'grommet';
import {Edit, Mail, Linkedin} from 'grommet-icons';
import Back from 'components/back';
import Main from 'components/main';
import TextedIcon from 'components/textedIcon';
import Helmet from 'components/helmet';

const Credits = () => {
  return (
    <Main>
      <Helmet
        title="Δημιουργοί - Wiregoose"
        description="Οι δημιουργοί του Wiregoose"
        keywords={['δημιουργοί σελίδας', 'κατασκευαστές', 'ποιοί είμαστε']}
      />
      <Back absolute />
      <TextedIcon Icon={Edit}>Δημιουργοί</TextedIcon>
      <Box pad={{horizontal: 'small', vertical: 'medium'}} justify="center" align="center" gap="small">
        <Paragraph size="large" textAlign="center" margin={{top: 'none', bottom: 'none'}}>
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

export default Credits;
