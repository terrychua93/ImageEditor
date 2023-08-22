/**
 * Firerobot Image Editor
 */
/** External Dependencies */
import React, { forwardRef, useEffect, useState, useImperativeHandle } from 'react';
import { Modal } from 'antd';
import { popConfirm } from './components/Popconfirm';
/** Internal Dependencies */
import FilerobotImageEditor from '../ImageEditor/components/AssemblyPoint';
import { TABS_IDS, TOOLS_IDS } from '../ImageEditor/utils/constants';
// export { TABS_IDS as TABS, TOOLS_IDS as TOOLS };

const ImageEditor = (props) => {
  const { imageEditorRef, onSave, typeOfAttachment } = props;
  const [imageInfo, setImageInfo] = useState();
  const [displayTopbarImageInfo, setDisplayTopbarImageInfo] = useState(null);
  let isImageExpired = false;

  function startEdit(imageData) {
    const img = new Image();
    img.src = `data:image/${imageData.type};charset=utf-8;base64, ` + imageData.base64Data;
    img.crossOrigin = 'Anonymous';
    img.name = imageData.name;
    img.onload = () => {
      setImageInfo({
        ...imageData,
        name: imageData.imageName || 'New Image Edit',
        imgElement: img,
      });
    };
  }

  async function startEditiDentalImage(fileMetadataId) {

    const fileList = [fileMetadataId];
    const param = {
      FileMetadataIdList: fileList,
      IsGetThumbnail: false,
      IsGetFullSize: true
    };
    try {

    } catch { }
  }

  /** isImageExpired is handle by handleExpiredImage only occur at PatientAttachment only */
  async function getDisplayTopbarImage(fileMetadataId) {
    if (fileMetadataId == '' || !fileMetadataId || isImageExpired) {
      setDisplayTopbarImageInfo(null);
      return;
    }
    const fileList = [fileMetadataId];
    const param = {
      FileMetadataIdList: fileList,
      IsGetThumbnail: false,
      IsGetFullSize: true
    };
    try {

    } catch { }
  }

  function endEdit() {
    setImageInfo(undefined);
  }

  function onSaveImage(savedImageData, imageDesignState) {
    if (onSave && typeof onSave === 'function') {
      var result = onSave(imageInfo, savedImageData, imageDesignState);
      if (result && result.closeEditor) {
        setImageInfo(undefined);
      }
    }
  }

  function onCloseImage(closeReason,
    haveNotSavedChanges){
    if(closeReason != 'after-saving'){
      if(haveNotSavedChanges){
        popConfirm({
          content: "Changes you made may not be saved, do you wish to continue?",
          onOK: async () => {
            setImageInfo(undefined);
            return true;
          }
        })
      }else{
        setImageInfo(undefined);
      }
    }  
  }

  function handleExpiredImage(date){
    if (date) {
      const updateDate = new Date(date);
      const now = new Date();
      const timeSinceUpdate = now.getTime() - updateDate.getTime();
      //const hasExpired = timeSinceUpdate > 10000; // 10 sec in milliseconds (For Testing)
      const hasExpired = timeSinceUpdate > 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      if (hasExpired && typeOfAttachment == 'PatientAttachment') {
          isImageExpired = true;
      }
    }
  }


  useEffect(() => {
    imageEditorRef.current = {
      startEditImage: startEdit,
      startEditiDentalImage: startEditiDentalImage,
      handleExpiredEdittedImage: handleExpiredImage,
      getDisplayTopbarImage: getDisplayTopbarImage,
    };
  }, []);

  const tabs = [TABS_IDS.ANNOTATE, TABS_IDS.ADJUST, TABS_IDS.FINETUNE];

  return (
    <>
      {imageInfo === undefined ? (
        <></>
      ) : (
        <Modal
          closable={false}
          open={imageInfo !== undefined}
          onOk={() => endEdit()}
          width={1600}
          centered
          footer={null}
        >
          <div style={{ height: '750px' }}>
            <FilerobotImageEditor
              displayLeftTopImageTitle={typeOfAttachment == 'PatientAttachment'? 'Edited Image' : 'Original Image'}
              source={imageInfo.imgElement}
              displayTopbarSource={displayTopbarImageInfo}
              savingPixelRatio={1}
              previewPixelRatio={1}
              tabsIds={tabs}
              defaultTabId={TABS_IDS.ANNOTATE}
              defaultToolId={TOOLS_IDS.TEXT}
              onSave={onSaveImage}
              onClose={onCloseImage}
              closeAfterSave={true}
              avoidChangesNotSavedAlertOnLeave={false}
              defaultSavedImageType={imageInfo.type}
              Rotate={{ componentType: 'buttons', angle: 90 }}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default ImageEditor;
