import React, { useContext } from 'react';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { AffiliateUserContext } from 'containers/pages/admin/affiliate/User';
import moment from 'moment';
import SimpleStatus from 'components/elements/SimpleStatus';
import './index.scss';
import SliceAndConnectText from 'utils/getSplitedText';
import IconButton from 'components/elements/buttons/IconButton';
import { copyToClipBoard } from 'utils/copy';

const AffiliateUserTop = () => {
   const { user: data } = useContext(AffiliateUserContext);
   const user = data.aff_user;
 
   return (
      <div className='currentMember__wrapper'>
         <div className='currentMember__wrapper__background' />
         <div className='currentMember__wrapper__info'>
            <img className='currentMember__wrapper__info__image' src={ user.picture_src } alt='' />
            <div className='currentMember__wrapper__info__text'>
               <div className='left'>
                  <div className='left__top'>
                     <Text
                        inner={ SliceAndConnectText(user.name, 20) }
                        type={ txtTypes.medium }
                        size={ txtSizes.xxlarge }
                     />
                     {/* <IconButton
                        name='AffiliateEditM'
                        onClick={ () => setIsEditing(true) }
                     /> */}
                  </div>
                  <SimpleStatus
                     color='green'
                     text='Affiliate'
                  />
               </div>
               <div className='currentMember__items'>
                  <div className='currentMember__item'>
                     <Text
                        style={ { color: '#727978' } }
                        inner='Join Date'
                        type={ txtTypes.regularLarge }
                        size={ txtSizes.xsmall }
                     />
                     <Text inner={ user.created_at ? moment(user.created_at).format('MMMM YYYY') : '' } type={ txtTypes.regularLarge } size={ txtSizes.large } />
                  </div>
                  <div className='currentMember__item'>
                     <Text
                        style={ { color: '#727978' } }
                        inner='Email'
                        type={ txtTypes.regularLarge }
                        size={ txtSizes.xsmall }
                     />
                     <div className='currentMember__item__bottom'>
                        <Text
                           inner={ SliceAndConnectText(user.email, 15) }
                           type={ txtTypes.regularLarge }
                           size={ txtSizes.large }
                        />
                        <IconButton
                           name='AffiliateCopyM'
                           onClick={ () => copyToClipBoard(user.email) }
                        />
                        {/* <IconButton
                           name='AffiliateEditM'
                           onClick={ () => setIsEditing(true) }
                        /> */}
                     </div>
                  </div>
                  <div className='currentMember__item'>
                     <Text
                        style={ { color: '#727978' } }
                        inner='Paypal Email'
                        type={ txtTypes.regularLarge }
                        size={ txtSizes.xsmall }
                     />
                     <div className='currentMember__item__bottom'>
                        <Text
                           inner={ SliceAndConnectText(user.paypal_email, 15) }
                           type={ txtTypes.regularLarge }
                           size={ txtSizes.large }
                        />
                        {/* <IconButton
                           name='AffiliateCopyM'
                           onClick={ () => copyToClipBoard(user.paypal_email) }
                        /> */}
                        {/* <IconButton
                           name='AffiliateEditM'
                           onClick={ () => setIsEditing(true) }
                        /> */}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

AffiliateUserTop.propTypes = {

};

export default AffiliateUserTop;
