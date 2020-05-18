export const clearText = title =>
  title
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .split(/(\s+)/)
    .join(' ');

export const getKeywords = title => title.split(' ').filter(s => s.length > 3 && s.toLowerCase() !== s.toUpperCase());
