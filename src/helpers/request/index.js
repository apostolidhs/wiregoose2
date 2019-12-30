import identity from 'lodash/identity';

const getParams = params =>
  Object.keys(params)
    .filter(k => params[k] !== undefined)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');

const get = (href, params, {transform = identity} = {}) => {
  const controller = new AbortController();

  const search = params && getParams(params);
  const link = search ? `${href}?${search}` : href;
  const request = fetch(link, {signal: controller.signal}).then(response => {
    return response.json().then(data => {
      const resp = {data: transform(data), status: response.status};
      if (response.ok) return resp;
      throw resp;
    });
  });

  request.abort = () => {
    controller.abort();
  };

  return request;
};

export default {get};
