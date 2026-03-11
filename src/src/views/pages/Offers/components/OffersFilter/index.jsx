import SortButton from 'components/elements/buttons/SortButton';
import PorpTypes from 'prop-types';
import Input from 'components/elements/inputNew';
import { OfferContext } from 'containers/pages/mixed/offers';
import React from 'react';
import './index.scss';
// import Section from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Section';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';

const OffersFilter = ({
   portalSearch,
   serachData,
}) => {
   const {
      filterData, handleChangeFilterData, template, schoolRoomSettings,
      categories, isCategoryFrontPage, categorySearch, handleCategorySearch, type, isPortal,
   } = React.useContext(OfferContext);

   // const sortingOptions = {
   //    'recently': 'Recently Updated',
   //    'newest': 'Newest',
   //    'oldest': 'Oldest',
   //    'a-z': 'Name A to Z',
   //    'z-a': 'Name Z to A',
   // };
   const filterOptions = {
      none: 'None',
      free: 'Free',
      paid: 'Paid',
   };
   const filterSection = template[4];
   const filterButton = filterSection.school_room_components[0].props;
   // const { isMobile } = useWindowSizeChange();
   // if (isMobile) {
   //    return (
   //       <Section
   //          slug={ filterSection.school_room_section.slug }
   //          isPreview={ !isEditor }
   //          className={ `offers__page__filter${ schoolRoomSettings.school_room_theme_name === 'template3' ? ' offers__page__filter__mini' : '' }` }
   //          item={ filterSection }
   //          i={ 4 }
   //          onClick={ (e) => onClickElement(e) }
   //       >
   //          <div />
   //          <div className='offers__page__filter__right'>
   //             <SortButton
   //                value={ filterData.filter }
   //                filterType='Filter'
   //                iconName='FilterM'
   //                isNewIcon={ true }
   //                buttonIconColor={ filterButton.color }
   //                buttonStyles={ {
   //                   color: filterButton.color,
   //                   background: filterButton.bgColor,
   //                   borderColor: filterButton.color,
   //                } }
   //                isHidenButtons={ true }
   //                type='second'
   //                style={ isMobile ? {} : { width: '186px' } }
   //                onFilter={ (value) => handleChangeFilterData('filter', value) }
   //                options={ ['none', 'pricing', 'free', 'paid', 'category', 'design', 'cooking'] }
   //             >
   //                <div className='offers__page__filter__right__content'>
   //                   <div
   //                      className='filter__category'
   //                   >
   //                      <Text
   //                         inner='Pricing'
   //                         type={ types.mediumLarge }
   //                         size={ sizes.small }
   //                      />
   //                   </div>
   //                   <div
   //                      className='filter__item'
   //                      role='presentation'
   //                      onClick={ () => {
   //                         handleChangeFilterData('filter', 'none', 'none');
   //                      } }
   //                   >
   //                      <TextWithIcon
   //                         inner='None'
   //                         iconName='CertificatesSelectedM'
   //                         isWithoutIcon={ filterData.filter !== 'none' }
   //                         type={ types.regularDefault }
   //                         size={ sizes.small }
   //                      />
   //                   </div>
   //                   <div
   //                      className='filter__item'
   //                      role='presentation'
   //                      onClick={ () => {
   //                         handleChangeFilterData('filter', 'free', 'pricing');
   //                      } }
   //                   >
   //                      <TextWithIcon
   //                         inner='Free'
   //                         iconName='CertificatesSelectedM'
   //                         isWithoutIcon={ filterData.filter !== 'free' }
   //                         type={ types.regularDefault }
   //                         size={ sizes.small }
   //                      />
   //                   </div>
   //                   <div
   //                      className='filter__item'
   //                      role='presentation'
   //                      onClick={ () => {
   //                         handleChangeFilterData('filter', 'paid', 'pricing');
   //                      } }
   //                   >
   //                      <TextWithIcon
   //                         inner='Paid'
   //                         iconName='CertificatesSelectedM'
   //                         isWithoutIcon={ filterData.filter !== 'paid' }
   //                         type={ types.regularDefault }
   //                         size={ sizes.small }
   //                      />
   //                   </div>
   //                   <div
   //                      className='filter__category'
   //                   >
   //                      <Text
   //                         inner='Category'
   //                         type={ types.mediumLarge }
   //                         size={ sizes.small }
   //                      />
   //                   </div>
   //                   {categories && !!categories.length && categories.map(({ name }) => {
   //                      return (
   //                         <div
   //                            className='filter__item'
   //                            role='presentation'
   //                            key={ name }
   //                            onClick={ () => {
   //                               handleChangeFilterData('category_name', name, 'category');
   //                            } }
   //                         >
   //                            <TextWithIcon
   //                               inner={ name }
   //                               iconName='CertificatesSelectedM'
   //                               isWithoutIcon={ filterData.category_name !== name }
   //                               type={ types.regularDefault }
   //                               size={ sizes.small }
   //                            />
   //                         </div>
   //                      );
   //                   })}
   //                </div>
   //             </SortButton>
   //             <SortButton
   //                buttonIconColor={ filterButton.color }
   //                value={ filterData.sortBy }
   //                buttonStyles={ {
   //                   color: filterButton.color,
   //                   background: filterButton.bgColor,
   //                   borderColor: filterButton.color,
   //                } }
   //                onFilter={ (value) => handleChangeFilterData('sortBy', value) }
   //                options={ sortingOptions }
   //             />
   //          </div>
   //       </Section>
   //    );
   // }

   const isTemp1 = schoolRoomSettings.school_room_theme_name === 'template1';

   const buttonIconColorProp = isTemp1 ? 'var(--borderColor)' : filterButton.color;
   const buttonStylesProp = isTemp1 ? { background: 'transparent', borderColor: 'var(--borderColor)' } : { color: filterButton.color, background: filterButton.bgColor, borderColor: filterButton.color };
   const backgroundColorProp = isTemp1 ? '#292D3A' : '#fff';
   const categoriesClassName = isTemp1 ? 'filter__category__new' : 'filter__category';
   const textIconColor = isTemp1 ? '#fff' : undefined;

   return (
      // <Section
      //    slug={ filterSection.school_room_section.slug }
      //    isPreview={ !isEditor }
      //    className={ `${ schoolRoomSettings.school_room_theme_name === 'template1' ? 'offers__page__filter template1' : 'offers__page__filter' }` }
      //    // className={ `offers__page__filter${ schoolRoomSettings.school_room_theme_name === 'template3' ? ' offers__page__filter__mini' : '' }` }
      //    item={ filterSection }
      //    i={ 4 }
      //    onClick={ (e) => onClickElement(e) }
      // >
      <div
         style={ {
            maxWidth: schoolRoomSettings.school_room_theme_name === 'template2' && '460px',
            width: schoolRoomSettings.school_room_theme_name === 'template2' && '100%',
         } }
         className={ `${ schoolRoomSettings.school_room_theme_name === 'template1' ? 'offers__page__filter template1' : 'offers__page__filter' }` }>
         {
            schoolRoomSettings.school_room_theme_name === 'template1' ? (
               <div  className='customWidth2'>
                  <Input
                     type='search'
                     value={ isCategoryFrontPage ? categorySearch : isPortal ? serachData : filterData.search }
                     placeholder='Search'
                     name='search'
                     onChange={ isCategoryFrontPage ? handleCategorySearch : isPortal ? portalSearch : handleChangeFilterData }
                  />
               </div>
            ) : (
               <Input
                  type='search'
                  value={ isCategoryFrontPage ? categorySearch : isPortal ? serachData : filterData.search }
                  placeholder='Search'
                  name='search'
                  onChange={ isCategoryFrontPage ? handleCategorySearch : isPortal ? portalSearch : handleChangeFilterData }
               />
            )
         }
         

         {!isCategoryFrontPage && type !== 'bundle' && (
            <div className='offers__page__filter__right'>
               <SortButton
                  value={ filterData.filter }
                  filterType={ schoolRoomSettings.school_room_theme_name !== 'template1' ? 'Filter' : '' }
                  iconName='FilterM'
                  isNewIcon={ true }
                  isHidenButtons={ true }
                  type='second'
                  buttonIconColor={ buttonIconColorProp }
                  buttonStyles={ buttonStylesProp }
                  options={ filterOptions }
                  onFilter={ (value) => handleChangeFilterData('filter', value) }
                  style={ { backgroundColor: backgroundColorProp } }
                  hideText={ true }
                  isPortal={ isPortal }
               // />
               //    options={ ['none', 'pricing', 'free', 'paid', 'category', 'design', 'cooking'] }
               >
                  <div className='offers__page__filter__right__content'>
                     {/* <div
                        className='filter__category'
                     >
                        <Text
                           inner='Pricing'
                           type={ types.mediumLarge }
                           size={ sizes.small }
                        />
                     </div>
                     <div
                        className='filter__item'
                        role='presentation'
                        onClick={ () => {
                           handleChangeFilterData('filter', 'none', 'none');
                        } }
                     >
                        <TextWithIcon
                           inner='None'
                           iconName='CertificatesSelectedM'
                           isWithoutIcon={ filterData.filter !== 'none' }
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                     </div>
                     <div
                        className='filter__item'
                        role='presentation'
                        onClick={ () => {
                           handleChangeFilterData('filter', 'free', 'pricing');
                        } }
                     >
                        <TextWithIcon
                           inner='Free'
                           iconName='CertificatesSelectedM'
                           isWithoutIcon={ filterData.filter !== 'free' }
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                     </div>
                     <div
                        className='filter__item'
                        role='presentation'
                        onClick={ () => {
                           handleChangeFilterData('filter', 'paid', 'pricing');
                        } }
                     >
                        <TextWithIcon
                           inner='Paid'
                           iconName='CertificatesSelectedM'
                           isWithoutIcon={ filterData.filter !== 'paid' }
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                     </div> */}
                     <div
                        className={ categoriesClassName }
                     >
                        <Text
                           inner='Categories'
                           type={ types.bold }
                           size={ sizes.small_14 }
                           // style={ { color: 'rgba(255, 255, 255, 0.4)' } }
                        />
                     </div>
                     <div
                        className='filter__item'
                        role='presentation'
                        onClick={ () => {
                           handleChangeFilterData('category_name', '', 'none');
                        } }
                     >
                        <TextWithIcon
                           inner='None'
                           iconName='CertificatesSelectedM'
                           isWithoutIcon={ filterData.category_name !== '' }
                           type={ types.regularDefault }
                           size={ sizes.small_14 }
                           iconColor={ textIconColor }
                        />
                     </div>
                     {categories && !!categories.length && categories.map(({ name }) => {
                        return (
                           <div
                              className='filter__item'
                              role='presentation'
                              key={ name }
                              onClick={ () => {
                                 handleChangeFilterData('category_name', name, 'category');
                              } }
                           >
                              <TextWithIcon
                                 inner={ name }
                                 iconName='CertificatesSelectedM'
                                 isWithoutIcon={ filterData.category_name !== name }
                                 type={ types.regularDefault }
                                 size={ sizes.small_14 }
                                 iconColor={ textIconColor }
                              />
                           </div>
                        );
                     })}
                  </div>
               </SortButton>

               {/* {
               schoolRoomSettings.school_room_theme_name !== 'template1' && (
                  <SortButton
                     // buttonIconColor={ filterButton.color }
                     value={ filterData.sortBy }
                     // buttonStyles={ {
                     //    color: filterButton.color,
                     //    background: filterButton.bgColor,
                     //    borderColor: filterButton.color,
                     // } }
                     buttonIconColor='rgb(114, 121, 120)'
                     buttonStyles={ {
                        color: 'rgb(114, 121, 120)',
                        background: 'transparent',
                        borderColor: 'rgb(114, 121, 120)',
                        // borderColor: filterButton.color,
                     } }
                     onFilter={ (value) => handleChangeFilterData('sortBy', value) }
                     options={ sortingOptions }
                  />
               )
            } */}
            </div>
         )}
      </div>
      // </Section>
   );
};

OffersFilter.propTypes = {
   portalSearch: PorpTypes.func,
   serachData: PorpTypes.string,
};

export default OffersFilter;
