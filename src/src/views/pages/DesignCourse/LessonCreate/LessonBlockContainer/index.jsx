import React from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import './index.scss';

const LessonBlockContainer = ({
   children, onClick, id, deleteBlock, duplicateBlock, blockId, reOrderBlocks,
   setOpenSettings, openSettings, style, type, setOpenQuizSettings, course, block,
}) => {
   const { isMobile } = useWindowSizeChange();
   return (
      <div className='lesson__block__container' id={ id } style={ { backgroundColor: style.bg_color || '#fff', paddingTop: `${ (parseInt(style.paddingTop, 10) + 84) }px`, paddingBottom: `${ (parseInt(style.paddingBottom, 10) + 84) }px` } }>

         {course.type !== '1' && <div className='lesson__block__container__add' onClick={ onClick } role='presentation'><IconNew name='PlusL' /></div>}
         {!openSettings && (
            <div
               style={ {
                  display: isMobile ? 'none' : 'flex',
               } }
               className='lesson__block__container__left'
               onClick={ () => setOpenSettings(true) }
               role='presentation'>
               <IconNew name='SettingsProductM' />
               {!isMobile && (
                  <Text
                     inner='Settings'
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               )}
            </div>
         )}
         {!blockId && course.type !== '1' && (
            <div className='lesson__block__container__right'>
               <div className='lesson__block__container__right__actionleft'>
                  <div onClick={ duplicateBlock } role='presentation' title='duplicate'><IconNew name='DuplicateMediaM' /></div>
                  <div onClick={ deleteBlock } role='presentation' title='delete'><IconNew name='DeleteMediaM' /></div>
               </div>
               <div className='grey__line' />
               <div className='lesson__block__container__right__actionright'>
                  <div onClick={ () => reOrderBlocks('+') } role='presentation' title='down'><IconNew name='ArrowBottomM' /></div>
                  <div onClick={ () => reOrderBlocks('-') } role='presentation' title='up'><IconNew name='ArrowTopM' /></div>
               </div>
            </div>
         )}
         {blockId && (
            <div className='lesson__block__container__right'>
               { type === 'Quiz' && !openSettings
               && (
                  <div className='lesson__block__container__right__quizsettings' onClick={ (value) => { setOpenSettings(value); setOpenQuizSettings(value); } } role='presentation'>
                     <IconNew name='SectionSettingsM' color='#24554E' />
                     <Text
                        inner='Quiz Settings'
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: '#24554E' } }
                     />
                  </div>
               )}
               <div className='lesson__block__container__right__actionleft'>
                  { course.type !== '1' && <div onClick={ duplicateBlock } role='presentation' title='duplicate'><IconNew name='DuplicateMediaM' /></div>}
                  { course.type !== '1' && <div onClick={ deleteBlock } role='presentation' title='delete'><IconNew name='DeleteMediaM' /></div>}
                  { course.type === '1' && !!block.videos?.length && <div onClick={ deleteBlock } role='presentation' title='delete'><IconNew name='DeleteMediaM' /></div>}
               </div>
               { course.type !== '1' && (
                  <>
                     <div className='grey__line' />
                     <div className='lesson__block__container__right__actionright'>
                        <div onClick={ () => reOrderBlocks('+') } role='presentation' title='down'><IconNew name='ArrowBottomM' /></div>
                        <div onClick={ () => reOrderBlocks('-') } role='presentation' title='up'><IconNew name='ArrowTopM' /></div>
                     </div>
                  </>
               )}
            </div>
         )}
         {children}
      </div>
   );
};

LessonBlockContainer.propTypes = {
   children: PropTypes.any,
   onClick: PropTypes.func,
   id: PropTypes.string,
   duplicateBlock: PropTypes.func,
   deleteBlock: PropTypes.func,
   blockId: PropTypes.number,
   reOrderBlocks: PropTypes.func,
   setOpenSettings: PropTypes.func,
   openSettings: PropTypes.any,
   style: PropTypes.object,
   type: PropTypes.string,
   setOpenQuizSettings: PropTypes.func,
   course: PropTypes.object,
   block: PropTypes.object,
};

export default LessonBlockContainer;
