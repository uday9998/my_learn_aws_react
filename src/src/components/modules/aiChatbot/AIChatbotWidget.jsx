import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IconButton, TextField, Avatar, Chip, Tooltip, LinearProgress } from '@material-ui/core';
import {
  X as CloseIcon,
  Send as SendIcon,
  Bot as BotIcon,
  Minus as MinimizeIcon,
  Volume2 as VolumeUpIcon,
  VolumeX as VolumeOffIcon,
  TrendingUp as TrendingUpIcon,
  Lightbulb as LightbulbIcon,
  Lightbulb as EmojiObjectsIcon,
} from 'lucide-react';
import './AIChatbotWidget.scss';

/**
 * Dynamic AI Chatbot Widget - Interactive Learning Assistant
 *
 * Features:
 * - Context-aware responses with engaging personality
 * - Sound effects and audio feedback
 * - Animated interactions and visual celebrations
 * - Learning-focused tips and suggestions
 * - Progress tracking and streaks
 * - Gamification elements
 */

const AIChatbotWidget = ({
  isEnabled = true,
  position = 'bottom-right',
  context = {},
  settings = {
    greeting: "👋 Hi! I'm your AI learning assistant. Ready to help you succeed today!",
    botName: 'Miestro Assistant',
    botAvatar: null,
    triggerDelay: 3000,
    primaryColor: '#4caf50',
  },
  onTriggerAutomation = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTip, setShowTip] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const messagesEndRef = useRef(null);
  const audioContextRef = useRef(null);

  // Sound effects using Web Audio API
  const playSound = (type) => {
    if (!soundEnabled) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      switch (type) {
        case 'open':
          // Cheerful ascending notes
          oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.15);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          break;
        case 'message':
          // Gentle notification
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          break;
        case 'send':
          // Confident send tone
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.05);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          break;
        case 'celebration':
          // Victory fanfare
          oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioContext.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          break;
        case 'tip':
          // Helpful ding
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
          break;
        default:
          break;
      }

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
    }
  };

  // Auto-open with welcoming animation
  useEffect(() => {
    if (!isEnabled) return;

    const hasSeenBot = localStorage.getItem('ai_chatbot_seen');
    if (!hasSeenBot && settings.triggerDelay) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        playSound('open');
        addMessage({
          id: Date.now(),
          sender: 'bot',
          text: settings.greeting,
          timestamp: new Date(),
          animated: true,
        });
        localStorage.setItem('ai_chatbot_seen', 'true');

        // Show helpful tip after welcome
        setTimeout(() => {
          setShowTip(true);
          playSound('tip');
        }, 2500);
      }, settings.triggerDelay);

      return () => clearTimeout(timer);
    }
  }, [isEnabled, settings.triggerDelay, settings.greeting]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    playSound('send');

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };
    addMessage(userMessage);
    setInputValue('');

    // Increment streak
    const newStreak = streakCount + 1;
    setStreakCount(newStreak);

    // Celebration for milestones
    if (newStreak > 0 && newStreak % 5 === 0) {
      setTimeout(() => {
        playSound('celebration');
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }, 2000);
    }

    // Simulate bot typing
    setIsTyping(true);
    setShowTip(false);

    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage.text, context, newStreak);
      addMessage({
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse.text,
        timestamp: new Date(),
        suggestedActions: botResponse.actions,
        emoji: botResponse.emoji,
        learningTip: botResponse.learningTip,
      });
      setIsTyping(false);

      playSound('message');

      // Show learning tip if available
      if (botResponse.learningTip) {
        setTimeout(() => {
          setShowTip(true);
          playSound('tip');
        }, 1000);
      }

      // Trigger automation if needed
      if (botResponse.automation && onTriggerAutomation) {
        onTriggerAutomation(botResponse.automation);
      }
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      playSound('open');
      if (messages.length === 0) {
        addMessage({
          id: Date.now(),
          sender: 'bot',
          text: settings.greeting,
          timestamp: new Date(),
          animated: true,
        });
        setTimeout(() => {
          setShowTip(true);
          playSound('tip');
        }, 2000);
      }
    } else {
      setIsOpen(false);
      setShowTip(false);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowTip(false);
  };

  const handleActionClick = (action) => {
    setInputValue(action.prompt);
    setTimeout(() => handleSendMessage(), 100);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  if (!isEnabled) return null;

  const progressPercentage = Math.min((streakCount / 10) * 100, 100);

  return createPortal(
    <div className={`ai-chatbot-widget ${position}`}>
      {/* Floating Button with Pulse */}
      {!isOpen && (
        <Tooltip title="Need help? Chat with me!" arrow>
          <div className="chatbot-bubble" onClick={handleToggle}>
            <BotIcon style={{ fontSize: 32, color: 'white' }} />
            <div className="bubble-pulse"></div>
            {messages.length > 0 && (
              <div className="unread-badge">{messages.length}</div>
            )}
          </div>
        </Tooltip>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`chatbot-window ${isMinimized ? 'minimized' : ''}`}>
          {/* Header */}
          <div className="chatbot-header" style={{ background: `linear-gradient(135deg, ${settings.primaryColor} 0%, ${settings.primaryColor}dd 100%)` }}>
            <div className="header-left">
              <Avatar
                src={settings.botAvatar}
                alt={settings.botName}
                style={{ width: 36, height: 36, marginRight: 10, border: '2px solid white' }}
              >
                <BotIcon />
              </Avatar>
              <div className="header-info">
                <div className="bot-name">{settings.botName}</div>
                <div className="bot-status">
                  <span className="status-dot"></span>
                  Online & Ready to Help!
                </div>
              </div>
            </div>
            <div className="header-actions">
              <Tooltip title={soundEnabled ? "Mute sounds" : "Enable sounds"}>
                <IconButton size="small" onClick={toggleSound} style={{ color: 'white' }}>
                  {soundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
                </IconButton>
              </Tooltip>
              <IconButton size="small" onClick={handleMinimize} style={{ color: 'white' }}>
                <MinimizeIcon />
              </IconButton>
              <IconButton size="small" onClick={handleClose} style={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>

          {/* Progress Bar */}
          {!isMinimized && streakCount > 0 && (
            <div className="streak-progress">
              <div className="streak-info">
                <TrendingUpIcon style={{ fontSize: 16, marginRight: 4 }} />
                <span>{streakCount} messages</span>
                {streakCount >= 5 && <span className="streak-fire"> 🔥</span>}
              </div>
              <LinearProgress
                variant="determinate"
                value={progressPercentage}
                style={{ height: 4, borderRadius: 2 }}
              />
            </div>
          )}

          {/* Context Badge */}
          {!isMinimized && context.type && (
            <div className="chatbot-context">
              <Chip
                size="small"
                icon={<EmojiObjectsIcon style={{ fontSize: 16 }} />}
                label={`Helping with: ${context.title || context.type}`}
                style={{ fontSize: 11, fontWeight: 500 }}
                color="primary"
                variant="outlined"
              />
            </div>
          )}

          {/* Tip Banner */}
          {!isMinimized && showTip && (
            <div className="tip-banner">
              <LightbulbIcon style={{ fontSize: 18, marginRight: 8, color: '#ffc107' }} />
              <span>💡 Tip: Ask me anything about your progress, next steps, or features!</span>
            </div>
          )}

          {/* Celebration Overlay */}
          {showCelebration && (
            <div className="celebration-overlay">
              <div className="celebration-content">
                🎉 Awesome! {streakCount} messages! 🎉
              </div>
            </div>
          )}

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="chatbot-messages">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.sender === 'bot' ? 'bot-message' : 'user-message'} ${message.animated ? 'animated-entry' : ''}`}
                  >
                    {message.sender === 'bot' && (
                      <Avatar
                        src={settings.botAvatar}
                        alt={settings.botName}
                        style={{ width: 32, height: 32, marginRight: 10 }}
                      >
                        <BotIcon style={{ fontSize: 18 }} />
                      </Avatar>
                    )}
                    <div className="message-content">
                      {message.emoji && (
                        <span className="message-emoji">{message.emoji}</span>
                      )}
                      <div className="message-text">{message.text}</div>
                      {message.learningTip && (
                        <div className="learning-tip">
                          <LightbulbIcon style={{ fontSize: 14, marginRight: 4 }} />
                          {message.learningTip}
                        </div>
                      )}
                      <div className="message-time">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                      {message.suggestedActions && (
                        <div className="suggested-actions">
                          {message.suggestedActions.map((action, idx) => (
                            <button
                              key={idx}
                              className="action-button"
                              onClick={() => handleActionClick(action)}
                            >
                              {action.icon && <span className="action-icon">{action.icon}</span>}
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="message bot-message">
                    <Avatar
                      src={settings.botAvatar}
                      alt={settings.botName}
                      style={{ width: 32, height: 32, marginRight: 10 }}
                    >
                      <BotIcon style={{ fontSize: 18 }} />
                    </Avatar>
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="chatbot-input">
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  placeholder="Ask me anything..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  variant="outlined"
                  size="small"
                />
                <IconButton
                  color="primary"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  style={{
                    backgroundColor: inputValue.trim() ? settings.primaryColor : 'transparent',
                    color: inputValue.trim() ? 'white' : 'inherit'
                  }}
                >
                  <SendIcon />
                </IconButton>
              </div>
            </>
          )}
        </div>
      )}
    </div>,
    document.body
  );
};

/**
 * Enhanced AI Response Generator with Learning Focus
 */
const generateBotResponse = (userInput, context, streak) => {
  const input = userInput.toLowerCase();

  // Milestone celebrations
  if (streak > 0 && streak % 5 === 0) {
    return {
      text: `🎉 Wow! That's ${streak} messages! You're really engaging with your learning. I love your enthusiasm! What else can I help you discover?`,
      emoji: '🌟',
      learningTip: 'Active learning through questions accelerates your progress!',
      actions: [
        { label: '📊 Check my progress', prompt: 'Show my progress', icon: '📊' },
        { label: "🎯 What's next?", prompt: 'What should I do next?', icon: '🎯' },
      ],
    };
  }

  // Context-aware responses for courses
  if (context.type === 'course') {
    if (input.includes('help') || input.includes('stuck') || input.includes('confused')) {
      return {
        text: `I can see you're working on "${context.title}". Don't worry - getting stuck is part of learning! Let me help you:`,
        emoji: '💪',
        learningTip: 'Studies show that struggling before finding the answer actually strengthens memory!',
        actions: [
          { label: '📖 Explain this lesson differently', prompt: 'Explain this lesson in simple terms', icon: '📖' },
          { label: '📚 Show me resources', prompt: 'Show additional learning resources', icon: '📚' },
          { label: '👥 Connect with mentor', prompt: 'Find a mentor to help', icon: '👥' },
          { label: '⭐ Mark for review', prompt: 'Mark this lesson to review later', icon: '⭐' },
        ],
      };
    }

    if (input.includes('progress') || input.includes('how far') || input.includes('completion')) {
      const progress = context.userProgress || 45;
      const motivationMsg = progress < 30
        ? "You're off to a great start! Keep building momentum! 🚀"
        : progress < 70
        ? "You're making solid progress! You're in the sweet spot of learning! 💫"
        : "Wow! You're almost there! The finish line is in sight! 🎯";

      return {
        text: `You're ${progress}% through "${context.title}"! ${motivationMsg}\n\nYou've completed ${context.completedLessons || 12} out of ${context.totalLessons || 27} lessons.`,
        emoji: '📈',
        learningTip: `Tracking progress boosts motivation - you're ${progress}% closer to mastering this!`,
        actions: [
          { label: "What's next?", prompt: 'What lesson is next?' },
          { label: 'See certificate', prompt: 'When do I get my certificate?' },
        ],
      };
    }

    if (input.includes('next') || input.includes('continue') || input.includes('forward')) {
      return {
        text: `Great initiative! Your next lesson is "${context.nextLesson || 'Advanced Strategies'}". Ready to level up your skills?`,
        emoji: '🚀',
        learningTip: 'Taking breaks between lessons helps with information retention!',
        actions: [
          { label: '▶️ Start next lesson', prompt: 'Yes, start the next lesson now', icon: '▶️' },
          { label: '🔁 Review current lesson', prompt: 'Review this lesson first', icon: '🔁' },
          { label: "💡 Quick preview", prompt: "Give me a preview of what's coming", icon: '💡' },
        ],
        automation: {
          type: 'navigate_to_lesson',
          params: { lessonId: context.nextLessonId },
        },
      };
    }

    if (input.includes('quiz') || input.includes('test') || input.includes('practice')) {
      return {
        text: `Love your proactive approach! Testing yourself is one of the best learning strategies. Want to try a quick knowledge check?`,
        emoji: '🎓',
        learningTip: 'Self-testing improves long-term retention by 50%!',
        actions: [
          { label: '✅ Quick quiz', prompt: 'Give me a quick quiz', icon: '✅' },
          { label: '🎯 Practice exercises', prompt: 'Show practice exercises', icon: '🎯' },
          { label: '📝 Review key points', prompt: 'Summarize key points', icon: '📝' },
        ],
      };
    }
  }

  // Community context
  if (context.type === 'community') {
    if (input.includes('post') || input.includes('share') || input.includes('discuss')) {
      return {
        text: `Great idea to engage with the community! In "${context.title}", you have ${context.activeMemberCount || 124} active members ready to connect.`,
        emoji: '💬',
        learningTip: 'Peer learning increases understanding by 90% - teaching others helps you learn!',
        actions: [
          { label: '✍️ Create a post', prompt: 'Help me write an engaging post', icon: '✍️' },
          { label: '🔥 Trending topics', prompt: 'What are people talking about?', icon: '🔥' },
          { label: '👥 Find members', prompt: 'Who should I connect with?', icon: '👥' },
        ],
      };
    }

    if (input.includes('member') || input.includes('connect') || input.includes('network')) {
      return {
        text: `Networking is key! I found ${context.activeMemberCount || 124} members here. Many are discussing "${context.trendingTopic || 'success strategies'}". Want me to help you connect?`,
        emoji: '🤝',
        learningTip: 'Building relationships with peers creates accountability and accelerates growth!',
        actions: [
          { label: '👋 Introduce me', prompt: 'Introduce me to relevant members', icon: '👋' },
          { label: '🔍 Find similar interests', prompt: 'Find members with similar goals', icon: '🔍' },
          { label: '💡 Collaboration ideas', prompt: 'Suggest collaboration opportunities', icon: '💡' },
        ],
      };
    }
  }

  // Membership context
  if (context.type === 'membership') {
    if (input.includes('plan') || input.includes('upgrade') || input.includes('features')) {
      const upgradeAvailable = context.canUpgrade;
      return {
        text: upgradeAvailable
          ? `You're on the "${context.planName || 'Pro'}" plan! Want to unlock even more? Premium includes exclusive courses, 1-on-1 coaching, and advanced features! 🚀`
          : `You're on our "${context.planName || 'Premium'}" plan - you have access to EVERYTHING! 🎉 You're maximizing your learning potential!`,
        emoji: upgradeAvailable ? '⬆️' : '⭐',
        learningTip: upgradeAvailable ? 'Investing in yourself is the best investment you can make!' : 'Make the most of your premium features!',
        actions: upgradeAvailable
          ? [
              { label: '📊 Compare plans', prompt: 'Show me plan comparison', icon: '📊' },
              { label: '✨ See premium benefits', prompt: 'What do I get with premium?', icon: '✨' },
              { label: '🚀 Upgrade now', prompt: 'I want to upgrade', icon: '🚀' },
            ]
          : [
              { label: '🎓 Browse courses', prompt: 'Show all courses', icon: '🎓' },
              { label: '👥 Join community', prompt: 'Access private community', icon: '👥' },
              { label: '📈 Track progress', prompt: 'Show my stats', icon: '📈' },
            ],
      };
    }
  }

  // General helpful responses
  if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
    return {
      text: `Hello there! 👋 I'm excited to help you learn and grow! I know all about your courses, community, and account. What would you like to explore?`,
      emoji: '😊',
      learningTip: "Pro tip: I'm most helpful when you ask specific questions!",
      actions: [
        { label: '📚 My courses', prompt: 'Show my courses and progress', icon: '📚' },
        { label: "💬 Community", prompt: "What's happening in the community?", icon: '💬' },
        { label: "🎯 Recommendations", prompt: 'What should I focus on?', icon: '🎯' },
      ],
    };
  }

  if (input.includes('thank') || input.includes('appreciate')) {
    return {
      text: `You're so welcome! 😊 Your positive attitude makes learning a joy! Keep up the amazing work - you're doing great!`,
      emoji: '🙏',
      learningTip: 'Gratitude mindset enhances learning and memory formation!',
      actions: [
        { label: "💪 Keep learning", prompt: "What's next for me?", icon: '💪' },
      ],
    };
  }

  if (input.includes('tip') || input.includes('advice') || input.includes('suggestion')) {
    const tips = [
      'Set specific learning goals for each session - it boosts focus by 42%!',
      'Take a 5-minute break every 25 minutes - the Pomodoro technique works!',
      "Teach someone else what you learned - it's the fastest way to master a topic!",
      'Review your notes within 24 hours - it dramatically improves retention!',
      'Create a consistent study environment - your brain will thank you!',
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    return {
      text: `Here's a powerful learning tip: ${randomTip}`,
      emoji: '💡',
      learningTip: 'Want more tips? Just ask!',
      actions: [
        { label: '💡 Another tip', prompt: 'Give me another tip', icon: '💡' },
        { label: '📖 Apply it now', prompt: 'How do I apply this?', icon: '📖' },
      ],
    };
  }

  // Default engaging response
  return {
    text: `I'm here to help you succeed! I understand you're asking about "${userInput}". ${
      context.type
        ? `Since you're in your ${context.type} area, I can provide specific guidance!`
        : 'Let me know what you need!'
    } 🚀`,
    emoji: '🤔',
    learningTip: 'Be specific with your questions to get the most helpful answers!',
    actions: [
      { label: '📚 Course help', prompt: 'Help me with my courses', icon: '📚' },
      { label: '💬 Community help', prompt: 'Help me in the community', icon: '💬' },
      { label: '⚙️ Account help', prompt: 'Help with my account', icon: '⚙️' },
    ],
  };
};

export default AIChatbotWidget;
