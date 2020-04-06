export const isMockedImage = () => !!process.env.REACT_APP_MOCK_IMAGE;
export const getImageProxyUri = () => process.env.REACT_APP_IMAGE_PROXY_URL;
export const getBackendUri = () => `${process.env.REACT_APP_BACKEND_URL}/api`;
