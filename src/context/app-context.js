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
    showContactForm: false,
    setShowContactForm: () => {},
    showOwner: false,
    setShowOwner: () => {},
    smallResolutionDemoModal: false,
    setSmallResolutionDemoModal: () => {}
});
export default appContext;