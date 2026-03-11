import React from 'react';
import './index.scss';
import AppBuilderView from 'views/pages/appBuilder';
import Text, { SIZES as sizes, TYPES as types } from 'components/elements/TextNew';

import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import Container from 'views/layout/AdminContainer';
import Router from 'routes/router';
import SidebarContainer from 'containers/modules/siteheader/index.mob';

const AppBuilderContainer = ({ goTo }) => {
   return (
      <section className='appBuilder__container'>
         <Container.Header>
            <SidebarContainer
               title='App Builder'
               tooltip='Contact Us To Help You Set Up A Mobile App For Your Business'
               goToBack={ () => goTo(Router.route('ADMIN_DASHBOARD').getMask()) }
               goBack
               isLeftAction
            />
         </Container.Header>
         <div className='appBuilder__content'>
            <div className='appBuilder__container__header'>
               <Text
                  inner='App Builder'
                  type={ types.bold133 }
                  size={ sizes.new_size_28 }
               />
            </div>
            <AppBuilderView />
         </div>
      </section>
   );
};

AppBuilderContainer.propTypes = {
   goTo: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
   return {
      goTo: (location) => {
         dispatch(push(location));
      },
   };
};

export default connect(mapDispatchToProps)(AppBuilderContainer);