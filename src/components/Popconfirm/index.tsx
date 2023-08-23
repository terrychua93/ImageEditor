import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Col, Modal, Popconfirm, Row } from 'antd';
import './index.css';
const { confirm, info } = Modal;

/**
 * Popconfirm setup with the locales in this project
 * @see https://ant.design/components/popconfirm/
 */
export default ({ children, onConfirm }: { children: React.ReactNode; onConfirm: () => void }) => {

  return (
    <Popconfirm
      title={'Are you sure?'}
      okText={'Yes'}
      cancelText={'No'}
      onConfirm={onConfirm}
    >
      {children}
    </Popconfirm>
  );
};

export function popConfirm({
  title,
  content,
  okText,
  cancelText,
  cancelHiddn,
  width,
  onOK,
  onCancel,
}: {
  title?: string;
  content?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  cancelHiddn?: boolean;
  width?: string | number;
  onOK?: () => Promise<boolean>;
  onCancel?: () => Promise<boolean>;
}) {
  return new Promise<boolean>((resolve) => {
    confirm({
      icon: undefined,
      title: (
        <div className="title_style">
          <QuestionCircleOutlined />
          <span>&nbsp;&nbsp;</span>
          {title ?? 'Confirm'}
        </div>
      ),
      width: width,
      bodyStyle: { padding: '0' },
      content: (
        <div className="content_style" style={{ whiteSpace: 'pre-line' }}>
          {content}
        </div>
      ),
      onOk: async () => {
        if (onOK) {
          const onOKResult = await onOK();
          if (onOKResult === true) {
            resolve(true);
          } else {
            return Promise.reject(false);
          }
        } else {
          resolve(true);
        }
      },
      onCancel: async () => {
        if (onCancel) {
          const onCancelResult = await onCancel();
          if (onCancelResult === true) {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      },
      okText: okText,
      cancelText: cancelText,
      cancelButtonProps: { hidden: cancelHiddn }
    });
  });
}

export function popModal({
  title,
  content,
  width,
  height,
  afterClose,
  centered,
}: {
  title?: string;
  content?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  afterClose?: () => void;
  centered?: boolean;
}) {
  const modalRef = info({
    icon: undefined,
    title: title && (
      <div className="title_style">
        <Row>
          <Col flex="1 1 100px">{title}</Col>
          <Col flex="0 0 20px">
            <CloseOutlined onClick={() => modalRef.destroy()} />
          </Col>
        </Row>
      </div>
    ),
    width: width,
    bodyStyle: { padding: '0', height: height },
    content: (
      <div className="content_style" style={{ whiteSpace: 'pre-line' }}>
        {content}
      </div>
    ),
    okButtonProps: { hidden: true },
    afterClose: afterClose,
    centered: centered,
  });
  return modalRef;
}

export function popAlert({
  title = 'Alert',
  content,
  width,
  height,
  centered,
  maskStyle,
  okText = 'OK',
  padding,
}: {
  title?: string;
  content?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  centered?: boolean;
  maskStyle?: React.CSSProperties;
  okText?: React.ReactNode;
  padding?: string | number;
}) {
  return new Promise<void>((resolve) => {
    const modalRef = info({
      icon: undefined,
      title: title && (
        <div className="title_style">
          <Row>
            <Col flex="1 1 100px">{title}</Col>
            <Col flex="0 0 20px">
              <CloseOutlined onClick={() => modalRef.destroy()} />
            </Col>
          </Row>
        </div>
      ),
      width: width,
      maskStyle: maskStyle,
      bodyStyle: { padding: '0', height: height },
      content: (
        <div style={{ padding: padding ?? '4px 12px', whiteSpace: 'pre-line' }}>{content}</div>
      ),
      okText: okText,
      afterClose: () => resolve(),
      centered: centered,
      maskClosable: true,
    });
  });
}
