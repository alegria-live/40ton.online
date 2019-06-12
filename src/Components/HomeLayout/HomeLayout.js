import React, {useContext} from 'react';
import AppContext from '../../context/app-context';
const HomeLayout = props => {

  const {lang} = useContext(AppContext) 
  return (
    <h1>{lang}</h1>
  );
};
export default HomeLayout;