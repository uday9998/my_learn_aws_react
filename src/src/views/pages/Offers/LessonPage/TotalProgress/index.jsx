import React from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';
import ProgressBar from 'components/elements/progressBarNew';
// import { OfferContext } from 'containers/pages/mixed/offers';

const TotalProgress = ({
   progress,
   textColor,
   course,
   isMobile,
   templateCardBackground,
}) => {
   //  const { template } = React.useContext(OfferContext);
   // const content = template[5];
   // const contentItem = content.school_room_components[0];
   //  const offerPrimaryButton = contentItem.subcomponent[2].props;
   return (
      <div
         className='total__progress'
         // style={ isMobile ? { marginBottom: '24px' } : {} }
         style={ {
            marginBottom: isMobile ? '24px' : '',
            background: templateCardBackground,
         } }
      >
         <Text
            inner='Total Progress'
            type={ types.medium153 }
            size={ sizes.large }
            style={ {
               color: 'var(--textColor)',
            } }
         />
         <ProgressBar
            progress={ progress }
            textColor='var(--textColor)'
            barBackground='var(--textColor20)'
            completedBackground='var(--buttonBgcolor)'
         />
         {course.authors && course.authors[0] && course.authors[0].name

         && (
            <div className='instructor__course'>
               <div>
                  <Text
                     inner='Instructor'
                     type={ types.mediumLarge }
                     size={ sizes.medium153 }
                     style={ {
                        color: 'var(--textColor)',
                     } }
                  />
               </div>
               <div>
                  <div>
                     <img src={ course.authors[0].picture_src } alt='author' />
                  </div>
                  <div>
                     <div>
                        <Text
                           inner={ course.authors[0].name }
                           type={ types.mediumLarge }
                           size={ sizes.small }
                           style={ {
                              color: 'var(--textColor)',
                           } }
                        />
                     </div>
                     <div>
                        <Text
                           inner={ course.authors[0].description }
                           type={ types.regularLarge }
                           size={ sizes.xsmall }
                           style={ {
                              color: 'var(--textColor70)',
                           } }
                        />
                     </div>
                  </div>
               </div>
            </div>
         )
         }
      </div>
   );
};

TotalProgress.propTypes = {
   progress: PropTypes.number,
   textColor: PropTypes.string,
   course: PropTypes.object,
   isMobile: PropTypes.bool,
   templateCardBackground: PropTypes.string,
};

export default TotalProgress;
