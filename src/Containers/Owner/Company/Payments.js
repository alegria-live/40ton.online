import React, {useEffect, useState, useContext} from 'react';
import { connect } from 'react-redux';
import MenuContext from '../../../context/menu-context';
import { Drawer, Table, Switch } from 'antd';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Axios from 'axios';
import _ from 'lodash';

const Payments = props => {

    const { showPayments, setShowPayments} = useContext(MenuContext);
    const [allTrucks, setAllTrucks] = useState([]);
    const [data, setData] = useState([]);   
    const [toCheck, setToCheck] = useState({});
    const [totalBasket, setTotalBasket] = useState(0);    
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const deadLine = Number(Date.now()) + 999900000;

    const columns = [
		{
			title: props.payText.registration,
            dataIndex: 'registration',
            render: text => <h6 
                style={{color: '#1890ff'}}>
                {text}
            </h6>
        },
        {
			title: props.payText.paidTo,
            dataIndex: 'paidTo',
            render: text => {
                let textColor;
                text < deadLine ? textColor='red' : textColor='#1890ff';
                text = (new Date(text)).toLocaleDateString()
                return <h6 style={{color: textColor}}>{text}</h6>}
        },
        {
			title: props.payText.buy4M,
			dataIndex: 'buy4M'
        },
        {
			title: props.payText.buy8M,
			dataIndex: 'buy8M'
        },
        {
			title: props.payText.buy12M,
			dataIndex: 'buy12M'
        },
        {
			title: props.payText.basket,
            dataIndex: 'basket',
            render: text => <h6 
                style={{color: '#1890ff'}}>
                {text ? text + props.payText.currency: null}
            </h6>
		}
    ]

    const getPayments = () => {
        setIsLoading(true);
        Axios.get('/system/allTrucks')
            .then(res => { setAllTrucks(res.data); setIsLoading(false) })
            .catch(e => {setIsLoading(false); setErrorMsg(e.response.data.toString()) })
    };

    useEffect(() => {
        if(showPayments) getPayments();
        // eslint-disable-next-line
    }, [showPayments]);

    useEffect(() => {
        if(allTrucks.length) {
            const tempToCheck = {};
            allTrucks.forEach(elem => tempToCheck[elem._id] = {id: null, value: null});           
            setToCheck(tempToCheck)
        }
    },[allTrucks]);

    useEffect(() => {
        if(allTrucks.length) {
            setData(
                allTrucks.map(elem => { 
                    return {
                        registration: elem._id,
                        paidTo: elem.paid,
                        
                        buy4M: <Switch name={elem._id} value={48} id={elem._id + '_122'}
                        onChange={(checked, event) => switchHandler(checked, event.target)}
                        checked={toCheck[elem._id].id === elem._id + '_122'}
                        />,
                        
                        buy8M: <Switch name={elem._id} value={80} id={elem._id + '_244'}
                        onChange={(checked, event) => switchHandler(checked, event.target)}
                        checked={toCheck[elem._id].id === elem._id + '_244'}
                        />,
                        
                        buy12M: <Switch name={elem._id} value={96} id={elem._id + '_365'}
                        onChange={(checked, event) => switchHandler(checked, event.target)}
                        checked={toCheck[elem._id].id === elem._id + '_365'}
                        />,
                        basket: toCheck[elem._id].value,
                        key: elem._id
                    }
                })
            );
        } // eslint-disable-next-line
    },[toCheck]);

    const switchHandler = (checked, e) => {      
        const copy = _.cloneDeep(toCheck)       
        if(checked) {
            copy[e.name].id = e.id;
            copy[e.name].value = e.value;
        }
        else {
            copy[e.name].id = null;
            copy[e.name].value = null;
        }       
        setToCheck(copy);
        checkTotal(copy);
    };

    const checkTotal = (copy) => {
        let total = 0;
        for(let key in copy) {            
            total += Number(copy[key].value ? copy[key].value : '0')
        }        
        setTotalBasket(total);
    };

    const payHandler = ()  => {
        //DotPay connection
    }

    const cancelHandler = () => {
        setTotalBasket(0);
        setShowPayments(false)
    }
    
    return(
        <Drawer
            visible={showPayments}
            placement="left"
            closable={false}
            width='auto'
            height='auto'
            style={{ textAlign: 'center' }}
            onClose={cancelHandler}
        > {
            isLoading ? <Spinner /> :
            errorMsg ?
                    <div style={{margin: '1.5rem'}}>
                            <h6 style={{color: 'red'}}>{
                                props.errorText[errorMsg] ? 
                                props.errorText[errorMsg] : 
                                props.cText.addWorkerError
                            }</h6>
                    </div> :                     

            <div style={{width: '90%', margin: '1rem auto'}}>
                <h4 style={{color: 'rgba(43, 144, 143, 0.85)', margin: 20}} >
                    {props.payText.title}
                </h4>
                <h6>
                    {props.payText.infoHeader}
                </h6>
                <p style={{padding: 40}}>
                    {props.payText.info}
                </p>
                <Table 
                    columns={columns}
                    dataSource={data}
                    bordered
                    size='middle'
                    width='80%'
                    pagination={{ pageSize: 20 }}                   
                    footer={() => {
                        const vat = Number( (totalBasket * props.payText.vatRate).toFixed(2));
                        const gross = vat + totalBasket
                        return (
                            !totalBasket ? null :
                            <h6 style={{textAlign: 'right', padding: '0 20px'}}>{
                                `${props.payText.total} ${totalBasket} ${props.payText.currency}
                                 + ${vat} ${props.payText.vat} = ${gross} ${props.payText.currency}`}
                            </h6>
                        )
                    }}
                />
                <p style={{padding: '20px 40px'}}>
                    {props.payText.acceptPayment}
                </p>               
            </div>
        }
            <button
                onClick={payHandler}
                disabled
                hidden={errorMsg}
                style={{marginRight: 30}}
                className='btn btn-primary btn-sm'>
                {props.payText ? props.payText.payButton : ''}
            </button>
            <button
                onClick={cancelHandler}
                className='btn btn-secondary btn-sm'>
                {props.payText ? props.payText.cancel : ''}
            </button>
        </Drawer>        
    )
};
const mapStateToProps = state => {
    return {
        errorText: state.initLang.textHome.serverResErrors,
        payText: state.initLang.textOwner.companyPayment
    };
};
export default connect(mapStateToProps)(Payments);