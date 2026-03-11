import React from 'react';
import PropTypes from 'prop-types';
import { ReportsContainerFilter } from 'views/newLayout/reports';
import Input from 'components/elements/inputNew';
import Select from 'components/elements/SelectNew';
import './index.scss';

const ClassProgressFilter = ({ inputs, handleChangeInput, options }) => {
   const onlyClassesOptions = options.filter(option => option.type !== '2');


   return (
      <div className='class__progress__filter'>
         <ReportsContainerFilter>
            <Select
               type='select-transactions'
               name='course'
               options={ onlyClassesOptions }
               value={ inputs.course }
               placeholder='Select Class'
               onChange={ handleChangeInput }
            />
            <Input
               name='name'
               placeholder='Enter Member Name'
               value={ inputs.name }
               onChange={ handleChangeInput }
            />
            <Input
               name='email'
               placeholder='Enter Member Email'
               value={ inputs.email }
               onChange={ handleChangeInput }
            />
         </ReportsContainerFilter>
      </div>
   );
};

ClassProgressFilter.propTypes = {
   inputs: PropTypes.object,
   options: PropTypes.array,
   handleChangeInput: PropTypes.func,
};

export default ClassProgressFilter;
