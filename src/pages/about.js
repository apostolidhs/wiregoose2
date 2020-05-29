import React from 'react';
import {Heading, Anchor, Paragraph, Box} from 'grommet';
import {Info} from 'grommet-icons';
import Back from 'components/back';
import Main from 'components/main';
import Helmet from 'components/helmet';
import TextedIcon from 'components/textedIcon';

const Explore = () => {
  return (
    <Main height="100%" width="100%">
      <Helmet
        title="Σχετικά - Wiregoose"
        description="Πληροφορίες σχετικά με το Wiregoose"
        keywords={['σχετικά', 'πληροφορίες', 'rss']}
      />
      <Back absolute />
      <TextedIcon Icon={Info} flex="grow">
        Σχετικά
      </TextedIcon>
      <Box pad={{horizontal: 'small', vertical: 'medium'}}>
        <Heading level="2" margin={{top: 'none', bottom: 'none'}}>
          Τι είναι το Wiregoose
        </Heading>
        <Paragraph size="xlarge" margin={{top: 'medium', bottom: 'none'}}>
          Το Wiregoose είναι ένας αναμεταδότης νέων, φέρνοντας στην οθόνη σας καταχωρήσεις από όλον τον κόσμο,
          προσαρμοσμένο στην χώρα σας σε σχεδόν πραγματικό χρόνο.
        </Paragraph>
        <Heading level="2" margin={{top: 'large', bottom: 'none'}}>
          Πως λειτουργεί
        </Heading>

        <Heading level="3" margin={{top: 'large', bottom: 'none'}}>
          Rss feeds
        </Heading>
        <Paragraph size="xlarge" margin={{top: 'medium', bottom: 'none'}}>
          RSS (Εμπλουτισμένη Σύνοψη Ιστοτόπου) είναι μία συγκεκριμένη μορφή που εξάγει το περιεχόμενο ενός ιστότοπου.
          Πολλές ιστοσελίδες που σχετίζονται με την επικαιρότητα, blogs, και online εκδοτικοί οίκοι έχουν συμβατό το
          περιεχόμενο τους σε Rss μορφή για να έχει πρόσβαση οποιοσδήποτε επιθυμεί.
        </Paragraph>
        <Paragraph size="xlarge" margin={{top: 'medium', bottom: 'none'}}>
          Το Wiregoose είναι συνδεδεμένο με τα μέσα ενημέρωσης χρησιμοποιώντας τα RSS feeds τους. Σεβόμαστε την πηγή που
          λαμβάνουμε τα νέα, επισημαίνοντας σε κάθε καταχώρηση το όνομα της πηγής.
        </Paragraph>
        <Heading level="3" margin={{top: 'large', bottom: 'none'}}>
          Εξαγωγέας άρθρου
        </Heading>
        <Paragraph size="xlarge" margin={{top: 'medium', bottom: 'none'}}>
          Για να βελτιστοποιηθεί η εμπειρία ανάγνωση των άρθρων, το Wiregoose χρησιμοποιεί ένα δικό του εξαγωγέα άρθρου,
          προσαρμοσμένο στις ανάγκες του κάθε ιστότοπου από τους πάροχους που υποστηρίζουμε. Με τον τρόπο αυτό,
          λαμβάνουμε μόνο το περιεχόμενο του άρθρου, το επεξεργαζόμαστε με στόχο την μέγιστη ευαναγνωστικότητα του, και
          σας το προσφέρουμε
        </Paragraph>
        <Paragraph size="xlarge" margin={{top: 'medium', bottom: 'none'}}>
          Εσωτερικά, χρησιμοποιούμε τον Mozilla{' '}
          <Anchor href="https://github.com/mozilla/readability" target="_blank" label="Firefox Reader View" />.
        </Paragraph>
      </Box>
    </Main>
  );
};

export default Explore;
