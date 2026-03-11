import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'components/elements/SelectNew';
import Input from 'components/elements/inputNew';
import './index.scss';

const EmailTrackingFilter = ({ filterData, setFilterData, data }) => {
   const { names_data: datas } = data;
   const [viewData, setViewData] = useState([]);
   useEffect(() => {
      if (datas) {
         const items = new Set(datas);
         const forMap = Array.from(items);
         setViewData(forMap.map((item) => ({ label: item, value: item })));
      }
   }, [datas]);
   return (
      <div className='email__tracking__filter'>
         <Select
            className='email__tracking__filter__select'
            type='select-large'
            options={ viewData }
            isDisabled={ datas === undefined }
            placeholder='Email Name'
            value={ filterData.name || '' }
            name='name'
            onChange={ (name, value) => setFilterData(name, value) }
         />
         <Input
            classI='email__tracking__filter__select'
            type='date-period'
            from={ filterData.searchFrom }
            to={ filterData.searchTo }
            name='search'
            onChange={ setFilterData }
            isPeriod={ true }
            placeholder='Select date'
         />
      </div>
   );
};

EmailTrackingFilter.propTypes = {
   filterData: PropTypes.object,
   setFilterData: PropTypes.func,
   data: PropTypes.object,
};

export default EmailTrackingFilter;
