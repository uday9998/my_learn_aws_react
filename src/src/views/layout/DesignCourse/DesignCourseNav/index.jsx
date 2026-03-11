import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import Router from 'routes/router';

const DesignCourseNav = ({
   onSwitch, commentsCount, goTo, goToComments, goToPricings, course,
}) => {
   return (
      <div className='design__course__nav'>
         <div
            className='design__course__nav__item'
            role='presentation'
            onClick={ () => onSwitch('program-information') }
         >
            <IconNew name='ProductInformationM' color='#24554E' />
            <Text
               inner='Product Information'
               type={ types.small_12_weight }
               size={ sizes.small_12 }
            />
         </div>
         <div
            className='design__course__nav__item'
            role='presentation'
            onClick={ () => goToComments() }
         >
            <IconNew name='CommentsProductM' color='#24554E' />
            <Text
               inner={ `Comments (${ commentsCount })` }
               type={ types.small_12_weight }
               size={ sizes.small_12 }
            />
         </div>
         <div
            className='design__course__nav__item'
            role='presentation'
            onClick={ course.type === '1' ? () => goTo(Router.route('ADMIN_VIDEO_CATEGORIES').getMask()) : () => goTo(Router.route('ADMIN_CATEGORIES').getMask()) }
         >
            <IconNew name='CategoriesProductM' color='#24554E' />
            <Text
               inner='Categories'
               type={ types.small_12_weight }
               size={ sizes.small_12 }
            />
         </div>
         {course.type === '1' && (
            <div
               className='design__course__nav__item'
               role='presentation'
               onClick={ () => goTo(Router.route('ADMIN_PLAYLISTS').getCompiledPath({
                  id: course.id, sectionId: course.sections[0].id,
               })) }
            >
               <IconNew name='PlayLists' color='#24554E' />
               <Text
                  inner='Playlists'
                  type={ types.small_12_weight }
                  size={ sizes.small_12 }
               />
            </div>
         )}
         <div
            className='design__course__nav__item'
            role='presentation'
            onClick={ () => goToPricings() }
         >
            <IconNew name='PricingPLanM' color='#24554E' />
            <Text
               inner='Price'
               type={ types.small_12_weight }
               size={ sizes.small_12 }
            />
         </div>
         <div
            className='design__course__nav__item'
            role='presentation'
            onClick={ () => onSwitch('bridge') }
         >
            <IconNew name='BridgeM' color='#24554E' />
            <Text
               inner='Connect'
               type={ types.small_12_weight }
               size={ sizes.small_12 }
            />
         </div>
         {/* <div
            className='design__course__nav__item'
            role='presentation'
            onClick={ () => onSwitch('course-settings') }
         >
            <IconNew name='SettingsProductM' />
            <Text
               inner='Settings'
               type={ types.regularDefault }
               size={ sizes.small }
            />
         </div> */}
      </div>
   );
};

DesignCourseNav.propTypes = {
   onSwitch: PropTypes.func,
   goToComments: PropTypes.func,
   goToPricings: PropTypes.func,
   commentsCount: PropTypes.number,
   goTo: PropTypes.func,
   course: PropTypes.object,
};

export default DesignCourseNav;
