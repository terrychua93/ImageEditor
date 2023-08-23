import React, { useState, useEffect, useRef } from 'react';

import { Button, Form, Input, Row, Col, notification } from 'antd';
import Typography from 'antd/lib/typography';
import ImageEditor, {
  onSaveImageFunction,
  ImageEditorRef,
  onSaveImageResult,
} from '../../components/ImageEditor';
import { fileToBase64 } from '../../utils/utils';

const { Title, Paragraph } = Typography;


export default () => {
  const imageEditorRef = useRef<ImageEditorRef>(null);
  const input = useRef<HTMLInputElement>(null);
  const [uploadedBase64, setUploadedBase64] = useState<string>();
  const [edittedBase64, setEdittedBase64] = useState<string>();


  const [fileType, setFileType] = useState<string>();
  const fileExtensionList = ['.jpg', '.jpeg', '.png', '.bmp', '.stl'];


  const editImage = async () => {
    imageEditorRef.current?.setImageBase64(uploadedBase64!, fileType!);
  };

  const handleFileChange = async () => {
    const fileList = input.current?.files
    if (!fileList) return;

    console.log('file', fileList[0]);
    const base64 = await fileToBase64(fileList[0]);
    setFileType(fileList[0].type);
    setUploadedBase64(base64);
    input.current!.value = '';
  };

  const saveImage: onSaveImageFunction = (originalImageData, savedImageData, imageDesignState) => {
    if (savedImageData) {
      console.log('saved image', savedImageData);
      console.log('saved image - state', imageDesignState);
      setEdittedBase64(savedImageData.imageBase64)
    }

    const result: onSaveImageResult = {
      closeEditor: true,
    };

    return result;
  };

  return (
    <>
      <Title>Image Editor</Title>
      <input
        ref={input}
        style={{ 'display': 'none' }}
        type="file"
        accept={fileExtensionList?.toString()}
        onChange={handleFileChange}
      />
      <Button style={{ 'marginRight': '5px' }} onClick={() => input.current?.click()}>
        Add
      </Button>
      <Button onClick={() => editImage()}>
        Edit Image (Custom Image)
      </Button>

      <div style={{ 'display': 'grid', 'gridAutoFlow': 'column' }}>
        <div>
          <p>Before Edit</p>
          <img src={uploadedBase64} width={200} height={250} />
        </div>

        <div>
          <p>After Edit</p>
          <img src={edittedBase64} width={200} height={250} />
        </div>
      </div>
      <ImageEditor imageEditorRef={imageEditorRef} onSave={saveImage} />
    </>
  );
};
