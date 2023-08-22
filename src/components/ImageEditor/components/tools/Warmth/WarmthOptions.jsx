/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useFinetune } from '../../../../ImageEditor/hooks';
import restrictNumber from '../../../../ImageEditor/utils/restrictNumber';
import { Warmth as CustomWarmth } from '../../../../ImageEditor/custom/finetunes';
import Slider from '../../../../ImageEditor/components/common/Slider';
import { StyledSliderContainer, StyledBorderLineBox } from './Warmth.styled';
import Label from '@scaleflex/ui/core/label';

const MIN_VALUE = 0;
const DEFAULT_VALUE = {
  warmth: MIN_VALUE,
};
const MAX_VALUE = 200;
const sliderStyle = { width: '100%', padding: 0 };

const WarmthOptions = () => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    CustomWarmth,
    DEFAULT_VALUE,
  );

  const changeValue = (value) => {
    setFinetuneProps({
      warmth: restrictNumber(value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <StyledBorderLineBox>
      <StyledSliderContainer>
      <Label className="FIE_hue-option-label">Warmth</Label>
        <Slider
          className="FIE_warmth-option"
          min={MIN_VALUE}
          max={MAX_VALUE}
          value={finetuneProps.warmth ?? DEFAULT_VALUE.warmth}
          onChange={changeValue}
          style={sliderStyle}
        />
      </StyledSliderContainer>

    </StyledBorderLineBox>

  );
};

export default WarmthOptions;
