import React from 'react';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import teamImage from 'assets/images/homepage/bitmap.png';
import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import './index.scss';
import PropTypes from 'prop-types';
import { HasOpen as HasOpenHelpShelf } from 'utils/HelpShelfScript';

const DashboardSearchPopup = ({
   goToPages,
   onClose,
}) => {
   return (
      <div className='dashboard_search_popup'>

         <Text
            inner='What are you looking for?'
            color='rgba(63, 79, 101, 0.54)'
            className='text-ssSmall'
         />
         <div className='flex popup-content'>
            <Item
               title='Design Class:'
               items={ ['Courses', 'Emails', 'Email Notifications'] }
               goToPages={ goToPages }
            />
            <Item
               title='Members'
               items={ ['Member Detail'] }
               goToPages={ goToPages }
            />
            <Item
               title='Reports'
               items={ ['Transactions', 'Course Reports', 'Revenue Reports'] }
               goToPages={ goToPages }
            />
            <Item
               title='Promotions'
               items={ ['Gamification'] }
               goToPages={ goToPages }
            />
            <div className='flex flex-2 support'>
               <img src={ teamImage } alt='' className='teamImage' />
               <div className='flex flex-col support-content'>
                  <Text
                     inner='We’re here to help you with your own support team here at Miestro. Reach out to us when you need us'
                     color='rgba(63, 79, 101, 0.54)'
                     className='text-ssSmall'
                  />
                  <Text
                     inner='support@miestro.com'
                     type={ textType.bold }
                     size={ textSize.extraSmall }
                     className='text-top'
                  />
                  <BaseButton
                     size={ btnSize.large }
                     text='Go to Helpdesk'
                     type='submit'
                     onClick={ () => {
                        // HasOpenHelpShelf();
                        // onClose();
                        window.open('https://support.miestro.com/', '_blank');
                     } }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

const Item = ({ title, items, goToPages }) => {
   return (
      <div className='flex flex-col flex-1 item'>
         <Text
            type={ textType.bold }
            size={ textSize.extraSmall }
            inner={ title }
         />
         {
            items.map((item, index) => {
               return (
                  <div
                     role='presentation'
                     key={ index.toString() }
                     onClick={ () => goToPages(item) }
                  >
                     <Text
                        className='text-top cursor-pointer'
                        size={ textSize.extraSmall }
                        inner={ item }
                        color='rgba(63, 79, 101, 0.54)'
                     />
                  </div>
               );
            })
         }
      </div>
   );
};

Item.propTypes = {
   title: PropTypes.string,
   items: PropTypes.array,
   goToPages: PropTypes.func,
};
DashboardSearchPopup.propTypes = {
   onClose: PropTypes.func,
   goToPages: PropTypes.func,
};

Item.defaultProps = {
   items: [],
   goToPages: () => {},
};
DashboardSearchPopup.defaultProps = {
   onClose: () => {},
};


export default DashboardSearchPopup;
