import React from 'react';
import PropTypes from 'prop-types';
import { FormsWrapper } from 'utils/hooks/useForms';
import InnerWrapper from 'components/elements/wrappers/InnerWrapper';
import { generalSettings } from 'utils/tabs';
import './style.scss';

const SettingsList = ({
   onChange, state, onCancel, onSaveSuccess, onOpen, children, initial,
   onSave, selectedPage, setSelectedPage,
}) => {
   return (
      <div className='settingsList'>
         <FormsWrapper stateReady={ state.stateReady }>
            {React.Children.map(children, child => (
               <div className='settingsList__item'>
                  <InnerWrapper
                     isOpen={ initial === child.props.id }
                     title={ child.props.title }
                     selectedPage={ selectedPage }
                     setSelectedPage={ setSelectedPage }
                     hasTabs={ true }
                     tabName={ generalSettings }
                     onStateChange={ isOpen => {
                        if (isOpen) {
                           onOpen(child.props.id);
                        }
                     } }
                  >
                     <div className='w-full'>
                        { React.cloneElement(child, {
                           onChange: (key, value) => onChange(child.props.id, key, value),
                           onCancel: () => onCancel(child.props.id),
                           onSaveSuccess: () => onSaveSuccess(child.props.id),
                           form: state[child.props.id],
                           onSave: (...args) => onSave(child.props.id, ...args),
                           ...child.props,
                        })}
                     </div>
                  </InnerWrapper>

               </div>
            ))}
         </FormsWrapper>
      </div>
   );
};

SettingsList.propTypes = {
   state: PropTypes.object,
   onSaveSuccess: PropTypes.func,
   onOpen: PropTypes.func,
   onCancel: PropTypes.func,
   onSave: PropTypes.func,
   onChange: PropTypes.func,
   children: PropTypes.node,
   initial: PropTypes.string,
   selectedPage: PropTypes.string,
   setSelectedPage: PropTypes.func,

};

export default SettingsList;
