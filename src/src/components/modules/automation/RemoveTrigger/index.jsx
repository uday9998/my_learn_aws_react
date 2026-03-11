import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { SIZES as btnSize, THEME as btnTheme } from 'components/elements/buttons/BaseButton';
import Select from 'components/elements/form/Select';

const styles = {
   cancel: {
      borderRadius: '4px',
      color: '#3f4f65',
      backgroundColor: '#f0f4f7',
   },
   save: {
      borderRadius: '4px',
      color: '#fff',
      backgroundColor: '#7cb740',
   },
};

const RemoveTrigger = ({
   addTriggerData,
   addTrigger,
}) => {
   return (
      <div className='remove-trigger'>
         <div className='remove-trigger-title'>
            <Text
               type={ TextType.bold }
               size={ TextSize.small }
               inner='Add or Remove a Tag'
            />
         </div>
         <div className='remove-trigger-description'>
            <Text
               type={ TextType.regular }
               size={ TextSize.extraSmall }
               inner='Choose an existing tag to add to or remove from a contact'
               color='#3f4f65'
            />
         </div>

         <div className='remove-trigger-content'>
            <div className='m-t-m' />
            <Select
               label='Do You Want to Add or Remove a Tag?'
               style={ { height: '48px' } }
               id='emailto'
               placeholder=''
               // options={  }
               name='emailto'
               // value=''
               onChange={ () => {} }
               icon='TriangleDownBlack'
            />
            <div className='m-t-m' />
            <Select
               label='Tag'
               style={ { height: '48px' } }
               id='emailto'
               placeholder=''
               // options={  }
               name='emailto'
               // value=''
               onChange={ () => {} }
               icon='TriangleDownBlack'
            />
         </div>
         <div className='remove-trigger-btns'>
            <div className='remove-trigger-btn'>
               <BaseButton
                  size={ btnSize.large }
                  style={ styles.cancel }
                  text='Cancel'
                  //  onClick={ backStepClick }
               />
            </div>
            <div className='remove-trigger-btn'>
               <BaseButton
                  size={ btnSize.large }
                  style={ styles.save }
                  text='Save'
                  //  onClick={ backStepClick }
               />
            </div>
         </div>
      </div>
   );
};

RemoveTrigger.propTypes = {
   addTrigger: PropTypes.func,
   addTriggerData: PropTypes.array,
};

export default RemoveTrigger;
