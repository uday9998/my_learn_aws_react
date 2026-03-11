import React from 'react';
import './index.scss';
import LiveStreamView from 'views/pages/liveStream';
import Text, {
   SIZES as sizes,
   TYPES as types,
} from 'components/elements/TextNew';

import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import Container from 'views/layout/AdminContainer';
import Router from 'routes/router';
import SidebarContainer from 'containers/modules/siteheader/index.mob';

const LiveStreamContainer = ({ goTo }) => {
   return (
      <section className='liveStream__container'>
         <Container.Header>
            <SidebarContainer
               title='Live Stream'
               tooltip='Stream live events that will engage you audience and help grow your business'
               goToBack={ () => goTo(Router.route('ADMIN_DASHBOARD').getMask()) }
               goBack
               isLeftAction
            />
         </Container.Header>

         <div className='liveStream__content'>
            <div className='liveStream__container__header'>
               <Text
                  inner='Live Stream'
                  type={ types.bold133 }
                  size={ sizes.new_size_28 }
               />
            </div>
            <LiveStreamView />
         </div>
      </section>
   );
};

LiveStreamContainer.propTypes = {
   goTo: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
   return {
      goTo: (location) => {
         dispatch(push(location));
      },
   };
};

export default connect(mapDispatchToProps)(LiveStreamContainer);
