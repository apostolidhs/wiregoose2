import React, {useMemo} from 'react';
import {Box, Text} from 'grommet';
import {Link as RouterLink} from '@reach/router';

const getLink = (to, title) => {
  const CategoryLink = ({children, className}) => (
    <RouterLink to={to} title={title} className={className}>
      {children}
    </RouterLink>
  );
  return CategoryLink;
};

const Link = ({to, title, Icon, children, ...rest}) => {
  const link = useMemo(() => getLink(to, title), [to]);
  return (
    <Box as={link} gap="small" direction="row" {...rest}>
      <Box justify="center">
        <Icon />
      </Box>
      <Text size="xlarge">{children}</Text>
    </Box>
  );
};

export default Link;
