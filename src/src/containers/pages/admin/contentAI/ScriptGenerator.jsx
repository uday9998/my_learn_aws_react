import axios from 'axios';

class ScriptGenerator {
   constructor(apiClient) {
      this.apiClient = apiClient;
      this.pendingRequest = null;
   }
   
   cancelGeneration() {
      if (this.pendingRequest) {
         this.pendingRequest.cancel();
      }
   }
   
   async generateScript(videoTitle, targetAudience, targetDuration, toneOfVoice, contentType, briefOverview) {
      try {
         const targetDurationMinutes = this.extractDurationMinutes(targetDuration);
         
         const scriptSections = this.generateTemplateScript(
            videoTitle,
            targetAudience,
            targetDurationMinutes,
            toneOfVoice,
            briefOverview
         );
         
         const estimatedDuration = `${Math.ceil(targetDurationMinutes * 0.9)} minutes`;
         
         this.enhanceScriptInBackground(scriptSections, videoTitle, targetAudience, toneOfVoice, contentType, briefOverview);
         
         return {
            scriptSections,
            estimatedDuration
         };
      } catch (error) {
         throw error;
      }
   }
   
   extractDurationMinutes(durationString) {
      const matches = durationString.match(/(\d+)(?:-(\d+))?\s*min/i);
      if (matches) {
         if (matches[2]) {
            return Math.ceil((parseInt(matches[1]) + parseInt(matches[2])) / 2);
         } else {
            return parseInt(matches[1]);
         }
      }
      return 5;
   }
   
   generateTemplateScript(title, audience, durationMinutes, tone, overview) {
      let toneLanguage = "professional";
      let hookPrefix = "Did you know that";
      
      if (tone.toLowerCase().includes('casual')) {
         toneLanguage = "conversational";
         hookPrefix = "Hey there! Ever wondered";
      } else if (tone.toLowerCase().includes('enthusiastic')) {
         toneLanguage = "exciting";
         hookPrefix = "Wow! Can you believe that";
      } else if (tone.toLowerCase().includes('formal')) {
         toneLanguage = "formal";
         hookPrefix = "Research has demonstrated that";
      }
      
      let hook, context;
      
      if (!title) title = "this topic";
      const topicWords = title.toLowerCase().split(' ');
      
      if (topicWords.some(word => ['marketing', 'business', 'sales'].includes(word))) {
         hook = `${hookPrefix} 78% of businesses struggle with ${title.toLowerCase()}?`;
         context = `In today's competitive market, mastering ${title.toLowerCase()} can make the difference between success and failure.`;
      } else if (topicWords.some(word => ['tech', 'technology', 'software', 'programming', 'code', 'coding'].includes(word))) {
         hook = `${hookPrefix} mastering ${title.toLowerCase()} can boost your productivity by 300%?`;
         context = `Technology is evolving rapidly, and staying on top of ${title.toLowerCase()} is crucial for success.`;
      } else if (topicWords.some(word => ['health', 'fitness', 'diet', 'exercise', 'workout'].includes(word))) {
         hook = `${hookPrefix} just a few minutes of ${title.toLowerCase()} daily can transform your health?`;
         context = `Your well-being is your most valuable asset, and ${title.toLowerCase()} plays a crucial role in maintaining it.`;
      } else {
         hook = `${hookPrefix} most people get ${title.toLowerCase()} completely wrong?`;
         context = overview || `Understanding ${title.toLowerCase()} properly can give you a significant advantage.`;
      }
      
      const introDuration = Math.max(1, Math.ceil(durationMinutes * 0.2));
      const mainDuration = Math.max(3, Math.ceil(durationMinutes * 0.6));
      const conclusionDuration = Math.max(1, Math.ceil(durationMinutes * 0.2));
      
      let audienceSpecific = "";
      if (audience.includes('Beginners')) {
         audienceSpecific = "especially if you're just starting out";
      } else if (audience.includes('Intermediate')) {
         audienceSpecific = "even if you already have some experience";
      } else if (audience.includes('Advanced')) {
         audienceSpecific = "to take your expertise to the next level";
      }
      
      const mainContent = `Section 1: Understanding ${title} (${Math.ceil(mainDuration/3)} min)

Let's start by exploring what ${title} really means and why it matters ${audienceSpecific}. Many people misunderstand this concept, thinking it's all about technical complexity. However, the reality is that ${title} is fundamentally about solving problems and creating value.

The three key principles you need to understand are:

1. Start with the fundamentals - This forms the foundation for everything else

2. Practice deliberately and consistently - This is what differentiates beginners from experts

3. Apply your knowledge to real projects - This is often overlooked but crucial for success




Section 2: Practical Strategies (${Math.ceil(mainDuration/3)} min)

Now that we understand the basics, let's look at how to apply them in real life. Here are proven strategies that work:

Strategy 1: Begin with small, achievable projects. This works because it builds confidence while developing core skills.

Strategy 2: Use the 80/20 principle to focus on high-impact skills first. Most people skip this step, but it's essential because it delivers results faster.

Strategy 3: Join a community of like-minded learners. This might seem obvious, but peer learning accelerates progress dramatically.




Section 3: Common Pitfalls to Avoid (${Math.ceil(mainDuration/3)} min)

Even when you know what to do, there are common mistakes that can derail your progress. Let's address them:

Mistake 1: Trying to learn everything at once - Instead, focus on one skill at a time

Mistake 2: Perfectionism preventing completion - The better alternative is to finish projects even if they're imperfect

Mistake 3: Learning without application - Here's a simple fix: build something with each new skill within 48 hours`;

      const conclusion = `Now that you understand the fundamentals of ${title}, the practical strategies, and the common pitfalls to avoid, you're ready to take action.

Let's recap what we covered:

- The true meaning of ${title} and why it matters

- Three powerful strategies you can implement today

- Common mistakes to avoid on your journey


If you found this helpful, make sure to hit the like button and subscribe for more content like this. I publish new videos every week on ${title} and related topics.

In the comments below, let me know which strategy you're going to try first. I read every comment and would love to hear your thoughts.

And if you want to dive deeper into ${title}, check out the link in the description for my complete guide.

Thanks for watching, and I'll see you in the next video!`;
      
      return {
         introduction: {
            content: hook,
            context: context,
            overview: `In this video, we'll explore key aspects of ${title} ${audienceSpecific}.`,
            duration: `${introDuration} min`
         },
         mainContent: {
            content: mainContent,
            duration: `${mainDuration} min`
         },
         conclusion: {
            content: conclusion,
            duration: `${conclusionDuration} min`
         }
      };
   }
   
