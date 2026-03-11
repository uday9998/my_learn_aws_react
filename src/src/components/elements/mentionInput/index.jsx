import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { Mention, MentionsInput } from 'react-mentions';
import mentionStyle from './mentionStyle';
import mentionsInputStyle from './mentionsInputStyle';

const MentionEditor = ({
   text, onChange, users,
}) => {
   return (
      <div className='mention__input'>
         <MentionsInput
            value={ text }
            placeholder='Write your reply...'
            style={ mentionsInputStyle }
            onChange={ (e) => onChange(e.target.value) }
            markup='@{{__type__||__id__||__display__}}'
         >
            <Mention
               data={ users }
               markup='@{{__type__||__id__||__display__}}'
               style={ mentionStyle }
            />
         </MentionsInput>
      </div>
   );
};

MentionEditor.propTypes = {
   users: PropTypes.array,
   text: PropTypes.string,
   onChange: PropTypes.func,
};

export default MentionEditor;
