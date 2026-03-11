import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GamificationDashboard.css';

const GamificationDashboard = ({ userId }) => {
  const [summary, setSummary] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimingReward, setClaimingReward] = useState(false);

  useEffect(() => {
    fetchGamificationData();
  }, [userId]);

  const fetchGamificationData = async () => {
    try {
      setLoading(true);
      const [summaryRes, leaderboardRes] = await Promise.all([
        axios.get('/api/gamification/summary', { params: { user_id: userId } }),
        axios.get('/api/gamification/leaderboard', { params: { period: 'weekly', limit: 10 } }),
      ]);

      setSummary(summaryRes.data.data);
      setLeaderboard(leaderboardRes.data.data.entries);
    } catch (error) {
      console.error('Error fetching gamification data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimDailyReward = async () => {
    try {
      setClaimingReward(true);
      await axios.post('/api/gamification/claim-daily-reward', { user_id: userId });
      fetchGamificationData(); // Refresh data
    } catch (error) {
      console.error('Error claiming reward:', error);
      alert('Daily reward already claimed today!');
    } finally {
      setClaimingReward(false);
    }
  };

  if (loading) {
    return <div className="gamification-loading">Loading gamification data...</div>;
  }

  if (!summary) {
    return <div className="gamification-error">Failed to load gamification data</div>;
  }

  return (
    <div className="gamification-dashboard">
      <h1 className="dashboard-title">Your Gamification Dashboard</h1>

      <div className="dashboard-grid">
        {/* Streak Card */}
        <div className="gamification-card streak-card">
          <div className="card-icon">🔥</div>
          <h3>Current Streak</h3>
          <div className="stat-value">{summary.streak.current} Days</div>
          <div className="stat-details">
            <div>Longest: {summary.streak.longest} days</div>
            <div>Total Active: {summary.streak.total_days} days</div>
          </div>
        </div>

        {/* Level Card */}
        <div className="gamification-card level-card">
          <div className="card-icon">⭐</div>
          <h3>Level {summary.level.current_level}</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${summary.level.progress_percentage}%` }}
            ></div>
          </div>
          <div className="stat-details">
            <div>XP: {summary.level.experience_points} / {summary.level.points_to_next_level}</div>
            <div>{summary.level.progress_percentage}% to next level</div>
          </div>
        </div>

        {/* Achievements Card */}
        <div className="gamification-card achievements-card">
          <div className="card-icon">🏆</div>
          <h3>Achievements</h3>
          <div className="stat-value">{summary.achievements.total_unlocked}</div>
          <div className="stat-details">
            <div>Total Points: {summary.achievements.total_points}</div>
          </div>
        </div>

        {/* Leaderboard Rank Card */}
        <div className="gamification-card rank-card">
          <div className="card-icon">📊</div>
          <h3>Weekly Rank</h3>
          <div className="stat-value">
            {summary.leaderboard.weekly_rank ? `#${summary.leaderboard.weekly_rank}` : 'Unranked'}
          </div>
          <div className="stat-details">
            <div>Keep learning to climb!</div>
          </div>
        </div>
      </div>

      {/* Daily Reward Section */}
      <div className="daily-reward-section">
        <h2>Daily Reward</h2>
        {summary.daily_reward.claimed_today ? (
          <div className="reward-claimed">
            <span className="checkmark">✓</span> Daily reward claimed! Come back tomorrow!
          </div>
        ) : (
          <div className="reward-available">
            <div className="reward-info">
              <strong>Available Reward:</strong>
              <div className="reward-points">
                +{summary.daily_reward.next_reward?.points} Points
              </div>
              {summary.daily_reward.next_reward?.reward_type === 'bonus' && (
                <div className="reward-bonus">BONUS DAY! 🎉</div>
              )}
            </div>
            <button
              className="claim-reward-btn"
              onClick={handleClaimDailyReward}
              disabled={claimingReward}
            >
              {claimingReward ? 'Claiming...' : 'Claim Reward'}
            </button>
          </div>
        )}
      </div>

      {/* Active Challenges */}
      {summary.challenges.active > 0 && (
        <div className="challenges-section">
          <h2>Active Challenges ({summary.challenges.active})</h2>
          <div className="challenges-grid">
            {summary.challenges.recent.map((userChallenge) => (
              <div key={userChallenge.id} className="challenge-card">
                <h4>{userChallenge.challenge.name}</h4>
                <p>{userChallenge.challenge.description}</p>
                <div className="challenge-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${userChallenge.completion_percentage}%` }}
                    ></div>
                  </div>
                  <span>{userChallenge.completion_percentage}% Complete</span>
                </div>
                <div className="challenge-reward">
                  Reward: {userChallenge.challenge.reward_points} Points
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="leaderboard-section">
        <h2>Weekly Leaderboard</h2>
        <div className="leaderboard-table">
          <div className="leaderboard-header">
            <div className="rank-col">Rank</div>
            <div className="user-col">User</div>
            <div className="points-col">Points</div>
          </div>
          {leaderboard.map((entry, index) => (
            <div
              key={entry.id}
              className={`leaderboard-row ${entry.user_id === userId ? 'current-user' : ''}`}
            >
              <div className="rank-col">
                {entry.rank <= 3 ? (
                  <span className={`medal medal-${entry.rank}`}>
                    {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                  </span>
                ) : (
                  <span>#{entry.rank}</span>
                )}
              </div>
              <div className="user-col">
                {entry.user.picture_src && (
                  <img src={entry.user.picture_src} alt={entry.user.name} className="user-avatar" />
                )}
                <span>{entry.user.name}</span>
              </div>
              <div className="points-col">{entry.points} pts</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamificationDashboard;
