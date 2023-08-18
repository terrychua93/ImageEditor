/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useAnnotation } from '@/components/ImageEditor/hooks';
import { TOOLS_IDS } from '@/components/ImageEditor/utils/constants';
import AnnotationOptions from '@/components/ImageEditor/components/common/AnnotationOptions';
import {
  rectOptionsPopupComponents,
  RECT_POPPABLE_OPTIONS,
} from './Rect.constants';
import { StyledBorderLineBox } from './Rect.styled';
import Stroke from '@/components/ImageEditor/components/common/Stroke'

const RectOptions = ({ t }) => {
  const [rect, saveRect] = useAnnotation({
    name: TOOLS_IDS.RECT,
  });

  return (
    <StyledBorderLineBox>
      <AnnotationOptions
        className="FIE_rect-tool-options"
        moreOptionsPopupComponentsObj={rectOptionsPopupComponents}
        morePoppableOptionsPrepended={RECT_POPPABLE_OPTIONS}
        annotation={rect}
        updateAnnotation={saveRect}
        t={t}
      />
      <Stroke 
        className="FIE_rect-tool-options"
        annotation={rect}
        updateAnnotation={saveRect}
        t={t}/>
    </StyledBorderLineBox>

  );
};

RectOptions.propTypes = {
  t: PropTypes.func.isRequired,
};

export default RectOptions;
