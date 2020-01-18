import React, {useEffect} from 'react';
import {navigate} from '@reach/router';
import {Main, Heading} from 'grommet';
import {useFeedSelector, useFeedDispatch} from 'providers/feeds/selectors';
import {useApiSelector} from 'providers/api/selectors';
import SubInfo from 'components/feed/subInfo';
import Image from 'components/feed/image';
import ArticleComponent from 'components/article';
import Header from 'components/article/header';

const emptyObject = {};

const Article = ({feedId}) => {
  const {title, articleCreatedAt, provider, published, category, image, articleContent} =
    useFeedSelector(feedId) || emptyObject;
  const api = useApiSelector();
  const {articleFetchStarted, articleFetchFinished, articleFetchFailed} = useFeedDispatch();

  useEffect(() => {
    if (!feedId) return navigate('/');
    if (articleCreatedAt) return;

    articleFetchStarted(feedId);
    const promise = api.fetchFeedWithArticle(feedId);
    promise
      .then(response => articleFetchFinished(feedId, response.data))
      .catch(error => {
        console.error(error);
        articleFetchFailed(feedId);
      });
    return () => promise.abort();
  }, [feedId]);

  if (!articleCreatedAt) return 'loading...';

  return (
    <Main pad="medium">
      <Header />
      <Heading level={1} margin={{top: 'large', bottom: 'none'}}>
        {title}
      </Heading>
      <SubInfo provider={provider} published={published} category={category} margin={{top: 'large'}} />
      {image && <Image feedId={feedId} src={image} margin={{top: 'large'}} />}
      <ArticleComponent content={articleContent} margin={{top: 'large'}} />
    </Main>
  );
};

export default Article;
