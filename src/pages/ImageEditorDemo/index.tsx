import React, { useState, useEffect, useRef } from 'react';

import { Button, Form, Input, Row, Col, notification } from 'antd';
import Typography from 'antd/lib/typography';
import ImageEditor, {
  onSaveImageFunction,
  ImageEditorRef,
  onSaveImageResult,
} from '../../components/ImageEditor';


const { Title, Paragraph } = Typography;
const saveImage: onSaveImageFunction = (originalImageData, savedImageData, imageDesignState) => {
  if (savedImageData) {
    console.log('saved image', savedImageData);
    console.log('saved image - state', imageDesignState);
  }

  const result: onSaveImageResult = {
    closeEditor: true,
  };

  return result;
};

export default () => {
  const [form] = Form.useForm();
  const imageEditorRef = useRef<ImageEditorRef>(null);
  const input = useRef<HTMLInputElement>(null);
  const fileExtensionList = ['.jpg', '.jpeg', '.png', '.bmp', '.stl'];
  const editImage = async () => {
    console.log('input', input.current);

    try {

    } catch { }
  };

  const editIdentalImage = () => {
    const fileId = form.getFieldValue('fileId');
    imageEditorRef.current?.startEditiDentalImage(fileId);
  };

  const handleFileChange = async () => {
    const fileList = input.current?.files
    if (!fileList) return;
    for (let i = 0; i < fileList.length; i++) {
      if (!fileList[i]) return;
      console.log('file', fileList[i])
    }
    input.current!.value = '';
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
      <Button style={{ width: '100%' }} onClick={() => editImage()}>
        Edit Image (Custom Image)
      </Button>
      <ImageEditor imageEditorRef={imageEditorRef} onSave={saveImage} />
    </>
  );
};
