import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { uniqueId } from 'lodash';
import defaultImages from 'assets/images/defaults/thumbnail.png';
import './index.scss';

const VideoMetricsTable = ({ data }) => {
   const getImage = (videoItem) => {
      if (videoItem.poster) {
         const s3Url = process.env.REACT_APP_AWS_BUCKET_URL;
         const folderName = videoItem.poster.split('.')[0];
         const imageName = videoItem.poster;
         if (imageName) {
            return `${ s3Url }/videos/${ folderName }/outputs/thumbnails/${ imageName }`;
         }
      }

      return defaultImages;
   };

   return (
      <table className='video__metric__table'>
         <thead>
            <tr>
               <th>
                  <Text inner='Video Preview' type={ txtTypes.mediumLarge } size={ txtSizes.small_14 } />
               </th>
               <th>
                  <Text inner='Total Plays' type={ txtTypes.mediumLarge } size={ txtSizes.small_14 } />
               </th>
               <th>
                  <Text inner='Total Hours Watched' type={ txtTypes.mediumLarge } size={ txtSizes.small_14 } />
               </th>
               <th>
                  <Text inner='Play Rate' type={ txtTypes.mediumLarge } size={ txtSizes.small_14 } />
               </th>
               <th>
                  <Text inner='Visitors' type={ txtTypes.mediumLarge } size={ txtSizes.small_14 } />
               </th>
               <th>
                  <Text inner='Average Engagement' type={ txtTypes.mediumLarge } size={ txtSizes.small_14 } />
               </th>
            </tr>
         </thead>
         <tbody>
            {data.map((videoItem) => {
               return (
                  <tr key={ uniqueId() }>
                     <td className='table-col-3'>
                        <img src={ getImage(videoItem) } alt='' />
                        <Text
                           inner={ videoItem.video_name }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small_14 }
                        />
                     </td>
                     <td>
                        <Text
                           inner={ videoItem.total_plays }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small_14 }
                        />
                     </td>
                     <td className='table-col-2'>
                        <Text
                           inner={ videoItem.watched_hours }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small_14 }
                        />
                     </td>
                     <td>
                        <Text
                           inner={ `${ videoItem.play_rate }%` }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small_14 }
                        />
                     </td>
                     <td>
                        <Text
                           inner={ videoItem.visitors }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small_14 }
                        />
                     </td>
                     <td className='table-col-1'>
                        <Text
                           inner={ `${ videoItem.ave_engagement }%` }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small_14 }
                        />
                     </td>
                  </tr>
               );
            })}
         </tbody>
      </table>
   );
};
VideoMetricsTable.defaultProps = {
   data: [],
};

VideoMetricsTable.propTypes = {
   data: PropTypes.array,
};

export default VideoMetricsTable;
