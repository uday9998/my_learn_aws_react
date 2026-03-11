import React, { useState } from 'react';
import axios from 'axios';
import './CourseOutlineGenerator.css';

const CourseOutlineGenerator = () => {
  const [formData, setFormData] = useState({
    topic: '',
    target_audience: 'beginners',
    duration: '4 weeks',
    learning_objectives: '',
    difficulty_level: 'beginner'
  });

  const [loading, setLoading] = useState(false);
  const [outline, setOutline] = useState(null);
  const [error, setError] = useState(null);
  const [generationId, setGenerationId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerate = async () => {
    if (!formData.topic.trim()) {
      setError('Please enter a course topic');
      return;
    }

    setLoading(true);
    setError(null);
    setOutline(null);

    try {
      const response = await axios.post('/api/ai/content/course-outline', formData);

      if (response.data.success) {
        setOutline(response.data.outline);
        setGenerationId(response.data.generation_id);
      } else {
        setError(response.data.error || 'Failed to generate course outline');
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.response?.data?.error || 'Failed to generate course outline. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyOutline = () => {
    const outlineText = JSON.stringify(outline, null, 2);
    navigator.clipboard.writeText(outlineText);
    alert('Course outline copied to clipboard!');
  };

  const handleUseOutline = () => {
    // Mark as used
    if (generationId) {
      axios.post(`/api/ai/content/generation/${generationId}/mark-used`, {
        context: 'course_creation'
      });
    }

    // Redirect to course creation with outline data
    // Or store in localStorage and redirect
    localStorage.setItem('ai_generated_outline', JSON.stringify(outline));
    window.location.href = '/admin/courses/create';
  };

  const handleRegenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`/api/ai/content/generation/${generationId}/regenerate`, {
        parameters: formData
      });

      if (response.data.success) {
        setOutline(response.data.outline);
        setGenerationId(response.data.generation_id);
      }
    } catch (err) {
      setError('Failed to regenerate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-outline-generator">
      <div className="page-header">
        <h1>🎓 AI Course Outline Generator</h1>
        <p className="subtitle">Transform your idea into a complete course structure in seconds</p>
      </div>

      <div className="generator-container">
        {/* Form Section */}
        <div className="form-section">
          <div className="form-card">
            <h2>Course Details</h2>

            <div className="form-group">
              <label htmlFor="topic">
                Course Topic <span className="required">*</span>
              </label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                placeholder="e.g., Complete Photography Masterclass"
                className="form-input"
              />
              <small>Be specific about what you want to teach</small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="target_audience">Target Audience</label>
                <select
                  id="target_audience"
                  name="target_audience"
                  value={formData.target_audience}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="absolute beginners">Absolute Beginners</option>
                  <option value="beginners">Beginners</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="all levels">All Levels</option>
                  <option value="professionals">Professionals</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="difficulty_level">Difficulty Level</label>
                <select
                  id="difficulty_level"
                  name="difficulty_level"
                  value={formData.difficulty_level}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="duration">Course Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 4 weeks, 10 hours, 30 days"
                className="form-input"
              />
              <small>How long should students take to complete this course?</small>
            </div>

            <div className="form-group">
              <label htmlFor="learning_objectives">Learning Objectives</label>
              <textarea
                id="learning_objectives"
                name="learning_objectives"
                value={formData.learning_objectives}
                onChange={handleInputChange}
                placeholder="What will students be able to do after completing this course? (e.g., Take professional photos, understand camera settings, master lighting)"
                rows={4}
                className="form-textarea"
              />
              <small>List the key skills or outcomes students will achieve</small>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !formData.topic.trim()}
              className="generate-button"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Generating Course Outline...
                </>
              ) : (
                <>
                  <span className="icon">✨</span>
                  Generate Course Outline
                </>
              )}
            </button>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
          </div>

          {/* Info Cards */}
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Complete course structure in under 30 seconds</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🎯</div>
              <h3>Proven Framework</h3>
              <p>Based on instructional design best practices</p>
            </div>
            <div className="info-card">
              <div className="info-icon">♻️</div>
              <h3>Fully Editable</h3>
              <p>Customize any part of the generated outline</p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {outline && (
          <div className="results-section">
            <div className="results-header">
              <h2>Generated Course Outline</h2>
              <div className="results-actions">
                <button onClick={handleRegenerate} className="btn-secondary">
                  🔄 Regenerate
                </button>
                <button onClick={handleCopyOutline} className="btn-secondary">
                  📋 Copy JSON
                </button>
                <button onClick={handleUseOutline} className="btn-primary">
                  ✅ Use This Outline
                </button>
              </div>
            </div>

            <div className="outline-content">
              {/* Course Header */}
              <div className="course-header">
                <h1>{outline.title}</h1>
                <p className="course-description">{outline.description}</p>

                {outline.prerequisites && outline.prerequisites.length > 0 && (
                  <div className="prerequisites">
                    <h4>📚 Prerequisites:</h4>
                    <ul>
                      {outline.prerequisites.map((prereq, idx) => (
                        <li key={idx}>{prereq}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Modules */}
              <div className="modules-container">
                <h3 className="section-title">Course Modules ({outline.modules?.length || 0})</h3>

                {outline.modules?.map((module, moduleIdx) => (
                  <div key={moduleIdx} className="module-card">
                    <div className="module-header">
                      <span className="module-number">Module {moduleIdx + 1}</span>
                      <h3>{module.title}</h3>
                    </div>

                    <p className="module-description">{module.description}</p>

                    {module.learning_outcomes && module.learning_outcomes.length > 0 && (
                      <div className="learning-outcomes">
                        <h5>🎯 Learning Outcomes:</h5>
                        <ul>
                          {module.learning_outcomes.map((outcome, idx) => (
                            <li key={idx}>{outcome}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="lessons-list">
                      <h5>📖 Lessons ({module.lessons?.length || 0}):</h5>
                      {module.lessons?.map((lesson, lessonIdx) => (
                        <div key={lessonIdx} className="lesson-item">
                          <div className="lesson-number">{lessonIdx + 1}</div>
                          <div className="lesson-content">
                            <h4>{lesson.title}</h4>
                            <p>{lesson.description}</p>
                            {lesson.duration && (
                              <span className="lesson-duration">⏱️ {lesson.duration}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Assessments */}
              {outline.assessments && outline.assessments.length > 0 && (
                <div className="assessments-section">
                  <h3 className="section-title">📝 Recommended Assessments</h3>
                  <div className="assessments-grid">
                    {outline.assessments.map((assessment, idx) => (
                      <div key={idx} className="assessment-card">
                        <h4>{assessment.title || assessment}</h4>
                        {assessment.description && <p>{assessment.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Raw JSON (collapsible) */}
              <details className="raw-json">
                <summary>View Raw JSON</summary>
                <pre>{JSON.stringify(outline, null, 2)}</pre>
              </details>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !outline && (
          <div className="loading-state">
            <div className="loading-animation">
              <div className="loading-spinner"></div>
              <h3>AI is crafting your course outline...</h3>
              <p>Analyzing your topic and creating a comprehensive structure</p>
              <div className="loading-steps">
                <div className="step active">📚 Understanding your topic</div>
                <div className="step active">🎯 Defining learning objectives</div>
                <div className="step active">📖 Creating modules and lessons</div>
                <div className="step">✅ Finalizing structure</div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!outline && !loading && (
          <div className="empty-state">
            <div className="empty-icon">🎓</div>
            <h3>Ready to Create Your Course?</h3>
            <p>Fill in the details on the left and click "Generate Course Outline" to get started.</p>
            <div className="example-topics">
              <h4>Example Topics:</h4>
              <div className="topic-tags">
                <span className="topic-tag" onClick={() => setFormData({...formData, topic: 'Complete Web Development Bootcamp'})}>
                  Web Development Bootcamp
                </span>
                <span className="topic-tag" onClick={() => setFormData({...formData, topic: 'Digital Marketing Masterclass'})}>
                  Digital Marketing
                </span>
                <span className="topic-tag" onClick={() => setFormData({...formData, topic: 'Yoga Teacher Training'})}>
                  Yoga Teacher Training
                </span>
                <span className="topic-tag" onClick={() => setFormData({...formData, topic: 'Financial Freedom Course'})}>
                  Financial Freedom
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseOutlineGenerator;
