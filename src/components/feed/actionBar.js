import React, {useContext} from 'react';
import {Box, Button, ThemeContext} from 'grommet';
import {Bookmark, Twitter, FacebookOption, Link} from 'grommet-icons';

const ActionBar = () => {
  const theme = useContext(ThemeContext);
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
