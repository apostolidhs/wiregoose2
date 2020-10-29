export const isProduction = () => process.env.NODE_ENV === 'production';
export const isMockedImage = () => !!process.env.REACT_APP_MOCK_IMAGE;
export const getImageProxyUri = () => process.env.REACT_APP_IMAGE_PROXY_URL;
export const getBackendUri = () => `${process.env.REACT_APP_BACKEND_URL}/api`;
export const getFacebookId = () => process.env.REACT_APP_FACEBOOK_ID;
export const getFacebookAdminUserId = () => process.env.REACT_APP_FACEBOOK_ADMIN_USER_ID;
export const enabledFBAdv = () => isProduction();
export const enabledAdSense = () => isProduction();
