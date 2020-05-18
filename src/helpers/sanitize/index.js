export const clearText = title => title.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').replace(/(\s+)/g, ' ');

export const getKeywords = title => title.split(' ').filter(s => s.length > 3 && s.toLowerCase() !== s.toUpperCase());
