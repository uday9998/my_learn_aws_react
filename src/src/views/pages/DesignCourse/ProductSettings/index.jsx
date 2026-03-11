import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import IToolTip from 'components/elements/IToolTIp';
import StatusCheckList from 'components/modules/designCourse/StatusCheckList';
import TimerDesign from 'components/elements/Timer';
import moment from 'moment';
import CheckList from 'components/elements/checkListNew';
import IconNew from 'components/elements/iconsSize';
import AdminContainer from 'views/layout/AdminContainer';
import image from 'assets/images/Program/program-settings.png';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import InputWithText from 'components/elements/InputWithText';
import { copyToClipBoard } from 'utils/copy';
import { isLocalhost } from 'utils/Helpers';
import Router from 'routes/router';


const apiUrl = isLocalhost() ? process.env.REACT_APP_API_LOCAL_ENDPOINT : `https://${ window.location.host }`;

const ProductSettings = ({
   goToComments, handleSave, isLoading, TabConsumer, course,
}) => {
   const [inputs, setInputs] = useState({
      lessons_status: 1,
      comment_visibility: 1,
   });
   const [disableChanges, setDisableChanges] = useState(false);
   const handleChange = (name, value) => {
      setInputs({
         ...inputs,
         [name]: value,
      });
   };
   const [timerDate, setTimerDate] = useState('');
   const commentsStatus = [
      { value: 1, key: 'Visible' },
      { value: 2, key: ' Hidden' },
      { value: 3, key: 'Locked' },
      { value: 0, key: 'Off' },
   ];
   const history = useHistory();
   return (
      <div className='product__settings'>
         <HeaderTypeFirst
            title='Product Design Fundametals'
            goBack={ () => history.goBack() }
            onSave={ () => handleSave(inputs, () => {
               TabConsumer.switchTab('program-general');
            }) }
            buttonText='Apply Settings To All Lessons & Close'
         />
         {isLoading && (
            <LoaderSpinner />
         )}
         <AdminContainer.Content>
            <div className='product__settings__bottom'>
               <div className='product__settings__inputs'>
                  <div className='product__settings__inputs__top'>
                     <Text
                        inner='Global Product Settings'
                        type={ types.medium160 }
                        size={ sizes.xlarge }
                     />
                     <Text
                        inner='This settings are related to all lessons'
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: '#727978' } }
                     />
                  </div>
                  <div className='product__settings__inputs__url'>
                     <InputWithText
                        inputProps={ {
                           placeholder: 'mynewproduct',
                           name: 'url',
                           value: inputs.url || course.url,
                           onChange: !disableChanges ? (key, value) => handleChange(key, value) : () => {},
                           onKeyPress: (e) => {
                              if ((e.charCode > 64 && e.charCode < 91)
                                       || (e.charCode > 96 && e.charCode < 123) || e.charCode === 8
                                       || ((e.charCode >= 48 && e.charCode <= 57) || e.charCode === 45
                                       || e.charCode === 189 || e.charCode === 95)) {
                                 setDisableChanges(false);
                              } else {
                                 setDisableChanges(true);
                              }
                           },
                        } }
                        label='Produc URL'
                        copy={ () => copyToClipBoard(`${ apiUrl }/courses/${ course.url }`) }
                        text={ `${ apiUrl }/courses/` }
                     />
                  </div>
                  <div className='product__settings__inputs__line' />
                  <div className='product__settings__inputs__center'>
                     <div className='product__settings__inputs__center__status'>
                        <Text
                           inner='Status'
                           type={ types.mediumSmall }
                           size={ sizes.medium }
                        />
                        <StatusCheckList
                           status={ inputs.lessons_status }
                           onChangeStatus={ (val, date) => {
                              let data = {};
                              if (val === 2) {
                                 data = {
                                    drip_days: date.type === 'custom' ? `${ moment(date.date).format('YYYY-MM-DD ') }${ date.time }:60` : date.count,
                                    drip_day_type: date.type,
                                 };
                                 setTimerDate(date.type === 'custom' ? date.date : date.count);
                              }
                              setInputs({
                                 ...inputs,
                                 lessons_status: val,
                                 ...data,
                              });
                           } }
                        />

                     </div>
                     <div className='product__settings__inputs__center__comments'>
                        <Text
                           inner='Comments'
                           type={ types.mediumSmall }
                           size={ sizes.medium }
                        />
                        <CheckList
                           items={ commentsStatus }
                           values={ [inputs.comment_visibility] }
                           onChange={ (value) => setInputs({
                              ...inputs,
                              comment_visibility: value,
                           }) }
                        />
                        <div className='product__settings__inputs__center__comment' role='presentation' onClick={ () => window.open(`${ window.location.origin }/admin/programs/${ course.id }/comments#unread`, 'blank') }>
                           <IconNew name='LinkCommentsProgramM' />
                        </div>
                     </div>
                  </div>
                  {(!!inputs.lessons_status && inputs.lessons_status === 2 && inputs.drip_days) && (
                     <TimerDesign time={ inputs.drip_day_type !== 'custom' ? moment(new Date()).add(inputs.drip_days, inputs.drip_day_type) : timerDate } onExpire={ () => handleChange('status', 1) } />
                  )}
                  <div className='product__settings__inputs__line' />
                  <div className='product__settings__inputs__options'>
                     <Text
                        inner='More Options'
                        type={ types.medium150 }
                     />
                     <div className='product__settings__inputs__options__flex'>
                        <div className='product__settings__inputs__option'>
                           <div className='product__settings__inputs__option__left'>
                              <CheckBox
                                 checked={ inputs.is_free_lesson === 1 }
                                 onChange={ (name, val) => handleChange('is_free_lesson', val ? 1 : 0) }
                              />
                              <Text
                                 inner='Make all lessons free preview'
                                 type={ types.regular148 }
                                 size={ sizes.medium }
                                 style={ { margin: '0px 8px 0px 16px' } }
                              />
                           </div>
                        </div>
                        <div className='product__settings__inputs__option'>
                           <div className='product__settings__inputs__option__left'>
                              <CheckBox
                                 checked={ inputs.prerequisite === 1 }
                                 onChange={ (name, val) => handleChange('prerequisite', val ? 1 : 0) }
                              />
                              <Text
                                 inner='Make all lessons prerequisite'
                                 type={ types.regular148 }
                                 size={ sizes.medium }
                                 style={ { margin: '0px 8px 0px 16px' } }
                              />
                              <IToolTip tooltip='text' />
                           </div>
                        </div>
                        <div className='product__settings__inputs__option'>
                           <div className='product__settings__inputs__option__left'>
                              <CheckBox
                                 checked={ inputs.is_downloadable === 1 }
                                 onChange={ (name, val) => handleChange('is_downloadable', val ? 1 : 0) }
                              />
                              <Text
                                 inner='Make all lessons downloadable'
                                 type={ types.regular148 }
                                 size={ sizes.medium }
                                 style={ { margin: '0px 8px 0px 16px' } }
                              />
                              <IToolTip tooltip='text' />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className='product__settings__image'>
                  <img src={ image } alt='' />
               </div>
            </div>
         </AdminContainer.Content>
      </div>
   );
};

ProductSettings.propTypes = {
   handleSave: PropTypes.func,
   goToComments: PropTypes.func,
   TabConsumer: PropTypes.object,
   isLoading: PropTypes.bool,
   course: PropTypes.object,
};

export default ProductSettings;
