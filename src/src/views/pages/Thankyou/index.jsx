import React from 'react';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import './index.scss';
import PropTypes from 'prop-types';
import { activeSchoolRoomColor } from 'utils/pageBuilder/schoolRoomColor';

const ThankYou = ({
   headerTxt, contentTxt, onBtnClick, siteInfo,
}) => {
   const schoolRoombgColor = siteInfo.landing_data[0].school_room_section.props.bgColor;
   const courseCategoryColor = siteInfo.landing_data[4].school_room_components[0].props.color;
   const textColor = activeSchoolRoomColor(siteInfo);
   const primaryFont = siteInfo.active_school_room.school_font;
   return (
      <div className='Thankyou-wraper' style={ { backgroundColor: schoolRoombgColor } }>
         <div className='ThankyouPopup'>
            <div className='flex justify-center' />
            <div className='flex justify-center'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.extraLarge }
                  inner={ headerTxt }
                  color={ courseCategoryColor }
                  style={ { fontFamily: primaryFont } }
               />
            </div>
            <div className='flex justify-center m-t-m'>
               <Text
                  size={ TextSize.medium }
                  type={ TextType.normal }
                  inner={ contentTxt }
                  color={ courseCategoryColor }
                  style={ { fontFamily: primaryFont } }
               />
            </div>
            <div className='btnWrapper'>
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSize.large }
                  text='Continue'
                  onClick={ () => { window.location.href = onBtnClick(); } }
                  style={ { fontFamily: primaryFont, backgroundColor: textColor } }
               />
            </div>
         </div>
      </div>

   );
};

ThankYou.propTypes = {
   headerTxt: PropTypes.string,
   contentTxt: PropTypes.string,
   onBtnClick: PropTypes.func,
   siteInfo: PropTypes.object,
};

export default ThankYou;
