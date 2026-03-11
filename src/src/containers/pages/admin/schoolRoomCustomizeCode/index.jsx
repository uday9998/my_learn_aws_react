import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import AdminContainer from 'views/layout/AdminContainer';
import withLoading from 'utils/withLoading';
import './style.scss';
import { isLoadingFilesSelector, portalTemplateFilesSelector } from 'state/modules/schoolRoom/selectors';
import { getPortalTemplateFilesOperation, updatePortalCssVariablesFileOperation, updatePortalTemplateFileOperation } from 'state/modules/schoolRoom/operations';
import CustomizeTemplates from 'views/pages/SchoolRoom/CustomizeTemplates';
import Button from 'components/elements/buttons/BaseButtonNew';
import { useHistory } from 'react-router';
import ConfirmDialog from 'views/pages/SchoolRoom/CustomizeTemplates/components/ConfirmDialog';
import { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import { screenWidthSelector } from 'state/modules/common/selectors';
import { push } from 'connected-react-router';
import Router from 'routes/router';


const CustomizeWithLoading = withLoading(AdminContainer.Content);


const SchoolRoomCustomizeCodeContainer = ({
   match,
   isLoadingFiles,
   getPortalTemplateFiles,
   portalTemplateFiles,
   updatePortalTemplateFile,
   updatePortalCssVariablesFile,
   screenWidth,
   backNavigate,
}) => {
   const [localFiles, setLocalFiles] = useState({});
   const [selectedFileKey, setSelectedFileKey] = useState('theme_css');
   const [discardModal, setDiscardModal] = useState({
      isOpen: false,
      type: null,
   });
   const [nextRoute, setNextRoute] = useState('');

   const history = useHistory();

   useEffect(() => {
      const templateId = match.params.templateId;

      getPortalTemplateFiles(templateId, (data) => {
         setLocalFiles(data);
      });
   }, [match.params.templateId]);

   let unblock = () => {};

   useEffect(() => {
      unblock = history.block(({ pathname }) => {
         if (localFiles[selectedFileKey]?.content !== portalTemplateFiles[selectedFileKey]?.content) {
            setDiscardModal({
               isOpen: true,
               type: 'exit',
            });
            setNextRoute(pathname);
         } else {
            unblock();
            history.push(pathname);
         }
         return false;
      });

      return () => {
         unblock();
      };
   }, [selectedFileKey, localFiles[selectedFileKey]?.content]);

   const filesGroups = [
      {
         title: 'Theme',
         keys: ['theme_css', 'variables_css'],
      },
      {
         title: 'Header',
         keys: ['header_liquid', 'header_css'],
      },
      {
         title: 'Banner',
         keys: ['default_banner_liquid', 'banner_slider_item_liquid', 'banner_css'],
      },
      {
         title: 'Offer Card',
         keys: ['offer_card_liquid', 'offer_card_css'],
      },
      {
         title: 'Footer',
         keys: ['footer_liquid', 'footer_css'],
      },
   ];

   const isMobile = screenWidth < 1024;

   const onSelectFile = (key) => {
      if (localFiles[selectedFileKey]?.content !== portalTemplateFiles[selectedFileKey]?.content) {
         setDiscardModal({
            isOpen: true,
            type: 'change_folder',
            nextFolder: key,
         });
      } else {
         setSelectedFileKey(key);
      }
   };

   const handleChangeEditor = (val) => {
      setLocalFiles({
         ...localFiles,
         [selectedFileKey]: {
            ...localFiles[selectedFileKey],
            content: val,
         },
      });
   };

   const handleSaveChanges = (callback) => {
      if (selectedFileKey === 'variables_css') {
         updatePortalCssVariablesFile(match.params.templateId, localFiles[selectedFileKey].content);
         return;
      }
      updatePortalTemplateFile(match.params.templateId, {
         'column_name': selectedFileKey,
         'content': localFiles[selectedFileKey].content,
         'for_default': 0,
      }, (data) => {
         setLocalFiles(data);

         if (typeof callback === 'function') {
            callback();
         }
      });
   };

   const handleRevertToDefault = () => {
      updatePortalTemplateFile(match.params.templateId, {
         'column_name': selectedFileKey,
         'for_default': 1,
      }, (data) => {
         setLocalFiles(data);
      });
   };

   const discardModalActionsByType = {
      'exit': {
         onApprove: () => {
            handleSaveChanges(() => {
               history.block(() => {
                  return true;
               });
               if (nextRoute) {
                  history.push(nextRoute);
               }
            });
         },
         onCancel: () => {
            history.block(() => {
               return true;
            });
            if (nextRoute) {
               history.push(nextRoute);
            }
         },
      },
      'change_folder': {
         onApprove: () => {
            handleSaveChanges(() => {
               setSelectedFileKey(discardModal.nextFolder);
               setDiscardModal({
                  isOpen: false,
                  type: null,
               });
            });
         },
         onCancel: () => {
            setSelectedFileKey(discardModal.nextFolder);
            setDiscardModal({
               isOpen: false,
               type: null,
            });
         },
      },
   };
   
   return (
      <>
         <MobileHeader>
            <SiteHeaderMobile
               isLeftAction
               goToBack={ () => {} }
            />
         </MobileHeader>
         <AdminContainer>
            <CustomizeWithLoading
               isLoading={ isLoadingFiles || !Object.keys(localFiles).length }
            >
               <div
                  className='customize__templates__top'
               >
                  <TextWithIcon
                     inner='Customize Styles'
                     iconProps={ { onClick: () => backNavigate(), style: { cursor: 'pointer' } } }
                     type={ types.regularDefaultSmall }
                     size={ isMobile ? sizes.xxlarge : sizes.size_28 }
                  />
                  <div
                     className='customize__templates__top__right'
                  >
                     {
                        selectedFileKey !== 'variables_css' && (
                           <Button 
                              text='Revert to default'
                              onClick={ handleRevertToDefault }
                           />
                        )
                     }
                     <Button 
                        text='Discard Changes'
                        onClick={ () => {
                           handleChangeEditor(portalTemplateFiles[selectedFileKey].content);
                        } }
                        disabled={ 
                           localFiles[selectedFileKey]?.content === portalTemplateFiles[selectedFileKey]?.content 
                        }
                     />
                     <Button 
                        text='Save Changes'
                        onClick={ handleSaveChanges }
                        disabled={ 
                           localFiles[selectedFileKey]?.content === portalTemplateFiles[selectedFileKey]?.content 
                        }
                     />
                  </div>
               </div>
               <CustomizeTemplates
                  localFiles={ localFiles }
                  filesGroups={ filesGroups }
                  selectedFileKey={ selectedFileKey }
                  onSelectFile={ onSelectFile }
                  defaultFiles={ portalTemplateFiles }
                  handleChangeEditor={ handleChangeEditor }
               />
               {
                  discardModal.isOpen && (
                     <ConfirmDialog 
                        type={ discardModal.type }
                        onApprove={ () => discardModalActionsByType[discardModal.type].onApprove() }
                        onCancel={ () => discardModalActionsByType[discardModal.type].onCancel() }
                     />
                  )
               }
            </CustomizeWithLoading>
         </AdminContainer>
      </>
   );
};

SchoolRoomCustomizeCodeContainer.propTypes = {
   match: PropTypes.object,
   isLoadingFiles: PropTypes.bool,
   getPortalTemplateFiles: PropTypes.func,
   portalTemplateFiles: PropTypes.array,
   updatePortalTemplateFile: PropTypes.func,
   updatePortalCssVariablesFile: PropTypes.func,
   screenWidth: PropTypes.number,
   backNavigate: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      isLoadingFiles: isLoadingFilesSelector(state),
      portalTemplateFiles: portalTemplateFilesSelector(state),
      screenWidth: screenWidthSelector(state), 
   };
};
 
const mapDispatchToProps = (dispatch) => {
   return {
      getPortalTemplateFiles: (id, callback) => dispatch(getPortalTemplateFilesOperation(id, callback)),
      updatePortalTemplateFile: (id, data, callback) => dispatch(updatePortalTemplateFileOperation(id, data, callback)),
      updatePortalCssVariablesFile: (id, data) => {
         dispatch(updatePortalCssVariablesFileOperation(id, data)); 
      },
      backNavigate: () => {
         dispatch(push(Router.route('ADMIN_SCHOOL_ROOM').getMask()));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolRoomCustomizeCodeContainer);