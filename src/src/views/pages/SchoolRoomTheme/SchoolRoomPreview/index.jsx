import React from 'react';
import PropTypes from 'prop-types';
import Offers from 'containers/pages/mixed/offers';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import {
   sectionTemplate1, sectionTemplate2, sectionTemplate3,
} from './coursesDefault';


const SchoolRoomPreview = ({
   landingType,
}) => {
   const siteInfo = useSelector(siteInfoSelector);
   let currentSection = [];
   switch (landingType) {
      case 'template1': currentSection = sectionTemplate1;
         break;
      case 'template2': currentSection = sectionTemplate2;
         break;
      case 'template3': currentSection = sectionTemplate3;
         break;
      default:
   }
   return (
      <Offers
         sections={ siteInfo.active_school_room.school_room_theme_name === landingType 
            ? siteInfo.landing_data
            : currentSection 
         }
         isPreview={ false }
         isEditor={ false }
         previewMode={ true }
      />
   );
};

SchoolRoomPreview.propTypes = {
   landingType: PropTypes.string,
};

export default SchoolRoomPreview;
