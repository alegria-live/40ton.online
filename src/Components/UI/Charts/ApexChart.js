import React, { Component } from "react";
import Chart from "react-apexcharts";

class ChartRender extends Component {
    
    render() {
        return (
            <div className="app" >
                <div className="row">
                    <div className="mixed-chart" style={{ width: "98%" }}>
                        <Chart
                            options={this.props.options}
                            series={this.props.series}
                            type={this.props.type}
                            height={this.props.height}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ChartRender;