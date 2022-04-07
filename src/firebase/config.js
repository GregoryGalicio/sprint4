/*const config = {
  apiKey: "AIzaSyDBXLuxsH_8IVW5k0UqPIJDL9x8ZjU0mQQ",
  authDomain: "devs-united-245e8.firebaseapp.com",
  projectId: "devs-united-245e8",
  storageBucket: "devs-united-245e8.appspot.com",
  messagingSenderId: "685250525395",
  appId: "1:685250525395:web:0f7bd9c5695973049dfc26"
};
export default config*/

const config = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MSN_SENDER_ID,
    appId: process.env.REACT_APP_FB_APPID,
  };  
  export default config;