const clearText = text =>
  text
    .replace(/[«»]/g, '')
    .replace(/(\s)+/g, ' ')
    .trim();

module.exports = el => {
  const text = clearText(el.textContent);

  const validChars = Array.from(text.normalize()).reduce((h, c) => (c.match(/[A-Za-zΑ-Ωα-ω]/) ? h + 1 : h), 0);
  if (validChars < text.length / 2) return null;

  const links = el.querySelectorAll('a');
  if (links.length === 1 && clearText(links[0].textContent) === text) return null;

  return text;
};
