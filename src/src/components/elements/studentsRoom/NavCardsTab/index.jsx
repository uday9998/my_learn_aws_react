import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import NavCard from 'components/elements/studentsRoom/NavCard';
// import defaultAuthor from 'assets/images/user.jpg';
import { useTranslate } from 'react-polyglot';

const NavCardsTab = ({
   changeTab, active, lesson, textColor, commentCount, primaryTheme, commentStatus,
   defaultColor,
}) => {
   const t = useTranslate();
   const comments = {
      id: 1,
      title: t('discussion'),
      icon: 'Comment',
      content: `${ commentCount } Comment`,
   };
   // const teacher = {
   //    id: 2,
   //    title: t('about_course'),
   //    content: author.name,
   //    img: author.img === '' ? defaultAuthor : author.img,
   // };
   const badges = {
      id: 3,
      title: t('achievements'),
      icon: 'Achievement',
      content: 'New Badge',
   };
   const resources = {
      id: 4,
      title: t('resources'),
      icon: 'Resource',
      content: `${ (lesson.resources && lesson.resources.length) }  ${ (lesson.resources && lesson.resources.length > 1) ? 'Downloads' : 'Download' }`,
   };
   const notEmptyBadges = !!(lesson && lesson.lesson_badge);
   const notEmptyResources = !!(lesson.resources && !!lesson.resources.length);
   const navCards = [];
   if (commentStatus !== 0) {
      navCards.push(comments);
   }
   if (notEmptyBadges) {
      navCards.push(badges);
   }
   if (notEmptyResources) {
      navCards.push(resources);
   }
   return (
      navCards && !!navCards.length && navCards.map(navCard => {
         const {
            id, title, icon, content, img,
         } = navCard;
         return (
            <NavCard
               key={ id }
               title={ title }
               icon={ icon }
               content={ content }
               active={ id === active }
               defaultColor={ defaultColor }
               img={ img }
               changeTab={ () => changeTab(id) }
               textColor={ textColor }
               primaryTheme={ primaryTheme }
            />
         );
      })
   );
};

NavCardsTab.propTypes = {
   title: PropTypes.string,
   icon: PropTypes.string,
   content: PropTypes.string,
   img: PropTypes.string,
   active: PropTypes.number,
   changeTab: PropTypes.func,
   bgColor: PropTypes.string,
   lesson: PropTypes.object,
   textColor: PropTypes.string,
   navCards: PropTypes.array,
   commentCount: PropTypes.any,
   primaryTheme: PropTypes.string,
   commentStatus: PropTypes.number,
};

NavCardsTab.defaultProps = {
   title: 'Title',
   content: 'Content',
   img: '',
   active: 1,
   icon: 'Comment',
   changeTab: () => {},
   navCards: [],
   commentStatus: 1,
};

export default NavCardsTab;
