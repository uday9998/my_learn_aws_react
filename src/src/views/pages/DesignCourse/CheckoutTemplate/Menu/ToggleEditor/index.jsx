import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import './index.scss';

const ToggleEditor = ({ setCloseEditor, closeEditor }) => {
   return (
      <div
         className='toggleEditorContainer'
         role='presentation'
         onClick={ () => setCloseEditor(!closeEditor) }
      >
         <Icon name='TriangleSvg' color='rgba(0,0,0,.6)' style={ !closeEditor ? { transform: 'rotate(0deg)' } : { transform: 'rotate(-90deg)' } } />
      </div>
   );
};

ToggleEditor.propTypes = {
   setCloseEditor: PropTypes.func,
   closeEditor: PropTypes.bool,
};

export default ToggleEditor;