   async enhanceScriptInBackground(scriptSections, videoTitle, targetAudience, toneOfVoice, contentType, briefOverview) {
      try {
         const CancelToken = axios.CancelToken;
         const source = CancelToken.source();
         this.pendingRequest = source;
         
         const systemPrompt = `You are an expert YouTube script writer specializing in creating highly engaging, retention-optimized content. Create a professionally structured video script with clear formatting and NO placeholders. Replace all bracketed placeholders with specific, relevant content.

Your script must include:
1. Hook (0:00-0:20): Begin with a powerful attention-grabber that creates curiosity or addresses a pain point. Make viewers want to keep watching within the first 8 seconds.

2. Introduction (0:20-1:00): 
   - Briefly introduce yourself as the expert host
   - State the video's core promise/value clearly
   - Preview 3-5 specific things viewers will learn (be specific - no placeholders)
   - Include a "stick around until the end" teaser for bonus content

3. Main Content (1:00-7:00):
   - Create 3 distinct sections with clear subheadings
   - Include concrete examples, actual data points, and specific case studies
   - Add questions, tone shifts, or pattern interrupts
   - DO NOT use placeholders like [First principle] or [specific action]
   - FILL IN ALL content with relevant, specific information

4. Addressing Objections (7:00-8:00):
   - Address 2 common questions or objections with full explanations
   - Provide detailed solutions and perspectives

5. Conclusion (8:00-9:00):
   - Summarize key points with specific actionable takeaways
   - Include a clear call-to-action
   - Tease future content

IMPORTANT: Replace ALL placeholder text in brackets. DO NOT return any text containing [placeholder] or similar notations. Every piece of information should be complete and specific to the topic.`;
         
         const response = await this.apiClient.post('/v1/chat/completions', {
            model: 'deepseek-chat',
            messages: [
               {
                  role: 'system',
                  content: systemPrompt
               },
               {
                  role: 'user',
                  content: `Create a complete, detailed script for a ${contentType} titled "${videoTitle}" with NO placeholder text.
                  
Target audience: ${targetAudience.join(', ')}
Tone: ${toneOfVoice}
Overview: ${briefOverview}

Your response must include:
1. A compelling hook and introduction that expands on this initial idea: "${scriptSections.introduction.content}"
2. Three fully developed content sections with specific examples, data, and detailed explanations
3. A strong conclusion with clear next steps

DO NOT use any placeholder text like [First principle] or [specific action]. Replace ALL such placeholders with real, specific content related to ${videoTitle}.

Current context to build from:
${scriptSections.introduction.context}

Current overview to expand:
${scriptSections.introduction.overview}`
               }
            ],
            max_tokens: 1500,
            temperature: 1.5,
            cancelToken: source.token,
            timeout: 15000
         });
         
         const scriptContent = response.data.choices[0].message.content;
         return this.processScriptResponse(scriptContent, scriptSections);
      } catch (error) {
         return {
            scriptSections: scriptSections,
            estimatedDuration: this.calculateDuration(scriptSections)
         };
      }
   }
   
