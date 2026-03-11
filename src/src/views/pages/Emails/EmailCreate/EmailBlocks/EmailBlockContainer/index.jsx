import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import './index.scss';

const EmailBlockContainer = ({
   children, id, deleteBlock, duplicateBlock, reOrderBlocks,
   style, type, onChooseBlock, isActive, email,
}) => {
   useEffect(() => {
      onChooseBlock();
   }, []);
   return (
      <div className='email__block__container__full'>
         <div
            className='email__block__container__fit'
            style={ {
               width: '100%',
               backgroundColor: email.css_attributes.bg_color || '#fff',
               paddingTop: `${ (parseInt(email.css_attributes.paddingTop, 10)) }px`,
               paddingBottom: `${ (parseInt(email.css_attributes.paddingBottom, 10)) }px`,
               paddingRight: `${ (parseInt(email.css_attributes.paddingRight, 10)) }px`,
               paddingLeft: `${ (parseInt(email.css_attributes.paddingLeft, 10)) }px`,
            } }
         >
            <div className='email__block__container__line' />
            <div
               className={ isActive ? 'email__block__container email__block__container__avtive' : 'email__block__container' }
               onClick={ onChooseBlock }
               role='presentation'
               id={ id }
               style={ {
                  backgroundColor: style.bg_color || '#fff',
                  paddingTop: `${ (parseInt(style.paddingTop, 10)) }px`,
                  paddingBottom: `${ (parseInt(style.paddingBottom, 10)) }px`,
                  paddingLeft: `${ parseInt(style.paddingLeft, 10) }px`,
                  paddingRight: `${ parseInt(style.paddingRight, 10) }px`,
               } }
            >
               {children}
            </div>
         </div>
         <div className='email__block__container__right'>
            <div className='email__block__container__right__actionleft'>
               {type !== 'AttachedFile' && <div onClick={ duplicateBlock } role='presentation' title='duplicate'><IconNew name='DuplicateMediaM' /></div>}
               <div onClick={ deleteBlock } role='presentation' title='delete'><IconNew name='DeleteMediaM' color='#22272F' /></div>
            </div>
            {type !== 'AttachedFile' && <div className='grey__line' />}
            {type !== 'AttachedFile' && (
               <div className='email__block__container__right__actionright'>
                  <div onClick={ () => reOrderBlocks('+') } role='presentation' title='down'><IconNew name='ArrowBottomM' /></div>
                  <div onClick={ () => reOrderBlocks('-') } role='presentation' title='up'><IconNew name='ArrowTopM' /></div>
               </div>
            )}
         </div>
      </div>
   );
};

EmailBlockContainer.defaultProps = {
   duplicateBlock: () => {},
   deleteBlock: () => {},
   reOrderBlocks: () => {},
};

EmailBlockContainer.propTypes = {
   children: PropTypes.any,
   onChooseBlock: PropTypes.func,
   id: PropTypes.string,
   duplicateBlock: PropTypes.func,
   deleteBlock: PropTypes.func,
   isActive: PropTypes.bool,
   reOrderBlocks: PropTypes.func,
   style: PropTypes.object,
   type: PropTypes.string,
   email: PropTypes.object,
};

export default EmailBlockContainer;
