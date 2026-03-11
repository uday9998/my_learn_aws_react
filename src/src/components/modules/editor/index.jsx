import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { connect } from 'react-redux';
import init from 'components/modules/S3Upload/evaporate.js';
import { generateFileName, getS3Url } from 'utils/mediaLibrary';
import { mainAppSelector } from 'state/modules/common/selectors';
import './style.scss';
import LoaderOverlay from 'components/elements/LoaderOverlay';

class EditorConvertToHTML extends Component {
   constructor(props) {
      super(props);
      this.state = {
         show: true,
         description: props.description,
         uploadingImage: false,
      };
      this.imageUploadUrl = `${ window.location.origin }/api/v1/file`;
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.description !== prevState.description) {
         return {
            description: nextProps.description,
         };
      }
      return null;
   }

   componentDidUpdate(prevProps) {
      const { initial, description, isCancel } = this.props;
      if (initial === description && isCancel !== prevProps.isCancel) {
         this.reload();
      }
   }

   handleEditorChange = (e, type) => {
      const { onChange } = this.props;
      let editorText = '';
      if (type === 'keyUp') {
         editorText = e.target.innerHTML;
      } else {
         editorText = e.target.getContent();
      }
      onChange(editorText);
   }


   handleFilePicker = async (cb) => {
      try {
         const { mainApp: { uuid } } = this.props;
         const that = this;
         const client = await init();
         const input = document.createElement('input');
         input.setAttribute('type', 'file');
         input.setAttribute('accept', 'image/*');
         input.onchange = function () {
            const file = this.files[0];
            const filePath = `${ uuid }/${ generateFileName(file.type) }`;
            that.setState({ uploadingImage: true });

            const config = {
               file,
               name: filePath,
               xAmzHeadersAtInitiate: { 'x-amz-acl': 'public-read', 'Content-Type': file.type },
               complete: (_xhr, awsKey) => {
                  const url = getS3Url(awsKey);
                  that.setState({ uploadingImage: false });
                  cb(url, { title: file.name });
               },
            };
            return client.add(config);
         };

         input.click();
      } catch (err) {
         return err;
      }
      return true;
   }

    reload = () => {
       this.setState({ show: false }, () => {
          this.setState({ show: true });
       });
    }


    render() {
       const { show, description, uploadingImage } = this.state;
       const { isCustomCode } = this.props;
       if (!show) return null;
       return (
          <div className={ isCustomCode ? 'customEditor customCode' : 'customEditor' }>
             {uploadingImage && (
                <LoaderOverlay />
             )}
             <Editor
                value={ description }
                ref={ node => this.editor = node }
                onInit={ () => {
                   this.initialValue = description;
                } }
                apiKey={ process.env.REACT_APP_EDITOR_API_KEY }
                init={
                   {
                      height: 300,
                      convert_urls: false,
                      menubar: false,
                      link_assume_external_targets: true,
                      plugins: [
                         'advlist autolink lists link media',
                         'charmap print preview anchor help',
                         'searchreplace visualblocks code',
                         'insertdatetime media table paste wordcount image imagetools media',
                      ],
                      automatic_uploads: true,
                      file_picker_callback: this.handleFilePicker,
                      file_picker_types: 'image',
                      audio_template_callback(data) {
                         // eslint-disable-next-line no-useless-concat
                         return `${ '<audio controls>' + '\n<source src="' }${ data.source1 }"${ data.source1mime ? ` type="${ data.source1mime }"` : '' } />\n` + '</audio>';
                      },
                      toolbar: isCustomCode ? 'code' : 'code undo redo formatselect forecolor backcolor  bold italic  bullist numlist fontsizeselect  fontselect  alignleft aligncenter alignright alignjustify outdent indent  link image media',
                      branding: false,
                   }
                }
                onChange={ this.handleEditorChange }
                onKeyUp={ e => this.handleEditorChange(e, 'keyUp') }
             />
          </div>
       );
    }
}
EditorConvertToHTML.propTypes = {
   mainApp: PropTypes.object,
   onChange: PropTypes.func,
   description: PropTypes.any,
   isCustomCode: PropTypes.bool,
   initial: PropTypes.any,
   isCancel: PropTypes.bool,
};

const mapStateToProps = state => (
   {
      mainApp: mainAppSelector(state),
   }
);
export default connect(mapStateToProps)(EditorConvertToHTML);
