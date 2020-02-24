import React, {useState, useCallback} from 'react';
import {Box, Button, Text} from 'grommet';
import {useRegistrationAction} from 'providers/admin/registrations';
import Article from 'components/article';

const ArticleMinning = ({resourceId, link, ...rest}) => {
  const articleMining = useRegistrationAction('articleMining');
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  const onCrawl = useCallback(() => {
    setArticle(null);
    setError(null);
    articleMining(resourceId, link)
      .then(setArticle)
      .catch(({data}) => setError(data.error || data));
  }, [link]);

  return (
    <Box gap="small" {...rest}>
      <Box gap="small" justify="between" direction="row">
        <Text size="small">{link}</Text>
        <Button onClick={onCrawl} label="Get article" />
      </Box>
      {error && <Text>{error}</Text>}
      {article && <Article content={article} />}
    </Box>
  );
};

export default ArticleMinning;
