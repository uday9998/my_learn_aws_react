import React from 'react';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import Input from 'components/elements/inputNew';
import './index.scss';

const MemberEditNotePopup = ({
   inputs, onChange, errorMessages = {}
}) => {
   return (
      <div className='member__more__note'>
         <Text
            inner='Add Note'
            type={ txtTypes.medium }
            size={ txtSizes.xxlarge }
         />
         <div className='member__more__inputs'>
            <Input
               errorMessages={ errorMessages.title }
               value={ inputs.title }
               placeholder='Add Title For Your Note'
               name='title'
               label='Title'
               helpText={ `${ inputs.title.length }/150` }
               onChange={ onChange }
            />
            <Input
               errorMessages={ errorMessages.description }
               value={ inputs.description }
               placeholder='Write Your Note Here'
               name='description'
               type='textarea'
               label='Note'
               onChange={ onChange }
            />
         </div>
      </div>
   );
};

MemberEditNotePopup.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   errorMessages: PropTypes.object,
};

export default MemberEditNotePopup;
