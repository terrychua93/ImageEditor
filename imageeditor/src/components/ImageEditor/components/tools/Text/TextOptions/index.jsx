/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useAnnotation } from '@/components/ImageEditor/hooks';
import { TOOLS_IDS } from '@/components/ImageEditor/utils/constants';
import TextControls from './TextControls';

const TextOptions = ({ t }) => {
  const [text, saveText] = useAnnotation({ name: TOOLS_IDS.TEXT });

  return <TextControls text={text} saveText={saveText} t={t} />;
};

TextOptions.propTypes = {
  t: PropTypes.func.isRequired,
};

export default TextOptions;
