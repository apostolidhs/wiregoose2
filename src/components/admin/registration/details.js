import React, {useCallback, useState} from 'react';
import {Box} from 'grommet';
import {RegistrationField, useRegistrationSelector, useRegistrationAction} from 'providers/admin/registrations';
import {useConfigSelector} from 'providers/config/selectors';
import Failures from './failures';
import SelectProvider from './selectProvider';
import Link from './link';
import ActionBar from './actionBar';
import CrawlReport from './crawlReport';

const Details = ({registration: {id, failures}, ...rest}) => {
  const {categories, languages} = useConfigSelector();
  const link = useRegistrationSelector(id, ({link}) => link);
  const crawl = useRegistrationAction('crawl');
  const [crawlReport, setCrawlReport] = useState(null);

  const onCrawl = useCallback(() => {
    setCrawlReport(null);
    crawl(id, link).then(setCrawlReport);
  }, [id, link]);

  return (
    <Box gap="small" {...rest}>
      {!!failures.length && <Failures failures={failures} />}
      <SelectProvider resourceId={id} />
      <RegistrationField.Select fieldKey="category" resourceId={id} options={categories} placeholder="Category" />
      <RegistrationField.Select fieldKey="lang" resourceId={id} options={languages} placeholder="Language" />
      <Link resourceId={id} onCrawl={onCrawl} />
      {crawlReport && <CrawlReport resourceId={id} {...crawlReport}></CrawlReport>}
      <ActionBar resourceId={id} />
    </Box>
  );
};

export default Details;
