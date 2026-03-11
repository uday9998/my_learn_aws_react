import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AdminContainer from 'views/layout/AdminContainer';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { useHistory } from 'react-router';
import { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import AffiliateInviteMember from 'views/pages/Affiliate/InviteMember';
import { connect } from 'react-redux';


function mapStateToProps(state) {
   return {
      userEmail: state.common.authUser.email,
   };
}

function mapDispatchToProps(dispatch) {
   return {
   };
}


const AffiliateInviteUsers = ({ userEmail }) => {
   const history = useHistory();
   const [inputs, setInputs] = useState({
      recipients: '',
      subject: '',
      text: '',
      from: userEmail,
   });
   const handleInputChange = (name, value) => {
      setInputs({
         ...inputs,
         [name]: value,
      });
   };
   return (
      <AdminContainer>
         <div className='affiliate__invite'>
            <HeaderTypeFirst
               buttonText='Preview Invitation Email'
               title='Invite Members'
               onSave={ () => alert('incoming') }
               goBack={ () => history.goBack() }
               buttonProps={ {
                  theme: btnThemes.secondary,
                  iconName: 'AffiliatePreviewM',
                  isIconLeft: false,
                  isIconRight: true,
               } }
            />
            <AdminContainer.Content>
               <AffiliateInviteMember
                  inputs={ inputs }
                  goBack={ () => history.goBack() }
                  onInvite={ () => alert('incoming') }
                  onChange={ handleInputChange }
               />
            </AdminContainer.Content>
         </div>
      </AdminContainer>
   );
};

AffiliateInviteUsers.propTypes = {
   userEmail: PropTypes.string,
};

export default connect(
   mapStateToProps, mapDispatchToProps
)(AffiliateInviteUsers);
