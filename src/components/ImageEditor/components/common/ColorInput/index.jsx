/** External Dependencies */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Popper from '@scaleflex/ui/core/popper';

/** Internal Dependencies */
import { useStore } from '../../../../ImageEditor/hooks';
import { SET_LATEST_COLOR } from '../../../../ImageEditor/actions';
import { StyledColorPicker, StyledPickerTrigger } from './ColorInput.styled';

const pinnedColorsKey = 'FIE_pinnedColors';

const ColorInput = ({ position = 'top', onChange, color }) => {
  const {
    selectionsIds = [],
    config: { annotationsCommon = {} },
    dispatch,
    latestColor,
  } = useStore();
  const [anchorEl, setAnchorEl] = useState();
  const [currentColor, setCurrentColor] = useState(
    () => latestColor || color || annotationsCommon.fill,
  );
//   const deFaultPinnedColours = ['#ff8080','#ffff80','#80ff80','#00ff80','#80ffff','#0080ff','#ff80c0','#ff80ff',
// '#ff0000','#ffff00','#80ff00','#00ff40','#00ffff','#0080c0','#8080c0','#ff00ff'
// ,'#804040','#ff8040','#00ff00','#008080','#004080','#8080ff','#800040','#ff0080'
// ,'#800000','#ff8000','#008000','#008040','#0000ff','#0000a0','#800080','#8000ff'
// ,'#400000','#804000','#004000','#004040','#000080','#000040','#400040','#400080'
// ,'#000000','#808000','#808040','#808080','#408080','#c0c0c0','#400040','#ffffff']

  const deFaultPinnedColours = ['#000080','#ff0000','#ffff00','#00ffff','#00ff40','#0080ff','#000000','#ffffff']
  const [pinnedColors, setPinnedColors] = useState(
    window?.localStorage
      ? JSON.parse(localStorage.getItem(pinnedColorsKey) || JSON.stringify(deFaultPinnedColours))
      : [],
  );

  const changePinnedColors = (newPinnedColors) => {
    if (!window?.localStorage) {
      return;
    }
    const localStoragePinnedColors =
      window.localStorage.getItem(pinnedColorsKey);
    if (JSON.stringify(newPinnedColors) !== localStoragePinnedColors) {
      const maxOfSavedColors = 60;
      const pinnedColorsToSave = newPinnedColors.slice(-maxOfSavedColors);
      window.localStorage.setItem(
        pinnedColorsKey,
        JSON.stringify(pinnedColorsToSave),
      );
      setPinnedColors(pinnedColorsToSave);
    }
  };

  const changeColor = (_newColorHex, rgba, newPinnedColors) => {
    setCurrentColor(rgba);
    onChange(rgba);
    changePinnedColors(newPinnedColors);
  };

  const togglePicker = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  useEffect(() => {
    const colorToSet = (selectionsIds.length === 0 && latestColor) || color;
    setCurrentColor(colorToSet);
    onChange(colorToSet);
  }, [color, selectionsIds]);

  return (
    <>
      <StyledPickerTrigger
        className="FIE_color-picker-triggerer"
        onClick={togglePicker}
        $color={currentColor}
        onChange={onChange}
      />
      <Popper
        className="FIE_color-picker"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        position={position}
        onClick={togglePicker}
        overlay
        zIndex={11111}
      >
        <StyledColorPicker
          onChange={changeColor}
          defaultColor={currentColor}
          pinnedColors={pinnedColors}
          showTransparentColor
        />
      </Popper>
    </>
  );
};

ColorInput.defaultProps = {
  position: 'top',
  color: undefined,
};

ColorInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  position: PropTypes.string,
  color: PropTypes.string,
};

export default ColorInput;
