const Truncate = ({children, size = 128}) => {
  if (children.length < size) return children;
  return `${children.substring(0, size)}...`;
};

export default Truncate;
