import getInitialState from './getInitialState';

export default ({categories}) => {
  const transformProvider = reg => ({
    ...getInitialState(),
    ...reg,
    category: categories[reg.category]
  });
  const transformProviders = regs => regs.map(transformProviders);

  return {transformProvider, transformProviders};
};
