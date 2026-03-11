/* eslint-disable no-param-reassign */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './index.scss';
import { parseFloat } from 'utils/numberParseFloat';

const DonutChart = ({
   donutData, title, isPink, total,
}) => {
   const ref = useRef(null);
   const drawChart = (element) => {
      const boxSize = 248;

      d3.select(element).select('svg').remove(); // Remove the old svg
      // Create new svg
      const svg = d3
         .select(element)
         .append('svg')
         .attr('preserveAspectRatio', 'xMidYMid meet')
         .attr('height', '248px')
         .attr('width', '248px')
         .attr('viewBox', `0 0 ${ boxSize } ${ boxSize }`)
         .append('g')
         .attr('transform', `translate(${ boxSize / 2 }, ${ boxSize / 2 })`);

      const arcGenerator = d3.arc().padAngle(0).innerRadius(108).outerRadius(124);

      const pieGenerator = d3.pie().value((d) => d.precentage);

      const arcs = svg.selectAll().data(pieGenerator(donutData)).enter();
      // color range
      const colors = isPink ? ['#BD30B7', '#E83DE1', '#e770e2', '#d79dd4', '#D0D2D2'] : ['#36796F', '#54938B', '#7BAEA9', '#A6C9C5', '#D0D2D2'];
      const color = d3.scaleOrdinal()
         .range(colors);
      arcs
         .append('path')
         .attr('d', arcGenerator)
         .style('fill', color)
         .transition()
         .duration(700)
         .attrTween('d', (d) => {
            const i = d3.interpolate(d.startAngle, d.endAngle);
            return function (t) {
               d.endAngle = i(t);
               return arcGenerator(d);
            };
         });
      svg.append('text')
         .attr('text-anchor', 'middle')
         .attr('font-size', '28px')
         .attr('font-family', 'Inter')
         .attr('font-weight', '500')
         .attr('line-height', '130%')
         .attr('fill', '#131F1E')
         .attr('y', 22)
         .text(parseFloat(total));

      svg.append('text')
         .attr('text-anchor', 'middle')
         .attr('font-size', '12px')
         .attr('font-family', 'Inter')
         .attr('font-weight', '500')
         .attr('line-height', '150%')
         .attr('fill', '#131F1E')
         .attr('y', -18)
         .text(`Total ${ title }`);


      // hover effect
      // const tooltip = d3.select('#donutChart')
      //    .append('div')
      //    .attr('class', 'tooltip');

      // tooltip.append('div') // NEW
      //    .attr('class', 'label');

      // tooltip.append('div') // NEW
      //    .attr('class', 'count');

      // svg.on('mouseover', (d) => {
      //    ;
      //    tooltip.select('.label').html(d.precentage); // NEW
      //    tooltip.select('.count').html(d.precentage); // NEW
      //    tooltip.style('display', 'block'); // NEW
      // });
      // svg.on('mouseout', () => { // NEW
      //    tooltip.style('display', 'none'); // NEW
      // });
   };


   useEffect(() => {
      if (ref.current) {
         drawChart(ref.current);
      }
   }, [ref, donutData]);


   return (
      <div className='donutChart'>
         <div id='donutChart' className='graph' ref={ ref } />
      </div>
   );
};

DonutChart.propTypes = {
   donutData: PropTypes.array,
   title: PropTypes.string,
   isPink: PropTypes.bool,
   total: PropTypes.number,
};

export default DonutChart;
