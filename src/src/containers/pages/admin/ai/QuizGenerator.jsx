import React, { useState } from 'react';
import axios from 'axios';
import './QuizGenerator.css';

const QuizGenerator = () => {
  const [formData, setFormData] = useState({
    content: '',
    question_count: 5,
    difficulty: 'medium',
    question_types: ['multiple_choice', 'true_false']
  });

  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);
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
    if (!formData.content.trim()) {
      setError('Please enter some content to generate quiz from');
      return;
    }

    setLoading(true);
    setError(null);
    setQuiz(null);

    try {
      const response = await axios.post('/api/ai/content/quiz', formData);

      if (response.data.success) {
        setQuiz(response.data.quiz);
        setGenerationId(response.data.generation_id);
      } else {
        setError(response.data.error || 'Failed to generate quiz');
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.response?.data?.error || 'Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyQuiz = () => {
    const quizText = JSON.stringify(quiz, null, 2);
    navigator.clipboard.writeText(quizText);
    alert('Quiz copied to clipboard!');
  };

  const handleUseQuiz = () => {
    if (generationId) {
      axios.post(`/api/ai/content/generation/${generationId}/mark-used`, {
        context: 'lesson_quiz'
      });
    }

    // Store in localStorage for use in lesson editor
    localStorage.setItem('ai_generated_quiz', JSON.stringify(quiz));
    alert('Quiz saved! You can now add it to your lesson.');
  };

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case 'multiple_choice':
        return '📝';
      case 'true_false':
        return '✓✗';
      default:
        return '❓';
    }
  };

  return (
    <div className="quiz-generator">
      <div className="page-header">
        <h1>📝 AI Quiz Generator</h1>
        <p className="subtitle">Create engaging quizzes from any content in seconds</p>
      </div>

      <div className="generator-container">
        {/* Form Section */}
        <div className="form-section">
          <div className="form-card">
            <h2>Quiz Content</h2>

            <div className="form-group">
              <label htmlFor="content">
                Lesson Content <span className="required">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Paste your lesson content here... The AI will analyze it and create relevant quiz questions.

Example: 'Photosynthesis is the process by which plants use sunlight, water and carbon dioxide to create oxygen and energy in the form of sugar. This process is crucial for life on Earth as it produces the oxygen that most organisms need to survive...'"
                rows={12}
                className="form-textarea"
              />
              <small>Paste video transcript, lesson text, or any educational content</small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="question_count">Number of Questions</label>
                <select
                  id="question_count"
                  name="question_count"
                  value={formData.question_count}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  {[3, 5, 7, 10, 15, 20].map(num => (
                    <option key={num} value={num}>{num} questions</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="difficulty">Difficulty Level</label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !formData.content.trim()}
              className="generate-button"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Generating Quiz...
                </>
              ) : (
                <>
                  <span className="icon">✨</span>
                  Generate Quiz
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

          {/* Stats Card */}
          {quiz && (
            <div className="stats-card">
              <h3>Quiz Statistics</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{quiz.questions?.length || 0}</div>
                  <div className="stat-label">Questions</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">
                    {quiz.questions?.filter(q => q.type === 'multiple_choice').length || 0}
                  </div>
                  <div className="stat-label">Multiple Choice</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">
                    {quiz.questions?.filter(q => q.type === 'true_false').length || 0}
                  </div>
                  <div className="stat-label">True/False</div>
                </div>
              </div>
            </div>
          )}

          {/* Tips Card */}
          <div className="tips-card">
            <h3>💡 Tips for Better Quizzes</h3>
            <ul>
              <li>Provide detailed, comprehensive content</li>
              <li>Include key concepts and definitions</li>
              <li>The AI works best with 200+ words of content</li>
              <li>Review and edit questions before using</li>
            </ul>
          </div>
        </div>

        {/* Results Section */}
        {quiz && quiz.questions && (
          <div className="results-section">
            <div className="results-header">
              <h2>Generated Quiz</h2>
              <div className="results-actions">
                <button onClick={handleCopyQuiz} className="btn-secondary">
                  📋 Copy JSON
                </button>
                <button onClick={handleUseQuiz} className="btn-primary">
                  ✅ Use This Quiz
                </button>
              </div>
            </div>

            <div className="quiz-content">
              {quiz.questions.map((question, idx) => (
                <div key={idx} className="question-card">
                  <div className="question-header">
                    <span className="question-number">Question {idx + 1}</span>
                    <span className="question-type">
                      {getQuestionTypeIcon(question.type)} {question.type === 'multiple_choice' ? 'Multiple Choice' : 'True/False'}
                    </span>
                  </div>

                  <div className="question-text">
                    {question.question}
                  </div>

                  {question.type === 'multiple_choice' && (
                    <div className="options-list">
                      {question.options.map((option, optionIdx) => (
                        <div
                          key={optionIdx}
                          className={`option-item ${optionIdx === question.correct_answer ? 'correct' : ''}`}
                        >
                          <span className="option-letter">
                            {String.fromCharCode(65 + optionIdx)}.
                          </span>
                          <span className="option-text">{option}</span>
                          {optionIdx === question.correct_answer && (
                            <span className="correct-badge">✓ Correct</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === 'true_false' && (
                    <div className="true-false-options">
                      <div className={`tf-option ${question.correct_answer === 'true' || question.correct_answer === true ? 'correct' : ''}`}>
                        <span className="tf-icon">✓</span>
                        True
                        {(question.correct_answer === 'true' || question.correct_answer === true) && (
                          <span className="correct-badge">Correct</span>
                        )}
                      </div>
                      <div className={`tf-option ${question.correct_answer === 'false' || question.correct_answer === false ? 'correct' : ''}`}>
                        <span className="tf-icon">✗</span>
                        False
                        {(question.correct_answer === 'false' || question.correct_answer === false) && (
                          <span className="correct-badge">Correct</span>
                        )}
                      </div>
                    </div>
                  )}

                  {question.explanation && (
                    <div className="explanation">
                      <strong>💡 Explanation:</strong>
                      <p>{question.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Raw JSON */}
            <details className="raw-json">
              <summary>View Raw JSON</summary>
              <pre>{JSON.stringify(quiz, null, 2)}</pre>
            </details>
          </div>
        )}

        {/* Loading State */}
        {loading && !quiz && (
          <div className="loading-state">
            <div className="loading-animation">
              <div className="loading-spinner"></div>
              <h3>AI is creating your quiz...</h3>
              <p>Analyzing content and crafting relevant questions</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!quiz && !loading && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>Ready to Create a Quiz?</h3>
            <p>Paste your lesson content on the left and click "Generate Quiz"</p>
            <div className="example-content">
              <h4>Example Content Types:</h4>
              <div className="content-types">
                <div className="content-type">📹 Video Transcripts</div>
                <div className="content-type">📄 Lesson Text</div>
                <div className="content-type">📚 Article Content</div>
                <div className="content-type">🎓 Course Material</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGenerator;
