export default link => {
  const {protocol, hostname, pathname} = new URL(link);
  const base = hostname.startsWith('www.') ? hostname : `www.${hostname}`;
  return `${protocol}//${base}${pathname}`;
};
