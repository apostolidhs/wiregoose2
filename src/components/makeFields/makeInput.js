import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {TextInput} from 'grommet';

export default useMember => {
  return ({Component = TextInput, fieldKey, resourceId, size = 'small', ...rest}) => {
    const [value, setValue] = useMember({fieldKey, resourceId});

    const change = useCallback(({target: {value}}) => setValue(value), []);

    return <Component value={value} onChange={change} size={size} {...rest} />;
  };
};
