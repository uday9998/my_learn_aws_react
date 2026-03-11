import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from 'state/modules/settings/selectors';
import {
   setInput as setInputAction, cancelChanges as cancelChangesAction, setCreateModalOpenAction,
   setScriptInput as setScriptInputAction, chooseScript as chooseScriptAction, emptyScript as emptyScriptAction,
} from 'state/modules/settings/actions';
import * as operations from 'state/modules/settings/operations';
import getFormFields from 'utils/getFormfields';
import getDeff from 'utils/getDeff';
import withLoading from 'utils/withLoading';
import Mainhub from 'views/pages/Settings/Mainhub';

const SettingsLoading = withLoading('div');

class SettingsContainer extends Component {
   static propTypes = {
      setSettings: PropTypes.func.isRequired,
      setInput: PropTypes.func.isRequired,
      putSettings: PropTypes.func.isRequired,
      createLink: PropTypes.func.isRequired,
      updateLink: PropTypes.func.isRequired,
      deleteLink: PropTypes.func.isRequired,
      cancelChanges: PropTypes.func.isRequired,
      dataIsFetching: PropTypes.bool.isRequired,
      allSettings: PropTypes.object.isRequired,
      customLinksReorder: PropTypes.func,
      createLinkModalOpen: PropTypes.bool,
      isCustomLinksButtonDisabled: PropTypes.bool,
      setCreateModalOpen: PropTypes.func,
      putSettingsInProgress: PropTypes.bool,
      createScript: PropTypes.func,
      getScripts: PropTypes.func,
      getScriptsInProgress: PropTypes.bool,
      scripts: PropTypes.array,
      setScriptInput: PropTypes.func,
      chooseScript: PropTypes.func,
      currentScript: PropTypes.object,
      newScript: PropTypes.string,
      emptyScript: PropTypes.func,
      deleteScript: PropTypes.func,
      updateScript: PropTypes.func,
      mainhubSettings: PropTypes.object,
   };

   constructor(props) {
      super(props);
      this.state = {
         customLinkFields: {
            text: '',
            href: '',
            position: '',
            target: '_blank',
            color: '',
         },
         isHeader: true,
      };
      this.currentSettings = {};
      this.currentTab = 'mainhub';
      this.formKeys = {
         mainhub: {
            links: ['custom_links'],
            privacy: ['privacy', 'terms'],
         },
      };
   }


   async componentDidMount() {
      const { setSettings } = this.props;
      await setSettings('mainhub');
      const { allSettings } = this.props;
      this.currentSettings = allSettings.mainhub;
   }

   componentDidUpdate() {
      const { mainhubSettings } = this.props;
      this.formKeys.mainhub.data = mainhubSettings;
   }

   handleInputChange = (name, value) => {
      const { setInput } = this.props;
      const target = this.currentTab;
      setInput(target, name, value);
   }

   handleScriptInputChange = (name, value) => {
      const { setScriptInput } = this.props;
      setScriptInput(name, value);
   }

   handleInternalInputChange = (name, value) => {
      this.setState((state) => {
         const { customLinkFields } = state;
         return {
            ...state,
            customLinkFields: {
               ...customLinkFields,
               [name]: value,
            },
         };
      });
   }

   createCustomLink = (inputs, header) => {
      const { createLink } = this.props;
      createLink(inputs, header);
   }


   updateCustomLink = async (inputs, header) => {
      const { updateLink } = this.props;
      const { id, ...fields } = inputs;
      await updateLink(id, fields, header);
      this.resetState();
   }

   deleteCustomLink = (id, header) => {
      const { deleteLink } = this.props;
      deleteLink(id, header);
      this.resetState();
   }

   openCustomLinkEditModal = (inputs) => {
      this.setState({
         customLinkFields: inputs,
      });
   }


   handleFormSubmit = (formName) => {
      const { putSettings } = this.props;
      const keysArray = this.formKeys[this.currentTab][formName];
      const data = this.formKeys[this.currentTab].data;
      const changedFields = getDeff(this.currentSettings, data);
      const settings = getFormFields(keysArray, changedFields);
      if (Object.keys(settings).length) {
         putSettings(settings, this.currentTab);
      }
   }


   handleCancelChanges = (formName) => {
      const { cancelChanges } = this.props;
      const keysArray = this.formKeys[this.currentTab][formName];
      const initialFields = getFormFields(keysArray, this.currentSettings);
      cancelChanges(initialFields, this.currentTab);
   }


   customLinksReorder = (data, position) => {
      const { customLinksReorder, mainhubSettings } = this.props;
      const { items } = mainhubSettings.custom_links;
      const obj = {};
      let newCustomLinks = [];
      [...data].forEach((item, index) => {
         const id = item.id;
         const order = index + 1;
         obj[id] = order;
      });
      if (position === 'header') {
         const footerLinks = Object.values(items).filter(child => (child.position === 'f_left' || child.position === 'f_right'));
         newCustomLinks = [...data, ...footerLinks];
      } else if (position === 'footer') {
         const headerLinks = Object.values(items).filter(child => (child.position === 'left' || child.position === 'right'));
         newCustomLinks = [...headerLinks, ...data];
      }
      customLinksReorder(obj, newCustomLinks);
   }

