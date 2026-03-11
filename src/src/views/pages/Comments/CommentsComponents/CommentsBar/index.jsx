import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import './index.scss';
import { uniqueId } from 'lodash';
import { SliceAndConnectText } from 'utils/getSplitedText';

export const CommentsBarItem = ({
   title, commentsCount, onSelect, isActive,
}) => {
   return (
      <div
         role='presentation'
         onClick={ () => onSelect() }
         className='comments__sections__bar__item'
         style={ { background: isActive ? '#36796F' : 'white' } }
      >
         <div className='comments__sections__bar__item__left'>
            <Text
               inner={ SliceAndConnectText(title, 20) }
               type={ types.regularDefault }
               style={ { color: isActive ? '#fff' : '#131F1E' } }
               size={ sizes.small }
            />
         </div>
         <div className='comments__sections__bar__item__right'>
            <div className='comments__sections__bar__item__comments'>
               <IconNew name='CommentsProgramS' />
               <Text
                  inner={ `${ commentsCount }` }
                  type={ types.medium150 }
                  size={ sizes.xsmall }
               />
            </div>
            <div className='comments__sections__bar__item__arrow'>
               <IconNew name='ArrowSectionProgramM' color='#A1A5A5' />
            </div>
         </div>
      </div>
   );
};

const CommentsBar = ({
   sections, selectedSection, onSelect, commentsCount, commentsType,
}) => {
   return (
      <div className='comments__sections__bar'>
         <div className='comments__sections__bar__top'>
            <Text
               inner='Sections'
               type={ types.regular160 }
               size={ sizes.xlarge }
               miniText={ sections.length }
            />
         </div>
         <CommentsBarItem
            title={ commentsType === '1' ? 'All Videos' : 'All Sections & Lessons' }
            commentsCount={ commentsCount }
            isActive={ !selectedSection }
            onSelect={ () => onSelect(null) }
         />
         {sections.length > 0 && (
            <div className='comments__sections__bar__line' />
         )}
         <div className='comments__section__bar__bottom'>
            {sections.map((sec) => {
               return (
                  <CommentsBarItem
                     key={ uniqueId() }
                     title={ sec.name }
                     commentsCount={ sec.comments_count }
                     isActive={ selectedSection && selectedSection.id === sec.id }
                     onSelect={ () => onSelect(sec) }
                  />
               );
            })}
         </div>

      </div>
   );
};

CommentsBar.propTypes = {
   sections: PropTypes.array,
   selectedSection: PropTypes.object,
   commentsType: PropTypes.string,
   onSelect: PropTypes.func,
   commentsCount: PropTypes.number,
};
CommentsBarItem.propTypes = {
   title: PropTypes.string,
   commentsCount: PropTypes.number,
   onSelect: PropTypes.func,
   isActive: PropTypes.bool,
};

export default CommentsBar;
