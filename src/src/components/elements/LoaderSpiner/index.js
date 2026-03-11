import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import './index.css';
import PropTypes from 'prop-types';
import gif from './memberLoader.svg';
import OldGif from './memberLoader.svg';


const LoaderSpinner = ({
   width, heigth, LoaderSpinnerStyle, background, isPlayList,
}) => {
   const siteInfo = useSelector(siteInfoSelector);
   const el = useRef();
   const isAdminPage = !!window.location.href.includes('admin');
   let loadingStyle = {};
   const communityPattern = /\/portal\/community\/\d+/;
   if (siteInfo && siteInfo.active_school_room && siteInfo.active_school_room.school_room_theme_name) {
      loadingStyle = {
         background: siteInfo.active_school_room.school_room_theme_name === 'template1' && !window.location.href.includes('admin') && !communityPattern.test(window.location.href) ? '#171C28' : '',
      };
   }
   return (
      <>
         {
            isPlayList ? <img src={ isAdminPage ? gif : OldGif } width={ isAdminPage ? width : 60 } height={ isAdminPage ? heigth : 60 } alt='loader' /> : (
               <div ref={ el } className='loading__SpinnerContainer' style={ { ...LoaderSpinnerStyle, ...loadingStyle, background: background || loadingStyle.background } }>
                  <img src={ isAdminPage ? gif : OldGif } width={ isAdminPage ? width : 60 } height={ isAdminPage ? heigth : 60 } alt='loader' />
               </div>
            )
         }
      </>
   );
};

LoaderSpinner.propTypes = {
   width: PropTypes.number,
   heigth: PropTypes.number,
   LoaderSpinnerStyle: PropTypes.object,
   background: PropTypes.string,
   isPlayList: PropTypes.bool,
};

LoaderSpinner.defaultProps = {
   width: 60,
   heigth: 60,
};

export default LoaderSpinner;
