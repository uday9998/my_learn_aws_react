import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import './index.scss';
import isPrint from 'state/modules/designCourse/edit/Error';

function Copy({ value, children }) {
   function onCopy() {
      const input = document.createElement('input');
      input.value = value;
      input.classList.add('copyInput');
      // input.style.display = 'none';
      document.body.appendChild(input);
      input.setSelectionRange(0, 99999);
      input.select();

      document.execCommand('copy');
      if (isPrint('Copied')) {
         toast.success('Copied');
      }
      input.remove();
   }
   return (
      <div onClick={ onCopy } role='presentation' className='copyElement'>
         {children}
      </div>
   );
}

Copy.propTypes = {
   value: PropTypes.string,
   children: PropTypes.any,
};

export default Copy;
