import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';


const TopCoursesReportItem = ({
   title, subtitle, color, className, isEmpty,
}) => {
   return (
      <div className={ `flex ${className}` }>
         <div>
            <svg height='20' width='20'>
               <circle cx='10' cy='10' r='8' fill={ isEmpty ? '#f0f4f7' : color } />
               .
            </svg>
         </div>
         <div className='m-l-m'>
            {!isEmpty && (
               <>
                  <div>

                     <Text
                        type={ TextType.bold }
                        size={ TextSize.small }
                        inner={ title }
                     />
                  </div>
                  <div>
                     <Text
                        type={ TextType.demibold }
                        size={ TextSize.extraSmall }
                        inner={ subtitle }
                     />
                  </div>
               </>
            )}
            {isEmpty && (
               <>
                  <div className='emptyTitle emptyItem' />
                  <div className='emptySubtitle emptyItem' />
               </>
            )}
         </div>
      </div>
   );
};

TopCoursesReportItem.propTypes = {
   className: PropTypes.string,
   title: PropTypes.string,
   subtitle: PropTypes.string,
   color: PropTypes.string,
   isEmpty: PropTypes.bool,
};

export default TopCoursesReportItem;
