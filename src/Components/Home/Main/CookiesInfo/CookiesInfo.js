import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';

export const CookiesInfo = props => {

    const [cookieText, setCookieText] = useState('');
    const [showButton, setShowButton] = useState(false);
    const writeSigns = (text, intervalTime) => {
        let i = 0,
        tempText = cookieText
        
        const interval = setInterval(() => {
            setCookieText(tempText += text.charAt(i))
            if (i++ >= text.length) {
                i = 0;
                clearInterval(interval);
                setShowButton(true);
            }
        }, intervalTime)
    };

    useEffect(() => {
        if(props.text.length) writeSigns(props.text, 50)
        // eslint-disable-next-line
    }, [props.text])
    
    return (
        <>
            <span style={{marginRight: 15}}>{cookieText}</span>
            {document.documentElement.clientWidth < 1024 ? <hr></hr> : null}
            <button
                className="btn btn-outline-info btn-sm"
                hidden = {!showButton}
                onClick={() => props.setShowCookie(false)}>OK
            </button>
        </>
    )
};
const mapStateToProps = state => {
    return {
        text: state.initLang.textHomeInside.cookieText
    }
};
export default connect(mapStateToProps)(CookiesInfo);