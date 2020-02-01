import React, {useEffect} from 'react';
import {navigate} from '@reach/router';
import {Main, Heading} from 'grommet';
import {useFeedSelector, useRelatedFeedsSelector, useFeedDispatch} from 'providers/feeds/selectors';
import getInitialFeedState from 'providers/feeds/getInitialFeedState';
import {useApiSelector} from 'providers/api/selectors';
import SubInfo from 'components/feed/subInfo';
import Image from 'components/feed/image';
import FeedLink from 'components/feed/link';
import FeedLinkSkeleton from 'components/feed/link/skeleton';
import Related from 'components/article/related';
import ArticleComponent from 'components/article';
import Header from 'components/article/header';
import Skeleton from 'components/article/skeleton';
import {HeadingSkeleton} from './skeleton';

const initialFeedState = {...getInitialFeedState(), loading: true};

const Article = ({feedId}) => {
  const {
    loaded,
    loading,
    title,
    articleLoaded,
    articleLoading,
    relatedLoaded,
    relatedLoading,
    provider,
    published,
    category,
    image,
    articleContent
  } = useFeedSelector(feedId) || initialFeedState;
  const [nextRelatedFeed, ...relatedFeeds] = useRelatedFeedsSelector(feedId);
  const api = useApiSelector();
  const {feedFetchStarted, feedFetchFinished, feedFetchFailed} = useFeedDispatch();

  useEffect(() => {
    if (!feedId) {
      navigate('/');
      return;
    }
    if (articleLoaded && relatedLoaded) return;

    const fetchOptions = {article: !articleLoaded, related: !relatedLoaded};
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

  return (
    <Main pad="medium">
      <Header feedId={feedId} />
      {relatedLoading && <FeedLinkSkeleton margin={{top: 'xsmall'}} />}
      {nextRelatedFeed && <FeedLink feed={nextRelatedFeed} margin={{top: 'xsmall'}} />}
      {loading && <HeadingSkeleton margin={{top: 'large', bottom: 'none'}} />}
      {loaded && (
        <Heading level={1} margin={{top: 'large', bottom: 'none'}}>
          {title}
        </Heading>
      )}
      {loaded && <SubInfo provider={provider} published={published} category={category} margin={{top: 'large'}} />}
      {(image || loading) && <Image feedId={feedId} src={image} margin={{top: 'large'}} />}
      {articleLoaded && <ArticleComponent content={articleContent} margin={{vertical: 'large'}} />}
      {articleLoading && <Skeleton margin={{vertical: 'large'}} />}
      {relatedFeeds && <Related feeds={relatedFeeds} margin={{top: 'large'}} />}
    </Main>
  );
};

export default Article;
