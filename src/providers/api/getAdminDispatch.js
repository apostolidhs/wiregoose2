import request from 'helpers/request';
import makeTransformRegistrations from 'providers/admin/registrations/deserialize';
import makeTransformFeeds from 'providers/feeds/deserialize';
import {getBackendUri} from 'helpers/environment';

const uri = getBackendUri();

export default ({getToken, config}) => {
  const {transformRegistration, transformRegistrations} = makeTransformRegistrations(config);
  const {transformFeeds} = makeTransformFeeds(config);

  const withAuth = ({headers, ...options} = {}) => ({headers: {authorization: getToken(), ...headers}, ...options});

  return {
    fetchRegistrations: () => request.get(`${uri}/registrations`, withAuth({transform: transformRegistrations})),
    updateRegistration: (id, body) =>
      request.put(`${uri}/registrations/${id}`, withAuth({body, transform: transformRegistration})),
    createRegistration: (body) =>
      request.post(`${uri}/registrations`, withAuth({body, transform: transformRegistration})),
    deleteRegistration: (id) => request.del(`${uri}/registrations/${id}`, withAuth()),
    crawlRegistration: (link) =>
      request.get(
        `${uri}/registrations/crawl`,
        withAuth({
          params: {link},
          transform: ({feeds, total}) => ({feeds: transformFeeds(feeds), total}),
        })
      ),
    syncRegistration: (id) =>
      request.get(
        `${uri}/registrations/sync/${id}`,
        withAuth({
          transform: transformRegistrations,
        })
      ),

    fetchProviders: () => request.get(`${uri}/providers`, withAuth()),
    updateProvider: (id, body) => request.put(`${uri}/providers/${id}`, withAuth({body})),
    createProvider: (body) => request.post(`${uri}/providers`, withAuth({body})),
    deleteProvider: (id) => request.del(`${uri}/providers/${id}`, withAuth()),

    articleMining: (link) =>
      request.get(
        `${uri}/feeds/articlemining`,
        withAuth({
          params: {link},
        })
      ),
  };
};
