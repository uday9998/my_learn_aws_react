import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconButton from 'components/elements/buttons/IconButton';
import { useHistory } from 'react-router';
import { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import Switch from 'components/elements/switchNew';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';

const AutomationHeader = ({
   changeStatus, templateName, status, handleNameInputChange,
}) => {
   const history = useHistory();
   const [isOpenInput, setIsOpenInput] = React.useState(false);
   const wrapperRef = React.useRef();
   return (
      <div className='automation__create__header'>
         <div className='automation__create__header__left'>
            <IconButton
               name='arrowLeftL'
               onClick={ () => history.push('/admin/automations') }
            />
            {isOpenInput ? (
               <ClickOutside onClick={ () => {
                  setIsOpenInput(false);
                  handleNameInputChange('save');
               } }
               >
                  <div>
                     <input
                        type='text'
                        ref={ wrapperRef }
                        className='automation__create__header__left__input'
                        value={ templateName }
                        onChange={ (e) => handleNameInputChange('name', e.target.value, 'automation') }
                     />
                  </div>
               </ClickOutside>

            ) : (
               <TextWithIcon
                  inner={ templateName }
                  iconName='AffiliateEditM'
                  isIconRight={ true }
                  generalStyles={ { cursor: 'pointer' } }
                  type={ types.regular160 }
                  onClick={ () => {
                     setIsOpenInput(true);
                     setTimeout(() => {
                        wrapperRef.current.focus();
                     }, 100);
                  } }
                  size={ sizes.xlarge }
                  style={ { textTransform: 'capitalize' } }
               />
            )}
         </div>
         <div className='automation__create__header__right'>
            <Switch
               positionText='left'
               label='Enable'
               value={ status }
               onChange={ (value) => changeStatus('status', value ? 1 : 0, 'automation') }
            />
         </div>
      </div>
   );
};

AutomationHeader.propTypes = {
   templateName: PropTypes.string,
   changeStatus: PropTypes.func,
   status: PropTypes.any,
   handleNameInputChange: PropTypes.func,
};

export default AutomationHeader;
