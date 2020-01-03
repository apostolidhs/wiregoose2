module.exports = error => {
  if (error.message.includes('many redirects') || error.message.includes('Status code')) return;
};
