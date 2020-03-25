import React from 'react';
import {RegistrationField} from 'providers/admin/registrations';
import {useProviderListSelector} from 'providers/admin/providers';

const selectValue = ({id}) => id;

const SelectProvider = props => {
  const providers = useProviderListSelector();

  return (
    <RegistrationField.Select
      fieldKey="provider"
      options={providers}
      valueKey="id"
      labelKey="name"
      placeholder="Provider"
      selectValue={selectValue}
      {...props}
    />
  );
};

export default SelectProvider;
