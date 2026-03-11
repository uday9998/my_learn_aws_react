import React from 'react';
import './index.mob.scss';
import PropTypes from 'prop-types';
import NavItem from 'components/elements/designCourse/NavItem';
import { useTranslate } from 'react-polyglot';

const NavPanel = ({
   switchTab, activeTab, isShowAchievements, isShowResource, primaryTheme, commentStatus, defaulColor, textColor,
}) => {
   const t = useTranslate();
   return (
      <nav className='mob-nav-s'>
         <div className='mob-nav-s__items'>
            {/* <NavItem
               text={ t('about_course') }
               active={ activeTab === 'author' }
               tabId='author'
               switchTab={ switchTab }
               primaryTheme={ primaryTheme }
               color={ defaulColor }
               activeColor={ textColor }
            /> */}
            {commentStatus !== 0 && (
               <NavItem
                  text={ t('discussion') }
                  active={ activeTab === 'discussion' }
                  tabId='discussion'
                  switchTab={ switchTab }
                  primaryTheme={ primaryTheme }
                  color={ defaulColor }
                  activeColor={ textColor }
               />
            )}
            {
               isShowAchievements && (
                  <NavItem
                     text={ t('achievements') }
                     active={ activeTab === 'achievements' }
                     tabId='achievements'
                     switchTab={ switchTab }
                     primaryTheme={ primaryTheme }
                     color={ defaulColor }
                     activeColor={ textColor }
                  />
               )
            }
            {
               isShowResource && (
                  <NavItem
                     text={ t('resources') }
                     active={ activeTab === 'resources' }
                     tabId='resources'
                     switchTab={ switchTab }
                     primaryTheme={ primaryTheme }
                     color={ defaulColor }
                     activeColor={ textColor }
                  />
               )
            }
         </div>
      </nav>
   );
};
NavPanel.propTypes = {
   switchTab: PropTypes.func,
   activeTab: PropTypes.string,
   isShowAchievements: PropTypes.bool,
   isShowResource: PropTypes.bool,
   primaryTheme: PropTypes.string,
   commentStatus: PropTypes.number,
   defaulColor: PropTypes.string,
   textColor: PropTypes.string,
};

export default NavPanel;
