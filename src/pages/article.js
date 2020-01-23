import React, {useEffect} from 'react';
import {navigate} from '@reach/router';
import {Main, Heading} from 'grommet';
import {useFeedSelector, useRelatedFeedsSelector, useFeedDispatch} from 'providers/feeds/selectors';
import {useApiSelector} from 'providers/api/selectors';
import SubInfo from 'components/feed/subInfo';
import Image from 'components/feed/image';
import FeedLink from 'components/feed/link';
import Related from 'components/article/related';
import ArticleComponent from 'components/article';
import Header from 'components/article/header';

const emptyObject = {};

const Article = ({feedId}) => {
  const {loaded, id, title, articleLoaded, relatedFeedsLoaded, provider, published, category, image, articleContent} =
    useFeedSelector(feedId) || emptyObject;
  const [nextRelatedFeed, ...relatedFeeds] = useRelatedFeedsSelector(feedId);
  const api = useApiSelector();
  const {feedFetchStarted, feedFetchFinished, feedFetchFailed} = useFeedDispatch();

  useEffect(() => {
    if (!feedId) return navigate('/');
    if (articleLoaded && relatedFeedsLoaded) return;

    const fetchOptions = {article: !articleLoaded, related: !relatedFeedsLoaded};
    feedFetchStarted(feedId, fetchOptions);
    const promise = api.fetchFeed(feedId, fetchOptions);
    promise
      .then(response => feedFetchFinished(feedId, response.data, fetchOptions))
      .catch(error => {
        console.error(error);
        feedFetchFailed(feedId, fetchOptions);
      });
    return () => promise.abort();
  }, [feedId]);

  if (!id || !loaded) return null;

  return (
    <Main pad="medium">
      <Header />
      <FeedLink feed={nextRelatedFeed} margin={{top: 'xsmall'}} />
      <Heading level={1} margin={{top: 'large', bottom: 'none'}}>
        {title}
      </Heading>
      <SubInfo provider={provider} published={published} category={category} margin={{top: 'large'}} />
      {image && <Image feedId={feedId} src={image} margin={{top: 'large'}} />}
      <ArticleComponent content={articleContent} margin={{vertical: 'large'}} />
      <Related feeds={relatedFeeds} margin={{top: 'large'}} />
    </Main>
  );
};

export default Article;
