import React from 'react';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import { Link } from 'react-router-dom';
import Router from 'routes/router';
import './index.scss';
import PropTypes from 'prop-types';
import { useTranslate } from 'react-polyglot';
// import Icon from 'components/elements/Icon';

const LogInStudentHeader = ({ isLogin, title, siteInfo }) => {
   const t = useTranslate();
   return (
      <div className='loginPageHeader'>
         {/* <div> <Icon name='LogoMainHub' /></div> */}
         <div>
            <Link to={ isLogin ? Router.route('LOGIN').getMask() : Router.route('SIGNUP_STUDENT').getMask() }>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.medium }
                  inner={ title === 'Sign Up' ? t('sign_up') : t('log_in') }
                  color={ siteInfo && siteInfo.school_theme_mode === 'dark' ? '#fff' : '#494c62' }
                  style={ { fontFamily: siteInfo.school_font } }
               />
            </Link>
         </div>
      </div>
   );
};

LogInStudentHeader.propTypes = {
   isLogin: PropTypes.bool,
   title: PropTypes.string,
   siteInfo: PropTypes.object,
};

LogInStudentHeader.defaultProps = {
   title: 'Sign Up',
   isLogin: false,
   siteInfo: {},
};

export default LogInStudentHeader;
