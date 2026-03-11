import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'views/layout/AdminContainer';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { authUserSelector } from 'state/modules/common/selectors';

class AILearningContainer extends Component {
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
                  title="AI Learning Intelligence"
               />
            </MobileHeader>
            <Container>
               <Container.Content>
                  <div style={{ padding: '20px' }}>
                     <h1>AI Learning Intelligence Dashboard</h1>
                     <p>Welcome to AI Learning Intelligence. This feature helps you leverage AI to enhance your course content and student engagement.</p>

                     <div style={{ marginTop: '30px' }}>
                        <h2>Available Features:</h2>
                        <ul>
                           <li>Course Co-Pilot - Generate course outlines with AI</li>
                           <li>Smart Recommendations - Personalized course recommendations</li>
                           <li>AI Study Assistant - Help students learn better</li>
                           <li>Content Gap Analysis - Identify missing content in your courses</li>
                           <li>Predictive Churn - Identify at-risk students</li>
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

export default connect(mapStateToProps)(AILearningContainer);
