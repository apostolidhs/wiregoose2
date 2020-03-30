import React, {useState, useCallback, useEffect} from 'react';
import {useNavigate} from '@reach/router';
import {Box, Button, Form, FormField, TextInput} from 'grommet';
import {useSessionMember} from 'providers/session';

const memberProps = {fieldKey: 'token'};

const Login = ({resourceId, onCrawl, ...rest}) => {
  const navigate = useNavigate();

  const [sessionToken, setSessionToken] = useSessionMember(memberProps);
  const [value, setValue] = useState({token: sessionToken});

  const onSubmit = useCallback(() => {
    setSessionToken(value.token);
    navigate('/admin/providers');
  }, [value.token]);

  return (
    <Box gap="small" justify="between" direction="row" {...rest}>
      <Form value={value} onChange={setValue} onSubmit={onSubmit}>
        <FormField label="Token" name="token">
          <TextInput placeholder="Token..." name="token" />
        </FormField>

        <Button type="submit" label="Update" primary />
      </Form>
    </Box>
  );
};

export default Login;
