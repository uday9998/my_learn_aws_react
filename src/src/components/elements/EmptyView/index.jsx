import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import image from 'assets/images/Program/empty.png';

const EmptyView = ({ subTitle, title }) => {
   return (
      <div className='comments__empty__view'>
         <img src={ image } alt='' />
         <Text
            inner={ subTitle }
            type={ types.regularDefault }
            size={ sizes.small }
            style={ { margin: '24px 0px 8px 0px' } }
         />
         <Text
            inner={ title }
            size={ sizes.size_28 }
            type={ types.regularMin }
         />
      </div>
   );
};

EmptyView.propTypes = {
   subTitle: PropTypes.string,
   title: PropTypes.string,
};

export default EmptyView;
