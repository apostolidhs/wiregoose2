import React, {useCallback} from 'react';
import {Box, Heading, Button} from 'grommet';
import {AddCircle} from 'grommet-icons';
import {useRegistrationSelector, useRegistrationAction} from 'providers/admin/registrations';
import {CategoryIcon, CategoryName} from 'components/categories';

const Header = ({category, onExpand, ...rest}) => {
  const initializeResource = useRegistrationAction('initializeResource');
  const disabled = useRegistrationSelector('new', resource => !!resource);

  const onCreate = useCallback(() => {
    initializeResource('new', {lang: 'gr', category});
    onExpand('new');
  }, []);

  const Icon = () => <CategoryIcon name={category} />;
  return (
    <Box direction="row" justify="between" {...rest}>
      <Box as={Heading} level="3" margin="none" direction="row" gap="xsmall" {...rest}>
        <Box justify="center">
          <CategoryIcon name={category} />
        </Box>
        <CategoryName name={category} />
      </Box>
      <Button
        icon={<AddCircle size="32px" color="brand" />}
        plain
        gap="xsmall"
        onClick={onCreate}
        disabled={disabled}
      />
    </Box>
  );
};

export default Header;
