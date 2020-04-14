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

  const info = make('info');

  return {
    info: make('info'),
    warning: make('warning'),
    server: error => info(error.status === -1 ? 'Η σύνδεση δεν είναι καλή' : 'Ουπς, συνέβει κάποιο σφάλμα')
  };
};
