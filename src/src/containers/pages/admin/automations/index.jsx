/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import Automations from 'views/pages/Automations';
import * as selectors from 'state/modules/automation/selectors';
import * as operations from 'state/modules/automation/operations';
import Router from 'routes/router';
import ComponentProgress from 'components/modules/ComponentProgress';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import { screenWidthSelector } from 'state/modules/common/selectors';

class AutomationsContainer extends Component {
   static propTypes = {
      goTo: PropTypes.func,
      createAutomation: PropTypes.func,
      getAutomations: PropTypes.func,
      automations: PropTypes.array,
      getAutomationsInProgress: PropTypes.bool,
      deleteAutomation: PropTypes.func,
      updateAutomation: PropTypes.func,
      goToCreatePage: PropTypes.func,
      initialAutomationsLength: PropTypes.number,
      screenWidth: PropTypes.number,
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
         goToCreatePage, screenWidth,
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
            <ComponentProgress loading={ initialAutomationsLength === undefined }>
               <Automations
                  getAutomationsInProgress={ getAutomationsInProgress }
                  goTo={ goTo }
                  createAutomation={ createAutomation }
                  automations={ automations }
                  handleDeleteAutomation={ this.handleDeleteAutomation }
                  handleStatusChange={ this.handleStatusChange }
                  changeSearchValue={ this.changeSearchValue }
                  handleSearchClick={ this.handleSearchClick }
                  goToCreatePage={ goToCreatePage }
                  initialAutomationsLength={ initialAutomationsLength }
                  searchValue={ searchValue }
                  searchIsActive={ searchIsActive }
                  isMobile={ screenWidth < 1024 }
               />
            </ComponentProgress>
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      automations: selectors.automationsSelector(state),
      initialAutomationsLength: selectors.initialAutomationsLengthSelector(state),
      getAutomationsInProgress: selectors.getAutomationsInProgressSelector(state),
      screenWidth: screenWidthSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goTo: (location) => {
         dispatch(push(location));
      },

      createAutomation: () => {
         dispatch(operations.createAutomationOperation());
      },
      getAutomations: (params, isDidMount) => {
         dispatch(operations.getAutomationsOperation(params, isDidMount));
      },
      deleteAutomation: (id) => {
         dispatch(operations.deleteAutomationOperation(id));
      },
      updateAutomation: (id, inputs) => {
         dispatch(operations.updateAutomationOperation(id, inputs));
      },
      goToCreatePage: () => {
         dispatch(
            push(Router.route('ADMIN_AUTOMATION_CREATE_PAGE').getCompiledPath())
         );
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(AutomationsContainer);
