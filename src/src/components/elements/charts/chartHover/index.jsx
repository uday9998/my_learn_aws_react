import * as d3 from 'd3';
import './index.scss';

export const chartHover = (
   svg, isPurple, xScale, yScale, data, chartWidth, chartHeight, value, secondData, secondValue, yMax) => {
   let secondFocus = '';
   if (secondValue) {
      secondFocus = svg.append('g')
         .attr('class', 'focus')
         .style('display', 'none');
      secondFocus.append('circle')
         .attr('r', 5)
         .style('stroke', 'rgba(189, 48, 183, 0.49)')
         .style('stroke-width', '3px')
         .attr('fill', '#fff');
   }

   const focus = svg.append('g')
      .attr('class', 'focus')
      .style('display', 'none');


   focus.append('circle')
      .attr('r', 5)
      .style('stroke', isPurple ? 'rgba(189, 48, 183, 0.49)' : 'rgba(54, 121, 111, 0.3)')
      .style('stroke-width', '3px')
      .attr('fill', '#fff');


   const focusRect = focus.append('rect')
      .attr('class', 'tooltip')
      .attr('width', 224)
      .attr('height', secondValue ? 105 : 70)
      .attr('x', 10)
      .attr('y', -22)
      .attr('rx', 12)
      .attr('ry', 12);

   const tooltipDate = focus.append('text')
      .attr('class', 'tooltip-date')
      .attr('x', 15)
      .attr('y', -2);

   const tooltipBorder = focus.append('rect')
      .attr('class', 'tooltip-border')
      .attr('width', 224)
      .attr('height', 1)
      .attr('x', 10)
      .attr('y', 12)
      .attr('rx', 12)
      .attr('ry', 12);


   const tooltipValue = focus.append('text')
      .attr('class', 'tooltip-value')
      .attr('x', 22)
      .attr('y', 18)
      .text(value || 'v:');

   const tooltipClose = focus.append('text')
      .attr('class', 'tooltip-likes')
      .attr('x', 26)
      .attr('y', 18);

   let tooltipSecondValue = '';
   let tooltipSecondClose = '';
   if (secondValue) {
      tooltipSecondValue = focus.append('text')
         .attr('class', 'tooltip-second-value')
         .attr('x', 22)
         .attr('y', 18)
         .text(secondValue || 'v:');

      tooltipSecondClose = focus.append('text')
         .attr('class', 'tooltip-second-likes')
         .attr('x', 26)
         .attr('y', 18);
   }

   const greenCircle = focus.append('rect')
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('x', 22)
      .attr('y', 27)
      .attr('width', 6)
      .attr('height', 6)
      .attr('fill', isPurple ? 'rgba(189, 48, 183)' : 'rgba(54, 121, 111');
   let purpleCircle = '';
   if (secondValue) {
      purpleCircle = focus.append('rect')
         .attr('rx', 3)
         .attr('ry', 3)
         .attr('x', 22)
         .attr('y', 58)
         .attr('width', 6)
         .attr('height', 6)
         .attr('fill', 'rgba(189, 48, 183)');
   }

   const bisectDate = d3.bisector((d) => { return d.date; }).left;
   const formatValue = d3.format(',');
   const dateFormatter = d3.timeFormat('%e %b, %Y');
   function mousemove(event) {
      const x0 = xScale.invert(d3.pointer(event, this)[0]);
      const i = bisectDate(data, x0, 1);
      const d0 = data[i - 1];
      const d1 = data[i];
      let d;
      let secondD;
      if (d0 && d1) {
         d = x0 - d0.date > d1.date - x0 ? d1 : d0;
      }
      if (secondValue) {
         const j = bisectDate(secondData, x0, 1);
         const secondD0 = secondData[j - 1];
         const secondD1 = secondData[j];
         if (secondD0 && secondD1) {
            secondD = x0 - secondD0.date > secondD1.date - x0 ? secondD1 : secondD0;
         }
      }
      if (d) {
         if (xScale(d.date) > chartWidth / 2) {
            focusRect.attr('x', -234);
            tooltipDate.attr('x', -222)
               .attr('y', 0);

            tooltipValue.attr('x', -212)
               .attr('y', 35);

            tooltipClose.attr('x', -64)
               .attr('y', 35);

            tooltipBorder.attr('x', -234)
               .attr('y', 12);
            greenCircle.attr('x', -224)
               .attr('y', 26);

            if (secondValue) {
               tooltipSecondValue.attr('x', -212)
                  .attr('y', 65);

               tooltipSecondClose.attr('x', -64)
                  .attr('y', 65);
               purpleCircle.attr('x', -224)
                  .attr('y', 26);
            }
         } else {
            focusRect.attr('x', 10);
            tooltipDate.attr('x', 22)
               .attr('y', 0);

            tooltipValue.attr('x', 37)
               .attr('y', 35);

            tooltipClose.attr('x', 180)
               .attr('y', 35);
            tooltipBorder.attr('x', 10)
               .attr('y', 12);

            greenCircle.attr('x', 22)
               .attr('y', 27);
            if (secondValue) {
               tooltipSecondValue.attr('x', 37)
                  .attr('y', 65);

               tooltipSecondClose.attr('x', 180)
                  .attr('y', 65);

               purpleCircle.attr('x', 22)
                  .attr('y', 58);
            }
         }

         if (d.close < yMax / 2 && secondValue) {
            focusRect.attr('y', -92);
            tooltipDate
               .attr('y', -70);

            tooltipValue
               .attr('y', -35);

            tooltipClose
               .attr('y', -35);
            tooltipBorder
               .attr('y', -58);
            greenCircle.attr('y', -43);
            if (secondValue) {
               tooltipSecondValue
                  .attr('y', -5);

               tooltipSecondClose
                  .attr('y', -5);
               purpleCircle.attr('y', -12);
            }
         } else {
            focusRect.attr('y', -22);
            greenCircle.attr('y', 25);
            if (secondValue) {
               purpleCircle.attr('y', 56);
            }
         }
         focus.attr('transform', `translate(${ xScale(d.date) },${ yScale(d.close.toFixed(2)) })`);
         focus.select('.tooltip-date').text(dateFormatter(d.date));
         focus.select('.tooltip-likes').text(value === 'Views' || value === 'Uniques Views' ? formatValue(d.close.toFixed(2)) : `$${ formatValue(d.close.toFixed(2)) }`);
         if (secondD) {
            secondFocus.attr('transform', `translate(${ xScale(secondD.date) },  ${ yScale(secondD.close.toFixed(2)) })`);
            focus.select('.tooltip-second-likes').text(value === 'Views' || value === 'Uniques Views' ? formatValue(secondD.close) : `$${ formatValue(secondD.close.toFixed(2)) }`);
         }
      }
   }


   if (data.length > 1) {
      if (secondFocus) {
         svg.append('rect')
            .attr('class', 'overlay')
            .attr('width', chartWidth)
            .attr('height', chartHeight)
            .on('mouseover', () => { focus.style('display', null); secondFocus.style('display', null); })
            .on('mouseout', () => { focus.style('display', 'none'); secondFocus.style('display', 'none'); })
            .on('mousemove', mousemove);
      } else {
         svg.append('rect')
            .attr('class', 'overlay')
            .attr('width', chartWidth)
            .attr('height', chartHeight)
            .on('mouseover', () => { focus.style('display', null); })
            .on('mouseout', () => { focus.style('display', 'none'); })
            .on('mousemove', mousemove);
      }
   }
};
