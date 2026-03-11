/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import * as selectors from 'state/modules/automation/selectors';
import * as operations from 'state/modules/automation/operations';
import AdminContainer from 'views/layout/AdminContainer';
import CourseCreateHeader from 'views/pages/DesignCourse/CourseCreate/CourseCreateHeader';
import AutomationCreatePageView from 'views/pages/Automations/AutomationCreatePage';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';

class AutomationCreatePage extends Component {
   static propTypes = {
      goTo: PropTypes.func,
      createAutomation: PropTypes.func,
      getAutomations: PropTypes.func,
      automations: PropTypes.array,
      getAutomationsInProgress: PropTypes.bool,
      deleteAutomation: PropTypes.func,
      updateAutomation: PropTypes.func,
      initialAutomationsLength: PropTypes.number,
   };

   constructor() {
      super();
      this.state = {
         searchValue: '',
      };
   }

   componentDidMount() {
      const { getAutomations } = this.props;
      getAutomations({}, true);
   }

   handleDeleteAutomation = (id) => {
      const { deleteAutomation } = this.props;
      deleteAutomation(id);
   }

   handleStatusChange = (id, value) => {
      const { updateAutomation } = this.props;
      updateAutomation(id, { status: value });
   }

   changeSearchValue=(value) => {
      const { getAutomations } = this.props;
      this.setState({ searchValue: value });
      getAutomations({ search: value });
   }

   handleSearchClick= () => {
      const { getAutomations } = this.props;
      const { searchValue } = this.state;
      getAutomations({ search: searchValue });
   }


   render() {
      const {
         goTo, createAutomation, automations, getAutomationsInProgress, initialAutomationsLength,
      } = this.props;
      const { searchValue, searchIsActive } = this.state;
      return (
         <>
            <MobileHeader>
               <SiteHeaderMobile
                  isLeftAction
                  goToBack={ () => {} }
               />
            </MobileHeader>
            <AdminContainer>
               <div className='automation__create__page'>
                  <CourseCreateHeader
                     title='New Automation'
                     goBack={ () => goTo('/admin/automations') }
                  />
                  <AdminContainer.Content>
                     <AutomationCreatePageView
                        onCreateAutomation={ (title) => createAutomation(title) }
                     />
                  </AdminContainer.Content>
               </div>
            </AdminContainer>
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      automations: selectors.automationsSelector(state),
      initialAutomationsLength: selectors.initialAutomationsLengthSelector(state),
      getAutomationsInProgress: selectors.getAutomationsInProgressSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goTo: (location) => {
         dispatch(push(location));
      },
      createAutomation: (title) => dispatch(operations.createAutomationOperation(title)),
      getAutomations: (params) => {
         dispatch(operations.getAutomationsOperation(params));
      },
      deleteAutomation: (id) => {
         dispatch(operations.deleteAutomationOperation(id));
      },
      updateAutomation: (id, inputs) => {
         dispatch(operations.updateAutomationOperation(id, inputs));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(AutomationCreatePage);
