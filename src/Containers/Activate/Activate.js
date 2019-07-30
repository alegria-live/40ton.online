import React , {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Modal from '../../Components/UI/Modal/Modal';
import * as actions from '../../store/actions/index';

const Activate = ({checkParameter, error, isActivated, ...props}) => {
    const activParam = {
        id: window.location.href.slice(window.location.href.lastIndexOf("/") + 1)
    };
    const [showModal, setShowModal] = useState({show: false, message: null})

    useEffect(() => {
        props.autoInitLang();
        checkParameter(activParam);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(error && props.errorText) {
                setShowModal({
                show: true,
                message: props.errorText[error.toString()] || error
            });
            return
        };
        if(isActivated === 200 && props.registerText) {
            console.log(isActivated)
            setShowModal({
                show: true,
                message: props.registerText.activateSuccess
            });
        };
        // eslint-disable-next-line
    },[error, isActivated]);

    const closeModal = () => {
        props.clearError();
        setShowModal({show: false, message: null});
        props.history.push('/');    
    }
    return (
        <>
            {props.loading ? <Spinner /> : null}
            <Modal show={showModal.show} >
                <>
                    <p>{showModal.message}</p>
                    <button 
                    onClick={closeModal}
                    className='btn btn-secondary btn-sm'>
                    {props.registerText ? props.registerText.cancel : null}
                    </button>
                </>
            </Modal>            
        </>
    );
};

const mapStateToProps = state => {
    return {
        error: state.regReducer.error,
        loading: state.regReducer.loading,
        errorText: state.initLang.textHome.serverResErrors,
        registerText: state.initLang.textHome.registerForm,
        isActivated: state.regReducer.isActivated
    };
};
const mapDispatchToProps = dispatch => {
    return {
        autoInitLang: () => dispatch(actions.autoInitLang()),
        checkParameter: (activParam) => dispatch(actions.activateProcess(activParam)),
        clearError: () => dispatch(actions.registerClearError())
    };
};
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Activate) );