/* eslint-disable react/no-array-index-key */
import React from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import PropTypes from 'prop-types';
import noMatch from 'assets/images/no-users-2.png';
import classnames from 'classnames';


const DataTable = ({
   header, body, style, match, hasInterval,
}) => {
   return (
      <ItemWrapper secondShadow>
         <div className='dataTable' style={ style }>
            { header && header.map((title, i) => {
               return (
                  <div className='dataTable__col' key={ i }>
                     <div className={ classnames('dataTable__head', { 'hasInterval': hasInterval }) }>
                        {typeof title === 'string' ? (
                           <Text
                              type={ TextType.normal }
                              size={ TextSize.extraSmall }
                              inner={ title }
                              color='rgba(51, 51, 51, 0.5)'
                           />
                        ) : title}
                     </div>
                     { body.length > 0 && body.map((item, j) => (

                        <div className={ classnames('dataTable__data', { 'hasInterval': hasInterval }) } key={ j }>
                           { typeof item[i] === 'string' ? (
                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.extraSmall }
                                 inner={ item[i] }
                              />
                           ) : item[i]}
                        </div>
                     )
                     )}
                  </div>
               );
            }) }
         </div>
         {!!match && (
            <div className='noMatchBlock'>
               <img src={ noMatch } alt='' />
               <div className='noMatchBlock__text'>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.medium }
                     inner={ `No ${ match } to show` }
                  />
                  <div className='m-t-exs'>
                     <Text
                        style={ { lineHeight: '1.38' } }
                        type={ TextType.normal }
                        size={ TextSize.small }
                        inner={ `No ${ match } matched the filters you set. Try a different set of filters` }
                        color='#8a94a2'
                     />
                  </div>
               </div>
            </div>
         )}
      </ItemWrapper>
   );
};

DataTable.propTypes = {
   header: PropTypes.arrayOf(
      PropTypes.oneOfType([
         PropTypes.node,
         PropTypes.string,
      ])).isRequired,
   body: PropTypes.arrayOf(
      PropTypes.oneOfType([
         PropTypes.node,
         PropTypes.string,
      ])),
   style: PropTypes.object,
   match: PropTypes.string,
   hasInterval: PropTypes.bool,
};

DataTable.defaultProps = {
   body: [],
   match: '',
   hasInterval: false,
};

export default DataTable;
