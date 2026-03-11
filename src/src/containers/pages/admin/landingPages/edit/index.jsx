import React, { Component } from 'react';
// import LandingPages from 'views/pages/LandingPages';
// import * as operations from 'state/modules/landings/operations';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageBuilder from 'views/pages/LandingPages/PageBuilder';
import AdminContainer from 'views/layout/AdminContainer';

class LandingPagesEditContainer extends Component {
   static propTypes = {
      match: PropTypes.object,
      history: PropTypes.object,
   };

   componentDidMount() {
   }

   render() {
      const { match, history } = this.props;
      return (
         <AdminContainer>
            {/* <Container.Header>
               <SiteHeader
                  title={ (history.location.state && history.location.state.landingName) || 'Page Edit' }
                  titleSize='large'
                  hasArrow={ true }
                  goToBack={ () => history.push('/admin/landings') }
               />
               <SiteHeaderMobile
                  isLeftAction
               />
            </Container.Header> */}
            <PageBuilder
               url={ match.params.url }
            />
         </AdminContainer>
      );
   }
}


const mapStateToProps = () => {
   return {
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPagesEditContainer);
