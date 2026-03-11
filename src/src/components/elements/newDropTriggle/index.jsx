import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Popover from '@material-ui/core/Popover';
import './index.scss';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import { v4 as uuidv4 } from 'uuid';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import ReactTooltip from 'react-tooltip';
import IconButton, { THEMES as theme } from '../buttons/IconButton';

const DropTriggle = ({
   options, type, activeStyles, styles, isIconButton, isCommunity, notShowMobileView, isPlaylist, removeDropLesson,
   top, left, className, 
}) => {
   const [isOpenTriangle, setIsOpenTriangle] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const { isMobile: isMob } = useWindowSizeChange();

   return (
      <>
         {!removeDropLesson && isMob && isOpenTriangle && !notShowMobileView && <div className='drop__lesson__back' />}
         <div className='drop__triggle'>
            {isIconButton ? (
               <IconButton
                  theme={ theme.light }
                  tooltip={ isPlaylist ? '' : 'More' }
                  style={ isPlaylist ? { transform: 'rotate(90deg)' } : {} }
                  className={ `drop__triggle__button${ isOpenTriangle ? ' drop__triggle__button__active' : '' }` }
                  name='ToggleMoreM'
                  onClick={ (e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     setIsOpenTriangle(true);
                     setAnchorEl(e.currentTarget);
                  } }
               />
            ) : (
               <div
                  className={ `drop__triggle__icon${ isOpenTriangle ? ' drop__triggle__icon__active' : '' }` }
                  role='presentation'
                  style={ isOpenTriangle ? activeStyles : {} }
                  onClick={ (e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     setIsOpenTriangle(true);
                     setAnchorEl(e.currentTarget);
                  } }
               >
                  <IconNew name='ToggleMoreM' />
               </div>
            )}
            <Popover
               top={ top }
               left={ left }
               open={ isOpenTriangle }
               anchorEl={ anchorEl }
               onClose={ (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpenTriangle(false);
               } }
               className='custom-popover'
               elevation={ 24 }
               style={ styles }
               PaperProps={ {
                  // style: isMob && !notShowMobileView ? { width: '100%' } : {},
               } }
               anchorOrigin={ {
                  vertical: 'bottom',
                  horizontal: 'right',
               } }
               transformOrigin={ {
                  vertical: 'top',
                  horizontal: 'right',
               } }
               transitionDuration={ 0 }
            >
               <div className={ type ? `triggle__popover__${ type } ${ className }` : `triggle__popover ${ className } ${ notShowMobileView ? 'notShowMobileView' : '' }` }>
                  {isMob && !notShowMobileView && isOpenTriangle
                   && (
                      <div className='triggle__title'>
                         <div> <Text
                            size={ textSize.small }
                            type={ textType.medium }
                            inner='More Options'
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
                  <div className='triggle__popover__flex'>
                     {options.map((option) => {
                        if (isCommunity && option.name === 'Duplicate') return null;
                        if (option.component) {
                           return option.component;
                        }
                        return (
                           <div
                              onClick={ (e) => {
                                 e.preventDefault();
                                 e.stopPropagation();

                                 if (option.disabled) return;

                                 option.onClick(e);
                                 setIsOpenTriangle(false);
                              } }
                              role='presentation'
                              key={ uuidv4() }
                              style={ option.style || {} }
                              className={
                                 `
                                    ${ option.tooltipText ? 'tooltip' : '' }
                                    triggle__popover__item
                                    ${ option.trash && options.length > 1 && 'triggle__popover__item__border' }
                                    ${ option.trash ? ' triggle__popover__item__trash' : ` triggle__popover__item__${ option.iconName }` }
                                    ${ option.disabled ? ' disabled' : ' ' }
                                 `
                              }
                              data-tip={ option.tooltipText ? option.tooltipText : undefined }
                           >
                              <IconNew name={ option.iconName } />
                              <Text
                                 inner={ option.name }
                                 type={ textType.regularDefault }
                                 size={ textSize.small }
                                 style={ { ...(option.textOptions || {}) } }
                              />

                              {
                                 option.tooltipText && (
                                    <ReactTooltip />
                                 )
                              }
                           </div>
                        );
                     })}
                  </div>
               </div>
            </Popover>
         </div>
      </>
   );
};

DropTriggle.propTypes = {
   options: PropTypes.array,
   type: PropTypes.string,
   top: PropTypes.string,
   className: PropTypes.string,
   left: PropTypes.string,
   styles: PropTypes.object,
   activeStyles: PropTypes.object,
   isIconButton: PropTypes.bool,
   isCommunity: PropTypes.bool,
   notShowMobileView: PropTypes.bool,
   isPlaylist: PropTypes.bool,
   removeDropLesson: PropTypes.bool,
};

export default DropTriggle;
