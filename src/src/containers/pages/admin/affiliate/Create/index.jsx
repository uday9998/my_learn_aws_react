import AffiliateHeader from 'components/elements/HeaderTypes/AffiliateHeader';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminContainer from 'views/layout/AdminContainer';
import 'views/pages/Affiliate/index.scss';
import AffiliateOfferPage from 'views/pages/Affiliate/Offers';
import AffiliateStartPage from 'views/pages/Affiliate/Start';
import * as operations from 'state/modules/affiliate/operations';
import * as selectors from 'state/modules/affiliate/selectors';
import ComponentProgress from 'components/modules/ComponentProgress';
import PropTypes from 'prop-types';
import AffiliateCommissions from 'views/pages/Affiliate/Commissions';
import { isEqual } from 'lodash';
// import AffiliateLinks from 'views/pages/Affiliate/Links';
import AffiliatePromotional from 'views/pages/Affiliate/Promotional';
import AffiliateDocuments from 'views/pages/Affiliate/Documents';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';

class AffiliateCreate extends Component {
   state = {
      step: 0,
      selectedOffers: [],
      commissions: [],
   }

   static propTypes = {
      loading: PropTypes.bool,
      getOffers: PropTypes.func,
      offers: PropTypes.array,
      createAffiliate: PropTypes.func,
      createLoading: PropTypes.bool,
   }

