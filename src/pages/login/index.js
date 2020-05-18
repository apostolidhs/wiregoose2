import React, {useState, useCallback} from 'react';
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
    <Box margin={{top: 'large'}} align="center" {...rest}>
      <Box gap="small" width="medium" {...rest}>
        <Form value={value} onChange={setValue} onSubmit={onSubmit}>
          <FormField label="Token" name="token">
            <TextInput placeholder="Token..." name="token" required />
          </FormField>

          <Button type="submit" label="Login" primary />
        </Form>
      </Box>
    </Box>
  );
};

export default Login;
