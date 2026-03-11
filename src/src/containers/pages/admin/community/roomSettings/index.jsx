import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import * as operations from 'state/modules/community/operations';
import * as selectors from 'state/modules/community/selectors';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import RoomSettingsView from 'views/pages/community/RoomSettings';
import CommunitySideBar from 'components/modules/community/CommunitySideBar';
import {
   getCommunityCategories,
} from 'api';
import { useApiQuery } from 'utils/hooks/useQuery';

const RoomSettings = ({
   match, getCommunity, progress, community, updateRoomSettings, user,
}) => {
   const history = useHistory();
   const [settings, setSettings] = useState({
      access_type: '',
      description: '',
      name: '',
   });
   const [errorMessages, setErrorMessages] = useState({});

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: [],
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   const addErrorsFromQuery = ({ data: { errors = {} } }) => {
      addErrorMessages(errors);

      return true;
   };

   const {
      data: categories, loading,
   } = useApiQuery(getCommunityCategories);

   useEffect(() => {
      getCommunity(match.params.id, user ? user.id : null);
   }, []);

   useEffect(() => {
      if (community.id) {
         const room = community.rooms.filter((e) => e.id === Number.parseFloat(match.params.roomId))[0];
         if (room) {
            setSettings({
               access_type: room.access_type,
               name: room.name,
               description: room.description,
               allow_create: room.allow_create,
               type: room.type,
            });
         }
      }
   }, [community]);

   const handleInputChange = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      setSettings({
         ...settings,
         [name]: value,
      });
   };

   const handleSave = () => {
      updateRoomSettings(
         community.id,
         community.room_groups[0].id,
         match.params.roomId,
         settings,
         () => history.goBack(),
         addErrorsFromQuery
      );
   };
   return (
      <div className='community communityWithoutSidebar'>
         <HeaderTypeFirst
            title='Room Settings'
            goBack={ () => history.goBack() }
            onSave={ () => handleSave() }
         />
         {(progress || loading) ? (
            <LoaderSpinner />
         ) : (
            <div className='community__bottom community__bottom__withoutmenu'>
               <CommunitySideBar user={ user } />
               <div className='community__view'>
                  <RoomSettingsView
                     inputs={ settings }
                     handleInputChange={ handleInputChange } 
                     categories={ categories }
                     errorMessages={ errorMessages }
                  />
               </div>
            </div>
         )}
      </div>
   );
};


RoomSettings.propTypes = {
   match: PropTypes.object,
   getCommunity: PropTypes.func,
   progress: PropTypes.object,
   updateRoomSettings: PropTypes.func,
   community: PropTypes.object,
   user: PropTypes.object,
};

const mapStateToProps = (state) => {
   return {
      progress: selectors.communityProgressSelector(state),
      community: selectors.communitySelector(state),
      user: state.common.authUser,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getCommunity: (id, userId) => {
         dispatch(operations.getCommunityOperation(id, userId));
      },
      updateRoomSettings: (...params) => {
         dispatch(operations.updateRoomSettingsOperation(...params));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomSettings);
