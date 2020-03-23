import React from 'react';
import styled from 'styled-components';
import {Box, Form, FormField, Button} from 'grommet';
import {ProviderField, useProviderSelector} from 'providers/admin/providers';

const Container = styled(Box)`
  ${({processing}) => processing && 'opacity: 0.2;'}
`;

const Provider = ({id, onDelete, onSave, ...rest}) => {
  const isNew = id === 'new';
  const {processing} = useProviderSelector(id);

  return (
    <Container elevation="small" pad="medium" processing={processing} {...rest}>
      <Form>
        <Box gap="small">
          <FormField label="Name">
            <ProviderField.Input fieldKey="name" resourceId={id} placeholder="Name" />
          </FormField>
          <FormField label="Link">
            <ProviderField.Input fieldKey="link" resourceId={id} placeholder="Link" />
          </FormField>
          <FormField label="Icon">
            <ProviderField.Input fieldKey="icon" resourceId={id} placeholder="Icon" />
          </FormField>
        </Box>
        <Box direction="row" gap="small" margin={{top: 'medium'}}>
          <Button onClick={onSave} disabled={processing} type="submit" primary label={isNew ? 'Create' : 'Save'} />
          <Button onClick={onDelete} disabled={processing} color="neutral-4" label={isNew ? 'Cancel' : 'Delete'} />
        </Box>
      </Form>
    </Container>
  );
};

export default Provider;
