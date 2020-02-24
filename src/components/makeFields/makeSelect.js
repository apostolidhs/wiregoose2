import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {Select as GSelect, Box, Text} from 'grommet';
import identity from 'lodash/identity';

export default useMember => {
  return ({
    Component = GSelect,
    fieldKey,
    resourceId,
    selectValue = identity,
    options: allOptions,
    size = 'small',
    ...rest
  }) => {
    const [options, setOptions] = useState(allOptions);
    const [value, setValue] = useMember({fieldKey, resourceId});

    const valueLabel = useMemo(() => {
      if (!rest.labelKey) return;
      const option = options.find(option => option[rest.valueKey] === value);
      return (
        <Box pad="small">
          {option ? (
            <Text weight="bold" size={size}>
              {option[rest.labelKey]}
            </Text>
          ) : (
            'Select...'
          )}
        </Box>
      );
    }, [value]);

    useEffect(() => {
      setOptions(allOptions);
    }, [allOptions]);

    const change = useCallback(({option}) => setValue(selectValue(option)), []);
    const close = useCallback(() => setOptions(allOptions), []);
    const search = useCallback(
      text => {
        const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
        const exp = new RegExp(escapedText, 'i');
        setOptions(allOptions.filter(o => exp.test(o)));
      },
      [allOptions]
    );

    return (
      <Component
        value={value}
        onChange={change}
        options={options}
        onClose={close}
        onSearch={search}
        replace={false}
        dropHeight="medium"
        valueLabel={valueLabel}
        size={size}
        {...rest}
      />
    );
  };
};
