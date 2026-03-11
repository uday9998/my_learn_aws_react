import React, { useState } from 'react';
import './index.scss';
import Editor from '@monaco-editor/react';
import PropTypes from 'prop-types';
import { CrossIcon } from 'assets/icons';

const CustomCodeModal = ({
    changeProp, oldCode, index, closeModal
}) => {
    const [code, setCode] = useState(oldCode);

    const saveNewCode = () => {
        changeProp(code, 'text', 'subcomponent', index, 0);
        closeModal();
    };

    return (
        <div className='customCodeModal_shadow'>
            <div className='customCodeModal'>
                <div className='customCodeModal_header'>
                    <h3>Write Your Custom Code</h3>
                    <CrossIcon color='#222f3e' />
                </div>
                <div className='customCodeModal_editor'>
                    <Editor
                        width='100%'
                        theme='light'
                        language='html'
                        value={code}
                        onChange={(newCode) => setCode(newCode)}
                    />
                </div>
                <div className='customCodeModal_actions'>
                    <button className='action_button cancel_button' type='button' onClick={ closeModal }>
                        Cancel
                    </button>
                    <button className='action_button save_button' type='button' onClick={ saveNewCode }>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

CustomCodeModal.propTypes = {
   changeProp: PropTypes.func,
   oldCode: PropTypes.string,
   index: PropTypes.string,
   closeModal: PropTypes.func
};

export default CustomCodeModal;