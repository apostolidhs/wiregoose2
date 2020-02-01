import React from 'react';
import {Box, Anchor} from 'grommet';
import {Twitter, FacebookOption} from 'grommet-icons';
import useTheme from 'hooks/useTheme';
import useIntl from 'providers/localization/useIntl';
import Link from './link';

const ActionBar = ({feedId, justify = 'end'}) => {
  const theme = useTheme();
  const t = useIntl();
  const rawLink = `${window.location.origin}/feed/${feedId}/article`;
  const link = encodeURIComponent(rawLink);

  return (
    <Box direction="row" justify={justify}>
      {/* <Button margin={{left: `-${theme.icon.size.small}`}} icon={<Bookmark size="medium" />} /> */}
      <Box direction="row">
        <Link link={rawLink} />
        <Anchor
          href={`https://twitter.com/share?url=${link}`}
          target="_blank"
          icon={<Twitter size="medium" color="dark-3" />}
          title={t('social.share.twitter')}
        />
        <Anchor
          href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
          target="_blank"
          margin={{right: `-${theme.icon.size.small}`}}
          icon={<FacebookOption size="medium" color="dark-3" />}
          title={t('social.share.facebook')}
        />
      </Box>
    </Box>
  );
};

export default ActionBar;
