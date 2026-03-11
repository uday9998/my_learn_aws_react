import React from 'react';
import PropTypes from 'prop-types';
import SiteHeader from 'views/layout/SiteHeader';
import Select from 'components/elements/form/Select';
import './index.scss';

const ReportsHeader = ({
   reports, handleFilterChange, value, title, tooltip, tooltipStyle,
}) => {
   const coursesOption = [
      { label: 'All Classes', value: '' },
   ];
   reports.courses.map(item => coursesOption.push({ label: item.name, value: item.id }));

   return (
      <SiteHeader
         title={ title }
         tooltip={ tooltip }
         tooltipStyle={ tooltipStyle }
         right={ (
            <Select
               typeOval
               icon='TriangleDown'
               hasBorder
               padding='7px 16px 7px 24px'
               placeholder='All Classes'
               style={ { minWidth: '264px' } }
               name='course_id'
               options={ coursesOption }
               onChange={ (x, y) => handleFilterChange(x, y) }
               value={ value }
            />
         ) }
      />
   );
};

ReportsHeader.propTypes = {
   reports: PropTypes.object,
   handleFilterChange: PropTypes.func,
   title: PropTypes.string,
   value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
   ]),
   tooltip: PropTypes.string,
   tooltipStyle: PropTypes.object,
};

export default ReportsHeader;
