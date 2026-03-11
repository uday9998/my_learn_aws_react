import React from 'react';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import UploadImage from 'components/modules/uploadImage';
import TextInput from 'components/elements/inputNew';
// import InlineEditor from 'components/modules/InlineEditorNew';
import Select from 'components/elements/SelectNew';
import QuillEditor from 'components/modules/Editors/QuillEditor';
// import Select from 'components/elements/form/Select';
// import ColorInput from 'components/elements/form/ColorInput';

const PostDetails = ({
   post, handleInputChange, authors, errorMessages
}) => {
   const authorsForSelectOption = authors.map(author => ({ label: author.name, value: author.id }));
   return (
      <div className='postdetails__module'>
         <div>
            <Text
               type={ TextType.medium160 }
               size={ TextSize.xlarge }
               inner='Post Details'
            />
         </div>
         <div className='uploadImgs'>
            <UploadImage
               label='Blog Image'
               src={ post.image_url ? post.image_url : '' }
               cropRatio='1920x420'
               isWithoutModal={ false }
               isOptional={ true }
               isHaveRecomenededText={ true }
               recomenededText='1920x420'
               size='full'
               onChange={ (name, value) => handleInputChange('image_url', value, 'post') }
               isImageUpload={ true }
            />
         </div>
         <TextInput
            errorMessages={ errorMessages.title }
            label='Title'
            placeholder='Article Title Goes Here'
            name='title'
            value={ post.title }
            rightLabel={ `${ post.title ? post.title.length : 0 }/150` }
            onChange={ (name, value) => {
               handleInputChange(name, value, 'post');
            } }
         />
         <TextInput
            label='Subtitle'
            placeholder='Enter Article Subtitle'
            name='subtitle'
            maxlength={ 350 }
            value={ post.subtitle }
            onChange={ (name, value) => {
               handleInputChange(name, value, 'post');
            } }
         />
         <Select
            value={ post.author_id || '' }
            placeholder='Select Author'
            type='select-medium'
            label='Add Author'
            onChange={ (name, value) => handleInputChange('author_id', value, 'post') }
            options={ authorsForSelectOption }
            name='author_id'
         />
         <div>
            <QuillEditor
               text={ post.content || 'Write Your Content Here' }
               onChange={ (value) => handleInputChange('content', value, 'post') }
               title='Content'
               withoutBorder={ true }
            />
         </div>
      </div>
   );
};

PostDetails.propTypes = {
   post: PropTypes.object,
   handleInputChange: PropTypes.func,
   authors: PropTypes.array,
   errorMessages: PropTypes.object,
};

export default PostDetails;
