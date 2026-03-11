/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import highlightSidebar from 'utils/pageBuilder/highlightSidebar';
import PropTypes from 'prop-types';
import TextInput from 'components/elements/form/TextInput';
import './index.scss';
import Input from 'components/elements/inputNew';


const TimerEditable = (props) => {
   const {
      slug, scroll, menuVisible, toggleSidebar, index, subIndex, disabled, changeProp, label, number,
   } = props;
   const [charectersLimit, setCharectersLimit] = useState(number && number.length);
   useEffect(() => {
      if (scroll) {
         highlightSidebar(slug, toggleSidebar, menuVisible, true);
      }
   }, [scroll]);
   const maxLengthCheck = (object) => {
      if (object.target.value.length > object.target.maxLength) {
         // eslint-disable-next-line no-param-reassign
         object.target.value = object.target.value.slice(0, object.target.maxLength);
      }
   };

   return (
      <div className='timerEditable' data-slug={ slug }>
         <Input
            label={ label }
            placeholder=''
            id={ `text-${ slug }` }
            name='text'
            value={ number || '' }
            onChange={ (key, value) => {
               changeProp(value, 'number', 'subcomponent', index, subIndex);
               changeProp(Math.round(Date.now() / 1000), 'date', 'subcomponent', index, subIndex);
               setCharectersLimit(value.length);
            } }
            disabled={ disabled }
            maxNumber={ 100 }
            minNumber={ 0 }
            type='number'
            onInput={ maxLengthCheck }
            autoComplete='off'
            // helpText={ `${ number }/2` }
         />
      </div>
   );
};

TimerEditable.defaultProps = {

};

TimerEditable.propTypes = {
   slug: PropTypes.string,
   number: PropTypes.any,
   scroll: PropTypes.any,
   menuVisible: PropTypes.bool,
   toggleSidebar: PropTypes.func,
   changeProp: PropTypes.func,
   index: PropTypes.number,
   subIndex: PropTypes.number,
   label: PropTypes.string,
   disabled: PropTypes.bool,
};

export default TimerEditable;
