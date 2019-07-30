import React, {useContext} from 'react';
import classes from './ChoiceLang.css';
import AppContext from '../../../context/app-context';
import flag_pl from '../../../assets/img/flag_pl.png';
import flag_es from '../../../assets/img/flag_es.png';
const ChoiceLang = props => {
    const { choiceLang } = useContext(AppContext);
    return (
        <main>
            <section>
                <article>
                    <div className={classes.ChoiceLang}>
                        <img src={flag_pl}
                        alt='System kontroli zużycia paliwa wersja polska'
                        title='System kontroli zużycia paliwa wersja polska'
                        onClick={ () => choiceLang('pl')} />
                        
                        <img src={flag_es}
                        alt='Sistema de Control de Combustible version español'
                        title='Sistema de Control de Combustible version español'
                        onClick={() => choiceLang('es')} />
                    </div>                
                </article>
            </section>
        </main>
    );
};
export default ChoiceLang;