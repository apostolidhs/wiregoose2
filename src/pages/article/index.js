import React, {useEffect, useState, useMemo} from 'react';
import {navigate} from '@reach/router';
import {Main, Heading} from 'grommet';
import {useNotification} from 'providers/notifications';
import {useFeedSelector, useRelatedFeedsSelector, useFeedDispatch} from 'providers/feeds/selectors';
import getInitialFeedState from 'providers/feeds/getInitialFeedState';
import {useApiSelector} from 'providers/api/selectors';
import {useAdSense} from 'providers/adsense';
import SubInfo from 'components/feed/subInfo';
import FeedLink from 'components/feed/link';
import FeedLinkSkeleton from 'components/feed/link/skeleton';
import Related from 'components/article/related';
import ArticleComponent, {Image} from 'components/article';
import {useCategoryName} from 'components/categories';
import {getImage} from 'components/image';
import Header from 'components/article/header';
import Skeleton from 'components/article/skeleton';
import Helmet from 'components/helmet';
import {clearText, getKeywords} from 'helpers/sanitize';
import Disclaimer from './disclaimer';
import {HeadingSkeleton} from './skeleton';
import ErrorSlate from './errorSlate';
import Error404 from './Error404';
import Error500 from './Error500';

const initialFeedState = {...getInitialFeedState(), loading: true};

let advsCount = 0;

const Article = ({feedId}) => {
  const notification = useNotification();
  const {
    loaded,
    loading,
    title,
    category,
    description,
    articleLoaded,
    articleLoading,
    relatedLoaded,
    relatedLoading,
    published,
    image,
    author,
    provider,
    articleError,
    articleContent
  } = useFeedSelector(feedId) || initialFeedState;
  const [nextRelatedFeed, ...relatedFeeds] = useRelatedFeedsSelector(feedId);
  const api = useApiSelector();
  const {feedFetchStarted, feedFetchFinished, feedFetchFailed} = useFeedDispatch();
  const getCategoryName = useCategoryName();
  const [errorCode, setErrorCode] = useState();
  const hasAdBlocked = useAdSense();

  useEffect(() => {
    if (!feedId) {
      navigate('/');
      return;
    }

    window.scrollTo(0, 0);

    if (articleLoaded && relatedLoaded) return;

    const fetchOptions = {article: !articleLoaded, related: !relatedLoaded};
    feedFetchStarted(feedId, fetchOptions);

    const promise = api.fetchFeed(feedId, fetchOptions);
    promise
      .then(response => feedFetchFinished(feedId, response.data, fetchOptions))
      .catch(error => {
        setErrorCode(error.status);
        feedFetchFailed(feedId, fetchOptions);
        if (error.status === -1 && error.statusText !== 'AbortError') notification.server(error);
      });

    return () => promise.abort();
  }, [feedId]);

  const articleContentWithAds = useMemo(() => {
    if (articleContent.length < 3 || hasAdBlocked) return articleContent;

    let totalP = 0;
    const embedIndex = articleContent.findIndex(({type}, index) => {
      if (type === 'p') {
        totalP = totalP + 1;
      }
      return totalP === 3;
    });

    if (embedIndex === -1) return articleContent;

    advsCount = advsCount + 1;

    if (advsCount % 2 === 0) return articleContent;

    const articleCopy = [...articleContent];
    articleCopy.splice(embedIndex + 1, 0, {type: 'adSence'});

    return articleCopy;
  }, [articleContent, hasAdBlocked]);

  const helmetProps = useMemo(() => {
    if (errorCode) return null;

    const clearedTitle = clearText(title);
    const categoryName = articleLoaded && getCategoryName(category);

    return {
      title: `${clearedTitle} - Wiregoose από ${provider}`,
      description: description,
      image: getImage(image),
      section: categoryName,
      author: author,
      published: published,
      type: 'article',
      keywords: [...getKeywords(clearedTitle), categoryName]
    };
  }, [articleLoaded]);

  if (errorCode === 404) return <Error404 />;
  if (errorCode && errorCode !== -1) return <Error500 />;

  return (
    <Main pad="medium" height="initial" overflow="initial">
      <Helmet {...helmetProps} />
      <Header feedId={feedId} />
      {relatedLoading && <FeedLinkSkeleton margin={{top: 'xsmall'}} />}
      {nextRelatedFeed && <FeedLink feed={nextRelatedFeed} margin={{top: 'xsmall'}} />}
      {loading && <HeadingSkeleton margin={{top: 'large', bottom: 'none'}} />}
      {loaded && (
        <Heading level={2} margin={{top: 'large', bottom: 'none'}}>
          {title}
        </Heading>
      )}
      {loaded && !articleError && <Disclaimer id={feedId} margin={{top: 'small'}} />}
      {loaded && <SubInfo id={feedId} margin={{top: 'large'}} />}
      {(image || loading) && <Image src={image} margin={{top: 'large'}} />}
      {articleLoaded && articleError && <ErrorSlate id={feedId} margin={{vertical: 'large'}} />}
      {articleLoaded && !articleError && (
        <ArticleComponent content={articleContentWithAds} margin={{vertical: 'large'}} />
      )}
      {articleLoading && <Skeleton margin={{vertical: 'large'}} />}
      {relatedFeeds && <Related feeds={relatedFeeds} margin={{top: 'large'}} />}
    </Main>
  );
};

export default Article;
