import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import MultiSelect from 'components/elements/multiSelectNew';
import Input from 'components/elements/inputNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import moment from 'moment';


const CertificateSettingsLeft = ({
   inputs, setInputs, courses,
}) => {
   const newCoursesdata = [];
   courses.reverse().map((i) => newCoursesdata.push({ label: i.name, value: i.id }));
   return (
      <div className='certificate__settings__left'>
         <div className='certificate__settings__left__top'>
            <Text
               inner='Certificate Settings'
               type={ types.medium150 }
               size={ sizes.xlarge }
            />
            <Text
               inner='Here you can assign a certificate to a Products, Sections or lesson.'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            />
         </div>
         <MultiSelect
            placeholder='Choose Class'
            label='Select a Class'
            type='select-medium'
            hasBorder
            options={ newCoursesdata }
            onAdd={ (value) => {
               setInputs('coursesIds', [...inputs.coursesIds, value]);
            } }
            onRemove={ (value) => {
               setInputs('coursesIds', inputs.coursesIds.filter((e) => e !== value));
            } }
            values={ inputs.coursesIds }
            name='viewChange'
         />
         <div>
            <CheckBox
               label='Add Expiration Date'
               checked={ inputs.is_expired_date }
               name='is_expired_date'
               onChange={ (name) => setInputs(name, !inputs.is_expired_date) }
            />
         </div>
         {!!inputs.is_expired_date && (
            <div>
               <Input
                  classI='transactions-filter-input'
                  type='date'
                  name='expiration_date'
                  value={ inputs.expiration_date ? new Date(inputs.expiration_date) : new Date(moment().add(1, 'day').format('YYYY-MM-DD')) }
                  onChange={ (name, value) => setInputs(name, value) }
                  label='Select date'
                  isPeriod={ true }
                  min={ new Date() }
                  placeholder='Select Date'
               />
            </div>
         )}
      </div>
   );
};

CertificateSettingsLeft.propTypes = {
   inputs: PropTypes.object,
   courses: PropTypes.array,
   setInputs: PropTypes.func,
};

export default CertificateSettingsLeft;
