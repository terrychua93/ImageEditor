/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Konva from 'konva';

/** Internal Dependencies */
import { useFinetune } from '../../../../ImageEditor/hooks';
import Slider from '../../../../ImageEditor/components/common/Slider';
import Label from '@scaleflex/ui/core/label';
import { StyledSliderContainer, StyledBorderLineBox } from './HSV.styled';

const DEFAULT_VALUE = {
  hue: 0,
  saturation: 0,
  value: 0,
};

const sliderStyle = { width: '100%', padding: 0 };

const HSVOptions = ({ t }) => {
  const [finetuneProps, setFinetuneProps] = useFinetune(
    Konva.Filters.HSV,
    DEFAULT_VALUE,
  );

  const changeValue = (name, value) => {
    setFinetuneProps({
      [name]: +value,
    });
  };

  return (
    <StyledBorderLineBox>
      <StyledSliderContainer className="FIE_hue-option-wrapper">
        <Label className="FIE_hue-option-label">{t('hue')}</Label>
        <Slider
          className="FIE_hue-option"
          min={0}
          step={1}
          max={259}
          value={finetuneProps.hue ?? DEFAULT_VALUE.hue}
          onChange={(val) => changeValue('hue', val)}
          style={sliderStyle}
        />
      </StyledSliderContainer>
      <StyledSliderContainer className="FIE_saturation-option-wrapper">
        <Label className="FIE_saturation-option-label">{t('saturation')}</Label>
        <Slider
          className="FIE_saturation-option"
          min={-2}
          step={0.5}
          max={15}
          value={finetuneProps.saturation ?? DEFAULT_VALUE.saturation}
          onChange={(val) => changeValue('saturation', val)}
          style={sliderStyle}
        />
      </StyledSliderContainer>
      <StyledSliderContainer className="FIE_value-option-wrapper">
        <Label className="FIE_value-option-label">{t('value')}</Label>
        <Slider
          className="FIE_value-option"
          min={-2}
          step={0.1}
          max={2}
          value={finetuneProps.value ?? DEFAULT_VALUE.value}
          onChange={(val) => changeValue('value', val)}
          style={sliderStyle}
        />
      </StyledSliderContainer>
    </StyledBorderLineBox>
  );
};

HSVOptions.propTypes = {
  t: PropTypes.func.isRequired,
};

export default HSVOptions;
