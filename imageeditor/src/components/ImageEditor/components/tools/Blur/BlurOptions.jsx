/** External Dependencies */
import React from 'react';
import Konva from 'konva';

/** Internal Dependencies */
import { useFinetune } from '@/components/ImageEditor/hooks';
import restrictNumber from '@/components/ImageEditor/utils/restrictNumber';
import Slider from '@/components/ImageEditor/components/common/Slider';
import { StyledSliderContainer, StyledBorderLineBox } from './Blur.styled';
import Label from '@scaleflex/ui/core/label';

const MIN_VALUE = 0;
const DEFAULT_VALUE = {
  blurRadius: MIN_VALUE,
};
const MAX_VALUE = 100;
const sliderStyle = { width: '100%', padding: 0 };

const BlurOptions = () => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    Konva.Filters.Blur,
    DEFAULT_VALUE,
  );

  const changeValue = (value) => {
    setFinetuneProps({
      blurRadius: restrictNumber(value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <StyledBorderLineBox>
      <StyledSliderContainer className="FIE_hue-option-wrapper">
      <Label className="FIE_hue-option-label">Blur</Label>
      <Slider
        className="FIE_blur-option"
        min={MIN_VALUE}
        max={MAX_VALUE}
        value={finetuneProps.blurRadius ?? DEFAULT_VALUE.blurRadius}
        onChange={changeValue}
        style={sliderStyle}
      />
      </StyledSliderContainer>

    </StyledBorderLineBox>

  );
};

export default BlurOptions;
