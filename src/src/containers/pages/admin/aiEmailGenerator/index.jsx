import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'views/layout/AdminContainer';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { authUserSelector } from 'state/modules/common/selectors';

class AIEmailGeneratorContainer extends Component {
   static propTypes = {
      authUser: PropTypes.object,
      location: PropTypes.object,
   };

   render() {
      return (
         <>
            <MobileHeader>
               <SiteHeader
                  hasMenu
                  title="AI Email Generator"
               />
            </MobileHeader>
            <Container>
               <Container.Content>
                  <div style={{ padding: '20px' }}>
                     <h1>AI Email Generator</h1>
                     <p>Use AI to generate professional emails for your courses and students.</p>

                     <div style={{ marginTop: '30px' }}>
                        <h2>Features:</h2>
                        <ul>
                           <li>Generate welcome emails</li>
                           <li>Create course completion emails</li>
                           <li>Write promotional emails</li>
                           <li>Craft re-engagement emails</li>
                        </ul>
                     </div>
                  </div>
               </Container.Content>
            </Container>
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      authUser: authUserSelector(state),
   };
};

export default connect(mapStateToProps)(AIEmailGeneratorContainer);
