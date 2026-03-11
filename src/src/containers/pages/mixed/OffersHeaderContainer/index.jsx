import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from 'state/modules/mainhub/selectors';
import OffersHeader from 'views/pages/Offers/components/OffersHeader';
import { OfferContext } from '../offers';


const OffersContainer = ({
   isEditor, site, user, sections, settings,
   showEditableComponent, deleteComponent, handleDeleteComponent, handleDuplicateComponent,
   changeProp, templateSettings, isPreview,
}) => {
   const onClickElement = (e) => {
      if (isEditor) {
         showEditableComponent(e);
      }
   };
   const template = isEditor ? sections : site.landing_data;
   const schoolRoomSettings = isEditor || isPreview ? settings : templateSettings || site.active_school_room;

   return (
      <OfferContext.Provider value={ {
         site,
         user,
         template,
         schoolRoomSettings,
         isEditor,
         onClickElement,
         handleDuplicateComponent,
         handleDeleteComponent,
         changeProp,
         deleteComponent,
         uuid: site.site_uuid,
         isPreview,
      } }
      >
         <OffersHeader isHiddenBanner={ true } />
      </OfferContext.Provider>
   );
};

OffersContainer.propTypes = {
   site: PropTypes.object,
   user: PropTypes.object,
   sections: PropTypes.array,
   isEditor: PropTypes.bool,
   deleteComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   settings: PropTypes.object,
   showEditableComponent: PropTypes.func,
   handleDuplicateComponent: PropTypes.func,
   changeProp: PropTypes.func,
   templateSettings: PropTypes.object,
   isPreview: PropTypes.bool,
};

const mapStateToProps = (state) => {
   return {
      site: state.common.siteInfo,
      auth: state.common.authUser,
      user: state.common.authUser,
      frontScripts: selectors.frontScriptsSelector(state),
   };
};


const mapDispatchToProps = () => {
   return {

   };
};


export default connect(mapStateToProps, mapDispatchToProps)(OffersContainer);
