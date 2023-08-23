/** External Dependencies */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Revert from '@scaleflex/icons/revert';
import Warning from '@scaleflex/icons/warning';

/** Internal Dependencies */
import { useStore } from '../../../ImageEditor/hooks';
import Modal from '../../../ImageEditor/components/common/Modal';
import { RESET } from '../../../ImageEditor/actions';
import { StyledHistoryButton } from './Topbar.styled';
import { popConfirm } from '../../../Popconfirm';
const ResetButton = ({ margin }) => {
  const {
    dispatch,
    isResetted = true,
    theme,
    feedback,
    t,
    config,
  } = useStore();

  const isBlockerError = feedback.duration === 0;


  const onRefresh = async () => {
    const isConfirmed = await popConfirm({
        title: t('changesLoseConfirmation'), 
        content: t('changesLoseConfirmationHint'),
        okText: 'Confirm'
      });
      if (isConfirmed) {
        dispatchReset();
      }
  };

  const dispatchReset = useCallback(() => {
    dispatch({ type: RESET, payload: { config } });
  }, [config]);

  const WarningIcon = () => <Warning color={theme.palette.warning} size={25} />;

  return (
    <>
      <StyledHistoryButton
        className="FIE_topbar-reset-button"
        color="link"
        onClick={isResetted ? undefined : onRefresh}
        disabled={isResetted || isBlockerError}
        title={t('resetOperations')}
        margin={margin}
      >
        <Revert size={12} />
      </StyledHistoryButton>
    </>
  );
};

ResetButton.defaultProps = {
  margin: undefined,
};

ResetButton.propTypes = {
  margin: PropTypes.string,
};

export default ResetButton;
