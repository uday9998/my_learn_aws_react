import React from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import PropTypes from 'prop-types';

const SchoolRoomSettingsSection = ({ sectionTitle, sectionDescription, children }) => {
   return (
      <div className='schoolRoomSettingsSection'>
         <div className='schoolRoomSettingsSection__left'>
            <Text
               inner={ sectionTitle }
               type={ types.medium153 }
               size={ sizes.large }
            />
            <Text
               inner={ sectionDescription }
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#444C4B' } }
            />
         </div>
         <div className='schoolRoomSettingsSection__content'>
            {children}
         </div>
      </div>
   );
};

SchoolRoomSettingsSection.propTypes = {
   sectionTitle: PropTypes.string,
   sectionDescription: PropTypes.string,
   children: PropTypes.any,
};

export default SchoolRoomSettingsSection;
