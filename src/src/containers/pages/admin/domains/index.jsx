import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { resetCommonDetails } from 'state/modules/common/actions';
// import DomainEdit from 'views/pages/Domains/edit';
import * as selectors from 'state/modules/sites/selectors';
import * as operations from 'state/modules/sites/operations';
import {
   setInputAction, setResetAction, chooseSiteAction,
} from 'state/modules/sites/actions';
import getDeff from 'utils/getDeff';
import SitesTable from 'components/modules/settings/Sites/SitesTable';
import SiteSettingsPopup from 'components/modules/settings/Sites/SitesPopup';
import InnerWrapper from 'components/elements/wrappers/InnerWrapper';
import Popup from 'components/modules/Popup';
import { portalId } from 'utils/constants';

class DomainsContainer extends Component {
   static propTypes = {
      getSitesInProgress: PropTypes.bool,
      sites: PropTypes.array,
      totalSites: PropTypes.number,
      getSites: PropTypes.func,
      addSite: PropTypes.func,
      setInput: PropTypes.func,
      currentSite: PropTypes.object,
      errors: PropTypes.object,
      setReset: PropTypes.func,
      deleteSite: PropTypes.func,
      updateSite: PropTypes.func,
      chooseSite: PropTypes.func,
      loginSite: PropTypes.func,
   };


   constructor(props) {
      super(props);
      this.state = {
         isModalOpen: false,
         isEditModalOpen: false,
      };
   }

   componentDidMount() {
      const { getSites } = this.props;
      getSites();
   }

   setIsModalOpen = (param) => {
      const { setReset } = this.props;
      this.setState({ isModalOpen: param });
      if (param === false) {
         setReset();
      }
   }

   setIsEditModalOpen = (param) => {
      const { setReset } = this.props;
      this.setState({ isEditModalOpen: param });
      if (param === false) {
         setReset();
      }
   }

   addSite = async () => {
      const { addSite, currentSite, setReset } = this.props;
      await addSite(currentSite);
      const { errors } = this.props;
      if (!errors.errors) {
         this.setState({ isModalOpen: false });
         setReset();
      }
   }

   updateSite = async () => {
      const {
         updateSite, currentSite, setReset, sites,
      } = this.props;
      const data = sites.find(site => site.uuid === currentSite.uuid);
      const changedFields = getDeff(data, currentSite);
      if (changedFields.name || changedFields.subdomain) {
         await updateSite(currentSite.uuid, changedFields);
      }
      const { errors } = this.props;
      if (!errors.errors) {
         this.setState({ isEditModalOpen: false });
         setReset();
      }
   }

   deleteSite = (id) => {
      const { deleteSite } = this.props;
      deleteSite(id);
   }

   handleSiteInputChange = (name, value) => {
      const { setInput } = this.props;
      setInput(name, value);
   }

   chooseSite = (id) => {
      const { chooseSite } = this.props;
      chooseSite(id);
      this.setState({ isEditModalOpen: true });
   }

   loginSite = async (id, subdomain) => {
      const { loginSite } = this.props;
      await loginSite(id, subdomain);
      // const { token } = this.props;
      // const hiddenElement = document.createElement('a');
      // hiddenElement.href = `${ process.env.REACT_APP_PROTOCOL }${ subdomain }?jwt-token=${ token }`;
      // hiddenElement.target = '_blank';
      // hiddenElement.click();
      // window.open(`${ process.env.REACT_APP_PROTOCOL }${ subdomain }.${ process.env.REACT_APP_MAIN_DOMAIN }?jwt-token=${ token }`, '_blank');
   }


