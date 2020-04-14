import React, {useMemo, useCallback} from 'react';
import {FormattedMessage} from 'react-intl';
import useIntl from 'providers/localization/useIntl';
import {
  Local,
  Globe,
  Manual,
  Currency,
  PersonalComputer,
  Navigate,
  Organization,
  Technology,
  Announce,
  Yoga,
  Car,
  Aid,
  Multimedia,
  Diamond,
  Channel
} from 'grommet-icons';
import {Box, Text} from 'grommet';
import styled from 'styled-components';
import {Link as RouterLink} from '@reach/router';

const icons = {
  country: Local,
  world: Globe,
  politics: Manual,
  economy: Currency,
  lifestyle: Diamond,
  viral: Announce,
  society: Organization,
  science: PersonalComputer,
  travel: Navigate,
  sports: Yoga,
  auto: Car,
  health: Aid,
  culture: Multimedia,
  technology: Technology,
  media: Channel
};

export const CategoryIcon = ({name, ...rest}) => {
  const Icon = icons[name];
  return <Icon {...rest} />;
};

export const CategoryName = ({name}) => <FormattedMessage id={`category.${name}`} />;

export const useCategoryName = () => {
  const t = useIntl();
  return name => t(`category.${name}`);
};

const StyledBox = styled(RouterLink)`
  &[aria-current='page'] {
    color: #1a73e8;
    svg {
      fill: #1a73e8;
      stroke: #1a73e8;
    }
  }
`;

export const CategoryLink = ({category, color, size, iconSize, icon, ...rest}) => {
  const categoryName = useCategoryName();
  const link = useCallback(
    ({children, className}) => (
      <StyledBox to={`/category/${category}`} title={categoryName(category)} className={className}>
        {children}
      </StyledBox>
    ),
    [category]
  );

  return (
    <Box align="end" gap="small" as={link} direction="row" {...rest}>
      {icon && (
        <Box justify="center">
          <CategoryIcon size={iconSize} name={category} />
        </Box>
      )}
      <Text size={size} color={color}>
        <CategoryName name={category} />
      </Text>
    </Box>
  );
};
