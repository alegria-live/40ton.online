import React, {useState, useEffect} from 'react';
import Modal from '../../Components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponent, axios ) => {
    
    return props => {
        
        const [error, setError] = useState(props.error);
        const modalClosed = () => setError(null);

        useEffect(()=> {
            setError(props.error)
        },[props.error]);

        return (
            <React.Fragment>
                <Modal
                    show={error}>{error ? error.message : null}
                    <div>
                        <button 
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{marginTop: '1rem'}}
                        onClick={modalClosed}>Anular
                        </button>
                    </div>                
                </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    };
};
export default withErrorHandler;