   render() {
      const {
         getSitesInProgress, sites, totalSites, currentSite,
      } = this.props;
      const { isModalOpen, isEditModalOpen } = this.state;
      return (
         <InnerWrapper
            onClick={ () => {
               this.setIsModalOpen(true);
            } }
            title='Sites'
            isSitePage={ true }
            isLoading={ getSitesInProgress }
            sites={ sites }
         >
            <div className='site-table-wrapper'>
               <SitesTable
                  data={ sites }
                  onView={ this.loginSite }
                  onEdit={ this.chooseSite }
                  onDelete={ this.deleteSite }
               />
               {isEditModalOpen ? (
                  <Popup
                     isOpen={ isEditModalOpen }
                     onAcceptText='Update'
                     title='Update Site'
                     onAccept={ () => {
                        this.updateSite();
                     } }
                     onClose={ () => this.setIsEditModalOpen(false) }
                     cancelText='Cancel'
                  >
                     <SiteSettingsPopup
                        currentSite={ currentSite }
                        handleSiteInputChange={ this.handleSiteInputChange }
                     />
                  </Popup>
               ) : ''}
               {isModalOpen ? (
                  <Popup
                     isOpen={ isModalOpen }
                     onAcceptText='Add'
                     title='Add Site'
                     onAccept={ () => {
                        this.addSite();
                     } }
                     onClose={ () => this.setIsModalOpen(false) }
                     cancelText='Cancel'
                  >
                     <SiteSettingsPopup
                        currentSite={ currentSite }
                        handleSiteInputChange={ this.handleSiteInputChange }
                     />
                  </Popup>
               ) : ''}
            </div>
         </InnerWrapper>
         // <div className='domainsContainer'>
         //    <Container>
         //       {/* <MobileHeader>
         //       <SiteHeader
         //          isLeftAction
         //          goToBack={ () => {} }
         //       />
         //    </MobileHeader> */}
         //       <DomainsHeader setIsModalOpen={ this.setIsModalOpen } />
         //       <Domains
         //          isLoading={ getSitesInProgress }
         //          getSitesInProgress={ getSitesInProgress }
         //          sites={ sites }
         //          totalSites={ totalSites }
         //          deleteSite={ this.deleteSite }
         //          chooseSite={ this.chooseSite }
         //          loginSite={ this.loginSite }
         //       />
         //       {isEditModalOpen && (
         //          <SitesModalLoading
         //             isLoading={ getSitesInProgress }
         //             setIsModalOpen={ this.setIsEditModalOpen }
         //             addSite={ this.updateSite }
         //             handleSiteInputChange={ this.handleSiteInputChange }
         //             currentSite={ currentSite }
         //          />
         //       )}
         //       {isModalOpen && (
         //          <SitesModalLoading
         //             isLoading={ getSitesInProgress }
         //             setIsModalOpen={ this.setIsModalOpen }
         //             addSite={ this.addSite }
         //             handleSiteInputChange={ this.handleSiteInputChange }
         //             currentSite={ currentSite }
         //          />
         //       )}
         //    </Container>
         // </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      sites: selectors.sitesSelector(state),
      totalSites: selectors.totalSitesSelector(state),
      getSitesInProgress: selectors.getSitesInProgressSelector(state),
      currentSite: selectors.currentSiteSelector(state),
      errors: selectors.errorsSiteSelector(state),
      token: selectors.tokenSiteSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
      },
      goToBack: () => {
         dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
      },
      getSites: () => {
         dispatch(operations.getSitesOperation());
      },
      addSite: async (inputs) => {
         await dispatch(operations.addSiteOperation(inputs));
      },
      updateSite: async (id, inputs) => {
         await dispatch(operations.updateSiteOperation(id, inputs));
      },
      deleteSite: (id) => {
         dispatch(operations.deleteSiteOperation(id));
      },
      loginSite: async (id, subdomain) => {
         await dispatch(operations.loginSiteOperation(id, subdomain));
      },
      setInput: (key, value) => {
         dispatch(setInputAction(key, value));
      },
      setReset: () => {
         dispatch(setResetAction());
      },
      chooseSite: (id) => {
         dispatch(chooseSiteAction(id));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(DomainsContainer);
