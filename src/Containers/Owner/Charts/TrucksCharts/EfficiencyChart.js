import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import ApexChart from '../../../../Components/UI/Charts/ApexChart';
import axios from 'axios';
import { Spin } from 'antd';

const EfficencyChart = props => {   
    const [noData, setNoData] = useState(true);
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState({
        options: {
            chart: {
                id: "Trucks-Efficency-Chart"
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                }
            },
            yaxis: {                
                labels: {
                    maxWidth: 360                  
                }
            },            
            xaxis: {
                labels: {
                    "formatter": function (val) {
                        return val.toFixed(2)
                    },
                    trim: false                    
                },
                categories: []
            },
            theme: {
                mode: 'light',
                palette: 'palette5'
            }
        }, 
        series: [
            {
                name: props.chartText.chartTooltipEfficiency,
                data: []
            }
        ]
    });
    useEffect(() => {
        getData(props.dateFrom, props.dateEnd)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.dateFrom, props.dateEnd])

    const getData = () => {
        const urlData = encodeURI(
            `from=${props.dateFrom}&end=${props.dateEnd}&param=ratio`);
        setLoading(true);
        axios.get(`/system/trucksFuelEfficiency?${urlData}`)
        .then((res) => {
            if(!res.data.length) {
                setLoading(false);
                setNoData(true);                
                return;
            }
            const newCat = res.data.map(data => {
                return data._id
            })
            const newSeries = res.data.map(data => {
                return data.realAvg.toFixed(2)
            })
            const updatedSeries = [{
                ...chartData.series[0],
                data: newSeries
            }]
            const updatedOptions = {
                ...chartData.options,
                xaxis: {
                    ...chartData.options.xaxis,
                    categories: newCat
                }
            }
            const updatedChartData = {
                options: updatedOptions,
                series: updatedSeries
            }
            setChartData(updatedChartData);
            setLoading(false);
            setNoData(false);
        })
    };
    return (
        loading ? <Spin tip="Loading..."></Spin> :
        noData ? <h4 style={{color: '#007bff'}}>{props.chartText.noData}</h4> :
        <ApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={chartData.options.xaxis.categories.length * 25 + 100}           
        />
    );    
};

const mapStateToProps = state => {
    return {
        chartText: state.initLang.textOwner.driverCharts
    }
};

export default connect(mapStateToProps)(EfficencyChart);