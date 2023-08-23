/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Text, Rect} from 'react-konva';

/** Internal Dependencies */
import nodesCommonPropTypes from '../nodesCommonPropTypes';

const RiskTextNode = ({
  id,
  name,
  text,
  fontFamily,
  fontSize,
  fontStyle,
  fill,
  fillRect,
  x,
  y,
  width,
  height,
  scaleX,
  scaleY,
  rotation,
  annotationEvents,
  stroke,
  strokeWidth,
  shadowOffsetX,
  shadowOffsetY,
  shadowBlur,
  shadowColor,
  shadowOpacity,
  opacity,
  letterSpacing,
  lineHeight,
  align,
  ...otherProps
}) => (

  <>
  <Rect
  fill={fillRect}
  x={x}
  y={y}
  width={width}
  height={height}
  />
  <Text
    id={id}
    name={name}
    rotation={rotation}
    scaleX={scaleX}
    scaleY={scaleY}
    stroke={stroke}
    strokeWidth={strokeWidth}
    shadowOffsetX={shadowOffsetX}
    shadowOffsetY={shadowOffsetY}
    shadowBlur={shadowBlur}
    shadowColor={shadowColor}
    shadowOpacity={shadowOpacity}
    opacity={opacity}
    fill={fill}
    text={text}
    fontFamily={fontFamily}
    fontStyle={fontStyle}
    fontSize={fontSize}
    letterSpacing={letterSpacing}
    lineHeight={lineHeight}
    align={align}
    x={x}
    y={y}
    width={width}
    height={height}
    {...annotationEvents}
    {...otherProps}
  />

  </>

);

RiskTextNode.defaultProps = {
  ...nodesCommonPropTypes.defaults,
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur imperdiet tortor quis odio facilisis, id aliquet nulla facilisis. Etiam tincidunt tempor odio nec placerat.',
  fontFamily: 'Arial',
  fontSize: 14,
  fill: '#000',
  width: 0,
  height: 0,
  letterSpacing: undefined,
  lineHeight: undefined,
  align: 'left',
};

RiskTextNode.propTypes = {
  ...nodesCommonPropTypes.definitions,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  text: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  fill: PropTypes.string,
  letterSpacing: PropTypes.number,
  lineHeight: PropTypes.number,
  align: PropTypes.string,
};

export default RiskTextNode;
