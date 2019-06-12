import React, {useContext} from 'react';
import classes from './ChoiceLang.css';
import AppContext from '../../context/app-context';
import flag_pl from '../../assets/img/flag_pl.png';
import flag_es from '../../assets/img/flag_es.png';
const ChoiceLang = props => {
    const { choiceLang } = useContext(AppContext);
    return (
        <div className={classes.ChoiceLang}>
            <img src={flag_pl}
            alt='system kontroli spalania wersja polska'
            title='System kontroli zużycia paliwa wersja polska'
            onClick={choiceLang.bind(this, 'pl')} />
            
            <img src={flag_es}
            alt='system kontroli spalania wersja polska'
            title='System kontroli zużycia paliwa wersja polska'
            onClick={choiceLang.bind(this, 'pl')} />
        </div>
        
    );
};
export default ChoiceLang;