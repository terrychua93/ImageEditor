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
  const { imageEditorRef, onSave } = props;
  const [imageInfo, setImageInfo] = useState();
  const [displayTopbarImageInfo, setDisplayTopbarImageInfo] = useState(null);
  let isImageExpired = false;

  function startEdit(imageData, imageType) {
      setImageInfo({
        name: 'New Image Edit',
        imgElement: imageData,
        type: imageType
      });
  }

  async function startEditiDentalImage(image64Data: string) {

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
      setDisplayTopbarImageInfo(null);
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

  useEffect(() => {
    imageEditorRef.current = {
      setImageBase64: startEdit,
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
          <div style={{ height: '500px' }}>
            <FilerobotImageEditor
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
