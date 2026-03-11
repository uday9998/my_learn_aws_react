import PropTypes from 'prop-types';

import Text, { SIZES as sizes, TYPES as types } from 'components/elements/TextNew';
import BaseButton from 'components/elements/buttons/BaseButtonNew';

import successIcon from 'assets/images/pricing/success__icon.png';

import './index.scss';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const MessageModal = ({
   subtitleText,
   handleOkay,
   isLoading,
}) => {
   return (
      <div className='message__modal__wrapper'>
         <div className='inner__modal__wrapper'>
            {
               isLoading ? (
                  <div className='loader__wrapper'>
                     <LoaderSpinner width={ 132 } heigth={ 132 } />
                     <Text 
                        inner='Wait for it'
                        size={ sizes.large_new }
                     />
                     <Text 
                        inner='Payment Processing'
                        size={ sizes.xlarge }
                        type={ types.bold700 }
                     />
                  </div>
               ) : (
                  <>
                     <img src={ successIcon } alt='success' />
                     <div className='texts__wrapper'>
                        <Text 
                           inner='Your action has been applied successfully'
                           size={ sizes.xxlarge_new }
                           style={ {
                              color: '#131F1E',
                           } }
                        />
                        <Text 
                           inner={ subtitleText }
                           size={ sizes.size_14 }
                           type={ types.new__weight__second }
                           style={ {
                              color: '#727978',
                           } }
                        />
                     </div>
                     <BaseButton 
                        text='Okay'
                        style={ {
                           width: '135px',
                           height: '44px',
                           fontSize: '14px',
                        } }
                        onClick={ handleOkay }
                     />
                  </>
               )
            }
         </div>
      </div>
   );
};

MessageModal.propTypes = {
   subtitleText: PropTypes.string,
   handleOkay: PropTypes.func,
   isLoading: PropTypes.bool,
};

export default MessageModal;