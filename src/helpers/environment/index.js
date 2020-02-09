export const isMockedImage = () => !!process.env.REACT_APP_MOCK_IMAGE;
export const getImageProxyUri = () =>
  process.env.REACT_APP_IMAGE_PROXY_HOST + ':' + process.env.REACT_APP_IMAGE_PROXY_PORT;
