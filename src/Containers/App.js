import React, {useState} from 'react';
import AppContext from '../context/app-context';
import ChoiceLang from '../Components/ChoiceLang/ChoiceLang';
import HomeLayout from '../Components/HomeLayout/HomeLayout';
import './App.css';

function App() {

  const [lang, setLang] = useState(null);
  
  const choiceLang = (chosenLang) => {
    setLang(chosenLang);
  };

  return (
    <AppContext.Provider value = {{lang, choiceLang}} >
      <div className="App">
        {lang === null ? <ChoiceLang /> : <HomeLayout />}
      </div>
    </AppContext.Provider>    
  );
}
export default App;
