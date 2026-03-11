/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import './index.scss';

const Switch = ({
   name, checked, onChange, switchOnOff, label, disabled, space, goToSettings,
}) => {
   const [openTooltip, setOpenTooltip] = useState(false);
   return (
      <div className={ `switch_new switch_new_${ space }` }>
         {label && (
            <Text
               inner={ label }
               type={ (space === 'space' || space === 'boldText') ? txtTypes.mediumLarge : txtTypes.regularDefault }
               size={ space === 'boldText' ? txtSizes.medium : txtSizes.small }
               style={ space === 'space' ? { color: '#000' } : space === 'regularDisabled' ? { color: '#727978' } : {} }
            />
         )}
         <label className={ `${ 'switch switch__green' }  ${ disabled ? 'disabled-checker' : '' }` }>
            <input
               disabled={ disabled }
               type='checkbox'
               checked={ checked }
               onChange={ space === 'regularDisabled' ? () => setOpenTooltip(!openTooltip)
                  : (e) => onChange(name, e.target.checked) }
            />
            <span className={ `slider_${ space } slider round` } />
            {switchOnOff && <div className={ checked ? 'switchOnOff up' : 'switchOnOff dn' } data-content={ checked ? 'ON' : 'OFF' } />}
         </label>
         {openTooltip
         && (
            <div className='tooltip_grade'>
               <div className='tail'><IconNew name='TailS' /></div>
               <div className='tooltip__inner__wrapper'>
                  <div className='close' onClick={ () => setOpenTooltip(false) } role='presentation'><IconNew name='CircleS' /></div>
                  <div>
                     <Text
                        inner='If Passing Grade is enabled, all questions are required. If you want to make the questions optional, disable Passing Grade in'
                        type={ txtTypes.regular148 }
                        size={ txtSizes.small }
                     />
                     <div className='link__icon__wrapper'> 
                        <div className='link__icon__inner__wrapper' onClick={ goToSettings } role='presentation'>
                           <Text
                              inner=' Settings'
                              type={ txtTypes.regular148 }
                              size={ txtSizes.small }
                              style={ { color: '#24554E' } }
                           />
                           <div><IconNew name='ExternalLinkS' /></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            // <div className='tooltip_grade'>
            //    <div className='tail'><IconNew name='TailS' /></div>
            //    <div className='close' onClick={ () => setOpenTooltip(false) } role='presentation'><IconNew name='CircleS' /></div>
            //    <Text
            //       inner='If Passing Grade is enabled, all questions are required. If you want to make the questions optional, disable Passing Grade in'
            //       type={ txtTypes.regular148 }
            //       size={ txtSizes.small }
            //    />
            //    <div className='settings_link' onClick={ goToSettings } role='presentation'>
            //       <Text
            //          inner=' Settings'
            //          type={ txtTypes.regular148 }
            //          size={ txtSizes.small }
            //          style={ { color: '#24554E' } }
            //       />
            //       <div><IconNew name='ExternalLinkS' /></div>
            //    </div>

         // </div>
         )
         }
      </div>
   );
};

export default Switch;

Switch.propTypes = {
   name: PropTypes.string,
   checked: PropTypes.bool,
   onChange: PropTypes.func,
   switchOnOff: PropTypes.bool,
   disabled: PropTypes.bool,
   label: PropTypes.string,
   space: PropTypes.string,
   goToSettings: PropTypes.func,
};

Switch.defaultProps = {
   checked: false,
   label: '',
   disabled: false,
};
