import { createCanvas, loadImage } from "canvas";
import { canvasToBlob } from "blob-util";
export const b64toFile = (
  b64Data: string,
  filename: string,
  contentType: string
) => {
  // const base64data = b64Data.split(',')[1];
  // const blob = b64toBlob(base64data, contentType);
  // const convertedFile: File = new File([blob], filename, { type: 'image/' + contentType });

  const arr = b64Data.split(",");
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: "image/" + contentType });

  // return convertedFile;
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export const convertFileTo24Bit = (file: File): Promise<File> => {
  return new Promise(async (resolve) => {
    const image = await loadImage(URL.createObjectURL(file));
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext("2d")!;

    // Draw the original image on the canvas
    context.drawImage(image, 0, 0);

    // Get the image data from the canvas
    const imageData = context.getImageData(0, 0, image.width, image.height);

    // Create a new canvas with 24-bit depth
    const newCanvas = createCanvas(image.width, image.height);
    const newContext = newCanvas.getContext("2d")!;

    // Set the new image data to the new canvas
    newContext.putImageData(imageData, 0, 0);

    // Convert the new canvas to a Blob
    const blob = await canvasToBlob(newCanvas, "image/jpeg");

    if (blob) {
      // Create a File object from the Blob
      const convertedFile = new File([blob], file.name, { type: file.type });
      resolve(convertedFile);
    }
  });
};
