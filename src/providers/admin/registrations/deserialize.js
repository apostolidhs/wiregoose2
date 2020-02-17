import getInitialState from './getInitialState';

export default ({categories}) => {
  const transformRegistration = reg => ({
    ...getInitialState(),
    ...reg,
    category: categories[reg.category]
  });
  const transformRegistrations = regs => regs.map(transformRegistrations);

  return {transformRegistration, transformRegistrations};
};
