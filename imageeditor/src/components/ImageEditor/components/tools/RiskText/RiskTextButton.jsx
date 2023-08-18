/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Warning as WarnIcon } from '@scaleflex/icons/warning';

/** Internal Dependencies */
import ToolsBarItemButton from '@/components/ImageEditor/components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from '@/components/ImageEditor/utils/constants';

const RiskTextButton = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    className="FIE_risktext-tool-button"
    id={TOOLS_IDS.RISKTEXT}
    label={'Risk Text'}
    Icon={WarnIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

RiskTextButton.defaultProps = {
  isSelected: false,
};

RiskTextButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default RiskTextButton;