   processScriptResponse(content, currentSections) {
      try {
         const sections = { ...currentSections };
         
         const hookMatch = content.match(/Hook.*?:(.*?)(?=Introduction|$)/s);
         const introMatch = content.match(/Introduction.*?:(.*?)(?=Main Content|$)/s);
         
         if (hookMatch && hookMatch[1]) {
            const hookContent = hookMatch[1].trim();
            if (hookContent.length > 10) {
               sections.introduction.context = hookContent;
            }
         }
         
         if (introMatch && introMatch[1]) {
            const introContent = introMatch[1].trim();
            
            const hostMatch = introContent.match(/Host:\s*\n"(.*?)"/s);
            if (hostMatch && hostMatch[1] && hostMatch[1].length > 10) {
               sections.introduction.content = hostMatch[1].trim();
            } else if (introContent.length > 20) {
               sections.introduction.content = introContent.split('\n')[0].trim();
            }
            
            const previewMatch = introContent.match(/Preview.*?:(.*?)(?=\n|$)/s);
            if (previewMatch && previewMatch[1] && previewMatch[1].length > 10) {
               sections.introduction.overview = previewMatch[1].trim();
            }
         }
         
         const mainMatch = content.match(/Main Content.*?:(.*?)(?=(?:Addressing Objections|Conclusion)|$)/s);
         if (mainMatch && mainMatch[1] && mainMatch[1].length > 100) {
            let processedContent = mainMatch[1].trim();
            
            processedContent = processedContent.replace(/\[.*?\]/g, '');
            processedContent = processedContent.replace(/\*\*/g, '');
            processedContent = processedContent.replace(/#/g, '');
            
            processedContent = processedContent.replace(/Section \d+:(.*?)(?=Section \d+:|$)/gs, (match, sectionContent) => {
               const lines = sectionContent.split('\n').filter(line => line.trim() !== '');
               const formattedSection = lines.join('\n\n');
               return `Section${sectionContent.split(':')[0]}:${formattedSection}\n\n\n\n\n`;
            });
            
            sections.mainContent.content = processedContent;
         }
         
         const objectionMatch = content.match(/Addressing Objections.*?:(.*?)(?=Conclusion|$)/s);
         const conclusionMatch = content.match(/Conclusion.*?:(.*?)(?=$)/s);
         
         let conclusion = '';
         if (objectionMatch && objectionMatch[1] && objectionMatch[1].length > 20) {
            let processedObjections = objectionMatch[1].trim();
            processedObjections = processedObjections.replace(/\[.*?\]/g, '');
            processedObjections = processedObjections.replace(/\*\*/g, '');
            processedObjections = processedObjections.replace(/#/g, '');
            
            conclusion += "ADDRESSING COMMON QUESTIONS:\n\n" + processedObjections + "\n\n\n";
         }
         
         if (conclusionMatch && conclusionMatch[1] && conclusionMatch[1].length > 50) {
            let processedConclusion = conclusionMatch[1].trim();
            processedConclusion = processedConclusion.replace(/\[.*?\]/g, '');
            processedConclusion = processedConclusion.replace(/\*\*/g, '');
            processedConclusion = processedConclusion.replace(/#/g, '');
            
            processedConclusion = processedConclusion.split('\n')
               .filter(line => line.trim() !== '')
               .join('\n\n');
            
            conclusion += processedConclusion;
            sections.conclusion.content = conclusion;
         }
         
         return {
            scriptSections: sections,
            estimatedDuration: this.calculateDuration(sections)
         };
      } catch (error) {
         return {
            scriptSections: currentSections,
            estimatedDuration: this.calculateDuration(currentSections)
         };
      }
   }
   
   calculateDuration(sections) {
      const introTime = this.parseDuration(sections.introduction.duration);
      const mainTime = this.parseDuration(sections.mainContent.duration);
      const conclusionTime = this.parseDuration(sections.conclusion.duration);
      
      const totalMinutes = introTime + mainTime + conclusionTime;
      return `${totalMinutes} minutes`;
   }
   
   parseDuration(durationString) {
      const match = durationString.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
   }
   
   countWords(text) {
      return text.split(/\s+/).filter(word => word.length > 0).length;
   }
   
   async regenerateSection(section, currentSection, videoTitle, targetAudience, toneOfVoice) {
      try {
         const regeneratedSection = this.quickRegenerateSection(section, videoTitle, targetAudience, toneOfVoice);
         
         try {
            let prompt = "";
            let systemPrompt = "";
            
            if (section === 'introduction') {
               systemPrompt = "You are an expert at writing engaging video introductions with no placeholder text.";
               prompt = `Create a compelling introduction for a video about: ${videoTitle}
Target audience: ${targetAudience.join(', ')}
Tone: ${toneOfVoice}

Your introduction must include:
1. A powerful hook that grabs attention immediately
2. Context about why this topic matters to the audience
3. An overview of what viewers will learn (be specific, no placeholders)

DO NOT use placeholder text like [specific technique] or [key concept]. Replace ALL placeholders with actual, specific content related to ${videoTitle}.`;
            } else if (section === 'mainContent') {
               systemPrompt = "You are an expert at writing structured, engaging video main content with no placeholder text.";
               prompt = `Create detailed main content for a video about: ${videoTitle}
Target audience: ${targetAudience.join(', ')}
Tone: ${toneOfVoice}

Your main content must include:
1. Three distinct sections with clear subheadings
2. Specific examples, actual data points, and detailed explanations for each point
3. Pattern interrupts like questions or tone shifts every 60-90 seconds

DO NOT use placeholder text like [First principle] or [specific action]. Replace ALL placeholders with actual, specific content related to ${videoTitle}.`;
            } else if (section === 'conclusion') {
               systemPrompt = "You are an expert at writing effective video conclusions with no placeholder text.";
               prompt = `Create a compelling conclusion for a video about: ${videoTitle}
Target audience: ${targetAudience.join(', ')}
Tone: ${toneOfVoice}

Your conclusion must include:
1. A summary of the key points covered in the video
2. Specific actionable steps viewers can take right away
3. A clear call-to-action (like, subscribe, comment)
4. A tease for future content

DO NOT use placeholder text like [key takeaway] or [next steps]. Replace ALL placeholders with actual, specific content related to ${videoTitle}.`;
            }
            
            const response = await this.apiClient.post('/v1/chat/completions', {
               model: 'deepseek-chat',
               messages: [
                  {
                     role: 'system',
                     content: systemPrompt
                  },
                  {
                     role: 'user',
                     content: prompt
                  }
               ],
               max_tokens: 500,
               temperature: 0.7,
               timeout: 8000
            });
            
            const newContent = response.data.choices[0].message.content;
            
            if (newContent && newContent.length > 20) {
               let cleanContent = newContent
                  .replace(/\[.*?\]/g, '')
                  .replace(/\*\*/g, '')
                  .replace(/#/g, '')
                  .trim();
                  
               cleanContent = cleanContent.split('\n')
                  .filter(line => line.trim() !== '')
                  .join('\n\n');
                  
               if (section === 'introduction') {
                  regeneratedSection.content = cleanContent;
               } else {
                  regeneratedSection.content = cleanContent;
               }
            }
         } catch (error) {
         }
         
         return regeneratedSection;
      } catch (error) {
         throw error;
      }
   }
   
   quickRegenerateSection(section, videoTitle, targetAudience, toneOfVoice) {
      const topic = videoTitle || "this topic";
      let audienceStr = targetAudience.join(', ');
      let toneStr = toneOfVoice.toLowerCase();
      
      if (section === 'introduction') {
         return {
            content: `Want to know the secret that top performers use with ${topic}?`,
            context: `Understanding ${topic} properly can give you a significant advantage in today's competitive environment.`,
            overview: `You'll learn essential strategies for mastering ${topic}, common pitfalls to avoid, and actionable steps to implement today.`,
            duration: "2 min"
         };
      } else if (section === 'mainContent') {
         return {
            content: "",
            duration: "5 min"
         };
      } else if (section === 'conclusion') {
         return {
            content: "",
            duration: "2 min"
         };
      }
      
      return currentSection;
   }
}

export default ScriptGenerator;