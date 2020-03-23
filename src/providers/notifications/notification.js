import React, {useState, useMemo} from 'react';
import {Layer, Box, Text} from 'grommet';

const Notification = ({type, message}) => {
  return (
    <Layer animation="fadeIn" modal={false} full="horizontal" position="top">
      <Box background={type === 'info' ? 'neutral-3' : 'status-warning'} pad="small">
        <Text color="white" size="large">
          {message}
        </Text>
      </Box>
    </Layer>
  );
};

export default Notification;
