import React, { useState } from 'react';
import './index.scss';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import Router from 'routes/router';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

const Tooltip = ({
   hintText, isComment, style, left, hintStyle, hintCardClassName, isAutomation,
}) => {
   const [hint, setHint] = useState(false);
   const history = useHistory();
   const goToEmailSettings = () => {
      history.push(`${ Router.route('ADMIN_SETTINGS').getCompiledPath() }#emails`);
   };
   return (
      <div
         className='dynamicWrapper__tooltip'
         style={ style }
         onMouseEnter={ (e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            setHint(true);
         } }
         onMouseLeave={ (e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            setHint(false);
         } }
         role='presentation'
      >
         <Icon name='Hint' />
         {hint && (
            // eslint-disable-next-line no-nested-ternary
            <div className={ isComment ? 'hintCard__wrapper hintComment' : left ? 'hintCard__wrapper__left' : hintCardClassName ? 'hintCard__wrapper hintCard_media' : 'hintCard__wrapper' } style={ hintStyle }>
               <SelectedWrapper>
                  <div className='hintCard'>
                     {isAutomation
                        ? (
                           <div className='hintCard__emailsettings'>
                              <div>
                                 <Text
                                    type={ textType.regularDefault }
                                    size={ textSize.small }
                                    inner='To change the email of the sender to yours, please go to the '
                                 />
                              </div>
                              <div role='presentation' onClick={ () => goToEmailSettings() } className='hintCard__emailsettings__green'>
                                 <Text
                                    type={ textType.regularDefault }
                                    size={ textSize.small }
                                    inner='Email Settings'
                                    style={ { color: '#24554E' } }
                                 />
                              </div>
                              <div>
                                 <Text
                                    type={ textType.regularDefault }
                                    size={ textSize.small }
                                    inner='.'
                                 />
                              </div>
                           </div>
                        ) : (
                           <Text
                              type={ textType.normal }
                              size={ textSize.extraSmall }
                              inner={ hintText }
                           />
                        ) }
                  </div>
               </SelectedWrapper>
            </div>
         ) }
      </div>
   );
};

Tooltip.propTypes = {
   hintText: PropTypes.string,
   isComment: PropTypes.bool,
   style: PropTypes.object,
   left: PropTypes.bool,
   hintStyle: PropTypes.object,
   hintCardClassName: PropTypes.string,
   isAutomation: PropTypes.bool,
};

Tooltip.defaultProps = {
   hintText: 'Start typing text. Hit tab, comma, or return complete. Hit x to remove.',
   left: false,
   isAutomation: false,
};

export default Tooltip;
