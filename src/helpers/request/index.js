import identity from 'lodash/identity';
import {error} from 'winston';

const getParams = params =>
  Object.keys(params)
    .filter(k => params[k] !== undefined)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');

const request = (href, {params, transform = identity, method = 'GET', ...options} = {}) => {
  const controller = new AbortController();

  const search = params && getParams(params);
  const link = search ? `${href}?${search}` : href;
  const request = fetch(link, {signal: controller.signal, method, ...options}).then(response =>
    response.json().then(data => {
      const {status, statusText} = response;
      if (response.ok) return {data: transform(data), status, statusText};
      throw {data, status, statusText};
    })
  );

  request.abort = () => {
    controller.abort();
  };

  return request;
};

const get = request;

const put = (href, {body, ...options}) =>
  request(href, {method: 'PUT', ...(body && {body: JSON.stringify(body)}), ...options});

const post = (href, {body, ...options}) =>
  request(href, {method: 'POST', ...(body && {body: JSON.stringify(body)}), ...options});

const del = (href, options) => request(href, {method: 'DELETE', ...options});

export default {get, post, put, del};
