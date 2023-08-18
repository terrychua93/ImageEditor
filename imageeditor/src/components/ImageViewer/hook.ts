import { getFileImageByte } from '@/services/idental-api/File';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

export interface ImageViewerHookProps {
  fileMetadataId: string;
  fileExtension: string;
}

const useImageViewer = (props: ImageViewerHookProps) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [imageViewerLoading, setImageViewerLoading] = useState(false);
  const [displayOriImage, setDisplayOriImage] = useState('');

  const onOpenModal = () => {
    setIsShowModal(true);
  };
  const onCloseModal = () => {
    setIsShowModal(false);
  };
  const onCancelModal = () => {
    onCloseModal();
  };
  const onOkModal = () => {
    onCloseModal();
  };

  const fetchHighResImageByFileMetadataId = async (id: string) => {
    if (!id) return;
    setImageViewerLoading(true);
    try {
      const fileData = await getFileImageByte({
        FileMetadataId: id,
        IsGetThumbnail: false,
      }).then((res) => {
        return res;
      });

      if (fileData) {
        const fileExtensionRemoveDot = props.fileExtension?.split('.')[1];
        const highRes = fileData;
        setImageViewerLoading(false);
        setDisplayOriImage(`data:image/${fileExtensionRemoveDot};base64,  ${highRes}`);
        onOpenModal();
      } else {
        notification.error({ message: 'File data not found' });
      }
    } catch { }
  };

  useEffect(() => {
    fetchHighResImageByFileMetadataId(props.fileMetadataId);
  }, [props.fileMetadataId]);

  return {
    onOpenModal,
    onCloseModal,
    onCancelModal,
    onOkModal,
    imageViewerLoading,
    displayOriImage,
    isShowModal,
  };
};

export { useImageViewer };
