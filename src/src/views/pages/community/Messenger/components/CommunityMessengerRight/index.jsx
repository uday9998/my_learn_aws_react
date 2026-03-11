import React from 'react';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import MessengerRightTop from './components/MessengerRightTop';
import MessengerRightForm from './components/MessengerRightForm';
import MessengerRightContent from './components/MessengerRightContent';

const CommunityMessengerRight = () => {
   const [isBottomScrolled, setIsBottomScrolled] = React.useState();

   const handleScroll = (e) => {
      const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 300;
      setIsBottomScrolled(bottom);
   };

   const scrollBottom = () => {
      const element = document.querySelector('.messenger__content');
      element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
   };
   return (
      <div className='messenger__right'>
         <MessengerRightTop />
         <MessengerRightContent handleScroll={ handleScroll } />
         <MessengerRightForm />
         {/* {!isBottomScrolled && (
            <div className='messenger__right__scroll__bottom' role='presentation' onClick={ scrollBottom }>
               <IconNew name='UpsellSelectArrowM' />
            </div>
         )} */}
      </div>
   );
};

CommunityMessengerRight.propTypes = {

};

export default CommunityMessengerRight;
