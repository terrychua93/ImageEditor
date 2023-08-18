/** External Dependencies */
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@scaleflex/ui/core/menu-item';
import FontBold from '@scaleflex/icons/font-bold';
import FontItalic from '@scaleflex/icons/font-italic';

/** Internal Dependencies */
import { TOOLS_IDS, TRANSFORMERS_LAYER_ID } from '@/components/ImageEditor/utils/constants';
import AnnotationOptions from '@/components/ImageEditor/components/common/AnnotationOptions';
import { StyledIconWrapper } from '@/components/ImageEditor/components/common/AnnotationOptions/AnnotationOptions.styled';
import { ENABLE_TEXT_CONTENT_EDIT } from '@/components/ImageEditor/actions';
import restrictNumber from '@/components/ImageEditor/utils/restrictNumber';
import { useStore } from '@/components/ImageEditor/hooks';
import {
  StyledFontFamilySelect,
  StyledFontSizeInput,
  StyledBorderLineBox,
  StyledFlexRowWrapper
} from './TextOptions.styled';
import {
  textOptionsPopupComponents,
  TEXT_POPPABLE_OPTIONS,
} from './TextOptions.constants';
import {
  activateTextChange,
  deactivateTextChange,
} from './handleTextChangeArea';

const TextControls = ({ text, saveText, children }) => {
  const { dispatch, textIdOfEditableContent, designLayer, t, config } =
    useStore();
  const { useCloudimage } = config;
  const { fonts = [], onFontChange } = config[TOOLS_IDS.RISKTEXT];

  const changeTextProps = useCallback(
    (e) => {
      const { name, value, type } = e.target;
      saveText((latestText) => ({
        id: latestText.id,
        [name]: type === 'number' ? restrictNumber(value, 1, 500) : value,
      }));
    },
    [saveText],
  );

  const changeFontFamily = useCallback(
    (newFontFamily) => {
      changeTextProps({
        target: { name: 'fontFamily', value: newFontFamily },
      });
      if (
        text.fontFamily !== newFontFamily &&
        typeof onFontChange === 'function'
      ) {
        const reRenderCanvasFn = designLayer.draw.bind(designLayer);
        onFontChange(newFontFamily, reRenderCanvasFn);
      }
    },
    [changeTextProps, text, designLayer],
  );

  const changeFontStyle = useCallback(
    (newStyle) => {
      let fontStyle = text.fontStyle?.replace('normal', '').split(' ') || [];
      if (Object.keys(fontStyle).length > 0 && fontStyle.includes(newStyle)) {
        fontStyle = fontStyle.filter((style) => style !== newStyle);
      } else {
        fontStyle.push(newStyle);
      }

      changeTextProps({
        target: {
          name: 'fontStyle',
          value: fontStyle.join(' ').trim() || 'normal',
        },
      });
    },
    [text],
  );

  const disableTextEdit = useCallback(() => {
    dispatch({
      type: ENABLE_TEXT_CONTENT_EDIT,
      payload: {
        textIdOfEditableContent: null,
      },
    });
  }, []);

  const changeTextContent = useCallback((newContent) => {
    changeTextProps({
      target: {
        name: 'text',
        value: newContent,
      },
    });
    disableTextEdit();
  }, []);

  useEffect(() => {
    let transformer;
    if (textIdOfEditableContent && text.id === textIdOfEditableContent) {
      const canvasStage = designLayer.getStage();
      [transformer] = canvasStage.findOne(`#${TRANSFORMERS_LAYER_ID}`).children;
      activateTextChange(
        textIdOfEditableContent,
        canvasStage,
        transformer,
        changeTextContent,
        disableTextEdit,
      );
    }

    return () => {
      if (transformer && textIdOfEditableContent) deactivateTextChange();
    };
  }, [textIdOfEditableContent]);

  return (
    <StyledBorderLineBox>
      <AnnotationOptions
        className="FIE_text-tool-options"
        annotation={text}
        updateAnnotation={saveText}
        morePoppableOptionsPrepended={!useCloudimage ? TEXT_POPPABLE_OPTIONS : []}
        moreOptionsPopupComponentsObj={
          !useCloudimage ? textOptionsPopupComponents : {}
        }
        t={t}
        hideStrokeOption={true}
        showFontOption={true}
      >
        {Array.isArray(fonts) && fonts.length > 1 && (
          <StyledFontFamilySelect
            className="FIE_text-font-family-option"
            onChange={changeFontFamily}
            value={text.fontFamily}
            placeholder={t('fontFamily')}
            size="sm"
          >
            {/* fontFamily is string or object */}
            {fonts.map((fontFamily = '') => (
              <MenuItem
                className="FIE_text-font-family-item"
                key={fontFamily.value ?? fontFamily}
                value={fontFamily.value ?? fontFamily}
              >
                {fontFamily.label ?? fontFamily}
              </MenuItem>
            ))}
          </StyledFontFamilySelect>
        )}
        <StyledFontSizeInput
          className="FIE_text-size-option"
          value={text.fontSize || ''}
          name="fontSize"
          onChange={changeTextProps}
          inputMode="numeric"
          type="number"
          size="sm"
          placeholder={t('size')}
        />
        {/* <StyledFlexRowWrapper> */}
        {!useCloudimage && (
          <>
            <StyledIconWrapper
              className="FIE_text-bold-option"
              aria-selected={(text.fontStyle || '').includes('bold')}
              onClick={() => changeFontStyle('bold')}
            >
              <FontBold />
            </StyledIconWrapper>
            <StyledIconWrapper
              className="FIE_text-italic-option"
              aria-selected={(text.fontStyle || '').includes('italic')}
              onClick={() => changeFontStyle('italic')}
            >
              <FontItalic />
            </StyledIconWrapper>
          </>
        )}
        {/* {children} */}
        {/* </StyledFlexRowWrapper> */}

      </AnnotationOptions>
    </StyledBorderLineBox>

  );
};

TextControls.defaultProps = {
  children: null,
};

TextControls.propTypes = {
  text: PropTypes.instanceOf(Object).isRequired,
  saveText: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default TextControls;
