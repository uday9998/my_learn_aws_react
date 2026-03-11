import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { SIZES as textSizes, TYPES as textTypes } from 'components/elements/TextNew';
import IToolTip from 'components/elements/IToolTIp';
import Input from 'components/elements/inputNew';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import './index.scss';


const SchoolCodesSettings = ({ schoolCodes, saveSchoolCodes }) => {
   const [codes, setCodes] = useState({
      school_header_code: '',
      school_footer_code: '',
      ...schoolCodes,
   });

   const handleChangeCode = (name, value) => {
      setCodes({
         ...codes,
         [name]: value,
      });
   };

   return (
      <div className='school__codes'>
         <div className='school__codes__header'>
            <div className='top'>
               <Text
                  inner='Codes For Portal'
                  type={ textTypes.mediumSmall }
                  size={ textSizes.medium }
               />
            </div>
            <Text
               inner='Add a special tracking code from Google or Facebook to track your portal.'
               type={ textTypes.regularDefault }
               style={ { color: '#727978' } }
               size={ textSizes.small }
            />
         </div>
         <div className='school__codes__content'>
            <div className='school__codes__content__field'>
               <Input
                  type='textarea'
                  value={ codes.school_header_code }
                  name='school_header_code'
                  label='Header Code For Main Portal'
                  onChange={ handleChangeCode }
                  placeholder='Main Portal Header Code Here'
               />
               <Text
                  inner='This code will be placed in the top section of each main portal page.'
                  type={ textTypes.regularLarge }
                  size={ textSizes.xsmall }
                  style={ { color: '#727978' } }
               />
            </div>
            <div className='school__codes__content__field'>
               <Input
                  type='textarea'
                  value={ codes.school_footer_code }
                  name='school_footer_code'
                  label='Footer Code For Main Portal'
                  onChange={ handleChangeCode }
                  placeholder='Main Portal Footer Code Here'
               />
               <Text
                  inner='This code will be placed in the bottom section of each main portal page.'
                  type={ textTypes.regularLarge }
                  size={ textSizes.xsmall }
                  style={ { color: '#727978' } }
               />
            </div>
            <BaseButton
               text='Save Changes'
               style={ { marginTop: '8px', maxWidth: 'min-content' } }
               onClick={ () => {
                  saveSchoolCodes(codes);
               } }
            />
         </div>
      </div>
   );
};

SchoolCodesSettings.propTypes = {
   schoolCodes: PropTypes.object,
   saveSchoolCodes: PropTypes.func,
};

export default SchoolCodesSettings;
