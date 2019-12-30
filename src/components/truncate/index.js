const Truncate = ({children}) => {
  if (children.length < 128) return children;
  return `${children.substring(0, 128)}...`;
};

export default Truncate;
