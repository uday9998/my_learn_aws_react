import React from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';


const JoinComponentMenu = ({
   showEditableComponent, setOpenJoinButton, openJoinButton,
}) => {
   return (
      <div>
         <div
            className='item join-button'
            role='presentation'
            onClick={ async () => {
               await setOpenJoinButton(!openJoinButton);
               if (!openJoinButton && document.getElementsByClassName('editorContainer_schoolroom')[0].clientHeight - document.getElementsByClassName('join-button')[0].getBoundingClientRect().y < 100) {
                  document.getElementsByClassName('editorContainer_schoolroom')[0].scrollTop += 300;
               }
            } }
            style={ { background: openJoinButton ? '#E8F2F1' : 'inherit' } }
         >
            <Text
               inner='Join Button'
               type={ types.regular148 }
               size={ sizes.medium }
            />
            <div className='component_arrow' style={ { transform: `rotate(${ !openJoinButton ? '90' : '-90' }deg)` } }>
               <IconNew name='SchoolRoomComponentDown' />
            </div>
         </div>
         {openJoinButton
         && (
            <div>
               {showEditableComponent(
                  {},
                  'join',
                  4
               )}
            </div>
         )}
      </div>
   );
};

JoinComponentMenu.propTypes = {
   showEditableComponent: PropTypes.func,
   setOpenJoinButton: PropTypes.func,
   openJoinButton: PropTypes.bool,
};

export default JoinComponentMenu;
