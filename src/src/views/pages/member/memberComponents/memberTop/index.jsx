import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import moment from 'moment';
import './index.scss';
import Tabs from 'components/elements/tabs';
import TabsVariants from 'utils/tabsVariant.json';
import SliceAndConnectText from 'utils/getSplitedText';
import { parseFloat } from 'utils/numberParseFloat';

const CurrentMemberTop = ({
   currentMember,
   selectedPage,
   setSelectedPage,
   status,
}) => {
   return (
      <div className='currentMember__wrapper'>
         <div className='currentMember__wrapper__background' />
         <div className='currentMember__wrapper__info'>
            <img className='currentMember__wrapper__info__image' src={ currentMember.picture_full_src } alt='' />
            <div className='currentMember__wrapper__info__text'>
               <div className='left'>
                  <Text
                     inner={ SliceAndConnectText(currentMember.name, 20) }
                     type={ txtTypes.medium }
                     size={ txtSizes.xxlarge }
                  />
                  <div className={ `currentMember__wrapper__info__status status__${ status }` }>
                     <Text
                        inner={ status === 'Active' ? 'Online' : 'Offline' }
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small14_500 }
                        style={ { color: status !== 'Active' ? '#444C4B' : '#24554E' } }
                     />
                  </div>
               </div>
               <div className='currentMember__items'>
                  <div className='currentMember__item'>
                     <Text inner='Member Since' type={ txtTypes.regularLarge } size={ txtSizes.small14 } />
                     <div className='text__wrapper'>
                        <Text inner={ currentMember.created_at ? moment(currentMember.created_at).format('MMMM DD, YYYY') : '' } type={ txtTypes.regularLarge } size={ txtSizes.large_new } />
                     </div>
                  </div>
                  <div className='currentMember__item'>
                     <Text inner='Last Transaction' type={ txtTypes.regularLarge } size={ txtSizes.small14 } />
                     <div className='text__wrapper'>
                        <Text
                           inner={ parseFloat(currentMember.last_transaction_price || 0) }
                           type={ txtTypes.regularLarge }
                           size={ txtSizes.large_new } />
                     </div>
                  </div>
                  <div className='currentMember__item'>
                     <Text inner='Revenue' type={ txtTypes.regularLarge } size={ txtSizes.small14 } />
                     <div className='text__wrapper'>
                        <Text
                           inner={ parseFloat(currentMember.total_revenue || 0) }
                           type={ txtTypes.regularLarge }
                           size={ txtSizes.large_new } />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className='currentMember__wrapper__info__tabs'>
            <Tabs
               variants={ TabsVariants }
               selectedVariant={ selectedPage }
               onSelect={ (value) => setSelectedPage(value) }
               isButton={ false }
            />
         </div>
      </div>
   );
};

CurrentMemberTop.propTypes = {
   currentMember: PropTypes.object,
   setSelectedPage: PropTypes.func,
   selectedPage: PropTypes.string,
   status: PropTypes.string,
};

export default CurrentMemberTop;
