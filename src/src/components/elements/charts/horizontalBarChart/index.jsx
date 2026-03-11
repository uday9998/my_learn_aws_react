
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './index.scss';


const HorizontalBarChart = ({
   data,
}) => {
   const svgBarContainer = useRef(null);

   const getSvgContainerSize = () => {
      if (svgBarContainer && svgBarContainer.current
         && svgBarContainer.current.clientWidth) {
         const newWidth = svgBarContainer.current.clientWidth;
         return { width: newWidth, height: 48 * data.length };
      }
      return { width: 500, height: 48 * data.length };
   };


   const createLineChart = () => {
      d3.select('#barChart').selectAll('svg').remove();
      const margin = {
         top: 0, right: 80, bottom: 30, left: 200,
      };
      const chartWidth = getSvgContainerSize().width - margin.left - margin.right;
      const chartHeight = getSvgContainerSize().height - margin.top - margin.bottom;

      const svg = d3
         .select('#barChart')
         .append('svg')
         .attr('width', chartWidth + margin.left + margin.right)
         .attr('height', chartHeight + margin.top + margin.bottom)
         .append('g')
         .attr('transform', `translate(${ margin.left },  ${ margin.top })`);


      const xMax = d3.max(data, d => {
         return d.all_view_count;
      });

      // Add X axis
      const x = d3.scaleLinear()
         .domain([0, xMax])
         .range([0, chartWidth]);

      const xAxisGroup = svg.append('g')
         .attr('transform', `translate(0,${ chartHeight })`)
         .call(d3.axisBottom(x))
         .attr('id', 'xBarAxis')
         .selectAll('text')
         .style('text-anchor', 'middle');

      xAxisGroup.selectAll('line').attr('stroke', '#F0F2F2');


      // Y axis
      const y = d3.scaleBand()
         .range([chartHeight, 0])
         .domain(data.map((d) => { return d.landing_name; }))
         .padding(0.7);
      const yAxisGroup = svg.append('g')
         .attr('id', 'yBarAxis');
         // .call(d3.axisLeft(y));

      yAxisGroup.select('.domain').remove();


      // Bars
      svg.selectAll('myRect')
         .data(data)
         .enter()
         .append('rect')
         .attr('x', 0)
         .attr('y', (d) => { return y(d.landing_name); })
         .attr('width', (d) => { return x(d.all_view_count); })
         .attr('height', 12)
         .attr('fill', (d) => { return `rgba(36, 85, 78, ${ d.all_view_count / xMax })`; })
         .attr('rx', '4px');

      svg.selectAll('bar-label')
         .data(data)
         .enter()
         .append('text')
         .classed('bar-label', true)
         .attr('y', d => y(d.landing_name) + y.bandwidth() / 2)
         .attr('dy', 6)
         .attr('x', d => x(d.all_view_count))
         .attr('dx', 35)
         .html((d) => { return `${ d.all_view_count } ${ d.pecentage_all }%`; });
      // .html((d) => ((`${ '<unknown-tag>' }${ d.all_view_count } : ${ d.pecentage_all }</unknown-tag>`)));

      svg.selectAll('landing-name')
         .data(data)
         .enter()
         .append('text')
         .classed('landing-name', true)
         .attr('y', d => y(d.landing_name) + y.bandwidth() / 2)
         .attr('dy', 6)
         .attr('x', '-234')
         .attr('dx', 35)
         .html((d) => { return `${ d.landing_name.length > 27 ? `${ d.landing_name.slice(0, 27) }...` : d.landing_name } `; });


      const gridlines = d3.axisTop()
         .tickFormat('')
         .tickSize(-chartHeight)
         .scale(x);

      svg.append('g')
         .attr('class', 'grid')
         .attr('stroke', '#F0F2F2')
         .call(gridlines);
   };

   useEffect(() => {
      getSvgContainerSize();
      createLineChart();
      window.addEventListener('resize', () => {
         getSvgContainerSize();
         createLineChart();
      });
      return window.removeEventListener('resize', () => {
         getSvgContainerSize();
         createLineChart();
      });
   }, [data]);

   return (
      <div ref={ svgBarContainer } className='line-bar-chart'>
         <div id='barChart' />
      </div>

   );
};

HorizontalBarChart.propTypes = {
   data: PropTypes.array,
};

export default HorizontalBarChart;
