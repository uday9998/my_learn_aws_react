/**
 * AI Admin Routes Configuration
 *
 * Import this file in your main routes configuration
 *
 * Example usage:
 * import { aiRoutes } from '@/containers/pages/admin/ai/aiRoutes';
 * const routes = [...yourExistingRoutes, ...aiRoutes];
 */

import {
  CourseOutlineGenerator,
  QuizGenerator,
  EmailGenerator,
  ChatbotSettings
} from './index';

export const aiRoutes = [
  {
    path: '/admin/ai/course-outline-generator',
    component: CourseOutlineGenerator,
    exact: true,
    name: 'AI Course Outline Generator',
    meta: {
      requiresAuth: true,
      title: 'Course Outline Generator - AI Tools'
    }
  },
  {
    path: '/admin/ai/quiz-generator',
    component: QuizGenerator,
    exact: true,
    name: 'AI Quiz Generator',
    meta: {
      requiresAuth: true,
      title: 'Quiz Generator - AI Tools'
    }
  },
  {
    path: '/admin/ai/email-generator',
    component: EmailGenerator,
    exact: true,
    name: 'AI Email Generator',
    meta: {
      requiresAuth: true,
      title: 'Email Generator - AI Tools'
    }
  },
  {
    path: '/admin/ai/chatbot-settings',
    component: ChatbotSettings,
    exact: true,
    name: 'AI Chatbot Settings',
    meta: {
      requiresAuth: true,
      title: 'Chatbot Settings - AI Tools'
    }
  }
];

export default aiRoutes;
