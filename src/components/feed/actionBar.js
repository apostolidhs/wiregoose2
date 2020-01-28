import React from 'react';
import {Box, Button} from 'grommet';
import {Bookmark, Twitter, FacebookOption, Link} from 'grommet-icons';
import useTheme from 'hooks/useTheme';

const ActionBar = ({justify = 'between'}) => {
  const theme = useTheme();
  console.log(theme);
  return (
    <Box direction="row" justify={justify}>
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
