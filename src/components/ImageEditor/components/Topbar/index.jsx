/** External Dependencies */
import React,{useState} from 'react';

/** Internal Dependencies */
import Separator from '../../../ImageEditor/components/common/Separator';
import { usePhoneScreen, useStore } from '../../../ImageEditor/hooks';
import CloseButton from './CloseButton';
import SaveButton from './SaveButton';
import ResetButton from './ResetButton';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import ImageDimensionsAndDisplayToggle from './ImageDimensionsAndDisplayToggle';
import CanvasZooming from './CanvasZooming';
import {
  StyledTopbar,
  StyledFlexCenterAlignedContainer,
  StyledFlexCenterAlignedSaveContainer,
  StyledHistoryButtonsWrapper,
} from './Topbar.styled';
import BackButton from './BackButton';
import ImageViewer from '../../../ImageViewer';

const Topbar = (props) => {
  const {
    config: { showBackButton, disableZooming },
  } = useStore();
  const [showImageViewer, setShowImageViewer] = useState(false);

  const onOpenImageViewer = () => {
    setShowImageViewer(true)
  }

  const onCloseImageViewerModal = () => {
    setShowImageViewer(false);
  };

  return (
    <>
    {showBackButton ? <BackButton /> : <CloseButton />}
    <StyledTopbar reverseDirection={showBackButton} className="FIE_topbar" style={{height: !!props.displayTopbarSource? '160px' :'80px'}}>
      <StyledFlexCenterAlignedSaveContainer
        reverseDirection={showBackButton}
        className="FIE_topbar-buttons-wrapper"
      >
        <SaveButton />
        <StyledHistoryButtonsWrapper className="FIE_topbar-history-buttons">
          <ResetButton margin="0" />
          <UndoButton margin="0" />
          <RedoButton margin="0" />
        </StyledHistoryButtonsWrapper>
      </StyledFlexCenterAlignedSaveContainer>
      <StyledFlexCenterAlignedContainer className="FIE_topbar-center-options">
        <ImageDimensionsAndDisplayToggle />
        {!disableZooming && (
          <>
            <Separator />
            <CanvasZooming />
          </>
        )}
      </StyledFlexCenterAlignedContainer>
      {props.displayTopbarSource ? 
      <div className="FIE_topbar-ori-image" onClick={onOpenImageViewer}>
        <img src={props.displayTopbarSource.base64} width="30" height="30"/> 
      </div>: <span/>}
      

      {showImageViewer && (
        <ImageViewer
          fileMetadataId={props.displayTopbarSource.fileMetadataId}
          fileExtension={props.displayTopbarSource.fileExtension}
          onCloseModal={() => onCloseImageViewerModal()}
        />
      )}
    </StyledTopbar>
    </>
  );
};
export default Topbar;
