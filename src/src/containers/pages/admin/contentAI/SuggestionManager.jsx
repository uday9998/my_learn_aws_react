import axios from 'axios';

class SuggestionManager {
   constructor(apiClient) {
      this.apiClient = apiClient;
   }
   
   // Generate AI suggestions for the script
   async generateSuggestions(scriptSections, videoTitle, targetAudience) {
      try {
         // Generate pre-built suggestions based on topic
         const suggestions = this.generateDefaultSuggestions(videoTitle, targetAudience);
         
         // Try to enhance with API call in background
         try {
            const scriptToAnalyze = `
Introduction:
${scriptSections.introduction.content}

Main Content:
${scriptSections.mainContent.content}

Conclusion:
${scriptSections.conclusion.content}
            `;
            
            const suggestionsResponse = await this.apiClient.post('/v1/chat/completions', {
               model: 'deepseek-chat',
               messages: [
                  {
                     role: 'system',
                     content: `You are an AI content optimization expert. Analyze the script and provide suggestions in this exact JSON format:
{
  "hookOptions": [
    "Hook option 1 here",
    "Hook option 2 here"
  ],
  "seo": "SEO improvement suggestion here",
  "engagement": "Engagement improvement suggestion here",
  "pacing": "Pacing improvement suggestion here"
}

Each suggestion should be concise (under 100 characters) and actionable.
`
                  },
                  {
                     role: 'user',
                     content: `Analyze this script and provide optimization suggestions as JSON for a video about "${videoTitle || 'this topic'}"`
                  }
               ],
               max_tokens: 500,
               temperature: 0.7,
               timeout: 10000
            });
            
            const suggestionsContent = suggestionsResponse.data.choices[0].message.content;
            
            // Try to parse JSON response
            let parsedSuggestions;
            try {
               const jsonMatch = suggestionsContent.match(/```(?:json)?(.*?)```/s);
               if (jsonMatch && jsonMatch[1]) {
                  parsedSuggestions = JSON.parse(jsonMatch[1]);
               } else {
                  parsedSuggestions = JSON.parse(suggestionsContent);
               }
               
               // Update with API-generated suggestions if available
               if (parsedSuggestions.hookOptions && parsedSuggestions.hookOptions.length > 0) {
                  suggestions.improvements[0].options = parsedSuggestions.hookOptions;
               }
               
               if (parsedSuggestions.seo) {
                  suggestions.smartSuggestions[0].description = parsedSuggestions.seo;
               }
               
               if (parsedSuggestions.engagement) {
                  suggestions.smartSuggestions[1].description = parsedSuggestions.engagement;
               }
               
               if (parsedSuggestions.pacing) {
                  suggestions.smartSuggestions[2].description = parsedSuggestions.pacing;
               }
            } catch (parseError) {
            }
         } catch (error) {
         }
         
         return suggestions;
      } catch (error) {
         return this.getFallbackSuggestions();
      }
   }
   
