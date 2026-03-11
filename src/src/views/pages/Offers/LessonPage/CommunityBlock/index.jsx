import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { OfferContext } from 'containers/pages/mixed/offers';
import OfferEditorButton from '../../components/Editor/Button';
import './index.scss';

const CommunityRightBlock = ({ 
   communityName, 
   goToCommunity,
   templateCardBackground, 
}) => {
   const { template, user } = React.useContext(OfferContext);
   const content = template[5];
   const item = content.school_room_components[0];
   const offerSecondaryButton = item.subcomponent[3] ? item.subcomponent[3].props : {};
   return (
      <div 
         className='community__block'
         style={ {
            background: templateCardBackground,
         } }
      >
         <Text
            inner='Community'
            type={ types.medium153 }
            size={ sizes.large }
            style={ { 
               width: '100%',
               color: 'var(--textColor)', 
            } }
         />
         <Text
            inner={ `Please join the ${ communityName } Community where you can share and get feedback on your work from our coaches - more instructions on how to sign up here.` }
            type={ types.regularDefault }
            size={ sizes.small }
            style={ { 
               marginBottom: '12px',
               color: 'var(--textColor)', 
            } }
         />
         {user && (
            <OfferEditorButton
               bgColor='transparent'
               borderColor='var(--secondaryTextColor)'
               textColor='var(--secondaryTextColor)'
               fontSize={ offerSecondaryButton.fontSize }
               onClick={ () => goToCommunity() }
            >
               Go to Community
            </OfferEditorButton>
         )}
      </div>
   );
};

CommunityRightBlock.propTypes = {
   communityName: PropTypes.string,
   goToCommunity: PropTypes.func,
   templateCardBackground: PropTypes.string,
};

export default CommunityRightBlock;
