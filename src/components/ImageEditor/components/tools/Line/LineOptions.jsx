/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useAnnotation } from '../../../../ImageEditor/hooks';
import { TOOLS_IDS } from '../../../../ImageEditor/utils/constants';
import AnnotationOptions from '../../../../ImageEditor/components/common/AnnotationOptions';
import Stroke from '../../../../ImageEditor/components/common/Stroke'
import { StyledBorderLineBox } from './Line.styled';

const LineOptions = ({ t }) => {
  const [line, saveLine] = useAnnotation({
    name: TOOLS_IDS.LINE,
  });

  return (
    <StyledBorderLineBox>
      <Stroke
        className="FIE_line-tool-options" 
        annotation={line}
        updateAnnotation={saveLine}
        t={t}/>
    </StyledBorderLineBox>
  );
};

LineOptions.propTypes = {
  t: PropTypes.func.isRequired,
};

export default LineOptions;
