import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import Input from 'components/elements/inputNew';
import MultiSelect from 'components/elements/multiSelectNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import moment from 'moment';

const CertificateInfo = ({
   closeModal, goToCreateCertificate, coursesdata, changeSelectedCourse, changeCourseTemplateName, certificateName,
   selectedCourseIds,
}) => {
   const newCoursesdata = [];
   coursesdata.reverse().map((i) => {
      if (i.is_published === 1) {
         return (newCoursesdata.push({ label: i.name, value: i.id }));
      }
      return null;
   });

   const [certificateDate, setCertificateDate] = useState(
      {
         is_expired_date: 0,
         expiration_date: moment().add(1, 'day').format('YYYY-MM-DD'),
      }
   );

   return (
      <div className='certificate__create__modal'>
         <Text
            inner='Create Certificate'
            type={ textType.medium }
            size={ textSize.xxlarge }
         />
         { newCoursesdata.length !== 0 ? (
            <div className='certificate__create__modal__content'>
               <div className='certificate__create__modal__content__inputs'>
                  <Input
                     placeholder='Name Your Certificate'
                     label='Certificate Name'
                     onChange={ (name, value) => {
                        if (value.length < 151) {
                           changeCourseTemplateName(value);
                        } else if (isPrint('You are reached the character limit')) {
                           toast.error('You are reached the character limit');
                        }
                     } }
                     value={ certificateName }
                  />
                  <div className='grey_line' />
                  <div className='select__course'>
                     <Text
                        inner='Select Product'
                        type={ textType.regularDefault }
                        size={ textSize.small }
                     />
                     <MultiSelect
                        placeholder='Select from list'
                        label='Select from list'
                        type='select-medium'
                        hasBorder
                        options={ newCoursesdata }
                        onAdd={ (value) => {
                           changeSelectedCourse([...selectedCourseIds, value]);
                        } }
                        onRemove={ (value) => {
                           changeSelectedCourse(selectedCourseIds.filter((e) => e !== value));
                        } }
                        values={ selectedCourseIds }
                        name='viewChange'
                     />
                  </div>
                  <div>
                     <CheckBox
                        label='Add Expiration Date'
                        checked={ certificateDate.is_expired_date }
                        name='is_expired_date'
                        onChange={ () => setCertificateDate({
                           ...certificateDate,
                           is_expired_date: !certificateDate.is_expired_date,
                        }) }
                     />
                  </div>
                  {!!certificateDate.is_expired_date && (
                     <div>
                        <Input
                           classI='transactions-filter-input'
                           type='date'
                           isCertificate={ true }
                           name='expiration_date'
                           value={ new Date(certificateDate.expiration_date) }
                           onChange={ (name, value) => setCertificateDate({
                              ...certificateDate,
                              expiration_date: value,
                           }) }
                           label='Select date'
                           isPeriod={ true }
                           min={ new Date() }
                           placeholder='Select Date'
                        />
                     </div>
                  )}
               </div>
               <div className='certificate__create__modal__content__button'>
                  <BaseButton
                     theme={ btnTheme.secondary }
                     text='Close'
                     style={ { minWidth: '96px' } }
                     onClick={ () => closeModal() }
                  />
                  <BaseButton
                     text='Create Certificate'
                     disabled={ !certificateName.trim() || !selectedCourseIds.length }
                     onClick={ (editId) => goToCreateCertificate(editId, certificateDate) }
                  />
               </div>
            </div>
         ) : (
            <div className='certificate__create__modal__already'>
               <Text
                  inner="You can't create new certifacte"
                  type={ textType.medium }
                  size={ textSize.medium }
               />
               <Text
                  inner='Please create a product first or you have created certificates for all your programs'
                  type={ textType.medium }
                  size={ textSize.medium }
                  style={ { textAlign: 'center' } }
               />
               <BaseButton
                  text='Ok'
                  onClick={ () => closeModal() }
               />
            </div>
         )}
      </div>
   );
};

CertificateInfo.propTypes = {
   closeModal: PropTypes.func,
   certificateName: PropTypes.string,
   goToCreateCertificate: PropTypes.func,
   changeSelectedCourse: PropTypes.func,
   changeCourseTemplateName: PropTypes.func,
   coursesdata: PropTypes.array,
   selectedCourseIds: PropTypes.array,
};

export default CertificateInfo;
