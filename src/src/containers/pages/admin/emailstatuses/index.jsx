/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'views/layout/AdminContainer';
import { connect } from 'react-redux';
import SiteHeader from 'views/layout/SiteHeader';
import EmailStatuses from 'views/pages/EmailStatuses';
// import * as selectors from 'state/modules/emailStatuses/selectors';
// import * as operations from 'state/modules/emailStatuses/operations';


class EmailStatusesContainer extends Component {
   static propTypes = {
      getEmailStatusesInProgress: PropTypes.bool,
      getEmailStatuses: PropTypes.func,
      emailStatuses: PropTypes.array,
      deleteEmailStatus: PropTypes.func,
      changeEmailStatusPage: PropTypes.func,
      emailStatusesTotal: PropTypes.number,
   };

   componentDidMount() {
      const { getEmailStatuses } = this.props;
      getEmailStatuses();
   }

   deleteEmailStatus = (id) => {
      const { deleteEmailStatus } = this.props;
      deleteEmailStatus(id);
   }

   onChangeEmailStatusPage = (data) => {
      const { changeEmailStatusPage } = this.props;
      changeEmailStatusPage({ page: data.currentPage, count: 20 });
   }

   render() {
      // const {
      //    emailStatuses, getEmailStatusesInProgress, emailStatusesTotal,
      // } = this.props;
      return (
         <Container>
            <Container.Header>
               <SiteHeader title='Email Status' hasArrow />
            </Container.Header>
            <Container.Content>
               {/* <EmailStatuses
                  emailStatuses={ emailStatuses }
                  deleteEmailStatus={ this.deleteEmailStatus }
                  getEmailStatusesInProgress={ getEmailStatusesInProgress }
                  onChangeEmailStatusPage={ this.onChangeEmailStatusPage }
                  emailStatusesTotal={ emailStatusesTotal }
               /> */}


            </Container.Content>
         </Container>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      // emailStatuses: selectors.emailStatusesSelector(state),
      // getEmailStatusesInProgress: selectors.getEmailStatusesInProgressSelector(state),
      // emailStatusesTotal: selectors.emailStatusesTotalSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      // getEmailStatuses: () => {
      //    dispatch(operations.getEmailStatusesOperation());
      // },
      // deleteEmailStatus: (id) => {
      //    dispatch(operations.deleteEmailStatusOperation(id));
      // },
      // changeEmailStatusPage: ({ ...params }) => {
      //    dispatch(operations.changeEmailStatusPageOperation(params));
      // },
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(EmailStatusesContainer);
