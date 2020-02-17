import React from 'react';
import RegistrationsProvider from 'providers/admin/registrations';
import ProviderProvider from 'providers/admin/providers';
import Page from './page';

const Admin = () => {
  return (
    <ProviderProvider>
      <RegistrationsProvider>
        <Page />
      </RegistrationsProvider>
    </ProviderProvider>
  );
};

export default Admin;
