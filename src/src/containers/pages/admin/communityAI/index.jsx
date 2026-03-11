import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import Container from 'views/layout/AdminContainer';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { authUserSelector } from 'state/modules/common/selectors';
import CreatePost from '../communityAICreatePost/CreatePost';
import './CommunityAI.scss';

// Component for Community Insights section
const CommunityInsights = () => (
  <div className="insights-section">
    <h2 className="section-title">Community Insights</h2>
    <div className="insights-grid">
      <div className="insight-card">
        <div className="insight-header">
          <span className="insight-label">Active Members</span>
          <span className="chart-icon">📈</span>
        </div>
        <div className="insight-value">128</div>
        <div className="insight-change positive">↑ 12% this week</div>
      </div>

      <div className="insight-card">
        <div className="insight-header">
          <span className="insight-label">Discussions</span>
          <span className="chart-icon">💬</span>
        </div>
        <div className="insight-value">45</div>
        <div className="insight-change positive">↑ 8% this week</div>
      </div>

      <div className="insight-card">
        <div className="insight-header">
          <span className="insight-label">Engagement</span>
          <span className="chart-icon">📊</span>
        </div>
        <div className="insight-value">89%</div>
        <div className="insight-change positive">↑ 5% this week</div>
      </div>
    </div>
  </div>
);

// Component for Community Health section
const CommunityHealth = () => (
  <div className="health-section">
    <h2 className="section-title">Community Health</h2>
    <div className="health-metrics">
      <div className="health-metric">
        <span className="metric-icon">❤️</span>
        <span className="metric-label">Engagement Rate</span>
        <span className="metric-value">92%</span>
      </div>
      <div className="health-metric">
        <span className="metric-icon">↗️</span>
        <span className="metric-label">Growth Rate</span>
        <span className="metric-value">+15%</span>
      </div>
      <div className="health-metric">
        <span className="metric-icon">🕒</span>
        <span className="metric-label">Response Time</span>
        <span className="metric-value">2.5 hrs</span>
      </div>
    </div>
  </div>
);

// Component for Trending Discussions section
const TrendingDiscussions = () => (
  <div className="discussions-section">
    <div className="section-header">
      <h2 className="section-title">Trending Discussions</h2>
      <button className="view-all-btn">View All</button>
    </div>

    <div className="discussion-list">
      <div className="discussion-item">
        <span className="star-icon">⭐</span>
        <div className="discussion-content">
          <h3>Best practices for course creation</h3>
          <p>High engagement discussion about content creation strategies</p>
          <div className="discussion-meta">
            <span>32 replies</span>
            <span>12 active members</span>
          </div>
          <button className="join-discussion-btn">Join Discussion</button>
        </div>
      </div>

      <div className="discussion-item">
        <span className="star-icon">⭐</span>
        <div className="discussion-content">
          <h3>Marketing strategies for creators</h3>
          <p>Members sharing successful marketing techniques</p>
          <div className="discussion-meta">
            <span>28 replies</span>
            <span>8 active members</span>
          </div>
          <button className="join-discussion-btn">Join Discussion</button>
        </div>
      </div>
    </div>
  </div>
);

// Component for Active Members section
const ActiveMembersSection = () => (
  <div className="active-members-section">
    <h2 className="section-title">Active Members</h2>
    <div className="member-list">
      <div className="member-item">
        <div className="member-avatar"></div>
        <div className="member-info">
          <h3>Sarah Wilson</h3>
          <p>5 contributions today</p>
        </div>
        <button className="message-btn">💬</button>
      </div>

      <div className="member-item">
        <div className="member-avatar"></div>
        <div className="member-info">
          <h3>Mike Johnson</h3>
          <p>3 contributions today</p>
        </div>
        <button className="message-btn">💬</button>
      </div>
    </div>
  </div>
);

// Component for Quick Actions section
const QuickActions = () => (
  <div className="quick-actions-section">
    <h2 className="section-title">Quick Actions</h2>
    <div className="action-list">
      <button className="action-btn">
        <span className="action-icon">🚩</span>
        Review Flagged Content (2)
      </button>
      <button className="action-btn">
        <span className="action-icon">❓</span>
        Answer Questions (5)
      </button>
      <button className="action-btn">
        <span className="action-icon">👋</span>
        Welcome New Members
      </button>
    </div>
  </div>
);

// Component for Suggested Actions section
const SuggestedActions = () => (
  <div className="suggested-actions-section">
    <h2 className="section-title">
      <span className="suggestion-icon">💡</span>
      Suggested Actions
    </h2>

    <div className="suggestion-list">
      <div className="suggestion-item">
        <h3>Create Welcome Thread</h3>
        <p>8 new members joined today. Create a welcome thread to encourage introductions.</p>
        <button className="generate-btn">Generate Welcome Post</button>
      </div>

      <div className="suggestion-item">
        <h3>Engagement Opportunity</h3>
        <p>Course creation discussion is trending. Consider sharing your expertise.</p>
        <button className="generate-btn">Generate Response</button>
      </div>
    </div>
  </div>
);

class CommunityAssistant extends Component {
  static propTypes = {
    authUser: PropTypes.object,
    location: PropTypes.object,
    goTo: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeAction: null
    };
  }

  componentDidMount() {
    // Parse the query parameters to see if a specific action was requested
    const { location } = this.props;
    if (location && location.search) {
      const searchParams = new URLSearchParams(location.search);
      const action = searchParams.get('action');
      
      if (action) {
        // Set initial state or focus on a specific section based on the action
        this.setState({ activeAction: action });
      }
    }
  }

  navigateToAILanding = () => {
    const { goTo } = this.props;
    if (goTo) {
      goTo('ADMIN_AI_ASSISTANT');
    }
  };

  navigateToCreatePost = () => {
    const { goTo } = this.props;
    if (goTo) {
      goTo('ADMIN_COMMUNITY_CREATE_POST');
    }
  };

  render() {
    return (
      <>
        <MobileHeader>
          <SiteHeader
            isLeftAction
            goToBack={this.navigateToAILanding}
            title="Community Assistant"
          />
        </MobileHeader>
        <Container>
          <Container.Content>
            <div className="community-dashboard">
              <div className="dashboard-header">
                <div className="dashboard-title">
                  <div className="title-icon">👥</div>
                  <h1>Community Assistant</h1>
                </div>
                <button className="create-post-btn" onClick={this.navigateToCreatePost}>
                  <span className="btn-icon">+</span>
                  Create Post
                </button>
              </div>
              
              <div className="dashboard-grid">
                <div className="main-column">
                  <CommunityInsights />
                  <TrendingDiscussions />
                  <SuggestedActions />
                </div>
                <div className="side-column">
                  <CommunityHealth />
                  <ActiveMembersSection />
                  <QuickActions />
                </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    goTo: (routeName, hash) => {
      dispatch(push({
        pathname: Router.route(routeName).getMask(),
        hash
      }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityAssistant);