import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Popover from '@material-ui/core/Popover';
import './index.scss';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import { v4 as uuidv4 } from 'uuid';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';


const DropTriggle = ({
   options, type, styles, course, currentLesson, saveLesson, isMobile,
   handleMoreOptionNavigate, handleChangeMoreOptionModal,
}) => {
   const [isOpenTriangle, setIsOpenTriangle] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   return (
      <div className='drop__triggle'>
         <BaseButton
            theme={ btnTheme.secondary }
            size={ btnSizes.small }
            isIconLeft={ true }
            iconName='SelectButtonPersonalL'
            text={ isMobile ? 'Actions' : 'More Options' }
            onClick={ (e) => {
               e.preventDefault();
               e.stopPropagation();
               setIsOpenTriangle(true);
               setAnchorEl(e.currentTarget);
               if (handleChangeMoreOptionModal) {
                  handleChangeMoreOptionModal();
               }
            } }
         />
         <Popover
            open={ isOpenTriangle }
            anchorEl={ anchorEl }
            onClose={ () => {
               setIsOpenTriangle(false);
               if (handleChangeMoreOptionModal) {
                  handleChangeMoreOptionModal();
               }
            } }
            className='custom-popover'
            elevation={ 24 }
            style={ styles }
            anchorOrigin={ {
               vertical: 'bottom',
               horizontal: 'right',
            } }
            transformOrigin={ {
               vertical: 'top',
               horizontal: 'right',
            } }
         >
            <div className={ type ? `triggle__popover__lesson__${ type }` : 'triggle__popover__lesson' }>
               <div className='triggle__popover__lesson__flex'>
                  {isMobile
                        && (
                           <div className='sort__title'>
                              <div> <Text
                                 size={ textSize.small }
                                 type={ textType.medium }
                                 // eslint-disable-next-line no-nested-ternary
                                 inner='Actions'
                              />
                              </div>
                              <div
                                 role='presentation'
                                 onClick={ (e) => { e.stopPropagation(); setIsOpenTriangle(false); }
                                 }
                              >
                                 <IconNew name='CrossM' />
                              </div>
                           </div>
                        )}
                  {isMobile
                  && (
                     <div className='triggle__popover__lesson__btns'>
                        <BaseButton
                           theme={ btnTheme.secondary }
                           size={ btnSizes.xsmall }
                           isIconRight={ true }
                           iconName='eyeM'
                           text={ course.type === '1' ? 'Preview Video' : 'Preview Lesson' }
                           onClick={ () => (course.type === '1' ? window.open(`/programs/${ course.url }/${ currentLesson.categories[0]?.link }?video=${ currentLesson.id }&preview=success`, '_blank')
                              : window.open(`/programs/${ course.url }?lesson=${ currentLesson.id }&preview=success`, '_blank'))
                           }
                        />
                        <BaseButton
                           theme={ btnTheme.secondary }
                           size={ btnSizes.xsmall }
                           text='Save Changes'
                           onClick={ () => saveLesson(false) }
                        />
                        {/* </Link> */}
                        <BaseButton
                           theme={ btnTheme.primary }
                           size={ btnSizes.xsmall }
                           text='Publish'
                           iconName='Plus'
                           isIconRight={ true }
                           onClick={ () => saveLesson(true) }
                        />
                        <div className='grey__line' />
                     </div>
                  )
                  }
                  {options.map((option) => {
                     return (
                        <div
                           onClick={ (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleMoreOptionNavigate(option.onClick, e);
                              setIsOpenTriangle(false);
                           } }
                           role='presentation'
                           key={ uuidv4() }
                           style={ option.style || {} }
                           className={ `triggle__popover__lesson__item ${ option.trash && options.length > 1 && 'triggle__popover__lesson__item__border' }${ option.trash ? ' triggle__popover__lesson__item__trash' : ` triggle__popover__lesson__item__${ option.iconName }` }` }
                        >
                           <IconNew name={ option.iconName } />
                           <Text
                              inner={ option.name }
                              type={ textType.regularDefault }
                              size={ textSize.small }
                              style={ { ...(option.textOptions || {}) } }
                           />
                        </div>
                     );
                  })}
               </div>
            </div>
         </Popover>
      </div>
   );
};

DropTriggle.propTypes = {
   options: PropTypes.array,
   type: PropTypes.string,
   styles: PropTypes.object,
   saveLesson: PropTypes.func,
   handleMoreOptionNavigate: PropTypes.func,
   handleChangeMoreOptionModal: PropTypes.func,
   currentLesson: PropTypes.object,
   course: PropTypes.object,
   isMobile: PropTypes.bool,
};

export default DropTriggle;
