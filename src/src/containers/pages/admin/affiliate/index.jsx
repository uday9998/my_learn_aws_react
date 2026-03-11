import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as operations from 'state/modules/affiliate/operations';
import * as selectors from 'state/modules/affiliate/selectors';
import PropTypes from 'prop-types';
import ComponentProgress from 'components/modules/ComponentProgress';
import AffiliateList from './List';

function mapStateToProps(state) {
   return {
      loading: selectors.affiliatesLoadingSelector(state),
      data: selectors.dataSelector(state),
   };
}

function mapDispatchToProps(dispatch) {
   return {
      getAffiliates: () => dispatch(operations.getAffiliateOperation()),
   };
}

class Affiliate extends Component {
   componentDidMount() {
      const { getAffiliates } = this.props;
      getAffiliates();
   }

   render() {
      const { loading, data } = this.props;
      return (
         <ComponentProgress
            loading={ loading }
         >
            <AffiliateList data={ data } />
         </ComponentProgress>
      );
   }
}

Affiliate.propTypes = {
   getAffiliates: PropTypes.func,
   loading: PropTypes.bool,
   data: PropTypes.object,
};

export default connect(
   mapStateToProps, mapDispatchToProps
)(Affiliate);
