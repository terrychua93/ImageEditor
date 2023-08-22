import React, { forwardRef } from 'react';
import { Group } from 'konva';

const PreviewGroup = (props, ref) => {
  return <Group ref={ref} {...props} />;
};

export default forwardRef(PreviewGroup);
