/* eslint-disable no-new */
import React, { Component } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

class BarChart extends Component {
   chartRef = React.createRef();

   barChart;

   componentDidMount() {
      this.createBarChart();
   }

   componentDidUpdate(prevProps) {
      const { labels } = this.props;
      if (JSON.stringify(prevProps.labels) !== JSON.stringify(labels)) {
         if (this.barChart) {
            this.barChart.destroy();
            this.createBarChart();
         }
      }
   }

   createBarChart = () => {
      const ctx = this.chartRef.current.getContext('2d');
      const {
         type, data, labels, options, datasets,
      } = this.props;
      this.barChart = new Chart(ctx, {
         type,
         data: {
            labels,
            datasets: [{
               ...datasets,
               data,
            }],
         },
         options,
      });
   }

   render() {
      const { height } = this.props;
      return (
         <div height={ `${ height }px` }>
            <canvas id='chart-canvas' height={ `${ height }px` } ref={ this.chartRef } />
         </div>
      );
   }
}

BarChart.propTypes = {
   type: PropTypes.string,
   data: PropTypes.array,
   labels: PropTypes.array,
   options: PropTypes.object,
   datasets: PropTypes.object,
   height: PropTypes.number,
};

BarChart.defaultProps = {
   type: '',
   options: {},
   height: 250,
};

export default BarChart;
