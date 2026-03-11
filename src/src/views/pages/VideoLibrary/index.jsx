/* eslint-disable react/prop-types */
import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import PropTypes from 'prop-types';
import VideoItem from 'components/elements/designCourse/courseMaterial/VideoItem';
// import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
// import TextInput from 'components/elements/form/TextInput';
import Icon from 'components/elements/Icon';
import moment from 'moment';
import Pagination from 'components/elements/Pagination';
import withLoading from 'utils/withLoading';
import NoSearchSvg from 'assets/images/no-search-result.svg';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';

const VideoLibraryLoading = withLoading('div');

const VideoLibary = ({
   data,
   total,
   deleteVideo,
   onChangeVideosPage,
   isFetching,
}) => {
   // const [searchField, setSearchField] = useState('');
   // function handleInputChange(name, value) {
   //    setSearchField(value);
   //    handleSearch({ name: searchField });
   // }

   return (
      <div className='d-videolibrary'>
         <div className='title'>
            <div>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.base }
                  inner='All Videos'
               />
            </div>
            <div>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.small }
                  inner={ `${ total } Videos` }
                  color='#8a94a2'
               />
            </div>
         </div>
         {/* <div className='videolibrary__search flex'>
            <div className='search__input'>
               <TextInput
                  label=''
                  placeholder='Search for Videos'
                  name='searchField'
                  value={ searchField }
                  onChange={ (name, value) => handleInputChange(name, value) }
               />
               <Icon
                  name='Search'
               />
            </div>
            <div className='search__button m-l-exl'>
               <BaseButton
                  theme={ btnTheme.lightBlue }
                  size={ btnSize.large }
                  text='Search'
                  onClick={ () => handleSearch({ name: searchField }) }
               />
            </div>
         </div> */}
         <div className='line' />
         <div className='d-videolibrary__content'>
            {!isFetching && data.length === 0 && (
               <ItemWrapper style={ { padding: '32px 50px 32px 42px' } }>
                  <div className='settingTransaction__transaction_empty'>
                     <img src={ NoSearchSvg } alt='noCredit' />
                     <Text
                        size='small'
                        type='normal'
                        color='#8a94a2'
                        inner='No Videos'
                     />

                  </div>
               </ItemWrapper>
            )}
            <VideoLibraryLoading isLoading={ isFetching } />
            {
               !isFetching && data.map(video => {
                  const date = moment(video.created_at).format('dddd, YYYY h:mm');

                  return (
                     <div
                        className='content'
                        key={ video.id }
                     >

                        <div className='content__video'>
                           <VideoItem type='video' src={ video.src } />
                        </div>
                        <div className='flex videolibrary-button-content'>
                           <div className='flex flex-col'>
                              <div className='content__title'>
                                 <Text
                                    type={ TextType.normal }
                                    size={ TextSize.extraSmall }
                                    inner={ video.video_name }
                                 />
                              </div>
                              <div className='content__time'>
                                 <Text
                                    type={ TextType.regular }
                                    size={ TextSize.extraSmall }
                                    inner={ date }
                                    color='#8a94a2'
                                 />
                              </div>
                           </div>
                           <div className='flex actions'>
                              {
                                 video.lesson_format === 'video' && (
                                    <div
                                       onClick={ () => {
                                          setTimeout(() => {
                                             const response = {
                                                file: video.src,
                                             };
                                             window.location.href = response.file;
                                          }, 100);
                                       } }
                                       role='presentation'
                                       className='actions-item downlod'
                                    >
                                       <Icon name='Resource' color='#34495E' />
                                    </div>
                                 )
                              }
                              <div
                                 onClick={ () => deleteVideo(video.id) }
                                 role='presentation'
                                 className='actions-item'
                              >
                                 <Icon name='Delete' color='#34495E' />
                              </div>
                           </div>
                        </div>
                     </div>
                  );
               })
            }
         </div>

         <div className='flex justify-center m-t-exl m-b-exl p-t-exs'>
            <Pagination
               totalRecords={ total || 0 }
               pageLimit={ 20 }
               pageNeighbours={ 1 }
               onPageChanged={ (page) => onChangeVideosPage(page) }
            />
         </div>

      </div>
   );
};

VideoLibary.propTypes = {
   data: PropTypes.array,
   total: PropTypes.number,
   deleteVideo: PropTypes.func,
   onChangeVideosPage: PropTypes.func,
};
VideoLibary.defaultProps = {
   data: [],
   deleteVideo: () => {},
   onChangeVideosPage:() => {},
};

export default VideoLibary;
