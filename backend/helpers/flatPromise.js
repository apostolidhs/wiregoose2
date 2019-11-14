module.exports = promise => promise.then(value => [value]).catch(error => [, error]);
