import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';


const EmptyPage = ({
   title, subTitle, btnProps, src,
}) => {
   return (
      <div className='empty'>
         <div className='empty__left'>
            <Text type={ txtTypes.medium } size={ txtSizes['2xlarge'] } inner={ title } className='empty__left__title' />
            <Text type={ txtTypes.regularLarge } size={ txtSizes.large } inner={ subTitle } className='empty__left__subTitle' />
            <BaseButton { ...btnProps } className='empty__left__btn' />
         </div>
         <div className='empty__right'>
            <img src={ src } alt='' />
         </div>
      </div>
   );
};

EmptyPage.propTypes = {
   title: PropTypes.string,
   subTitle: PropTypes.string,
   btnProps: PropTypes.object,
   src: PropTypes.string,
};

export default EmptyPage;
