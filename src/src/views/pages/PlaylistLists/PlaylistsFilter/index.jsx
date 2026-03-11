import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/elements/inputNew';
import './index.scss';
import SortButton from 'components/elements/buttons/SortButton';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';

const options = {
   recently_updated: 'Recently Updated',
   newest: 'Newest',
   oldest: 'Oldest',
   A_Z: 'Name A to Z',
   Z_A: 'Name Z to A',

};

const statusOptions = {
   all: 'None',
   published: 'Published',
   unpublished: 'Unpublished',
};

const PlaylistsFilter = ({
   searchValue, onSearchValue,
   onFilter, sort, onSort, filter,
   total, isMob, isMobSearchOpen,
   isMobile,
}) => {
   const playlistcount = `${ total } ${ total === 1 ? 'Playlist' : 'Playlists' }`;

   return (
      <div className='playlist__filter'>
         {((isMobSearchOpen && isMob) || !isMob) && (
            <div className='playlist__filter__search'>
               {
                  !isMobile && (
                     <Input
                        value={ searchValue }
                        // onKeyPress={ () => searchOnEnter({ name: searchValue }) }
                        // onClearSearchValue={ () => onClearSearch() }
                        type='search'
                        name='searchField'
                        placeholder='Search'
                        onChange={ (name, value) => onSearchValue(value) }
                     />
                  )
               }
            </div>
         )}
         <div className='playlist__filter__bottom'>
            <div className='playlist__filter__bottom__left'>
               <div className='playlist__filter__count'>
                  <Text
                     inner={ `${ total > 0 ? playlistcount : '' }` }
                     type={ TextType.regularDefault }
                     size={ TextSize.small }
                  />
               </div>
            </div>
            <div className='playlist__filters'>
               <SortButton onFilter={ onFilter } value={ filter } options={ statusOptions } filterType='Filter' iconName='FilterM' isMob={ isMob } isNewIcon={ true } />
               <SortButton onFilter={ onSort } value={ sort } options={ options } isMob={ isMob } />
            </div>
         </div>
      </div>
   );
};


PlaylistsFilter.propTypes = {
   sort: PropTypes.any,
   onFilter: PropTypes.func,
   onSearchValue: PropTypes.func,
   searchValue: PropTypes.string,
   onSort: PropTypes.func,
   filter: PropTypes.string,
   total: PropTypes.number,
   isMob: PropTypes.bool,
   isMobSearchOpen: PropTypes.bool,
   isMobile: PropTypes.bool,
};

export default PlaylistsFilter;
