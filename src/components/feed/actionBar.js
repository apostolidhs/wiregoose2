import React from 'react';
import {Box, Button} from 'grommet';
import {Bookmark, Twitter, FacebookOption, Link} from 'grommet-icons';
import useTheme from 'hooks/useTheme';

const ActionBar = () => {
  const theme = useTheme();
  return (
    <Box direction="row" justify="between">
      <Button margin={{left: `-${theme.icon.size.small}`}} icon={<Bookmark size="medium" />} />
      <Box direction="row">
        <Button icon={<Link size="medium" />} />
        <Button icon={<Twitter size="medium" />} />
        <Button margin={{right: `-${theme.icon.size.small}`}} icon={<FacebookOption size="medium" />} />
      </Box>
    </Box>
  );
};

export default ActionBar;
