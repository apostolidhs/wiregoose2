module.exports = el => {
  const src = el.getAttribute('src');
  return src && src.startsWith('https://www.youtube') ? src : null;
};
