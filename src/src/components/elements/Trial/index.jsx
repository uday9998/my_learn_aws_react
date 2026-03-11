import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import BaseButton, { SIZES as btnSize, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import { useHistory } from 'react-router';
import Router from 'routes/router';
import './index.scss';


const Trial = ({ diffTrialDays }) => {
   const history = useHistory();

   const handleNavigateToBilling = () => {
      history.push(`${ Router.route('ADMIN_ACCOUNT').getCompiledPath() }#billing`);
      localStorage.setItem('showPlans', 'showPlans');
   };

   return (
      <div className='trial'>
         <Text
            inner='The Miestro trial is about to expire in '
            type={ types.medium }
            size={ sizes.small14 }
            style={ { color: '#fff' } }
         />
         <Text
            inner={ `${ diffTrialDays } Days ` }
            type={ types.bold }
            size={ sizes.small14 }
            style={ { color: '#fff', fontWeight: '700' } }
         />
         {/* <BaseButton
            theme={ btnTheme.white }
            size={ btnSize.xsmall }
            text='Upgrade Now'
            onClick={ handleNavigateToBilling }
         /> */}
      </div>
   );
};

Trial.propTypes = {
   diffTrialDays: PropTypes.number,
};

export default Trial;