   componentDidMount() {
      const { getOffers } = this.props;
      if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
         window.onbeforeunload = function () {
            return 'Dude, are you sure you want to refresh? Think of the kittens!';
         };
      }
      getOffers();
   }


   getStepView() {
      const { step, selectedOffers, commissions } = this.state;
      const { offers, createLoading } = this.props;
      switch (step) {
         case 0:
            return (
               <AffiliateStartPage
                  onNextStep={ () => this.setState({ step: 1 }) }
               />

            );
         case 1:
            return (
               <AffiliateOfferPage
                  offers={ offers }
                  onSelectAllOffers={ () => this.handleSelectAllOffers() }
                  selectedOffers={ selectedOffers }
                  onSelectOffer={ (id) => this.handleSelectOffer(id) }
                  onNextStep={ () => {
                     this.handleNextStep2();
                  } }
               />
            );
         case 2:
            return (
               <AffiliateCommissions
                  onPrevPage={ () => this.setState({ step: 1 }) }
                  onNextPage={ () => this.setState({ step: 3 }) }
                  commissions={ commissions }
                  handleChangeCommission={ (index, value) => this.handleChangeCommission(index, value) }
               />
            );
         case 3:
            return (
               <AffiliatePromotional
                  offers={ commissions }
                  onDelete={ (...args) => this.handleDeleteItem(...args) }
                  onPrevPage={ () => this.setState({ step: 2 }) }
                  handleAddLink={ (...args) => this.handleAddLink(...args) }
                  handleAddPromotion={ (...args) => this.handleAddPromotion(...args) }
                  onNextPage={ () => this.setState({ step: 4 }) }
               />
            );
         case 4:
            return (
               <AffiliateDocuments
                  offers={ commissions }
                  onDelete={ (...args) => this.handleDeleteItem(...args) }
                  onPrevPage={ () => this.setState({ step: 3 }) }
                  createLoading={ createLoading }
                  handleAddDocument={ (...args) => this.handleAddDocument(...args) }
                  handleAddLink={ (...args) => this.handleAddLink(...args) }
                  handleAddPromotion={ (...args) => this.handleAddPromotion(...args) }
                  onCreate={ () => this.handleCreateAffiliat() }
               />
            );
         default:
            return (
               <AffiliateStartPage
                  onNextStep={ () => this.setState({ step: 1 }) }
               />
            );
      }
   }


   handleNextStep2() {
      const { commissions, selectedOffers } = this.state;
      const newCommissionsIds = selectedOffers.map((e) => e);
      const { offers } = this.props;
      const commissionsIds = commissions.map((e) => e.id);
      if (isEqual(newCommissionsIds, commissionsIds)) {
         this.setState({
            step: 2,
         });
         return;
      }
      this.setState({
         step: 2,
         commissions: selectedOffers.map((e) => {
            const oldCommission = commissions.find((comm) => comm.id === e);
            if (oldCommission) {
               return oldCommission;
            }
            const data = offers.find((offer) => offer.id === e);
            return {
               ...data,
               plan_id: e,
               plan: data,
               commission: 0,
               program_promotional_documents: [],
               links: [],
               program_documents: [],
            };
         }),
      });
   }

   handleCreateAffiliat() {
      const { commissions } = this.state;
      const { createAffiliate } = this.props;
      const data = {
         plans: commissions,
         reminder: 0,
         add_new_offers: 0,
      };
      createAffiliate(data);
   }

   handleChangeCommission(index, newValue) {
      const { commissions } = this.state;
      this.setState({
         commissions: commissions.map((e, i) => {
            if (i === index) {
               return {
                  ...e,
                  commission: newValue,
               };
            }
            return e;
         }),
      });
   }

   handleDeleteItem(type, index, offerId) {
      const { commissions } = this.state;
      const newCommissions = commissions.map((e) => {
         if (e.id === offerId) {
            switch (type) {
               case 'url':
                  return {
                     ...e,
                     links: e.links.filter((item, i) => i !== index),
                  };
               case 'image':
                  return {
                     ...e,
                     program_promotional_documents: e.program_promotional_documents.filter((item, i) => i !== index),
                  };
               default:
                  return {
                     ...e,
                     program_documents: e.program_documents.filter((item, i) => i !== index),
                  };
            }
         }
         return e;
      });
      this.setState({
         commissions: newCommissions,
      });
   }

   handleAddPromotion(offerId, file) {
      const { commissions } = this.state;
      const newOffers = commissions.map((e) => {
         if (e.id === offerId) {
            return {
               ...e,
               program_promotional_documents: [
                  ...e.program_promotional_documents,
                  file,
               ],
            };
         }
         return e;
      });
      this.setState({
         commissions: newOffers,
      });
   }


   handleAddDocument(offerId, file) {
      const { commissions } = this.state;
      const newOffers = commissions.map((e) => {
         if (e.id === offerId) {
            return {
               ...e,
               program_documents: [
                  ...e.program_documents,
                  file,
               ],
            };
         }
         return e;
      });
      this.setState({
         commissions: newOffers,
      });
   }

   handleAddLink(offerId, url) {
      const { commissions } = this.state;
      const newOffers = commissions.map((e) => {
         if (e.id === offerId) {
            return {
               ...e,
               links: [...e.links, url],
            };
         }
         return e;
      });
      this.setState({
         commissions: newOffers,
      });
   }

   handleSelectAllOffers() {
      const { selectedOffers } = this.state;
      const { offers } = this.props;
      if (selectedOffers.length === offers.length) {
         this.setState({
            selectedOffers: [],
         });
         return;
      }
      this.setState({
         selectedOffers: offers.map((e) => e.id),
      });
   }

   handleSelectOffer(id) {
      const { selectedOffers } = this.state;
      if (selectedOffers.includes(id)) {
         this.setState({
            selectedOffers: selectedOffers.filter((e) => e !== id),
         });
         return;
      }
      this.setState({
         selectedOffers: [...selectedOffers, id],
      });
   }

   handleResetAllChanges() {
      this.setState({ selectedOffers: [], commissions: [], step: 1 });
   }

   render() {
      const { step } = this.state;
      const { loading, createLoading } = this.props;
      return (
         <>
            <MobileHeader>
               <SiteHeaderMobile
                  isLeftAction
                  goToBack={ () => {} }
               />
            </MobileHeader>
            <ComponentProgress loading={ loading }>
               <AdminContainer>
                  <AffiliateHeader
                     step={ step }
                     handleClear={ () => this.handleResetAllChanges() }
                     onSave={ () => this.handleCreateAffiliat() }
                     setStep={ (i) => this.setState({ step: i }) }
                     createLoading={ createLoading }
                  />
                  <div className='affiliate__create'>
                     <AdminContainer.Content>
                        {this.getStepView()}
                     </AdminContainer.Content>
                  </div>
               </AdminContainer>
            </ComponentProgress>
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      loading: selectors.affiliatesOffersLoadingSelector(state),
      offers: selectors.affiliatesOffersSelector(state),
      createLoading: selectors.affiliateCreateLoadingSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getOffers: () => dispatch(operations.getAffiliateOffersOperation()),
      createAffiliate: (data) => dispatch(operations.createAffiliateOperation(data)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(AffiliateCreate);
