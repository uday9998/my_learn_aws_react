import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import axios from 'axios';
import Router from 'routes/router';
import Container from 'views/layout/AdminContainer';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { authUserSelector } from 'state/modules/common/selectors';
import ScriptGeneratorForm from './components/ScriptGeneratorForm';
import GeneratedScript from './components/GeneratedScript';
import AISuggestionsPanel from './components/AISuggestionsPanel';
import LoadingPopup from './components/LoadingPopup';
import ScriptGenerator from './ScriptGenerator';
import SuggestionManager from './SuggestionManager';
import './ContentAI.scss';

class ContentAIContainer extends Component {
   static propTypes = {
      authUser: PropTypes.object,
      location: PropTypes.object,
      goTo: PropTypes.func,
   };

   constructor(props) {
      super(props);
      this.state = {
         // Form inputs
         videoTitle: '',
         targetAudience: ['Beginners'],
         targetDuration: '3-5 min',
         toneOfVoice: 'Professional',
         contentType: 'YouTube Video',
         briefOverview: '',
         
         // UI state
         generatedScript: null,
         activeSection: 'introduction',
         isLoading: false,
         error: null,
         
         // Generated content
         estimatedDuration: '9 minutes',
         scriptSections: {
            introduction: {
               content: '',
               duration: '2 min',
               context: '',
               overview: ''
            },
            mainContent: {
               content: '',
               duration: '5 min'
            },
            conclusion: {
               content: '',
               duration: '2 min'
            }
         },
         aiSuggestions: {
            improvements: [
               {
                  title: "Script Enhancement",
                  description: "Your introduction would be more engaging with a stronger hook. Here are some options:",
                  options: [
                     '"Did you know that 73% of new businesses fail at digital marketing within the first year?"',
                     '"Feeling overwhelmed by all the digital marketing advice out there? Let\'s focus on what works."'
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
                  description: 'Add phrases like "digital marketing strategy" to improve searchability'
               },
               {
                  title: "Engagement Tips",
                  description: "Add 2-3 questions throughout to encourage comments"
               },
               {
                  title: "Pacing Advice",
                  description: "Script seems dense - consider cutting 20% for better retention"
               }
            ]
         }
      };

      // Initialize API client
      this.apiClient = axios.create({
         baseURL: process.env.REACT_APP_DEEPSEEK_API_URL || 'https://api.deepseek.com',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_DEEPSEEK_API_KEY}`
         }
      });
      
      // Initialize script generator and suggestion manager
      this.scriptGenerator = new ScriptGenerator(this.apiClient);
      this.suggestionManager = new SuggestionManager(this.apiClient);
      
      // Create ref for script section
      this.generatedScriptRef = React.createRef();
   }

   componentDidMount() {
      const { location } = this.props;
      const searchParams = new URLSearchParams(location?.search || '');
      const action = searchParams.get('action');
      
      if (action) {
         this.setState({ activeAction: action });
      }
   }

   // Navigation methods
   navigateToAILanding = () => {
      const { goTo } = this.props;
      goTo('ADMIN_AI_ASSISTANT');
   };

   navigateToScripts = () => {
      const { goTo } = this.props;
      goTo('MY_SCRIPTS');
   };

   navigateToSettings = () => {
      const { goTo } = this.props;
      goTo('SCRIPT_SETTINGS');
   };

   // Form handling methods
   handleInputChange = (field, value) => {
      this.setState({ [field]: value });
   };

   toggleAudienceSelection = (audience) => {
      this.setState(prevState => {
         const currentAudience = [...prevState.targetAudience];
         if (currentAudience.includes(audience)) {
            return { 
               targetAudience: currentAudience.filter(item => item !== audience) 
            };
         } else {
            return { 
               targetAudience: [...currentAudience, audience] 
            };
         }
      });
   };

   addCustomAudience = () => {
      const customAudience = prompt("Enter custom audience:");
      if (customAudience) {
         this.setState(prevState => ({
            targetAudience: [...prevState.targetAudience, customAudience]
         }));
      }
   };

   setDuration = (duration) => {
      this.setState({ targetDuration: duration });
   };

   // Scroll to generated script with animation
   scrollToGeneratedScript = () => {
      if (this.generatedScriptRef.current) {
         this.generatedScriptRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
         });
      }
   };

   // Main generation method
   generateScript = async () => {
      this.setState({ isLoading: true, error: null });
      
      try {
         const { 
            videoTitle, 
            targetAudience, 
            targetDuration, 
            toneOfVoice, 
            contentType,
            briefOverview
         } = this.state;
         
         // Generate the script using ScriptGenerator
         const scriptResult = await this.scriptGenerator.generateScript(
            videoTitle,
            targetAudience,
            targetDuration,
            toneOfVoice,
            contentType,
            briefOverview
         );
         
         // Update state with generated script
         this.setState({
            generatedScript: true,
            scriptSections: scriptResult.scriptSections,
            estimatedDuration: scriptResult.estimatedDuration,
            isLoading: false
         }, () => {
            // Scroll to generated script after state update
            setTimeout(this.scrollToGeneratedScript, 100);
         });
         
         // Generate suggestions in background
         this.generateSuggestions(scriptResult.scriptSections);
      } catch (error) {
         this.setState({ 
            isLoading: false, 
            error: "Failed to generate script. Please try again." 
         });
      }
   };
   
   cancelScriptGeneration = () => {
      this.scriptGenerator.cancelGeneration();
      this.setState({ isLoading: false });
   };

   // Suggestions methods
   generateSuggestions = async (scriptSections) => {
      try {
         const suggestions = await this.suggestionManager.generateSuggestions(
            scriptSections,
            this.state.videoTitle,
            this.state.targetAudience
         );
         
         this.setState({ aiSuggestions: suggestions });
      } catch (error) {
      }
   };

   useAISuggestion = (suggestion) => {
      this.setState(prevState => {
         const updatedSections = {...prevState.scriptSections};
         updatedSections.introduction.content = suggestion;
         
         return { scriptSections: updatedSections };
      });
   };

   // Section management methods
   regenerateSection = async () => {
      const { activeSection, scriptSections, videoTitle, targetAudience, toneOfVoice } = this.state;
      this.setState({ isLoading: true });
      
      try {
         const regeneratedSection = await this.scriptGenerator.regenerateSection(
            activeSection,
            scriptSections[activeSection],
            videoTitle,
            targetAudience,
            toneOfVoice
         );
         
         this.setState(prevState => {
            const updatedSections = {...prevState.scriptSections};
            updatedSections[activeSection] = regeneratedSection;
            
            return { 
               scriptSections: updatedSections,
               isLoading: false
            };
         });
      } catch (error) {
         this.setState({ 
            isLoading: false, 
            error: "Failed to regenerate section. Please try again." 
         });
      }
   };

   deleteSection = () => {
      const { activeSection } = this.state;
      
      this.setState(prevState => {
         const updatedSections = {...prevState.scriptSections};
         
         if (activeSection === 'introduction') {
            updatedSections.introduction = {
               content: '',
               duration: '2 min',
               context: '',
               overview: ''
            };
         } else {
            updatedSections[activeSection] = {
               ...updatedSections[activeSection],
               content: ''
            };
         }
         
         return { scriptSections: updatedSections };
      });
   };

   // Script action methods
   addVisuals = () => {
   };

   editScript = () => {
   };

   copyScript = () => {
      const { scriptSections } = this.state;
      const scriptText = `Introduction:
${scriptSections.introduction.content}
${scriptSections.introduction.context}
${scriptSections.introduction.overview}

Main Content:
${scriptSections.mainContent.content}

Conclusion:
${scriptSections.conclusion.content}`;
      
      navigator.clipboard.writeText(scriptText)
         .then(() => alert("Script copied to clipboard!"))
         .catch(() => alert("Failed to copy script. Please try again."));
   };

   exportScript = () => {
      const { scriptSections } = this.state;
      const scriptText = `Introduction:
${scriptSections.introduction.content}
${scriptSections.introduction.context}
${scriptSections.introduction.overview}

Main Content:
${scriptSections.mainContent.content}

Conclusion:
${scriptSections.conclusion.content}`;
      
      const blob = new Blob([scriptText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'script.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
   };

   createMiestroLesson = () => {
   };

   createVideoMembership = () => {
   };

   render() {
      const { 
         videoTitle, 
         targetAudience, 
         targetDuration, 
         toneOfVoice, 
         contentType,
         briefOverview, 
         generatedScript,
         scriptSections,
         aiSuggestions,
         estimatedDuration,
         isLoading,
         error
      } = this.state;

      return (
         <>
            <MobileHeader>
               <SiteHeader
                  isLeftAction
                  goToBack={this.navigateToAILanding}
                  title="Content Assistant"
               />
            </MobileHeader>
            <Container>
               <Container.Content>
                  <div className="content-ai-container">
                     <div className="content-ai-header">
                        <button 
                           className="back-button" 
                           onClick={this.navigateToAILanding}
                        >
                           ← Back to Assistants
                        </button>
                        <h1>Content Assistant</h1>
                        <p>Create better content, faster</p>
                     </div>

                     <div className="content-ai-interface">
                        <div className="content-container">
                           <div className="generator-form-container">
                              {error && <div className="error-message">{error}</div>}
                              
                              <ScriptGeneratorForm 
                                 videoTitle={videoTitle}
                                 targetAudience={targetAudience}
                                 targetDuration={targetDuration}
                                 toneOfVoice={toneOfVoice}
                                 contentType={contentType}
                                 briefOverview={briefOverview}
                                 handleInputChange={this.handleInputChange}
                                 toggleAudienceSelection={this.toggleAudienceSelection}
                                 addCustomAudience={this.addCustomAudience}
                                 setDuration={this.setDuration}
                                 generateScript={this.generateScript}
                              />
                              
                              <LoadingPopup 
                                 isVisible={isLoading}
                                 onCancel={this.cancelScriptGeneration}
                                 scriptType={contentType}
                              />
                              
                              {generatedScript && (
                                 <div ref={this.generatedScriptRef}>
                                    <GeneratedScript 
                                       scriptSections={scriptSections}
                                       estimatedDuration={estimatedDuration}
                                       editScript={this.editScript}
                                       copyScript={this.copyScript}
                                       exportScript={this.exportScript}
                                       regenerateSection={this.regenerateSection}
                                       deleteSection={this.deleteSection}
                                       addVisuals={this.addVisuals}
                                    />
                                 </div>
                              )}
                           </div>
                           
                           {generatedScript && (
                              <AISuggestionsPanel 
                                 aiSuggestions={aiSuggestions}
                                 useAISuggestion={this.useAISuggestion}
                                 createMiestroLesson={this.createMiestroLesson}
                                 createVideoMembership={this.createVideoMembership}
                                 scrollToGeneratedScript={this.scrollToGeneratedScript}
                              />
                           )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentAIContainer);