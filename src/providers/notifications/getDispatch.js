export default dispatch => {
  let timeout = null;

  const clear = () => {
    clearTimeout(timeout);
    dispatch(null);
  };

  const make = type => message => {
    clear();
    dispatch({type, message});
    timeout = setTimeout(clear, 5000);
  };

  return {
    info: make('info'),
    warning: make('warning')
  };
};
