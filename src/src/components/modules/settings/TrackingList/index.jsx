import React, { useState, useEffect } from 'react';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import PropTypes from 'prop-types';
import CustomSwitch from 'components/elements/form/CustomSwitch';
import withLoading from 'utils/withLoading';
import './index.scss';
import ScriptItem from './ScriptItem';
import AddNewScriptItem from './AddNewScriptItem';

const TrackingListLoading = withLoading('div');

const TrackingList = ({
   createScript, getScripts, getScriptsInProgress, scripts, handleScriptInputChange, chooseScript,
   currentScript, newScript, emptyScript, deleteScript, updateScript,
}) => {
   const [type, setType] = useState(0);
   const [addNewScript, setAddNewScript] = useState(false);
   useEffect(() => {
      getScripts();
   }, []);
   return (
      <DynamicWrapper
         title='Tracking Code'
         backColor='#ffffff'
         openedBackColor='#ffffff'
         openedHasShadow
         isOpen={ false }
         style={ { position: 'relative', minHeight: '170px' } }
         hasTrackingTooltip
         tooltipText='Add custom code to your portal to track page activity.'
      >
         <TrackingListLoading isLoading={ getScriptsInProgress } className='w-full' LoaderSpinnerStyle={ { position: 'absolute' } } width={ 150 } height={ 150 }>
            <div className='m-t-m '>
               <div className='CreateAutomationSwitch'>
                  <CustomSwitch
                     firstOption={ { value: 0, inner: 'Header' } }
                     secondOption={ { value: 1, inner: 'Footer' } }
                     name='domainSwitcher'
                     checked={ type }
                     onClick={ (name, value) => { setType(value); emptyScript(); setAddNewScript(false); } }
                     checkedBackground='#7cb740'
                     checkedTextColor='#ffffff'
                     borderColor='#7cb740'
                     style={ { border: 'none', marginBottom: '16px' } }
                  />
               </div>
               {/* {type === 0 && scripts && scripts.map(script => { */}
               {/*   if (script.type === 'head') { */}
               {/*      return ( */}
               {/*         currentScript.id === script.id */}
               {/*            ? ( */}
               {/*               <AddNewScriptItem */}
               {/*                  key={ script.id } */}
               {/*                  updateScript={ updateScript } */}
               {/*                  handleScriptInputChange={ handleScriptInputChange } */}
               {/*                  newScript={ currentScript.script } */}
               {/*                  currentScript={ currentScript } */}
               {/*                  emptyScript={ emptyScript } */}
               {/*                  addNewScript={ addNewScript } */}
               {/*                  setAddNewScript={ setAddNewScript } */}
               {/*                  type='head' */}
               {/*                  mode='edit' */}
               {/*               /> */}
               {/*            ) */}
               {/*            : ( */}
               {/*               <ScriptItem */}
               {/*                  key={ script.id } */}
               {/*                  script={ script } */}
               {/*                  chooseScript={ chooseScript } */}
               {/*                  deleteScript={ deleteScript } */}
               {/*                  emptyScript={ emptyScript } */}
               {/*                  setAddNewScript={ setAddNewScript } */}
               {/*               /> */}
               {/*            ) */}
               {/*      ); */}
               {/*   } */}
               {/*   return null; */}
               {/* })} */}
               {/* {type === 1 && scripts && scripts.map(script => { */}
               {/*   if (script.type === 'body') { */}
               {/*      return ( */}
               {/*         currentScript.id === script.id */}
               {/*            ? ( */}
               {/*               <AddNewScriptItem */}
               {/*                  key={ script.id } */}
               {/*                  updateScript={ updateScript } */}
               {/*                  handleScriptInputChange={ handleScriptInputChange } */}
               {/*                  newScript={ currentScript.script } */}
               {/*                  currentScript={ currentScript } */}
               {/*                  addNewScript={ addNewScript } */}
               {/*                  emptyScript={ emptyScript } */}
               {/*                  setAddNewScript={ setAddNewScript } */}
               {/*                  type='body' */}
               {/*                  mode='edit' */}
               {/*               /> */}
               {/*            ) */}
               {/*            : ( */}
               {/*               <ScriptItem */}
               {/*                  key={ script.id } */}
               {/*                  script={ script } */}
               {/*                  chooseScript={ chooseScript } */}
               {/*                  deleteScript={ deleteScript } */}
               {/*                  setAddNewScript={ setAddNewScript } */}
               {/*               /> */}
               {/*            ) */}
               {/*      ); */}
               {/*   } */}
               {/*   return null; */}
               {/* })} */}
               {type === 0 && (
                  <AddNewScriptItem
                     createScript={ createScript }
                     handleScriptInputChange={ handleScriptInputChange }
                     newScript={ newScript }
                     emptyScript={ emptyScript }
                     addNewScript={ addNewScript }
                     setAddNewScript={ setAddNewScript }
                     currentScript={ currentScript }
                     type='head'
                     mode='create'
                  />
               )}
               {type === 1 && (
                  <AddNewScriptItem
                     createScript={ createScript }
                     handleScriptInputChange={ handleScriptInputChange }
                     newScript={ newScript }
                     emptyScript={ emptyScript }
                     addNewScript={ addNewScript }
                     currentScript={ currentScript }
                     setAddNewScript={ setAddNewScript }
                     type='body'
                     mode='create'
                  />
               )}
            </div>
         </TrackingListLoading>
      </DynamicWrapper>
   );
};

TrackingList.propTypes = {
   createScript: PropTypes.func,
   getScripts: PropTypes.func,
   getScriptsInProgress: PropTypes.bool,
   scripts: PropTypes.array,
   handleScriptInputChange: PropTypes.func,
   chooseScript: PropTypes.func,
   currentScript: PropTypes.object,
   newScript: PropTypes.string,
   emptyScript: PropTypes.func,
   deleteScript: PropTypes.func,
   updateScript: PropTypes.func,
};


export default TrackingList;
