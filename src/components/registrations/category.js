import React, {useState, useMemo, useCallback} from 'react';
import {Box, Collapsible, Button} from 'grommet';
import {More} from 'grommet-icons';
import ProviderLink from 'components/providers/link';
import {CategoryLink} from 'components/categories';

const wrapThreshold = 3;

const Providers = ({category, providers}) => {
  const shouldWrap = providers.length > wrapThreshold;
  const [expand, setExpand] = useState(!shouldWrap);
  const initialProviders = useMemo(() => [...providers].slice(0, wrapThreshold), [providers]);
  const restProviders = useMemo(() => [...providers].slice(wrapThreshold), [providers]);
  const onClick = useCallback(() => setExpand(true), []);

  return (
    <Box gap="small" direction="row" wrap margin={{left: '36px'}}>
      {initialProviders.map(provider => (
        <ProviderLink key={provider.name} category={category} name={provider.name} />
      ))}
      {!expand && <Button plain onClick={onClick} icon={<More size="22px" />} alignSelf="start" />}
      <Collapsible open={expand}>
        {restProviders.map((provider, index) => (
          <ProviderLink
            key={provider.name}
            category={category}
            name={provider.name}
            margin={{top: index > 0 ? 'xsmall' : 'none'}}
          />
        ))}
      </Collapsible>
    </Box>
  );
};

const Category = ({category, providers}) => (
  <Box gap="xsmall">
    <CategoryLink size="large" icon category={category} />
    <Providers category={category} providers={providers} />
  </Box>
);

export default Category;
