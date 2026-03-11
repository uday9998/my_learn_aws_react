/* eslint-disable react/no-array-index-key */
import React from 'react';
import './index.mob.scss';
import PropTypes from 'prop-types';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import noMatch from 'assets/images/no-users-2.png';

const DataTable = ({ data, match, dataTitle }) => {
   return (
      !match ? (
         <SelectedWrapper>
            <div className='mob-dataTableContainer'>
               {dataTitle && (
                  <div className='m-b-m'>
                     <Text
                        type={ TextType.bold }
                        inner={ dataTitle }
                        size={ TextSize.large }
                     />
                  </div>
               )}
               <div className='mob-dataTable'>
                  <div className='mob-dataTable__col'>
                     {data.titles.map((title, i) => {
                        return (
                           <Text
                              type={ TextType.normal }
                              inner={ title }
                              key={ i }
                              style={ { fontSize: '12px' } }
                           />
                        );
                     })}
                  </div>
                  <div className='mob-dataTable__col'>
                     {data.values.map((value, i) => {
                        return (
                           <Text
                              type={ TextType.regular }
                              inner={ value }
                              key={ i }
                              style={ { fontSize: '12px' } }
                           />
                        );
                     })}
                  </div>
               </div>
            </div>
         </SelectedWrapper>
      ) : (
         <ItemWrapper secondShadow>
            <div className='mob-noMatchBlock'>
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
                        inner='No filters matched the filters you set. Try a different set of filters'
                        color='#8a94a2'
                     />
                  </div>
               </div>
            </div>
         </ItemWrapper>
      )
   );
};

DataTable.propTypes = {
   data: PropTypes.object,
   match: PropTypes.string,
   dataTitle: PropTypes.string,
};

DataTable.defaultProps = {
   data: {},
   match: '',
};

export default DataTable;
