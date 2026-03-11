import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AchievementsPanel.css';

const AchievementsPanel = ({ userId }) => {
  const [achievements, setAchievements] = useState({ unlocked: [], locked: [] });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unlocked, locked
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchAchievements();
  }, [userId]);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/gamification/achievements/available', {
        params: { user_id: userId },
      });
      setAchievements(response.data.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTierColor = (tier) => {
    const colors = {
      bronze: '#cd7f32',
      silver: '#c0c0c0',
      gold: '#ffd700',
      platinum: '#e5e4e2',
    };
    return colors[tier] || '#666';
  };

  const getTierIcon = (tier) => {
    const icons = {
      bronze: '🥉',
      silver: '🥈',
      gold: '🥇',
      platinum: '💎',
    };
    return icons[tier] || '🏅';
  };

  const getFilteredAchievements = () => {
    let filtered = [];

    if (filter === 'all') {
      filtered = [...achievements.unlocked, ...achievements.locked];
    } else if (filter === 'unlocked') {
      filtered = achievements.unlocked;
    } else {
      filtered = achievements.locked;
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((achievement) => achievement.category === categoryFilter);
    }

    return filtered;
  };

  const categories = ['all', 'course', 'social', 'streak', 'completion', 'special'];

  if (loading) {
    return <div className="achievements-loading">Loading achievements...</div>;
  }

  const filteredAchievements = getFilteredAchievements();
  const totalUnlocked = achievements.unlocked.length;
  const totalAchievements = achievements.unlocked.length + achievements.locked.length;

  return (
    <div className="achievements-panel">
      <div className="achievements-header">
        <h1>Achievements</h1>
        <div className="achievements-stats">
          <div className="stat">
            <span className="stat-value">{totalUnlocked}</span>
            <span className="stat-label">Unlocked</span>
          </div>
          <div className="stat-divider">/</div>
          <div className="stat">
            <span className="stat-value">{totalAchievements}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </div>

      <div className="achievements-filters">
        <div className="filter-group">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'unlocked' ? 'active' : ''}`}
            onClick={() => setFilter('unlocked')}
          >
            Unlocked ({totalUnlocked})
          </button>
          <button
            className={`filter-btn ${filter === 'locked' ? 'active' : ''}`}
            onClick={() => setFilter('locked')}
          >
            Locked ({totalAchievements - totalUnlocked})
          </button>
        </div>

        <div className="category-filter">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="category-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="achievements-grid">
        {filteredAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`achievement-card ${achievement.is_unlocked ? 'unlocked' : 'locked'}`}
            style={{
              borderColor: achievement.is_unlocked ? getTierColor(achievement.tier) : '#ccc',
            }}
          >
            <div className="achievement-tier-badge" style={{ background: getTierColor(achievement.tier) }}>
              {getTierIcon(achievement.tier)}
            </div>

            {achievement.is_unlocked && <div className="achievement-unlocked-badge">✓</div>}

            <div className="achievement-icon">
              {achievement.icon || '🏆'}
            </div>

            <h3 className="achievement-name">{achievement.name}</h3>
            <p className="achievement-description">{achievement.description}</p>

            <div className="achievement-footer">
              <div className="achievement-category">
                {achievement.category}
              </div>
              <div className="achievement-points">
                +{achievement.points} XP
              </div>
            </div>

            {!achievement.is_unlocked && achievement.criteria && (
              <div className="achievement-criteria">
                <strong>Requirements:</strong>
                <ul>
                  {Object.entries(achievement.criteria).map(([key, value]) => (
                    <li key={key}>
                      {key.replace(/_/g, ' ')}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="no-achievements">
          No achievements found for the selected filters.
        </div>
      )}
    </div>
  );
};

export default AchievementsPanel;
