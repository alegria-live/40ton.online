import React from 'react';
const appContext = React.createContext({
    lang: null,
    choiceLang: () => {},
    showLogIn: false,
    setShowLogIn: () => {},
    showNewPass: false,
    setShowNewPass: () => {},
    showRegister: false,
    setShowRegister: () => {},
    showOwner: false,
    setShowOwner: () => {}
});
export default appContext;