   openCreateCustomLinkModal = (data, isHeader) => {
      this.setState({ isHeader });
      const { setCreateModalOpen } = this.props;
      setCreateModalOpen(data);
      this.resetState();
   }


   createScript = (script) => {
      const { createScript } = this.props;
      createScript(script);
   }


   resetState() {
      this.setState({
         customLinkFields: {
            text: '',
            href: '',
            position: '',
            target: '_blank',
            color: '',
         },
      });
   }


   render() {
      const {
         mainhubSettings, dataIsFetching,
         createLinkModalOpen, isCustomLinksButtonDisabled, putSettingsInProgress, getScripts,
         getScriptsInProgress, scripts, chooseScript, currentScript, newScript, emptyScript, deleteScript, updateScript,
      } = this.props;
      const {
         customLinkFields,
         isHeader,
      } = this.state;
      return (
         <SettingsLoading isLoading={ dataIsFetching }>
            <Mainhub
               mainhubSettings={ mainhubSettings }
               customLinkFields={ customLinkFields }
               putSettingsInProgress={ putSettingsInProgress }
               onChange={ (name, value) => this.handleInputChange(name, value) }
               onInternalChange={ (name, value) => this.handleInternalInputChange(name, value) }
               handleFormSubmit={ (formName) => this.handleFormSubmit(formName) }
               createCustomLink={ (inputs, header) => this.createCustomLink(inputs, header) }
               updateCustomLink={ (inputs, header) => this.updateCustomLink(inputs, header) }
               deleteCustomLink={ (id, header) => this.deleteCustomLink(id, header) }
               resetState={ () => this.resetState() }
               handleCancelChanges={ formName => this.handleCancelChanges(formName) }
               customLinksReorder={ this.customLinksReorder }
               createLinkModalOpen={ createLinkModalOpen }
               setCreateModalOpen={ this.openCreateCustomLinkModal }
               isCustomLinksButtonDisabled={ isCustomLinksButtonDisabled }
               header={ isHeader }
               createScript={ this.createScript }
               getScripts={ getScripts }
               getScriptsInProgress={ getScriptsInProgress }
               scripts={ scripts }
               handleScriptInputChange={ this.handleScriptInputChange }
               chooseScript={ chooseScript }
               currentScript={ currentScript }
               newScript={ newScript }
               emptyScript={ emptyScript }
               deleteScript={ deleteScript }
               updateScript={ updateScript }
            />
         </SettingsLoading>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      mainhubSettings: selectors.mainhubSettingsSelector(state),
      dataIsFetching: selectors.dataIsFetchingSelector(state),
      allSettings: selectors.getAllSettingsSelector(state),
      createLinkInProgress: selectors.createLinkInProgressSelector(state),
      createLinkModalOpen: selectors.createLinkModalOpenSelector(state),
      isCustomLinksButtonDisabled: selectors.customLinksButtonDisabledSelector(state),
      putSettingsInProgress: selectors.putSettingsInProgressSelector(state),
      getScriptsInProgress: selectors.getScriptsInProgressSelector(state),
      scripts: selectors.scriptsSelector(state),
      currentScript: selectors.currentScriptSelector(state),
      newScript: selectors.newScriptSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setInput: (target, key, value) => {
         dispatch(setInputAction(target, key, value));
      },
      setSettings: async (key) => {
         await dispatch(operations.settingsInitOperation(key));
      },
      putSettings: (inputs, formName) => {
         dispatch(operations.settingsPutOperation(inputs, formName));
      },
      createLink: (inputs, header) => {
         dispatch(operations.createCustomLinkOperation(inputs, header));
      },
      updateLink: (id, inputs, header) => {
         dispatch(operations.updateCustomLinkOperation(id, inputs, header));
      },
      deleteLink: (id, header) => {
         dispatch(operations.deleteCustomLinkOperation(id, header));
      },
      cancelChanges: (initialFields, currentTab) => {
         dispatch(cancelChangesAction(initialFields, currentTab));
      },
      customLinksReorder: (data, newCustomLinks) => {
         dispatch(operations.customLinksReorderOperation(data, newCustomLinks));
      },
      setCreateModalOpen: (data) => {
         dispatch(setCreateModalOpenAction(data));
      },
      createScript: (value) => {
         dispatch(operations.createScriptOperation(value));
      },
      getScripts: () => {
         dispatch(operations.getScriptsOperation());
      },
      deleteScript: (id) => {
         dispatch(operations.deleteScriptOperation(id));
      },
      updateScript: (value) => {
         dispatch(operations.updateScriptOperation(value));
      },
      setScriptInput: (key, value) => {
         dispatch(setScriptInputAction(key, value));
      },
      chooseScript: (id) => {
         dispatch(chooseScriptAction(id));
      },
      emptyScript: () => {
         dispatch(emptyScriptAction());
      },
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
