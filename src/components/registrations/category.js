import React, {useState, useMemo, useCallback} from 'react';
import {Box, Collapsible, Button} from 'grommet';
import {More} from 'grommet-icons';
import styled from 'styled-components';
import {Link as RouterLink} from '@reach/router';
import {useScreenSize} from 'providers/theme/selectors';
import {CategoryIcon, CategoryName, useCategoryName} from 'components/categories';
import ProviderIcon from 'components/providers/icon';
import Link from 'components/sidebar/link';

const StyledLink = styled(RouterLink)`
  margin-top: ${({theme, margin}) => margin && theme.global.edgeSize[margin.top]};
`;

const Provider = ({category, name, icon, ...rest}) => {
  const {isSmall} = useScreenSize();
  return (
    <StyledLink to={`/source/${name}/${category}`} title={name} {...rest}>
      <ProviderIcon src={icon} size={isSmall ? '32px' : '22px'} />
    </StyledLink>
  );
};

const wrapThreshold = 3;

const Providers = ({category, providers}) => {
  const shouldWrap = providers.length > wrapThreshold;
  const [expand, setExpand] = useState(!shouldWrap);
  const initialProviders = useMemo(() => [...providers].slice(0, wrapThreshold), [providers]);
  const restProviders = useMemo(() => [...providers].slice(wrapThreshold), [providers]);
  const onClick = useCallback(() => setExpand(true), []);

  return (
    <Box gap="small" direction="row" wrap margin={{left: '36px'}}>
      {initialProviders.map((provider) => (
        <Provider key={provider.name} category={category} {...provider} />
      ))}
      {!expand && <Button plain onClick={onClick} icon={<More size="22px" />} alignSelf="start" />}
      <Collapsible open={expand}>
        {restProviders.map((provider, index) => (
          <Provider
            key={provider.name}
            category={category}
            margin={{top: index > 0 ? 'xsmall' : 'none'}}
            {...provider}
          />
        ))}
      </Collapsible>
    </Box>
  );
};

const Category = ({category, providers}) => {
  const categoryName = useCategoryName();
  const Icon = () => <CategoryIcon name={category} />;
  return (
    <Box gap="xsmall">
      <Link to={`/category/${category}`} title={categoryName(category)} Icon={Icon}>
        <CategoryName name={category} />
      </Link>
      <Providers category={category} providers={providers} />
    </Box>
  );
};

export default Category;
