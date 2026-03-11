
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './index.scss';
import moment from 'moment';
import { chartHover } from '../chartHover';

const LinesChart = ({
   refund, revenue,
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
      d3.select('#chart').selectAll('svg').remove();
      const parseTime = d3.timeParse('%Y-%m-%d');
      const uniqueData = Object.keys(refund).map((d) => {
         return {
            date: parseTime(moment(d).format('YYYY-MM-DD')),
            close: refund[d],
         };
      });
      const data = Object.keys(revenue).map((d) => {
         return {
            date: parseTime(moment(d).format('YYYY-MM-DD')),
            close: revenue[d],
         };
      });
      const margin = {
         top: 24, right: 20, bottom: 50, left: 70,
      };
      // const width = 700 - margin.left - margin.right;
      //   const height = 300 - margin.top - margin.bottom;
      const chartWidth = getSvgContainerSize().width - margin.left - margin.right;
      const chartHeight = getSvgContainerSize().height - margin.top - margin.bottom;
      // add SVG to the page
      const svg = d3
         .select('#chart')
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
      // const yMin = d3.min(data, d => {
      //    return d.close;
      // });
      const y1Max = d3.max(data, d => {
         return d.close;
      });
      const y2Max = d3.max(uniqueData, d => {
         return d.close;
      });
      const y1Min = d3.min(data, d => {
         return d.close;
      });
      const y2Min = d3.min(uniqueData, d => {
         return d.close;
      });
      const yMax = y1Max > y2Max ? y1Max : y2Max;
      const yMin = y1Min < y2Min ? y1Min : y2Min;
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
         .attr('transform', `translate(0, ${ chartHeight + 15 })`)
         .call(xAxis);
      xAxisGroup.select('.domain').remove();

      const yAxis = d3
         .axisLeft(yScale)
         .ticks(3)
         .tickSize(-chartWidth)
         .tickFormat((val) => `$${ Math.round(Number(val) * 100) / 100 }`);

      const yAxisGroup = svg
         .append('g')
         .attr('id', 'yAxis')
         .attr('transform', 'translate(0, 0)')
         .call(yAxis);
      yAxisGroup.select('.domain').remove();
      yAxisGroup.selectAll('line').attr('stroke', '#F0F2F2');
      // if (xMin === xMax && yMin === yMax) {
      //    yAxisGroup.selectAll('line').attr('stroke', '#36796F').attr('stroke-width', '2');
      // }

      // generates close price line chart when called
      const line = d3
         .line()
         .x(d => {
            return xScale(d.date);
         })
         .y(d => {
            return yScale(d.close);
         });

      // Append the path and bind data unique
      svg
         .append('path')
         .data([uniqueData])
         .style('fill', 'none')
         .attr('id', 'uniqueChart')
         .attr('stroke', '#BD30B7')
         .attr('stroke-width', '2')
         .attr('d', line);
      // Append the path and bind data
      svg
         .append('path')
         .data([data])
         .style('fill', 'none')
         .attr('id', 'priceChart')
         .attr('stroke', '#36796F')
         .attr('stroke-width', '2')
         .attr('d', line);


      chartHover(svg, false, xScale, yScale, data, chartWidth, chartHeight, 'Revenue', uniqueData, 'Refunds', yMax);
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
   }, [refund, revenue]);

   return (
      <div ref={ svgContainer } className='line-chart'>
         <div id='chart' />
      </div>

   );
};

LinesChart.propTypes = {
   refund: PropTypes.object,
   revenue: PropTypes.object,
};

export default LinesChart;
