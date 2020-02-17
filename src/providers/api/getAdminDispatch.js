import request from 'helpers/request';
import makeTransformRegistrations from 'providers/admin/registrations/deserialize';

export default config => {
  const {transformRegistration, transformRegistrations} = makeTransformRegistrations(config);
  return {
    fetchRegistrations: () => request.get('http://localhost:4100/registrations', {transform: transformRegistrations}),
    updateRegistration: (id, body) =>
      request.put(`http://localhost:4100/registrations/${id}`, {body, transform: transformRegistration}),
    createRegistration: body =>
      request.post(`http://localhost:4100/registrations`, {body, transform: transformRegistration}),
    deleteRegistration: id => request.del(`http://localhost:4100/registrations/${id}`),
    crawlRegistration: link => request.get('http://localhost:4100/registrations/crawl', {params: {link}}),

    fetchProviders: () => request.get('http://localhost:4100/providers'),
    updateProvider: (id, body) => request.put(`http://localhost:4100/providers/${id}`, {body}),
    createProvider: body => request.post(`http://localhost:4100/providers`, {body}),
    deleteProvider: id => request.del(`http://localhost:4100/providers/${id}`)
  };
};
