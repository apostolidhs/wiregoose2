import request from 'helpers/request';
import makeTransformRegistrations from 'providers/admin/registrations/deserialize';
import makeTransformFeeds from 'providers/feeds/deserialize';
import {getBackendUri} from 'helpers/environment';

const uri = getBackendUri();

export default config => {
  const {transformRegistration, transformRegistrations} = makeTransformRegistrations(config);
  const {transformFeeds} = makeTransformFeeds(config);

  return {
    fetchRegistrations: () => request.get(`${uri}/registrations`, {transform: transformRegistrations}),
    updateRegistration: (id, body) =>
      request.put(`${uri}/registrations/${id}`, {body, transform: transformRegistration}),
    createRegistration: body => request.post(`${uri}/registrations`, {body, transform: transformRegistration}),
    deleteRegistration: id => request.del(`${uri}/registrations/${id}`),
    crawlRegistration: link =>
      request.get(`${uri}/registrations/crawl`, {
        params: {link},
        transform: ({feeds, total}) => ({feeds: transformFeeds(feeds), total})
      }),
    syncRegistration: id =>
      request.get(`${uri}/registrations/sync/${id}`, {
        transform: transformRegistrations
      }),

    fetchProviders: () => request.get(`${uri}/providers`),
    updateProvider: (id, body) => request.put(`${uri}/providers/${id}`, {body}),
    createProvider: body => request.post(`${uri}/providers`, {body}),
    deleteProvider: id => request.del(`${uri}/providers/${id}`),

    articleMining: link =>
      request.get(`${uri}/feeds/articlemining`, {
        params: {link}
      })
  };
};
