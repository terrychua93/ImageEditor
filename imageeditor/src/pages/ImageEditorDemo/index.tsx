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

  const editImage = async () => {

    try {

    } catch { }
  };

  const editIdentalImage = () => {
    const fileId = form.getFieldValue('fileId');
    imageEditorRef.current?.startEditiDentalImage(fileId);
  };

  return (
    <>
      <Title>Image Editor</Title>
      <Form form={form}>
        <Row gutter={[8, 8]}>
          <Col span={1}>File Id</Col>
          <Col span={4}>
            <Form.Item name="fileId">
              <Input />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Button style={{ width: '100%' }} onClick={() => editImage()}>
              Edit Image (Custom Image)
            </Button>
          </Col>
          <Col span={3}>
            <Button style={{ width: '100%' }} onClick={() => editIdentalImage()}>
              Edit Image (iDental Image)
            </Button>
          </Col>
        </Row>
      </Form>

      <ImageEditor imageEditorRef={imageEditorRef} onSave={saveImage} />
    </>
  );
};
