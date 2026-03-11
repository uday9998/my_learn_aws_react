import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import CheckboxCircle from 'components/elements/CheckboxCircle';


const MemberEditorRolePopup = ({ role, setRole, title }) => {
   const roleTypes = [
      { title: 'Member', description: 'A member has access to classes and offers assigned to them.', roleId: 0 },
      { title: 'Administrator', description: 'An administrator has access to everything except the payment/financial connections.', roleId: 2 },
      { title: 'Assistant', description: 'An assistant only has access to delete and modify the contents on the website except the payment/financial connections.', roleId: 3 },
      { title: 'Support Specialist', description: 'Support has an access only to the members page.', roleId: 4 },

   ];

   return (
      <div className='member__more__role'>
         <Text
            inner={ title || 'Assign Role' }
            type={ txtTypes.medium }
            size={ txtSizes.xxlarge }
         />
         <div className='member__more__role__checkboxes'>
            {
               roleTypes.map(item => (
                  <CheckboxCircle
                     isChecked={ role === item.roleId }
                     label={ item.title }
                     description={ item.description }
                     onCheck={ () => setRole(item.roleId) }
                  />
               ))
            }
         </div>
      </div>
   );
};

MemberEditorRolePopup.propTypes = {
   role: PropTypes.any,
   setRole: PropTypes.func,
   title: PropTypes.string,
};

export default MemberEditorRolePopup;
