import React from 'react';
import PropTypes from 'prop-types';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import Icon from 'components/elements/Icon';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import DropTriggle from 'views/layout/DesignCourse/LessonHeader/newDropTriggle';
import { useHistory } from 'react-router';
import './index.scss';

const LessonHeader = ({
  title,
  goTo,
  match,
  saveLesson,
  openDeleteLesson,
  currentLesson,
  course,
  setIsOpenBulkModal,
  isMobile,
  isLessonChanged,
  handleMoreOptionNavigate,
  publishLesson,
  isPublished,
}) => {
  const history = useHistory();

  let options = [
    { trash: false, iconName: 'CommentsProductM', name: 'Comments', onClick: () => history.push(`/admin/programs/${match.params.id}/comments#unread`) },
    { trash: false, iconName: 'BulkUploadM', name: 'Bulk Upload', onClick: () => setIsOpenBulkModal(true) },
    { trash: false, iconName: 'DocM', name: course.type === '1' ? 'Video Information' : 'Lesson Information', onClick: () => history.push({ pathname: `/admin/programs/${match.params.id}/edit`, state: { type: 'information', lesson: currentLesson }, hash: 'program-general' }) },
    { trash: false, iconName: 'AffiliateSettingsM', name: 'Settings', onClick: () => history.push({ pathname: `/admin/programs/${match.params.id}/edit`, state: { type: 'settings', lesson: currentLesson }, hash: 'program-general' }) },
    { trash: true, iconName: 'TrashSettingsM', name: 'Delete', onClick: () => openDeleteLesson() },
  ];

  if (course.type === '1') {
    options = [
      { trash: false, iconName: 'CommentsProductM', name: 'Comments', onClick: () => history.push(`/admin/programs/${match.params.id}/comments#unread`) },
      { trash: false, iconName: 'DocM', name: course.type === '1' ? 'Video Information' : 'Lesson Information', onClick: () => history.push({ pathname: `/admin/programs/${match.params.id}/edit`, state: { type: 'information', lesson: currentLesson }, hash: 'program-general' }) },
      { trash: false, iconName: 'AffiliateSettingsM', name: 'Settings', onClick: () => history.push({ pathname: `/admin/programs/${match.params.id}/edit`, state: { type: 'settings', lesson: currentLesson }, hash: 'program-general' }) },
      { trash: true, iconName: 'TrashSettingsM', name: 'Delete', onClick: () => openDeleteLesson() },
    ];
  }

  return (
    <div className='lesson__header'>
      <div className='lesson__header__left'>
        <div style={{ cursor: 'pointer' }} onClick={goTo} role='presentation'>
          <Icon name='ArrowBackHeader' />
        </div>
        <Text inner={title || 'Lesson'} type={TextType.regularDefault} size={TextSize.xlarge} />
      </div>
      {!isMobile && (
        <div className='lesson__header__right'>
          <DropTriggle
            activeStyles={{ background: '#E8F2F1', border: '1px solid #36796F', boxShadow: '0 0 4px #54938B', borderRadius: '8px' }}
            options={options}
            isLessonChanged={isLessonChanged}
            handleMoreOptionNavigate={handleMoreOptionNavigate}
          />
          <BaseButton
            theme={btnTheme.secondary}
            size={btnSizes.small}
            isIconRight
            iconName='eyeM'
            text={course.type === '1' ? 'Preview Video' : 'Preview Lesson'}
            onClick={() =>
              course.type === '1'
                ? window.open(`/programs/${course.url}/${currentLesson.categories[0]?.link}?video=${currentLesson.id}&preview=success`, '_blank')
                : window.open(`/programs/${course.url}?lesson=${currentLesson.id}&preview=success`, '_blank')
            }
          />
          <div className='arrowGrey' />
          <BaseButton theme={btnTheme.secondary} size={btnSizes.small} text='Save Changes' onClick={() => saveLesson(false)} />
          <BaseButton theme={btnTheme.primary} size={btnSizes.small} text={isPublished ? 'Unpublish' : 'Publish'} onClick={publishLesson} />
        </div>
      )}
      {isMobile && (
        <div>
          <DropTriggle
            isMobile
            currentLesson={currentLesson}
            course={course}
            saveLesson={saveLesson}
            activeStyles={{ background: '#E8F2F1', border: '1px solid #36796F', boxShadow: '0 0 4px #54938B', borderRadius: '8px' }}
            options={options}
            handleMoreOptionNavigate={handleMoreOptionNavigate}
          />
        </div>
      )}
    </div>
  );
};

LessonHeader.propTypes = {
  goTo: PropTypes.func,
  saveLesson: PropTypes.func,
  title: PropTypes.string,
  match: PropTypes.object,
  openDeleteLesson: PropTypes.func,
  currentLesson: PropTypes.object,
  course: PropTypes.object,
  setIsOpenBulkModal: PropTypes.func,
  handleMoreOptionNavigate: PropTypes.func,
  isMobile: PropTypes.bool,
  isLessonChanged: PropTypes.bool,
  publishLesson: PropTypes.func,
  isPublished: PropTypes.bool,
};

export default LessonHeader;
