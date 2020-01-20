import React, {useEffect} from 'react';
import {Button} from 'grommet';
import {FormPrevious} from 'grommet-icons';

const goBack = () => window.history.back();

const Back = ({onClick = goBack}) => (
  <Button icon={<FormPrevious size="32px" />} label="Back" onClick={onClick} plain />
);

export default Back;
