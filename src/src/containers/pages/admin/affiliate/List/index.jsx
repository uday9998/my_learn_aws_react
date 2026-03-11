import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminContainer from 'views/layout/AdminContainer';
import AffiliateEmptyPage from 'views/pages/Affiliate/Empty';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import PropTypes from 'prop-types';
import AffiliateMain from 'containers/pages/admin/affiliate/Main';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import { screenWidthSelector } from 'state/modules/common/selectors';

function mapStateToProps(state) {
   return {
      screenWidth: screenWidthSelector(state),
   };
}

function mapDispatchToProps(dispatch) {
   return {
      goToCreate: () => {
         dispatch(push(Router.route('ADMIN_AFFILIATE_CREATE').getMask()));
      },
   };
}


class AffiliateList extends Component {
   render() {
      const { goToCreate, data, screenWidth } = this.props;
      return (
         <>
            <MobileHeader>
               <SiteHeaderMobile
                  isLeftAction
                  goToBack={ () => {} }
               />
            </MobileHeader>
            <AdminContainer>
               <AdminContainer.Content>
                  {data && data.length > 0 ? (
                     <AffiliateMain program={ data[0] } />
                  ) : (
                     <AffiliateEmptyPage
                        onCreate={ () => goToCreate() }
                        isMobile={ screenWidth < 1024 }
                     />
                  )}
               </AdminContainer.Content>
            </AdminContainer>
         </>
      );
   }
}

AffiliateList.propTypes = {
   goToCreate: PropTypes.func,
   data: PropTypes.array,
   screenWidth: PropTypes.number,
};

export default connect(
   mapStateToProps, mapDispatchToProps
)(AffiliateList);
