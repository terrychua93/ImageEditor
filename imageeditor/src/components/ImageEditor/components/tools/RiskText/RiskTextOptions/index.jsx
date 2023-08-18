/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useAnnotation } from '@/components/ImageEditor/hooks';
import { TOOLS_IDS } from '@/components/ImageEditor/utils/constants';
import TextControls from './TextControls';

const RiskTextOptions = ({ t }) => {
  const [text, saveText] = useAnnotation({ name: TOOLS_IDS.RISKTEXT });

  return <TextControls text={text} saveText={saveText} t={t} />;
};

RiskTextOptions.propTypes = {
  t: PropTypes.func.isRequired,
};

export default RiskTextOptions;
