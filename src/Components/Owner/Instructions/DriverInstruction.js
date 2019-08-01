import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { connect } from 'react-redux';
import { Modal, Button, Icon } from 'antd';

const PhoneInstruction = props => {
    const componentRef = useRef();
    return (
        
        <Modal
            visible={props.visible}
            title={props.instrText.title}
            width='50vw'
            onCancel={() => props.onClose()}
            footer={[
                <ReactToPrint
                    trigger={() => <Button><Icon type="printer" /></Button>}
                    content={() => componentRef.current}
                />,
                <Button key="back" onClick={() => props.onClose()}>
                    OK
                </Button>  
            ]}>
            <div ref={componentRef} style={{margin: 30}}>
                <h5>{props.instrText.driver +': ' + props.name + ' ' + props.lastName}</h5>
                <h6>{props.instrText.id + ' ' + props.id}</h6>
                <hr></hr>
                <div dangerouslySetInnerHTML={{__html: props.instrText.instruction}}></div>
            </div>            
        </Modal>
    )
};
const mapStateToProps = state => {
    return {
        instrText: state.initLang.textOwner.driverInstruction
    }
};
export default connect(mapStateToProps)(PhoneInstruction);
