/** External Dependencies */
import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useAnnotation } from '@/components/ImageEditor/hooks';
import { TOOLS_IDS } from '@/components/ImageEditor/utils/constants';
import AnnotationOptions from '@/components/ImageEditor/components/common/AnnotationOptions';
import Stroke from '@/components/ImageEditor/components/common/Stroke'
import { StyledBorderLineBox, StyledFlex } from './Elipse.styled';
import ColorInput from '@/components/ImageEditor/components/common/ColorInput';

const EllipseOptions = ({ t }) => {
  const [ellipse, saveEllipse] = useAnnotation({
    name: TOOLS_IDS.ELLIPSE,
  });

  const saveColor = (e) => {
    return e
  }

  return (
    <StyledBorderLineBox>
      <AnnotationOptions
        className="FIE_ellipse-tool-options"
        annotation={ellipse}
        updateAnnotation={saveEllipse}
        hideStrokeOption
        hideColorLabel={true}
        t={t}
      />
      <Stroke
        className="FIE_ellipse-tool-options"
        annotation={ellipse}
        updateAnnotation={saveEllipse}
        t={t}/>
    </StyledBorderLineBox>
  );
};

EllipseOptions.propTypes = {
  t: PropTypes.func.isRequired,
};
export default EllipseOptions;
