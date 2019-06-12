import React from 'react';
const authContext = React.createContext({lang: null, choiceLang: () => {}});
export default authContext;