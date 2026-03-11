
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './index.scss';
import { chartHover } from '../chartHover';


const LineChart = ({
   datas,
   isChurnRate,
}) => {
   const svgContainer = useRef(null);

   const getSvgContainerSize = () => {
      if (svgContainer && svgContainer.current
         && svgContainer.current.clientWidth && svgContainer.current.clientHeight) {
         const newWidth = svgContainer.current.clientWidth;
         const newHeight = svgContainer.current.clientHeight;
         return { width: newWidth, height: newHeight };
      }
      return { width: 500, height: 200 };
   };


   const createLineChart = () => {
      d3.select('#lineChart').selectAll('svg').remove();
      const parseTime = d3.timeParse('%Y-%m-%d');
      const data = datas.map((d) => {
         const finalCloseData = Number(d.close);
         return {
            date: isChurnRate ? parseTime(d.date) : parseTime(d.date[1]),
            close: isChurnRate ? finalCloseData : d.amount,
         };
      });

      const margin = {
         top: 24, right: 10, bottom: 50, left: 70,
      };
      // const width = 700 - margin.left - margin.right;
      //   const height = 300 - margin.top - margin.bottom;
      const chartWidth = getSvgContainerSize().width - margin.left - margin.right;
      const chartHeight = getSvgContainerSize().height - margin.top - margin.bottom;
      // add SVG to the page
      const svg = d3
         .select('#lineChart')
         .append('svg')
         .attr('width', chartWidth + margin.left + margin.right)
         .attr('height', chartHeight + margin.top + margin.bottom)
      // .call(responsivefy)
         .append('g')
         .attr('transform', `translate(${ margin.left },  ${ margin.top })`);
      // find data range
      const xMin = d3.min(data, d => {
         return d.date;
      });
      const xMax = d3.max(data, d => {
         return d.date;
      });
      const yMin = d3.min(data, d => {
         return d.close;
      });

      const yMax = d3.max(data, d => {
         return d.close;
      });

      // scales for the charts
      const xScale = d3
         .scaleLinear()
         .domain([xMin, xMax])
         .range([0, chartWidth]);

      const yScale = d3
         .scaleLinear()
         .domain([yMin, yMax])
         .range([chartHeight, 0]);

      // create the axes component
      const xAxis = d3
         .axisBottom(xScale)
         .ticks(6)
         .tickSize(0)
         .tickFormat((date) => {
            return d3.timeFormat('%e %b')(date);
         });

      const xAxisGroup = svg
         .append('g')
         .attr('id', 'xAxis')
         .attr('transform', `translate(-15, ${ chartHeight + 15 })`)
         .call(xAxis);
      xAxisGroup.select('.domain').remove();

      const yAxis = d3
         .axisLeft(yScale)
         .ticks(3)
         .tickSize(-chartWidth)
         .tickFormat((val) => (isChurnRate ? `$${ Math.round(Number(val) * 100) / 100 }` : `$${ Math.round(Number(val) * 100) / 100 }`));

      const yAxisGroup = svg
         .append('g')
         .attr('id', 'yAxis')
         .attr('transform', 'translate(0, 0)')
         .call(yAxis);
      yAxisGroup.select('.domain').remove();
      yAxisGroup.selectAll('line').attr('stroke', '#F0F2F2');
      if (data.length <= 1) {
         yAxisGroup.selectAll('line').attr('stroke', isChurnRate ? '#BD30B7' : '#36796F').attr('stroke-width', '2');
      }


      // generates close price line chart when called
      const line = d3
         .line()
         .x(d => {
            return xScale(d.date);
         })
         .y(d => {
            return yScale(d.close);
         });

      // Append the path and bind data

      svg
         .append('path')
         .data([data])
         .style('fill', 'none')
         .attr('id', 'priceChart')
         .attr('stroke', isChurnRate ? '#BD30B7' : '#36796F')
         .attr('stroke-width', '2')
         .attr('d', line);

      chartHover(svg, isChurnRate, xScale, yScale, data, chartWidth, chartHeight, isChurnRate ? 'Churn Rate' : 'Sales');
   };

   // useEffect(() => {
   //    createLineChart();
   // }, [datas]);

   useEffect(() => {
      // detect 'width' and 'height' on render
      getSvgContainerSize();
      createLineChart();
      // listen for resize changes, and detect dimensions again when they change
      window.addEventListener('resize', () => {
         getSvgContainerSize();
         createLineChart();
      }); // cleanup event listener
      return window.removeEventListener('resize', () => {
         getSvgContainerSize();
         createLineChart();
      });
   }, [datas]);

   return (
      <div ref={ svgContainer } className='line-chart'>
         <div id='lineChart' />
      </div>

   );
};

LineChart.propTypes = {
   datas: PropTypes.array,
   isChurnRate: PropTypes.bool,
};

export default LineChart;
