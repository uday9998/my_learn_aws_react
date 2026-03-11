import React, { useEffect, useState } from 'react';
import { OfferContext } from 'containers/pages/mixed/offers';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import { NewSortButton } from 'components/elements/buttons/SortButton';
import NotFound from '../NotFound';
import NewProductCard from '../NewProductCard';

import './style.scss';
import { color } from 'd3';


const productTypes = ['Course', 'Course', 'Community'];

const ExploreOffer = () => {
   const [searchValue, setSearchValue] = useState('');
   const {
      selectedOffer,
      template,
      user,
      isEditor,
      handleToggleCourseLike,
      handleClickCourseButton,
      schoolRoomSettings,
      filterData,
      handleChangeFilterData,
      // uuid,
      // exploreCourse,
      // selectedOfferCourse,
   } = React.useContext(OfferContext);
   const filterSection = template[4];
   const filterButton = filterSection.school_room_components[0].props;
   const [courses, setCourses] = useState(selectedOffer.categories);
   const [notFindCourse, setNotFindCourse] = useState(false);
   const content = template[5];
   // const contentItemSlug = content.school_room_components[0].slug;
   const contentItem = content.school_room_components[0];
   const getPrimaryButtonText = (data, offerPlan) => {
      if (data.joined && data.joined_status !== 3 && Boolean(user)) {
         if (data.type === '2') return 'Go To Community';
         if (data.progress_percentage > 0) return 'Continue Course';
         return 'Start Course';
      }
      if (data.type === '2') return 'Join Community';
      if (offerPlan.pricings.length === 1 && offerPlan.pricings[0].pricing_type === 0) return 'Get Product';
      return 'Preview Before Purchase';
   };

   const filteredCourse = (item, value) => {
      return item.courses.filter(course => {
         return course.name.includes(value);
      });
   };

   const searchCourse = (value) => {
      return selectedOffer.categories.map((item, i) => {
         let filteredResult = null;

         if (i === selectedOffer.categories.length - 1) {
            filteredResult = filteredCourse(item, value);

            setNotFindCourse(!filteredResult.length);
         } else {
            filteredResult = filteredCourse(item, value);
         }

         return {
            ...item,
            courses: filteredResult,
         };
      });
   };

   const handleChangeSearchValue = (_, value) => {
      setSearchValue(value);
      setCourses(searchCourse(value));
   };

   const sortByCategoriew = (name) => {
      handleChangeFilterData('category_name', name, 'category');

      if (!name) {
         setCourses(selectedOffer.categories);
      } else {
         const filteredData = selectedOffer.categories.filter(course => {
            return course.name === name;
         });
         setCourses(filteredData);
      }
   };

   // return (
   //    <div
   //       className={ `explore__offer ${ schoolRoomSettings.school_room_theme_name } ` }
   //    >
   //       <span
   //          className='explore__offer__title'
   //          style={ {
   //             color: 'var(--textColor)',
   //          } }
   //       >
   //          Includes { selectedOffer.courses_count } { selectedOffer.courses_count > 1 ? 'Products' : 'Product' }
   //       </span>
   //       <div
   //          // className={ `offer__cards__list ${schoolRoomSettings.school_room_theme_name}` }
   //          className={ schoolRoomSettings.school_room_theme_name === 'template3' ? 'product__cards__list__template3' : 'offer__cards__list' }
   //       >
   //          {/* schoolRoomSettings.school_room_theme_name === 'template3' */}
   //          {
   //             selectedOffer.courses.data.map(course => {
   // if (schoolRoomSettings.school_room_theme_name === 'template3') {
   //    return (
   //       <ProductCardTemplate3
   //          key={ course.id }
   //          data={ course }
   //          type={ productTypes[course.type] }
   //          item={ contentItem }
   //          isEditor={ isEditor }
   //          user={ user }
   //          offerPlan={ selectedOffer.plan }
   //          toggleLike={ () => handleToggleCourseLike(course.id) }
   //          handleClickCourseButton={ () => handleClickCourseButton(course, selectedOffer.plan) }
   //          schoolRoomThemeName={ schoolRoomSettings.school_room_theme_name }
   //          getPrimaryButtonText={ getPrimaryButtonText }
   //          mainBackgroundColor={ template[0].school_room_section.props.bgColor }
   //       />
   //    );
   // }
   // return (
   //    <ProductCard
   //       key={ course.id }
   //       data={ course }
   //       type={ productTypes[course.type] }
   //       item={ contentItem }
   //       isEditor={ isEditor }
   //       user={ user }
   //       offerPlan={ selectedOffer.plan }
   //       toggleLike={ () => handleToggleCourseLike(course.id) }
   //       handleClickCourseButton={ () => handleClickCourseButton(course, selectedOffer.plan) }
   //       schoolRoomThemeName={ schoolRoomSettings.school_room_theme_name }
   //       getPrimaryButtonText={ getPrimaryButtonText }
   //       mainBackgroundColor={ template[0].school_room_section.props.bgColor }
   //    />
   // );
   //             })
   //          }
   //       </div>
   //       {selectedOfferCourse ? (
   //          <div className='offer__explore__lessons'>
   //             <LessonBlock
   //                item={ contentItem }
   //                goToCheckout={ () => getCheckoutUrl(selectedOffer.plan) }
   //             />
   //          </div>
   //       ) : (
   //          <div className='offer__explore__content'>
   //             {schoolRoomSettings.school_room_theme_name === 'template1' ? (
   //                <>
   //                   {selectedOffer.categories.map((category) => {
   //                      return (
   //                         <>
   //                            <div>
   //                               <Text
   //                                  inner={ category.name }
   //                                  type={ types.mediumSmall }
   //                                  size={ sizes.xxlarge }
   //                                  style={ { padding: '12px', display: 'block', color: '#fff' } }
   //                               />
   //                            </div>
   //                            <div className='offer__explore__content__block'>
   //                               {category.courses.map((course) => {
   //                                  return (
   //                                     <CourseCardTemplate1
   //                                        course={ course }
   //                                        title={ course.name }
   //                                        offer={ selectedOffer }
   //                                        joined={ course.joined }
   //                                        image={ (course.communities && course.communities.file_id)
   //                                     || course.thumbnail_image }
   //                                        goToCheckout={ () => getCheckoutUrl(selectedOffer.plan) }
   //                                        item={ contentItem }
   //                                        exploreCourse={ exploreCourse }
   //                                        slug={ contentItemSlug }
   //                                     />
   //                                  );
   //                               })}
   //                            </div>
   //                         </>
   //                      );
   //                   })}

   //                </>
   //             ) : (
   //                selectedOffer && selectedOffer.categories
   //                && (
   //                   <>
   //                      {selectedOffer.categories.map((category) => {
   //                         return (
   //                            <div key={ category.id }>
   //                               <div>
   //                                  <Text
   //                                     inner={ category.name }
   //                                     type={ types.mediumSmall }
   //                                     size={ sizes.xxlarge }
   //                                     style={ { padding: '12px', display: 'block' } }
   //                                  />
   //                               </div>
   //                               <div className='offer__explore__content__flex'>
   //                                  {category.courses.map((course) => {
   //                                     return (
   //                                        <ProductCard
   //                                           product={ course }
   //                                           goToCheckout={ () => handleBuy() }
   //                                           key={ course.id }
   //                                        />
   //                                     );
   //                                  })}
   //                               </div>
   //                            </div>
   //                         );
   //                      })}

   //                   </>
   //                )
   //             )}
   //          </div>
   //       )}
   //    </div>
   // );

   return (
      <div
         className={ `explore__offer ${ schoolRoomSettings.school_room_theme_name } ` }
      >
         {
            schoolRoomSettings.school_room_theme_name === 'template1' && (
               <div className='tech__section'>
                  <span
                     className='explore__offer__title'
                     style={ {
                        color: 'var(--textColor)',
                     } }
                  >
                     Includes { selectedOffer.courses_count } { selectedOffer.courses_count > 1 ? 'Products' : 'Product' }
                  </span>
                  <div className='input__wrapper'>
                     <Input
                        type='search'
                        value={ searchValue }
                        placeholder='Search'
                        name='search'
                        onChange={ (name, value) => handleChangeSearchValue(name, value) }
                     />
                     <NewSortButton
                        value={ filterData.filter }
                        filterType={ schoolRoomSettings.school_room_theme_name !== 'template1' ? 'Filter' : '' }
                        iconName='FilterM'
                        isNewIcon={ true }
                        isHidenButtons={ true }
                        type='second'
                        buttonIconColor={ filterButton.color }
                        buttonStyles={ {
                           color: filterButton.color,
                           background: '#22272F',
                           borderColor: filterButton.color,
                        } }
                        onFilter={ (value) => handleChangeFilterData('filter', value) }
                     // />
                     //    options={ ['none', 'pricing', 'free', 'paid', 'category', 'design', 'cooking'] }
                     >
                        <div className='offers__page__filter__right__content'>
                           <div
                              className='filter__category__new'
                           >
                              <Text
                                 inner='Category'
                                 type={ types.mediumLarge }
                                 size={ sizes.small }
                                 style={{color: '#000'}}
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
                                 size={ sizes.small }
                                 iconColor='#fff'
                                 onClick={ () => {
                                    sortByCategoriew('');
                                 } }
                                 style={{color: '#fff'}}
                              />
                           </div>
                           {selectedOffer.categories && !!selectedOffer.categories.length && selectedOffer.categories.map(({ name }) => {
                              return (
                                 <div
                                    className='filter__item'
                                    role='presentation'
                                    key={ name }
                                    onClick={ () => {
                                       sortByCategoriew(name);
                                    } }
                                 >
                                    <TextWithIcon
                                       inner={ name }
                                       iconName='CertificatesSelectedM'
                                       isWithoutIcon={ filterData.category_name !== name }
                                       type={ types.regularDefault }
                                       size={ sizes.small }
                                       iconColor='#fff'
                                       style={{color: '#fff'}}
                                    />
                                 </div>
                              );
                           })}
                        </div>
                     </NewSortButton>
                  </div>

               </div>
            )
         }
         {
            notFindCourse ? <NotFound searchText={ searchValue } /> : courses.map(category => (
               <div
                  key={ category.id }
                  className='explore__offer__category__item'
               >
                  <Text
                     inner={ category.name }
                     type={ types.mediumSmall }
                     size={ sizes.xxlarge }
                     className='explore__offer__category__item__name'
                  />
                  <div className='offer__explore__content__flex'>
                     {category.courses.map((course) => {
                        return (
                           <NewProductCard
                              key={ course.id }
                              data={ course }
                              type={ productTypes[course.type] }
                              item={ contentItem }
                              isEditor={ isEditor }
                              user={ user }
                              offerPlan={ selectedOffer.plan }
                              toggleLike={ () => handleToggleCourseLike(course.id) }
                              handleClickCourseButton={ () => handleClickCourseButton(course, selectedOffer.plan) }
                              schoolRoomThemeName={ schoolRoomSettings.school_room_theme_name }
                              getPrimaryButtonText={ getPrimaryButtonText }
                              mainBackgroundColor={ template[0].school_room_section.props.bgColor }
                              template={ template }
                           />
                        );
                     })}
                  </div>
               </div>
            ))
         }
      </div>
   );
};

ExploreOffer.propTypes = {

};

export default ExploreOffer;
