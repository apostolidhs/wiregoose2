import getResourceInitialState from './getResourceInitialState';

export default ({categories}) => {
  const transformRegistration = reg => ({
    ...getResourceInitialState(),
    ...reg,
    category: categories[reg.category]
  });
  const transformRegistrations = regs => regs.map(transformRegistration);

  return {transformRegistration, transformRegistrations};
};
