/** External Dependencies */
import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useAnnotation, useStore } from '@/components/ImageEditor/hooks';
import { TOOLS_IDS } from '@/components/ImageEditor/utils/constants';
import AnnotationOptions from '@/components/ImageEditor/components/common/AnnotationOptions';
import Stroke from '@/components/ImageEditor/components/common/Stroke'
import getPointerOffsetPositionBoundedToObject from '@/components/ImageEditor/utils/getPointerOffsetPositionBoundedToObject';
import randomId from '@/components/ImageEditor/utils/randomId';
import { SELECT_ANNOTATION, SET_ANNOTATION } from '@/components/ImageEditor/actions';
import getElemDocumentCoords from '@/components/ImageEditor/utils/getElemDocumentCoords';
import { POPPABLE_OPTIONS } from '../../common/AnnotationOptions/AnnotationOptions.constants';
import { StyledBorderLineBox } from './Pen.styled';

const eventsOptions = {
  passive: true,
};


const PenOptions = ({ t }) => {
  const { dispatch, designLayer, previewGroup, config } = useStore();
  const [pen, savePenDebounced, savePenNoDebounce] = useAnnotation(
    {
      ...config.annotationsCommon,
      ...config[TOOLS_IDS.PEN],
      name: TOOLS_IDS.PEN,
    },
    false,
  );
  const canvasRef = useRef(null);
  const updatedPen = useRef({
    points: [],
    moved: false,
    id: '',
  });

  const getPointerPosition = useCallback(() => {
    const canvasBoundingRect = getElemDocumentCoords(canvasRef.current.content);
    const pos = getPointerOffsetPositionBoundedToObject(
      previewGroup,
      canvasBoundingRect,
    );

    return [
      pos.offsetX - (designLayer.attrs.xPadding || 0),
      pos.offsetY - (designLayer.attrs.yPadding || 0),
    ];
  }, []);

  const handlePointerMove = useCallback(() => {
    if (!updatedPen.current.moved) {
      updatedPen.current = {
        moved: true,
        id: randomId(TOOLS_IDS.PEN),
        points: [...updatedPen.current.points, ...getPointerPosition()],
      };

      savePenNoDebounce({
        id: updatedPen.current.id,
        name: TOOLS_IDS.PEN,
        points: updatedPen.current.points,
      });
    } else {
      updatedPen.current.points = updatedPen.current.points.concat(
        getPointerPosition(),
      );

      dispatch({
        type: SET_ANNOTATION,
        payload: {
          id: updatedPen.current.id,
          points: updatedPen.current.points,
          dismissHistory: true,
        },
      });
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (updatedPen.current.id) {
      dispatch({
        type: SELECT_ANNOTATION,
        payload: {
          annotationId: updatedPen.current.id,
        },
      });
    }

    updatedPen.current = null;
    canvasRef.current.off('mousemove touchmove', handlePointerMove);
    canvasRef.current.off('mouseleave touchcancel', handlePointerUp);
    document.removeEventListener('mouseup', handlePointerUp, eventsOptions);
    document.removeEventListener('touchend', handlePointerUp, eventsOptions);
    document.removeEventListener('mouseleave', handlePointerUp, eventsOptions);
    document.removeEventListener('touchcancel', handlePointerUp, eventsOptions);
  }, []);

  const handlePointerDown = useCallback((e) => {
    if (e.target.attrs.draggable) {
      return;
    }
    e.evt.preventDefault();

    updatedPen.current = { points: getPointerPosition() };

    canvasRef.current.on('mousemove touchmove', handlePointerMove);
    canvasRef.current.on('mouseleave touchcancel', handlePointerUp);
    document.addEventListener('mouseup', handlePointerUp, eventsOptions);
    document.addEventListener('touchend', handlePointerUp, eventsOptions);
    document.addEventListener('mouseleave', handlePointerUp, eventsOptions);
    document.addEventListener('touchcancel', handlePointerUp, eventsOptions);
  }, []);

  useEffect(() => {
    canvasRef.current = designLayer?.getStage();
    if (canvasRef.current) {
      canvasRef.current.on('mousedown touchstart', handlePointerDown);
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.off('mousedown touchstart', handlePointerDown);
      }
    };
  }, []);

  return (
    <StyledBorderLineBox>
      <Stroke 
        className="FIE_pen-tool-options"
        annotation={pen}
        updateAnnotation={savePenDebounced}
        t={t}/>
    </StyledBorderLineBox>

  );
};

PenOptions.propTypes = {
  t: PropTypes.func.isRequired,
};

export default PenOptions;