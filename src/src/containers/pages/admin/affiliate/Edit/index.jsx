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
// import AffiliateLinks from 'views/pages/Affiliate/Links';
import AffiliatePromotional from 'views/pages/Affiliate/Promotional';
import AffiliateDocuments from 'views/pages/Affiliate/Documents';
import { isEqual } from 'lodash';
import getComissions from 'utils/getCommissions';
import { push } from 'connected-react-router';
import Router from 'routes/router';

class AffiliateCreate extends Component {
   state = {
      step: 1,
      selectedOffers: [],
      commissions: [],
   }

   static propTypes = {
      loading: PropTypes.bool,
      getOffers: PropTypes.func,
      offers: PropTypes.array,
      init: PropTypes.func,
      createLoading: PropTypes.bool,
      match: PropTypes.object,
      initLoading: PropTypes.bool,
      updateAffiliate: PropTypes.func,
      data: PropTypes.object,
      goTo: PropTypes.func,
   }

   componentDidMount() {
      const { getOffers, init, match } = this.props;
      init(match.params.id, data => {
         this.setState(data);
      });
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
                  isEdit={ true }
                  handleAddDocument={ (...args) => this.handleAddDocument(...args) }
                  handleAddLink={ (...args) => this.handleAddLink(...args) }
                  handleAddPromotion={ (...args) => this.handleAddPromotion(...args) }
                  onCreate={ () => this.handleUpdateAffiliate() }
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
      const { offers } = this.props;
      // const commissionsIds = commissions.map((e) => e.plan_id);
      const newCommissionsIds = selectedOffers.map((e) => e);
      // if (isEqual(newCommissionsIds, commissionsIds)) {
      //    this.setState({
      //       step: 2,
      //       commissions: commissions.map((e) => {
      //          return {
      //             ...e,
      //             ...offers.find(offer => offer.id === e.plan_id),
      //             promotions: e.promotions || e.program_promotional_documents,
      //             documents: e.documents || e.program_documents,
      //          };
      //       }),
      //    });
      // }
      this.setState({
         step: 2,
         commissions: getComissions(commissions, offers, newCommissionsIds),
      });
      // this.setState({
      //    step: 2,
      //    commissions: selectedOffers.map((e) => {
      //       const oldCommission = commissions.find((comm) => comm.id === e);
      //       if (oldCommission) {
      //          return oldCommission;
      //       }
      //       const data = offers.find((offer) => offer.id === e);
      //       return {
      //          ...data,
      //          plan_id: e,
      //          commission: 0,
      //          program_promotional_documents: [],
      //          links: [],
      //          program_documents: [],
      //       };
      //    }),
      // });
   }

   handleUpdateAffiliate() {
      const { commissions, step } = this.state;
      const {
         updateAffiliate, match, data: initialData, goTo,
      } = this.props;
      const commissionsIds = commissions.map((e) => e.plan_id);
      const initialCommissions = initialData.program_offers.map((e) => e.plan_id);
      const deletedIds = [];
      initialCommissions.forEach(e => {
         if (!commissionsIds.includes(e)) {
            deletedIds.push(e);
         }
      });
      goTo(Router.route('ADMIN_AFFILIATE').getMask());

      let finalCommissions = commissions;

      if (step === 1) {
         const { selectedOffers } = this.state;
         const { offers } = this.props;
         const newCommissionsIds = selectedOffers.map((e) => e);

         finalCommissions = getComissions(commissions, offers, newCommissionsIds);
      }

      const plansData = finalCommissions.map((e) => {
         return {
            commission: e.commission,
            program_documents: e.program_documents,
            program_promotional_documents: e.program_promotional_documents,
            your_income: e.your_income,
            id: e.plan_id,
            affiliate_programs_id: e.affiliate_programs_id,
            pricings: e.pricings,
            program_links: e.program_links,
         };
      });
      const data = {
         plans: plansData,
         deleting_offer_ids: deletedIds,
         reminder: 0,
         add_new_offers: 0,
      };
      updateAffiliate(match.params.id, data);
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

   render() {
      const { step } = this.state;
      const {
         loading, createLoading, initLoading,
      } = this.props;
      return (
         <ComponentProgress loading={ loading || initLoading }>
            <AdminContainer>
               <AffiliateHeader
                  step={ step }
                  isEdit={ true }
                  onSave={ () => this.handleUpdateAffiliate() }
                  setStep={ (i) => {
                     this.setState({ step: i });
                  } }
                  createLoading={ createLoading }
               />
               <div className='affiliate__create'>
                  <AdminContainer.Content>
                     {this.getStepView()}
                  </AdminContainer.Content>
               </div>
            </AdminContainer>
         </ComponentProgress>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      loading: selectors.affiliatesOffersLoadingSelector(state),
      offers: selectors.affiliatesOffersSelector(state),
      createLoading: selectors.affiliateCreateLoadingSelector(state),
      initLoading: selectors.affiliateEditLoaderSelector(state),
      data: selectors.affiliateInputsSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getOffers: () => dispatch(operations.getAffiliateOffersOperation()),
      goTo: (location) => {
         dispatch(push(location));
      },
      updateAffiliate: (id, data) => dispatch(operations.updateAffiliateOperation(id, data)),
      init: (id, setState) => dispatch(operations.getAffiliateInputsOperation(id, setState)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(AffiliateCreate);
