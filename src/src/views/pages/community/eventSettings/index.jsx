import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from 'components/elements/tabs';
import QueryParams from 'utils/QueryParams';
import './index.scss';
import img3 from 'assets/images/community/empty.png';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import Button, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import UploadMediaImageView from 'components/elements/UploadMediaViews/UploadMediaImageVIew';
import moment from 'moment';
import EventCreateInputs from '../communityCommponents/EventCreateInputs';

const EventSettingsView = ({ 
   inputs, setInputs, user, onEventSave,
}) => {
   const [selectedTab, setSelectedTab] = useState('information');
   const variants = [
      { value: 'information', key: 'Event Information', iconName: 'ProductInformationFirstM' },
      { value: 'images', key: 'Event Cover', iconName: 'ProductInformationSecondM' },
      { value: 'settings', key: 'Event Settings', iconName: 'ProductInformationThirdM' },
   ];
   // useEffect(() => {
   //    const param = QueryParams.getHash('');
   //    if (param) {
   //       setSelectedTab(param);
   //       return;
   //    }
   //    QueryParams.setHash('information');
   // }, []);

   const handleInputChange = (name, value) => { 
      if (name === 'time') {
         const today = moment().format('YYYY-MM-DD');
         const localDateTime = moment(`${ today } ${ value }`, 'YYYY-MM-DD HH:mm:ss');
         const utc = localDateTime.utc().format('HH:mm:ss');
         setInputs({
            ...inputs,
            [name]: utc,
         });
      } else {
         setInputs({
            ...inputs,
            [name]: value,
         });
      }            
   };

   return (
      <div className='event__settings__page'>
         <div className='event__settings__page__tabs'>
            <Tabs
               hasIcon={ true }
               selectedVariant={ selectedTab }
               isButton={ false }
               variants={ variants }
               onSelect={ (item) => {
                  // QueryParams.setHash(item);
                  setSelectedTab(item);
               } }
            />
         </div>
         <div className='event__settings__page__bottom'>
            <div className='event__settings__page__bottom__left'>
               {selectedTab === 'information' && (
                  <div className='event__settings__page__bottom__block'>
                     <Text
                        inner='Event Information'
                        type={ types.medium }
                        size={ sizes.xlarge }
                     />
                     <div className='event__settings__page__bottom__block__inputs'>
                        <Input
                           name='name'
                           value={ inputs ? inputs.name : '' }
                           label='Event Name'
                           onChange={ handleInputChange }
                        />
                        <div className='event__settings__page__bottom__block__inputs__area'>
                           <Input
                              type='textarea'
                              maxLengthTextArea='500'
                              characterLimit='500'
                              name='description'
                              label='Event Description'
                              placeholder='Write here...'
                              value={ inputs ? inputs.description : '' }
                              onChange={ (name, value) => handleInputChange(name, value) }
                           />
                        </div>
                     </div>
                  </div>
               )}
               {selectedTab === 'images' && (
                  <div className='event__settings__page__bottom__block'>
                     <Text
                        inner='Event Cover'
                        type={ types.medium }
                        size={ sizes.xlarge }
                     />
                     <div className='event__settings__page__bottom__block__inputs'>
                        <UploadMediaImageView
                           src={ inputs.picture_src }
                           type='image'
                           hideMediaLibrary={ user.role !== 1 }
                           buttonText='Image'
                           iconName='ClearImageM'
                           isRemove={ true }
                           uploadProps={ {
                              fileLessonFormat: 'image',
                              isAmazonFile: true,
                              cropRatio: '1920x1080',
                              onChange: (value) => handleInputChange('picture_src', value),
                           } }
                        />
                     </div>
                  </div>
               )}
               {selectedTab === 'settings' && (
                  <div className='event__settings__page__bottom__block'>
                     <Text
                        inner='Event Settings'
                        type={ types.medium }
                        size={ sizes.xlarge }
                     />
                     <EventCreateInputs
                        inputs={ inputs }
                        onChange={ handleInputChange }
                     />
                  </div>
               )}

            </div>
            <div className='event__settings__page__bottom__right'>
               <img src={ inputs.picture_src || img3 } alt='' />
            </div>
         </div>
         <div className='event__save'>
            <Button
               text='Save'
               size={ btnSize.medium }
               theme={ btnTheme.primary }
               onClick={ onEventSave }
            />          
         </div>
      </div>
   );
};

EventSettingsView.propTypes = {
   inputs: PropTypes.object,
   setInputs: PropTypes.func,
   user: PropTypes.object,
   onEventSave: PropTypes.func,
};

export default EventSettingsView;
