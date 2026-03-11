import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Icon from 'components/elements/Icon';
import { reactivateSub } from 'api/AuthApi';
import { toast } from 'react-toastify';
import * as operations from 'state/modules/OldPlans/operations';
import { connect } from 'react-redux';
import isPrint from 'state/modules/designCourse/edit/Error';


const ConnectCardModalContent = ({
   changeModal, setPlansModalOpen, handleChangePlan, showChangePlan, subscription, getPlans, plansModalStateInProgress,
}) => {
   const reactivateSubscribtion = async ($id) => {
      try {
         const { status } = await reactivateSub($id);
         if (status === 204) {
            getPlans();
            setPlansModalOpen(false);
            if (isPrint('Your account has been reactivated')) {
               toast.success('Your account has been reactivated');
            }
         } else if (isPrint('There was an issue reactivating you account, please contact support.')) {
            toast.error('There was an issue reactivating you account, please contact support.');
         }
      } catch (error) {
         if (error && error.response && error.response.data && error.response.data.message) {
            if (isPrint(error.response.data.message)) {
               toast.error(error.response.data.message);
            }
         } else if (isPrint('There was an issue reactivating you account, please contact support.')) {
            toast.error('There was an issue reactivating you account, please contact support.');
         }
      }
   };

   return (
      <div className='createDomain'>
         <div
            className='createDomain__close'
            role='presentation'
            onClick={ plansModalStateInProgress ? () => {} : () => setPlansModalOpen(false) }

         >
            <Icon name='CloseX' />
         </div>
         <div className='createDomain__body'>
            { subscription && subscription.status === 0
               ? (
                  <>
                     <div className='createDomain__header'>
                        <Text
                           type={ TextType.large }
                           size={ TextSize.large }
                           inner='Reactivate Subscription'
                        />
                     </div>
                     <div className='plans__btns'>
                        <div>
                           <BaseButton
                              theme={ btnTheme.grey }
                              size={ btnSize.large }
                              text='Cancel'
                              onClick={ () => setPlansModalOpen(false) }
                           />
                        </div>
                        <div>
                           <BaseButton
                              size={ btnSize.large }
                              text='Reactivate'
                              onClick={ () => reactivateSubscribtion(subscription.id) }
                           />
                        </div>
                     </div>
                  </>
               ) : (
                  <>
                     <div className='createDomain__header'>
                        <Text
                           type={ TextType.large }
                           size={ TextSize.large }
                           inner='Change Plan or Update Card'
                        />
                     </div>
                     <div className='plans__btns'>
                        <div>
                           <BaseButton
                              theme={ btnTheme.grey }
                              size={ btnSize.large }
                              text='Cancel'
                              onClick={ () => setPlansModalOpen(false) }
                              disabled={ plansModalStateInProgress }
                           />
                        </div>
                        {showChangePlan && (
                           <div>
                              <BaseButton
                                 theme={ btnTheme.lightGreen }
                                 size={ btnSize.large }
                                 text='Change Plan'
                                 onClick={ handleChangePlan }
                                 disabled={ plansModalStateInProgress }
                              />
                           </div>
                        )}
                        <div>
                           <BaseButton
                              size={ btnSize.large }
                              text='Update Card'
                              onClick={ () => changeModal() }
                              disabled={ plansModalStateInProgress }
                           />
                        </div>
                     </div>
                  </>
               )
            }
         </div>
      </div>
   );
};


ConnectCardModalContent.propTypes = {
   changeModal: PropTypes.func,
   setPlansModalOpen: PropTypes.func,
   showChangePlan: PropTypes.func,
   handleChangePlan: PropTypes.func,
   getPlans: PropTypes.func,
   subscription: PropTypes.object,
   plansModalStateInProgress: PropTypes.bool,

};

const mapStateToProps = () => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {
      getPlans: () => dispatch(operations.getPlansOperation()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectCardModalContent);
