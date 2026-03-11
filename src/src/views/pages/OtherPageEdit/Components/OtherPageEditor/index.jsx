import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import SignTemplateEditor from '../SignInTemplateEditor';
import NotFoundTemplateEditor from '../NotFoundTemplateEditor';

const OtherPageSideBar = ({
   handleChangeProp, generalProps, type, isOpenedSideBar,
}) => {
   return (
      <div
         className={ isOpenedSideBar ? 'other__page__sidebar' : 'other__page__sidebar other__page__sidebar__closed' }
         style={ { height: document.querySelector('.trial') ? 'calc(100vh - 115px)' : 'calc(100vh - 75px)' } }
      >
         {type === '404' ? (
            <NotFoundTemplateEditor
               handleChangeProp={ handleChangeProp }
               generalProps={ generalProps }
            />
         ) : (
            <SignTemplateEditor
               handleChangeProp={ handleChangeProp }
               generalProps={ generalProps }
               type={ type }
            />
         )}
      </div>
   );
};

OtherPageSideBar.propTypes = {
   handleChangeProp: PropTypes.func,
   generalProps: PropTypes.object,
   type: PropTypes.string,
   isOpenedSideBar: PropTypes.bool,
};

export default OtherPageSideBar;
