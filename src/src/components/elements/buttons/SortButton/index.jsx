import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import { uniqueId } from 'lodash';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import IconNew from 'components/elements/iconsSize';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import Modal from 'components/elements/Modal';
import Button, { NewBaseButton, THEMES as btnTheme } from '../BaseButtonNew';

const SortButton = ({
   value, onFilter, options, filterType, iconName, type = 'first', children, isHidenButtons, style, buttonStyles, isFilterHaveOptions,
   buttonIconColor, buttonTheme, isNewIcon, hideText, isPortal,
}) => {
   const [isOpenSortDrop, setIsOpenSortDrop] = useState(false);
   const [items, setItems] = useState([]);
   const { isMobile: isMob } = useWindowSizeChange();
   
   useEffect(() => {
      if (type === 'first' || isFilterHaveOptions) {
         const optionKeys = Object.keys(options);
         const values = [];
         optionKeys.forEach((item) => {
            values.push({ key: options[item], value: item });
         });
         setItems(values);
      }
   }, [value, options, type, isFilterHaveOptions]);

   const innerFilter = (item) => {
      return item.key === options[value] ? () => { } : () => {
         setIsOpenSortDrop(false);
         onFilter(item.value);
      };
   };

   const view = (
      <ClickOutside onClick={ () => setIsOpenSortDrop(false) }>
         <div role='presentation' className='sort__button__new__drop' style={ style }>
            <>
               {type === 'second' && !isFilterHaveOptions ? (
                  <>
                     {children}
                     {!isHidenButtons && (
                        <div className='sort__button__new__drop__buttons'>
                           <Button
                              text='Cancel'
                              theme={ btnTheme.secondary }
                              onClick={ () => {
                                 setIsOpenSortDrop(false);
                              } }
                           />
                           <Button
                              text='Apply'
                              onClick={ () => {
                                 onFilter();
                                 setIsOpenSortDrop(false);
                              } }
                           />
                        </div>
                     )}
                  </>
               ) : (
                  <>
                     {isMob && isOpenSortDrop
               && (
                  <div className='sort__title'>
                     <div> <Text
                        size={ TextSize.small }
                        type={ TextType.medium }
                        // eslint-disable-next-line no-nested-ternary
                        inner={ type === 'second' ? 'Filter' : `${ filterType !== undefined ? filterType === '' ? '' : `${ filterType }:` : 'Sort By' }` }
                     />
                     </div>
                     <div
                        role='presentation'
                        onClick={ (e) => { e.stopPropagation(); setIsOpenSortDrop(false); }
                        }
                     >
                        <IconNew name='CrossM' />
                     </div>
                  </div>
               )}
                     {items.map((item) => {
                        return (
                           <div
                              key={ uniqueId() }
                              className='sort__button__new__drop__item'
                              role='presentation'
                              onClick={ innerFilter(item) }>
                              {item.key === options[value] && (
                                 <IconNew name='CertificatesSelectedM' />
                              )}
                              <Text
                                 inner={ item.key }
                                 style={ { whiteSpace: 'nowrap', color: '#000' } }
                                 type={ TextType.regularDefault }
                                 size={ TextSize.small }
                              />
                           </div>
                        );
                     })}
                  </>
               )}
            </>
         </div>
      </ClickOutside>
   );

   return (
      <>
         <div className='sort__button__new'>
            <div 
               className={`category_dropdown_button ${isOpenSortDrop ? 'category_dropdown_button--active' : ''}`}
               onClick={ () => setIsOpenSortDrop(true) }
            >
               <span className="category_dropdown_label">
                  {/* Special handling for filter button when hideText is true but we still want to show Category: All */}
                  {(hideText && type === 'second') ? 'Category: All' : 
                   (hideText) ? '' : 
                   (type === 'second' ? 'Filter' : 
                    `${filterType !== undefined ? filterType === '' ? '' : `${filterType}: ` : 'Category: '}${options[value]}`)}
               </span>
               <IconNew name={iconName || 'ArrowDown'} color={buttonIconColor || '#000'} />
            </div>

            {isOpenSortDrop && isMob
                && <Modal>{view}</Modal>
            }

            {isOpenSortDrop && !isMob
                && view
            }

            {isMob && isOpenSortDrop && (
               <Modal>
                  <div
                     className='sort__back'
                     role='presentation'
                     onClick={ (e) => { e.stopPropagation(); setIsOpenSortDrop(false); } }
                  />
               </Modal>
            )}
         </div>
      </>
   );
};

