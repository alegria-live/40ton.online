import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import ApexChart from '../../../../Components/UI/Charts/ApexChart';
import axios from 'axios';
import { Spin } from 'antd';

const FuelChart = props => {   
    const [noData, setNoData] = useState(true);
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState({
        options: {
            chart: {
                id: "Trucks-Fuel-Chart"
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
            dataLabels: {
                enabled: true,
                offsetX: 320,
                style: {
                    fontSize: '12px',
                    colors: ['#fff']
                }
            },
            xaxis: {
                min:20,
                labels: {
                    trim: false,
                    axisTicks: {
                        show: true,
                        borderType: 'solid',
                        color: '#78909C',
                        height: 6,
                        offsetX: 0,
                        offsetY: 0
                    }
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
                name: props.chartText.chartTooltipFuel,
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
            `from=${props.dateFrom}&end=${props.dateEnd}&param=mediaReal`);
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
        .catch(() => {
            setLoading(false)
            setNoData(true)
        })
    }
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
        chartText: state.initLang.textOwner.truckCharts
    }
};

export default connect(mapStateToProps)(FuelChart);