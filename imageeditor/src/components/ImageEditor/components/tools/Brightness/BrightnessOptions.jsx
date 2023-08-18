/** External Dependencies */
import React from 'react';
import Konva from 'konva';

/** Internal Dependencies */
import { useFinetune } from '@/components/ImageEditor/hooks';
import restrictNumber from '@/components/ImageEditor/utils/restrictNumber';
import Slider from '@/components/ImageEditor/components/common/Slider';
import { StyledSliderContainer ,StyledBorderLineBox } from './Brightness.styled';
import Label from '@scaleflex/ui/core/label';

const MIN_VALUE = -1;
const DEFAULT_VALUE = {
  brightness: 0,
};
const MAX_VALUE = 1;
const sliderStyle = { width: '100%', padding: 0 };

const BrightnessOptions = () => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    Konva.Filters.Brighten,
    DEFAULT_VALUE,
  );

  const changeValue = (value) => {
    setFinetuneProps({
      brightness: restrictNumber(value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <StyledBorderLineBox>
      <StyledSliderContainer>
      <Label className="FIE_FIE_brightness-option-label">Brightness</Label>
        <Slider
          className="FIE_brightness-option"
          min={MIN_VALUE}
          step={0.05}
          max={MAX_VALUE}
          value={finetuneProps.brightness ?? DEFAULT_VALUE.brightness}
          onChange={changeValue}
          style={sliderStyle}
        />
      </StyledSliderContainer>

    </StyledBorderLineBox>

  );
};

export default BrightnessOptions;