export const NewSortButton = ({
   value, onFilter, options, filterType, iconName, type = 'first', children, isHidenButtons, style, buttonStyles, isFilterHaveOptions,
   buttonIconColor, buttonTheme, isNewIcon,
}) => {
   const [isOpenSortDrop, setIsOpenSortDrop] = useState(false);
   const [items, setItems] = useState([]);
   const { isMobile: isMob } = useWindowSizeChange();
   useEffect(() => {
      if (type === 'first' || isFilterHaveOptions) {
         const optionKeys = Object.keys(options);
         const values = [];
         optionKeys.forEach((item) => {
            values.push({ key: options[item], value: item });
         });
         setItems(values);
      }
   }, [value]);


   const innerFilter = (item) => {
      return item.key === options[value] ? () => { } : () => {
         setIsOpenSortDrop(false);
         onFilter(item.value);
      };
   };

   const view = (
      <ClickOutside onClick={ () => setIsOpenSortDrop(false) }>
         <div
            role='presentation'
            className='sort__button__new__drop__new'
            style={ {
               left: '-58px',
               top: '115%',
               background: '#292E3A',
            } }>
            <>
               {type === 'second' && !isFilterHaveOptions ? (
                  <>
                     {children}
                     {!isHidenButtons && (
                        <div className='sort__button__new__drop__buttons'>
                           <Button
                              text='Cancel'
                              theme={ btnTheme.secondary }
                              onClick={ () => {
                                 setIsOpenSortDrop(false);
                              } }
                           />
                           <Button
                              text='Apply'
                              onClick={ () => {
                                 onFilter();
                                 setIsOpenSortDrop(false);
                              } }
                           />
                        </div>
                     )}
                  </>
               ) : (
                  <>
                     {isMob && isOpenSortDrop
               && (
                  <div className='sort__title'>
                     <div> <Text
                        size={ TextSize.small }
                        type={ TextType.medium }
                        // eslint-disable-next-line no-nested-ternary
                        inner={ type === 'second' ? 'Filter' : `${ filterType !== undefined ? filterType === '' ? '' : `${ filterType }:` : 'Sort By' }` }
                     />
                     </div>
                     <div
                        role='presentation'
                        onClick={ (e) => { e.stopPropagation(); setIsOpenSortDrop(false); }
                        }
                     >
                        <IconNew name='CrossM' />
                     </div>
                  </div>
               )}
                     {items.map((item) => {
                        return (
                           <div key={ uniqueId() } className='sort__button__new__drop__item' style={ { background: '#292E3A' } } role='presentation' onClick={ innerFilter(item) }>
                              {item.key === options[value] && (
                                 <IconNew name='CertificatesSelectedM' color='#fff' />
                              )}
                              <Text
                                 inner={ item.key }
                                 style={ { whiteSpace: 'nowrap', color: '#fff' } }
                                 type={ TextType.regularDefault }
                                 size={ TextSize.small }
                              />
                           </div>
                        );
                     })}
                  </>
               )}
            </>
         </div>
      </ClickOutside>
   );

   return (
      <>
         <div
            className='sort__button__new'
         >
            <NewBaseButton
               // eslint-disable-next-line no-nested-ternary
               // text={ type === 'second' ? 'Filter' : `${ filterType !== undefined ? filterType === '' ? '' : `${ filterType }:` : 'Sort By :' }  ${ options[value] }` }
               theme={ buttonTheme || btnTheme.secondary }
               iconName={ iconName || 'SortNew' }
               isNewIcon={ isNewIcon }
               isHidenDiv={ true }
               iconColor={ buttonIconColor }
               style={ isOpenSortDrop ? {
                  minHeight: '36px',
                  padding: isMob ? '0' : '0px 12px',
                  background: '#22272F',
                  boxShadow: '0px 0px 4px 2px #36796f',
                  ...buttonStyles,
               } : {
                  minHeight: '36px', padding: isMob ? '0' : '0px 12px', ...buttonStyles, background: '#22272F', 
               } }
               isIconRight={ true }
               onClick={ () => setIsOpenSortDrop(true) }
               btnTextClassName={ isMob ? 'mobTextRemove' : '' }

            />

            {isOpenSortDrop && isMob
                && <Modal>{view}</Modal>
            }

            {isOpenSortDrop && !isMob
                && view
            }


            {isMob && isOpenSortDrop && (
               <Modal>
                  <div
                     className='sort__back'
                     role='presentation'
                     onClick={ (e) => { e.stopPropagation(); setIsOpenSortDrop(false); } }
                  />
               </Modal>
            )}

         </div>
      </>
   );
};

SortButton.propTypes = {
   value: PropTypes.string,
   onFilter: PropTypes.func,
   options: PropTypes.object,
   filterType: PropTypes.string,
   iconName: PropTypes.string,
   type: PropTypes.string,
   isHidenButtons: PropTypes.bool,
   children: PropTypes.any,
   style: PropTypes.object,
   buttonStyles: PropTypes.object,
   buttonIconColor: PropTypes.string,
   isFilterHaveOptions: PropTypes.bool,
   buttonTheme: PropTypes.string,
   isNewIcon: PropTypes.bool,
   hideText: PropTypes.bool,
   isPortal: PropTypes.bool,
};

NewSortButton.propTypes = {
   value: PropTypes.string,
   onFilter: PropTypes.func,
   options: PropTypes.object,
   filterType: PropTypes.string,
   iconName: PropTypes.string,
   type: PropTypes.string,
   isHidenButtons: PropTypes.bool,
   children: PropTypes.any,
   style: PropTypes.object,
   buttonStyles: PropTypes.object,
   buttonIconColor: PropTypes.string,
   isFilterHaveOptions: PropTypes.bool,
   buttonTheme: PropTypes.string,
   isNewIcon: PropTypes.bool,
};

export default SortButton;