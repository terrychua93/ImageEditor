/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useAnnotation } from '@/components/ImageEditor/hooks';
import { TOOLS_IDS } from '@/components/ImageEditor/utils/constants';
import AnnotationOptions from '@/components/ImageEditor/components/common/AnnotationOptions';
import Stroke from '@/components/ImageEditor/components/common/Stroke'
import { StyledBorderLineBox } from './Arrow.styled';
const ArrowOptions = ({ t }) => {
  const [arrow, saveArrow] = useAnnotation({
    name: TOOLS_IDS.ARROW,
  });

  return (
    <StyledBorderLineBox>
      <Stroke 
      className="FIE_arrow-tool-options"
      annotation={arrow}
      updateAnnotation={saveArrow}
      t={t}/>
    </StyledBorderLineBox>

  );
};

ArrowOptions.propTypes = {
  t: PropTypes.func.isRequired,
};

export default ArrowOptions;

