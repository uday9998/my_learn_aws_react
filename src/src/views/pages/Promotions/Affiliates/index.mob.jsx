import React from 'react';
import './index.mob.scss';
import DataTable from 'components/elements/DataTable/index.mob';
import SearchFilter from 'components/elements/SearchFilter/index.mob';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';

const data = {
   titles: ['Name', 'Email', 'Type', 'Last Login', 'Join Date'],
   values: ['Justin Burns', 'justin@miestro.com', 'Customer', 'Yesterday', '11/05/18'],
};

const Affiliates = ({ empty }) => {
   return (
      <div className='affiliatesPage'>
         <SearchFilter />
         <div className='m-t-exl' />
         <BaseButton
            size={ btnSizes.full }
            text='Add Affiliates'
         />
         <div className='m-t-l p-b-s'>
            <BaseButton
               theme={ btnTheme.grey }
               size={ btnSizes.full }
               text='Export CSV'
            />
         </div>
         <div className='m-t-exl itemWrapper-f'>
            {empty ? <DataTable match='Affiliates' /> : <DataTable data={ data } />}
         </div>
      </div>
   );
};

Affiliates.propTypes = {
   empty: PropTypes.bool,
};

Affiliates.defaultProps = {
   empty: false,
};

export default Affiliates;
