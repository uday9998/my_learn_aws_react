import React, { useContext, useState } from 'react';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import { MainAffiliateContext } from 'containers/pages/admin/affiliate/Main';
import IconButton, { THEMES as themes } from 'components/elements/buttons/IconButton';
import DropTriggle from 'components/elements/newDropTriggle';
import Button, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import PropTypes from 'prop-types';
import { copyToClipBoard } from 'utils/copy';
import SliceAndConnectText from 'utils/getSplitedText';
import DeleteModal from 'components/elements/DeleteModal';
import { connect } from 'react-redux';
import { appSelector } from 'state/modules/common/selectors';


const LinkCopyInput = ({ label, value }) => {
   return (
      <div className='link__input'>
         <Text
            inner={ label }
            type={ types.medium150 }
            size={ sizes.medium }
         />
         <div className='link__input__bottom'>
            <div className='link__input__bottom__block'>
               <Text
                  inner={ SliceAndConnectText(value, 40) }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
               <IconButton
                  name='AffiliateCopyM'
                  theme={ themes.inherit }
                  onClick={ () => copyToClipBoard(value) }
               />
            </div>
            <Button
               theme={ btnThemes.secondary }
               onClick={ () => window.open(value, '_blank') }
               text='Visit URL'
            />
         </div>
      </div>
   );
};

const AffiliateProgram = ({ app }) => {
   const {
      stats, goToSettingsPage, deleteAffiliateProgram, inviteUsers,
      goToEditPage, data,
   } = useContext(MainAffiliateContext);
   const url = `${ process.env.REACT_APP_PROTOCOL }${ app.subdomain }.${ process.env.REACT_APP_MAIN_DOMAIN }`;
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   const firstThreeOffers = data.overview.offers.slice(0, 3);
   return (
      <div className='affiliate__overview__program'>
         {isOpenDeleteModal && (
            <DeleteModal
               title='Are you sure you want to delete the Affiliate Program?'
               description='New users will not be able to become partners, and old partners will be informed of the termination of the affiliate program. They will be deleted after all payments are made.'
               deleteText='Delete Affiliate Program'
               maxWidth={ 414 }
               onCancel={ () => setIsOpenDeleteModal(false) }
               onDelete={ () => {
                  deleteAffiliateProgram();
                  setIsOpenDeleteModal(false);
               } }
            />
         )}
         <div className='affiliate__overview__program__top'>
            <Text
               inner='Affiliate Program'
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            <Text
               inner='Set up all the links that users will see in their affiliate accounts'
               type={ types.regular148 }
               size={ sizes.medium }
               style={ { color: '#444C4B' } }
            />
         </div>
         <div className='affiliate__overview__program__view'>
            <div className='affiliate__info'>
               <div className='affiliate__info__left'>
                  <div className='affiliate__info__left__images'>
                     {firstThreeOffers.map((e) => {
                        return (
                           <img src={ (e.plans && e.plans.file) ? e.plans.file.src : 'https://miestro-production.s3.us-west-2.amazonaws.com/landing/offer_default.png' } alt='' />
                        );
                     })}
                  </div>
                  <div className='affiliate__info__left__col'>
                     <Text
                        inner='Affiliate Program'
                        type={ types.regular148 }
                        size={ sizes.medium }
                     />
                     <div className='affiliate__info__left__data'>
                        <TextWithIcon
                           iconName='AffiliateOffersL'
                           inner={ `${ data.overview.offers.length } Offers` }
                           type={ types.regularDefault }
                           size={ sizes.small }
                           generalStyles={ { paddingRight: '8px', marginRight: '8px', borderRight: '1px solid #E7E9E9' } }
                        />
                        <TextWithIcon
                           iconName='AffiliateMoneyS'
                           inner={ `$${ stats.revenue } Total Revenue` }
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                     </div>
                  </div>
               </div>
               <div className='affiliate__info__actions'>
                  <IconButton
                     name='AffiliateEditM'
                     tooltip='Edit'
                     theme={ themes.light }
                     onClick={ () => goToEditPage() }
                  />
                  <IconButton
                     name='AffiliateEyeM'
                     tooltip='Preview'
                     onClick={ () => window.open('/affiliate', '_blank') }
                     theme={ themes.light }
                  />
                  <IconButton
                     name='AffiliateSettingsM'
                     tooltip='Settings'
                     onClick={ () => goToSettingsPage() }
                     theme={ themes.light }
                  />
                  <DropTriggle
                     isIconButton={ true }
                     options={ [
                        {
                           iconName: 'AffiliateDeleteM',
                           name: 'Delete the Affiliate Program',
                           onClick: () => setIsOpenDeleteModal(true),
                           textOptions: {
                              color: '#D12D36',
                           },
                        },
                     ] }
                  />
               </div>
            </div>
            <div className='affiliate__overview__program__bottom'>
               <LinkCopyInput
                  label='Sign In Link'
                  value={ `${ url || process.env.REACT_APP_API_LOCAL_ENDPOINT }/affiliate/login` }
               />
               <LinkCopyInput
                  label='Sign Up Link'
                  value={ `${ url || process.env.REACT_APP_API_LOCAL_ENDPOINT }/affiliate/register` }
               />
               {/* <Button
                  text='Invite via Email'
                  onClick={ () => inviteUsers() }
               /> */}
            </div>
         </div>
      </div>
   );
};
const mapStateToProps = (state) => {
   return {
      app: appSelector(state),
   };
};

AffiliateProgram.propTypes = {
   app: PropTypes.object,
};

LinkCopyInput.propTypes = {
   label: PropTypes.string,
   value: PropTypes.string,
};
export default connect(mapStateToProps)(AffiliateProgram);
