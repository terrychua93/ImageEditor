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
