export default dispatch => {
  let timeoutId = null;

  const clear = () => {
    clearTimeout(timeoutId);
    dispatch(null);
  };

  const make = type => (message, {timeout = 5000} = {}) => {
    clear();
    dispatch({type, message});
    timeoutId = setTimeout(clear, timeout);
  };

  const info = make('info');

  return {
    info: make('info'),
    warning: make('warning'),
    server: error => info(error.status === -1 ? 'Η σύνδεση δεν είναι καλή' : 'Ουπς, συνέβει κάποιο σφάλμα')
  };
};
