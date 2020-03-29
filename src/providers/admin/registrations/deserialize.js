import getResourceInitialState from './getResourceInitialState';

export default ({categories}) => {
  const transformRegistration = ({category, lastCrawl, ...reg}) => ({
    ...getResourceInitialState(),
    ...reg,
    category: categories[category],
    lastCrawl: new Date(lastCrawl)
  });
  const transformRegistrations = regs => regs.map(transformRegistration);

  return {transformRegistration, transformRegistrations};
};
