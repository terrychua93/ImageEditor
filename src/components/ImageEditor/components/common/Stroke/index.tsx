/** External Dependencies */
import PropTypes from 'prop-types';
import Label from '@scaleflex/ui/core/label';
import { StyledStrokeSpacedOptionFields, StyledStrokeFlex, StyledFlex } from './Stroke.styled';
import Slider from '../Slider';
import restrictNumber from '../../../utils/restrictNumber';
import ColorInput from '../ColorInput';

const MIN_PERCENTANGE = 0;
const MAX_PERCENTANGE = 15; //--- Reduce from 100 to 10 ---//

const Stroke = ({ annotation, updateAnnotation, t }: any) => {
  const { stroke, strokeWidth } = annotation;

  const changeStrokeWidth = (newStrokeWidth: any) => {
    updateAnnotation({
      strokeWidth: restrictNumber(
        newStrokeWidth,
        MIN_PERCENTANGE,
        MAX_PERCENTANGE,
      ),
    });
  };

  const changeStrokeColor = (newStrokeColor: any) => {
    updateAnnotation({ stroke: newStrokeColor });
  };
  return (
    <StyledStrokeSpacedOptionFields>
      <StyledFlex>
        <StyledStrokeFlex>
          <Label>{t('stroke')}</Label>
          <Slider
            annotation="px"
            onChange={(e: any) => changeStrokeWidth(e)}
            value={strokeWidth}
            min={MIN_PERCENTANGE}
            max={MAX_PERCENTANGE}
          />
          <ColorInput color={stroke} onChange={(e: any) => changeStrokeColor(e)} />
        </StyledStrokeFlex>
      </StyledFlex>
    </StyledStrokeSpacedOptionFields>

  );
};

Stroke.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Stroke;
