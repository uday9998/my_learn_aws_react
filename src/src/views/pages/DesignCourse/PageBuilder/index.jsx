/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const PageBuilder = ({ courseId }) => {
   return (
      <div className='d-pageBuilder h-full w-full flex' id='pageBuilder'>
         <style dangerouslySetInnerHTML={ {
            __html: `
                  .adminContent { padding: 0px; }
               `,
         } }
         />
         <iframe src={ `http://maria40.miestro.loc/landing?mode=admin&courseId=${ courseId }&token=${ localStorage.authToken }` } frameBorder='0' title='pageBuilder' />
      </div>
   );
};

PageBuilder.propTypes = {
   courseId: PropTypes.any,
};

PageBuilder.displayName = 'iframe';

export default PageBuilder;
