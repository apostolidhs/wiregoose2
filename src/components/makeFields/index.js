import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {Select as GSelect, Box, Text} from 'grommet';
import identity from 'lodash/identity';
import makeSelect from './makeSelect';
import makeInput from './makeInput';

export default useMember => {
  const Select = makeSelect(useMember);
  const Input = makeInput(useMember);

  return {Input, Select};
};
