import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import NotificationsEidtView from 'views/pages/notificationEdit';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { notificationProgressSelector, notificationSelector, metaDataDefaultSelector } from 'state/modules/notification/selectors';
import { getKeyNotify } from 'utils/notificationHelpers';
import { NotificationInit, NotificationSaveOperation } from 'state/modules/notification/operations';

const NotificationEdit = ({
   goToBack, match, init, notify, isLoadingNotification, handleSaveNotification, metaDataDefault,
}) => {
   useEffect(() => {
      init(getKeyNotify(match.params.id));
   }, []);

   return (
      <NotificationsEidtView
         isLoadingNotification={ isLoadingNotification }
         goBack={ goToBack }
         data={ notify }
         onSave={ handleSaveNotification }
         metaDataDefault={ metaDataDefault }
      />
   );
};

NotificationEdit.propTypes = {
   goToBack: PropTypes.func,
   match: PropTypes.any,
   isLoadingNotification: PropTypes.func,
   init: PropTypes.func,
   notify: PropTypes.object,
   handleSaveNotification: PropTypes.func,
   metaDataDefault: PropTypes.object,
};

const mapStateToProps = (state) => {
   return {
      notify: notificationSelector(state),
      metaDataDefault: metaDataDefaultSelector(state),
      isLoadingNotification: notificationProgressSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goToBack: () => {
         dispatch(push('/admin/settings/#emails'));
      },
      init: (key) => {
         dispatch(NotificationInit(key));
      },
      handleSaveNotification: (data) => {
         dispatch(NotificationSaveOperation(data));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationEdit);
