// import FrameWrapper from 'components/modules/frame';
import React from 'react';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import OtherPagesEditor from 'views/pages/OtherPageEdit';
import OtherPageSideBar from 'views/pages/OtherPageEdit/Components/OtherPageEditor';
import OtherPageEditorTop from 'views/pages/OtherPageEdit/Components/OtherPageHeader';
import PropTypes from 'prop-types';
import { useApiQuery } from 'utils/hooks/useQuery';
import { getOtherPage, updateOtherPage } from 'api';
import ComponentProgress from 'components/modules/ComponentProgress';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { useHistory } from 'react-router';
import './index.scss';

export const OtherPageContext = React.createContext();

const OtherPageEdit = ({ match }) => {
   const [template, setTemplate] = React.useState([{ other_page_section: {} }]);
   const { data, loading } = useApiQuery(
      getOtherPage,
      [match.params.id],
      {
         callback: (data) => {
            if (data && data.sections.length) {
               setTemplate(data.sections);
            }
         },
      }
   );
   const sections = data && data.sections;
   const [save] = useSubmitForm(updateOtherPage);
   const [selectedMode, setSelectedMod] = React.useState('desktop');
   // const [template, setTemplate] = React.useState(testTemplateSignIn.sections); //Sign IN Template
   const [undo, setUndo] = React.useState([]);
   const [redo, setRedo] = React.useState([]);
   const [isOpenedSideBar, setIsOpenedSideBar] = React.useState(true);
   const history = useHistory();

   React.useEffect(() => {
      if (data && data.sections.length) {
         setTemplate(data.sections);
      }
   }, [data]);

   const handleSave = (isExit) => {
      save([match.params.id, { sections: template }], () => {
         if (isPrint('Template updated successfuly.')) {
            toast.success('Template updated successfuly.');
         }
         if (isExit) {
            history.goBack();
         }
      });
   };

   const handleUndo = () => {
      if (undo.length > 0) {
         const undoTemplate = JSON.parse(undo.at(-1));
         setRedo([...redo, JSON.stringify(template)]);
         setTemplate(undoTemplate);
         setUndo(undo.filter((e, index) => index !== undo.length - 1));
         return;
      }
      if (isPrint('Nothing to undo.')) {
         toast.error('Nothing to undo.');
      }
   };

   const handleRedo = () => {
      if (redo.length > 0) {
         const redoTemplate = JSON.parse(redo.at(-1));
         setTemplate(redoTemplate);
         setRedo(redo.filter((e, index) => index !== redo.length - 1));
         setUndo([...undo, JSON.stringify(template)]);
         return;
      }
      if (isPrint('Nothing to redo.')) {
         toast.error('Nothing to redo.');
      }
   };

   const changeProp = (name, value, sectionIndex = 0) => {
      setUndo([...undo, JSON.stringify(template)]);
      const newSections = [...template];
      // eslint-disable-next-line max-len
      newSections[sectionIndex].other_page_section.props = { ...newSections[sectionIndex].other_page_section.props, [name]: value };
      setTemplate(newSections);
   };
   return (
      <div className='other__page'>
         <ComponentProgress loading={ loading }>
            <OtherPageContext.Provider value={ {
               editor: true,
               changeProp,
            } }
            >
               <OtherPageEditorTop
                  handleUndo={ handleUndo }
                  handleRedo={ handleRedo }
                  handleSave={ handleSave }
                  generalProps={ template[0].other_page_section.props }
                  selectedMod={ selectedMode }
                  setSelectedMod={ setSelectedMod }
                  templateName={ template[0].other_page_section.other_page_landings?.page_type }
                  sections={ sections }
               />
               <div className='other__page__bottom'>
                  <OtherPageSideBar
                     handleChangeProp={ changeProp }
                     generalProps={ template[0].other_page_section.props }
                     type={ data ? data.tempplate.page_type : '' }
                     isOpenedSideBar={ isOpenedSideBar }
                  />
                  <div className={ `page__editor__template${ !isOpenedSideBar ? ' page__editor__template__closed' : '' }` }>
                     {/* <FrameWrapper
                           viewMode={ selectedMode }
                        > */}
                     <OtherPagesEditor
                        type={ data ? data.tempplate.page_type : '' }
                        templateName={ data ? data.tempplate.other_page_theme_name : '' }
                        isOpenEditor={ isOpenedSideBar }
                        setIsOpenEditor={ setIsOpenedSideBar }
                        generalProps={ template[0].other_page_section.props }
                        selectedMode={ selectedMode }
                     />
                     {/* </FrameWrapper> */}
                  </div>
               </div>
            </OtherPageContext.Provider>
         </ComponentProgress>
      </div>
   );
};

OtherPageEdit.propTypes = {
   match: PropTypes.object,
};

export default OtherPageEdit;
