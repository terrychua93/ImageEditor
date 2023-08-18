/** External Depdencies */
import React from 'react';
import Konva from 'konva';

/** Internal Depdencies */
import { useFinetune } from '@/components/ImageEditor/hooks';
import restrictNumber from '@/components/ImageEditor/utils/restrictNumber';
import Slider from '@/components/ImageEditor/components/common/Slider';
import { StyledSliderContainer, StyledBorderLineBox } from './Contrast.styled';
import Label from '@scaleflex/ui/core/label';

const MIN_VALUE = -100;
const DEFAULT_VALUE = {
  contrast: 0,
};
const MAX_VALUE = 100;
const sliderStyle = { width: '100%', padding: 0 };

const ContrastOptions = () => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    Konva.Filters.Contrast,
    DEFAULT_VALUE,
  );

  const changeValue = (value) => {
    setFinetuneProps({
      contrast: restrictNumber(value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <StyledBorderLineBox>
        <StyledSliderContainer className="FIE_saturation-option-wrapper">
        <Label className="FIE_saturation-option-label">Contrast</Label>
          <Slider
      className="FIE_contrast-option"
      min={MIN_VALUE}
      max={MAX_VALUE}
      value={finetuneProps.contrast ?? DEFAULT_VALUE.contrast}
      onChange={changeValue}
      style={sliderStyle}
    />
    </StyledSliderContainer>
    </StyledBorderLineBox>

  );
};

export default ContrastOptions;
