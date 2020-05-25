const Truncate = ({children, size = 128, trailing = '...'}) => {
  if (children.length < size) return children;
  return `${children.substring(0, size)}${trailing}`;
};

export default Truncate;
