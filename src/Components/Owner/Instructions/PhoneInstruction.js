import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import MenuContext from '../../../context/menu-context';
import InstructionPhone from '../../../assets/img/instructionPhone.jpg';
import Cookies from 'js-cookie';

const PhoneInstruction = props => {

    const [_gcn] = useState(Cookies.get('_gcn'))
    const {showPhoneInstruction, setShowPhoneInstruction } = useContext(MenuContext);
    let url = `https://driver.${window.location.host}/driver/`;
    
    return (
        <Modal
        visible={showPhoneInstruction}
        title={props.instrText.title}
        width='50vw'
        onCancel={() => setShowPhoneInstruction(false)}
        footer={[
            <Button key="back" onClick={() => setShowPhoneInstruction(false)}>
                OK
            </Button>            
        ]}
    >
        <p>{props.instrText.p1}</p>
        <p>{props.instrText.p2 +  url + _gcn + '/' + props.lang}</p>
        <p>{props.instrText.p3}</p>
        <p>{props.instrText.p4}</p>
        <p>{props.instrText.p5}</p>
        <img style={{margin: '20px 100px'}} src={InstructionPhone} alt='instructionPhone' />
        <p>{props.instrText.p6}</p>
        <p>{props.instrText.p7}</p>
        
    </Modal>
    )
};
const mapStateToProps = state => {
    return {
        instrText: state.initLang.textOwner.phoneInstruction,
        lang: state.initLang.language
    }
};
export default connect(mapStateToProps)(PhoneInstruction);
