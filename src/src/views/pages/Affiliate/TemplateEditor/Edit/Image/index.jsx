import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/elements/SelectNew';
import TextInputRange from 'components/elements/form/TextInputRange';
import Switch from 'components/elements/switchNew';
import Spacing from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Spacing';
import './index.scss';
import UploadImage from 'components/modules/uploadImage';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';

const AffiliateEditImage = ({
   props, changeProp, component, sectionIndex, handleDeleteComponent,
}) => {
   const {
      image_src: src, paddingTop, paddingBottom, paddingLeft, paddingRight, visibility, borderRadius,
      width, justifyContent, availableDelete,
   } = props;
   const textAlignFlexOptions = [
      { label: 'Left', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'flex-end' },
   ];
   return (
      <div className='affiliate__edit__image'>
         <Switch
            label={ visibility ? 'Hide Image' : 'Show Image' }
            name='visibility'
            value={ visibility === true }
            size='medium'
            positionText='left'
            onChange={ () => changeProp(!(visibility === true), 'visibility') }
            isCommentPage={ true }
            switchOnOff={ true }
         />
         <UploadImage
            label='Upload Image'
            onChange={ (name, img) => changeProp(img, 'image_src') }
            src={ src || '' }
            isImageUpload={ true }
         />
         <Spacing
            top={ paddingTop }
            bottom={ paddingBottom }
            left={ paddingLeft }
            right={ paddingRight }
            changeProp={ changeProp }
         />
         <div>
            <TextInputRange
               label='Border Radius (%)'
               type='range'
               leftText={ borderRadius }
               min={ 0 }
               max={ 100 }
               name='borderRadius'
               value={ borderRadius }
               onChange={ (value, name) => { changeProp(value, name); } }
            />
         </div>
         <div>
            <TextInputRange
               label='Width (px)'
               type='range'
               leftText={ width }
               min={ 0 }
               max={ 50 }
               name='width'
               value={ width }
               onChange={ (value, name) => { changeProp(value, name); } }
            />
         </div>
         <div>
            <Select
               label='Align Image'
               className=''
               type='select-medium'
               heading=''
               placeholder='Align Content'
               value={ justifyContent }
               onChange={ (name, value) => changeProp(value, 'justifyContent') }
               options={ textAlignFlexOptions }
            />
         </div>
         {availableDelete && (
            <Button
               theme={ themes.red }
               text='Delete Image'
               onClick={ () => handleDeleteComponent(component.slug, sectionIndex) }
            />
         )}
      </div>
   );
};

AffiliateEditImage.propTypes = {
   changeProp: PropTypes.func,
   props: PropTypes.object,
   paddingTop: PropTypes.number,
   paddingLeft: PropTypes.number,
   paddingRight: PropTypes.number,
   paddingBottom: PropTypes.number,
   visibility: PropTypes.bool,
   borderRadius: PropTypes.any,
   image_src: PropTypes.string,
   width: PropTypes.any,
   justifyContent: PropTypes.string,
   sectionIndex: PropTypes.number,
   component: PropTypes.object,
   handleDeleteComponent: PropTypes.func,
   availableDelete: PropTypes.bool,
};

export default AffiliateEditImage;