   // Generate default suggestions based on video topic
   generateDefaultSuggestions(videoTitle, targetAudience) {
      const topic = videoTitle || 'your content';
      const audience = targetAudience && targetAudience.length > 0 ? targetAudience[0].toLowerCase() : 'viewers';
      
      // Customize hook options by topic
      let hookOptions;
      if (!videoTitle) {
         hookOptions = [
            `"Did you know that 78% of viewers decide whether to watch a video in the first 8 seconds? Let me show you how to capture their attention."`,
            `"Want to know the secret formula that top creators use to make compelling content? You're about to discover it."`
         ];
      } else {
         const topicWords = videoTitle.toLowerCase().split(' ');
         
         if (topicWords.some(word => ['marketing', 'business', 'sales'].includes(word))) {
            hookOptions = [
               `"Did you know that 83% of businesses fail at ${videoTitle} because they miss this one crucial step?"`,
               `"Want to know how top companies are using ${videoTitle} to 10x their growth this year?"`
            ];
         } else if (topicWords.some(word => ['tech', 'technology', 'software', 'programming'].includes(word))) {
            hookOptions = [
               `"What if I told you there's a way to master ${videoTitle} in half the time it takes most people?"`,
               `"The most common ${videoTitle} mistake is costing developers 20+ hours per week. Here's how to fix it."`
            ];
         } else if (topicWords.some(word => ['health', 'fitness', 'diet', 'exercise'].includes(word))) {
            hookOptions = [
               `"I discovered a ${videoTitle} hack that gave me more results in 10 minutes than most people get in an hour."`,
               `"Scientists have found that 91% of people approach ${videoTitle} completely wrong. Here's what they're missing."`
            ];
         } else {
            hookOptions = [
               `"The ${videoTitle} industry doesn't want you to know these 3 game-changing secrets..."`,
               `"I spent 5 years mastering ${videoTitle} so you don't have to. Here's what I learned."`
            ];
         }
      }
      
      // Create audience-specific SEO suggestion
      let seoSuggestion;
      if (audience.includes('beginner')) {
         seoSuggestion = `Include "beginner-friendly ${topic}" and "${topic} basics" in first 30 seconds`;
      } else if (audience.includes('intermediate')) {
         seoSuggestion = `Add "${topic} techniques" and "improve your ${topic}" for better searchability`;
      } else if (audience.includes('advanced')) {
         seoSuggestion = `Include "advanced ${topic} strategies" and "expert ${topic} tips" for target audience`;
      } else {
         seoSuggestion = `Add "${topic}" 3-4 times throughout the video, especially in first 60 seconds`;
      }
      
      // Build complete suggestions object
      return {
         improvements: [
            {
               title: "Script Enhancement",
               description: "Your introduction would be more engaging with a stronger hook. Here are some options:",
               options: hookOptions
            }
         ],
         improvementOptions: [
            "Make more engaging",
            "Add data points", 
            "Simplify language", 
            "Optimize length"
         ],
         smartSuggestions: [
            {
               title: "SEO Optimization",
               description: seoSuggestion
            },
            {
               title: "Engagement Tips",
               description: "Ask viewers a direct question at 1:30 and 3:00 to increase comment rate"
            },
            {
               title: "Pacing Advice",
               description: "Add a pattern interrupt every 60-90 seconds to maintain attention"
            }
         ]
      };
   }
   
   // Fallback suggestions if everything fails
   getFallbackSuggestions() {
      return {
         improvements: [
            {
               title: "Script Enhancement",
               description: "Your introduction would be more engaging with a stronger hook. Here are some options:",
               options: [
                  "Did you know that 73% of viewers decide whether to continue watching in the first 10 seconds?",
                  "Feeling overwhelmed by all the advice out there? Let's focus on what actually works."
               ]
            }
         ],
         improvementOptions: [
            "Make more engaging",
            "Add data points", 
            "Simplify language", 
            "Optimize length"
         ],
         smartSuggestions: [
            {
               title: "SEO Optimization",
               description: 'Include relevant keywords in your introduction and repeat them naturally throughout'
            },
            {
               title: "Engagement Tips",
               description: "Ask 2-3 questions throughout to encourage comments and boost engagement"
            },
            {
               title: "Pacing Advice",
               description: "Consider cutting 20% of your content and adding more visual instructions"
            }
         ]
      };
   }
   
   // Extract suggestions from text if JSON parsing fails
   extractQuotedSuggestions(content) {
      const suggestions = [];
      const regex = /"([^"]+)"/g;
      let match;
      
      while ((match = regex.exec(content)) !== null) {
         suggestions.push(match[1]);
      }
      
      if (suggestions.length === 0) {
         const lines = content.split('\n').filter(line => line.trim().startsWith('-'));
         lines.forEach(line => {
            const cleanLine = line.replace(/^[\s\-•*]+/, '').trim();
            if (cleanLine) {
               suggestions.push(cleanLine);
            }
         });
      }
      
      return suggestions.length > 0 ? suggestions : [
         "Did you know that 73% of viewers decide whether to continue watching in the first 10 seconds?",
         "Want to know the secret that top creators use to double their engagement?"
      ];
   }
   
   // Extract a named section from text
   extractSection(content, sectionName) {
      const regex = new RegExp(`${sectionName}[:\\s]+(.*?)(?=\\n|$)`, 'i');
      const match = content.match(regex);
      return match ? match[1].trim() : '';
   }
}

export default SuggestionManager;