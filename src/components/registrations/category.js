import React, {useState, useMemo, useCallback, memo} from 'react';
import {Box, Button} from 'grommet';
import {More} from 'grommet-icons';
import ProviderLink from 'components/providers/link';
import {CategoryLink} from 'components/categories';

const defaultWrapThreshold = 4;

const Providers = ({category, providers}) => {
  const shouldWrap = providers.length > defaultWrapThreshold;
  const [expand, setExpand] = useState(!shouldWrap);
  const wrapThreshold = expand ? defaultWrapThreshold + 1 : defaultWrapThreshold;
  const initialProviders = useMemo(() => [...providers].slice(0, wrapThreshold), [providers, expand]);
  const restProviders = useMemo(() => [...providers].slice(wrapThreshold), [providers, expand]);
  const onClick = useCallback(() => setExpand(true), []);

  return (
    <Box gap="small" direction="row" wrap margin={{left: '36px'}}>
      {initialProviders.map(provider => (
        <ProviderLink key={provider.name} category={category} name={provider.name} />
      ))}
      {!expand && <Button plain onClick={onClick} icon={<More size="22px" />} alignSelf="start" />}
      {expand && (
        <Box gap="small" direction="row" wrap>
          {restProviders.map((provider, index) => (
            <ProviderLink key={provider.name} category={category} name={provider.name} margin={{top: 'xsmall'}} />
          ))}
        </Box>
      )}
    </Box>
  );
};

const Category = ({category, providers}) => (
  <Box gap="xsmall">
    <CategoryLink size="large" icon category={category} />
    <Providers category={category} providers={providers} />
  </Box>
);

export default memo(Category);
