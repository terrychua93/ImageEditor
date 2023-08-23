import { notification } from "antd";
import { useEffect, useState } from "react";

export interface ImageViewerHookProps {
  imageBase64: string;
}

const useImageViewer = (props: ImageViewerHookProps) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [imageViewerLoading, setImageViewerLoading] = useState(false);
  const [displayOriImage, setDisplayOriImage] = useState("");

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

  const fetchHighResImageByFileMetadataId = async (imageBase64: string) => {
    if (!imageBase64) return;
    setImageViewerLoading(true);
    try {
      const fileData = "base64";

      if (imageBase64) {
        setImageViewerLoading(false);
        setDisplayOriImage(imageBase64);
        onOpenModal();
      } else {
        notification.error({ message: "File data not found" });
      }
    } catch {}
  };

  useEffect(() => {
    fetchHighResImageByFileMetadataId(props.imageBase64);
  }, [props.imageBase64]);

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
