import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { SIZES as textSize, TYPE as textType } from 'components/elements/Text';

const AuthorInfo = ({
   name, info, primaryTheme, defaultColor, boldTxt,
}) => {
   return (
      <div className='authorInfo'>
         {/* { avatar && <img src={ avatar } alt='avatar' /> } */}
         <div className='authorInfo__content'>
            <Text
               size={ textSize.normal }
               type={ !boldTxt ? textType.normal : textType.bold }
               inner={ name }
               className='author_name'
               style={ { fontFamily: primaryTheme, color: defaultColor, lineHeight: boldTxt ? 'unset' : undefined } }
            />
            {
               info && (
                  <Text
                     size={ textSize.extraSmall }
                     type={ !boldTxt ? textType.normal : textType.medium }
                     inner={ info }
                     bold
                     className='author_info'
                     style={ { fontFamily: primaryTheme, color: defaultColor } }
                  />
               )
            }
         </div>
      </div>
   );
};

AuthorInfo.propTypes = {
   name: PropTypes.string,
   info: PropTypes.string,
   primaryTheme: PropTypes.string,
   defaultColor: PropTypes.string,
};

AuthorInfo.defaultProps = {
   name: 'Author Name',
   info: 'Information about author',
};

export default AuthorInfo;
