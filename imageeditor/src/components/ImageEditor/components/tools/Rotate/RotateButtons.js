import React, { useCallback } from 'react';
import RotationSlider from '@scaleflex/ui/core/rotation-slider';
import RotationLeft from '@scaleflex/icons/rotation-left';
import RotationRight from '@scaleflex/icons/rotation-right';
import { useDebouncedCallback, useStore } from '../../../hooks';
import { CHANGE_ROTATION, SET_RESIZE } from '../../../actions';
import restrictRotationNumber from '../../../utils/restrictRotationNumber';
import getSizeAfterRotation from '../../../utils/getSizeAfterRotation';
import { TOOLS_IDS } from '../../../utils/constants';
import ToolsBarItemButton from '../../ToolsBar/ToolsBarItemButton';

var RotateButtons = function (rotateObj) {
  var selectedTool = rotateObj.selectTool,
    isSelected = rotateObj.isSelected,
    translate = rotateObj.t;
  var a = useStore(),
    b = a.dispatch,
    c = a.adjustments.rotation,
    d = void 0 === c ? 0 : c,
    e = a.resize,
    f = void 0 === e ? {} : e,
    g = a.config,
    h = g[TOOLS_IDS.ROTATE],
    i = useDebouncedCallback(
      function (a, c) {
        var d = restrictRotationNumber(c, -180, 180);
        if ((b({ type: CHANGE_ROTATION, payload: { rotation: d } }), f.width && f.height)) {
          var e = getSizeAfterRotation(f.width, f.height, d);
          b({ type: SET_RESIZE, payload: { width: e.width, height: e.height } });
        }
      },

      20,
    ),
    l = useCallback(function (a, b) {
      selectedTool(a), i(a, b);
    }, []);

  const rotateValueStyle = {
    fontSize: '1.5rem',
    color: 'rgba(118,129,132,1)',
    width: '100%',
    textAlign: 'end',
  };
  return 'buttons' === h.componentType
    ? React.createElement(
        React.Fragment,
        null,

        React.createElement(ToolsBarItemButton, {
          className: 'FIE_rotate_button_left',
          id: TOOLS_IDS.ROTATE,
          label: 'Rotate Left -'.concat(h.angle, '\xB0'),
          Icon: RotationLeft,
          onClick: function changeRotationButtonNegative(a) {
            var b = d - h.angle;
            l(a, b);
          },
          //   isSelected: isSelected,
        }),
        React.createElement(ToolsBarItemButton, {
          className: 'FIE_rotate_button_right',
          id: TOOLS_IDS.ROTATE,
          label: 'Rotate Right +'.concat(h.angle, '\xB0'),
          Icon: RotationRight,
          onClick: function changeRotationButtonPositive(a) {
            var b = d + h.angle;
            l(a, b);
          },
          //   isSelected: isSelected,
        }),
      )
    : React.createElement(RotationSlider, {
        className: 'FIE_rotate-slider',
        min: -180,
        max: 180,
        value: d,
        angle: h.angle || 90,
        onChange: i,
        style: { marginBottom: 20 },
      });
};
RotateButtons.defaultProps = { isSelected: !1 };
export default RotateButtons;
