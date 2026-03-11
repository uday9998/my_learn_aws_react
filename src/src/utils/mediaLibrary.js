import { downloadS3File } from 'api';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import { conditionsSelector } from 'state/modules/automation/selectors';
import { generateRandomString, getPosition } from './Helpers';

/* eslint-disable no-restricted-syntax */
const iconNamesByMimeType = {
   'jpg': ['image/jpeg', 'image/pjpeg'],
   'tiff': ['image/tiff'],
   'png': ['image/png'],
   'pdf': ['application/pdf'],
   'ppt': ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
   'audio': ['audio/mpeg', 'audio/ogg'],
};

export const formatToExtention = {
   'video': ['mp4', 'webm', 'mov'],
   'image': ['png', 'jpg', 'jpeg', 'tiff'],
   'ppt': ['ppt', 'pptx'],
   'pdf': ['pdf'],
   'csv': ['csv'],
   'audio': ['mp3', 'ogg'],
   'media': ['mp4', 'webm', 'mov', 'png', 'jpg', 'jpeg', 'tiff', 'ppt', 'pptx', 'pdf', 'mp3', 'ogg'],
};

const extensionToMimeType = {
   mp4: 'video/mp4',
   mov: 'video/quicktime',
   webm: 'video/webm',
   jpg: 'image/jpeg',
   tiff: 'image/tiff',
   png: 'image/png',
   pdf: 'application/pdf',
   csv: 'text/csv',
   ppt: 'application/vnd.ms-powerpoint',
   pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
   mp3: 'audio/mpeg',
   ogg: 'audio/ogg',
};

export const getMediaIconByMimeType = (mimeType, lessonFormat = '') => {
   if (lessonFormat === 'video') return 'video';
   for (const [extention, mimeTypes] of Object.entries(iconNamesByMimeType)) {
      if (mimeTypes.includes(mimeType)) {
         return extention;
      }
   }
   return '';
};

export function getFileTypeLimitByFormat(format) {
   if (!formatToExtention[format]) return false;
   return formatToExtention[format].join(' ');
}

export function getAcceptTypesByFormat(format) {
   if (!formatToExtention[format]) return false;
   return formatToExtention[format]
      .map(ext => `.${ ext }`)
      .join(',');
}

export function getInputAllowedExtensionsAndMimeTypes({ allowedExtensions, format }) {
   const extensions = format ? getFileTypeLimitByFormat(format) : allowedExtensions;
   const allowedExtensionList = extensions.split(' ');
   const inputAllowedExtentions = allowedExtensionList.map(ext => `.${ ext }`).join(',');
   const allowedMimeTypes = allowedExtensionList.reduce((res, extension) => {
      if (extensionToMimeType[extension]) {
         res.push(extensionToMimeType[extension]);
      }
      return res;
   }, []);
   return [inputAllowedExtentions, allowedMimeTypes];
}

export function getS3Url(key) {
   const { REACT_APP_AWS_BUCKET_URL } = process.env;
   return `${ REACT_APP_AWS_BUCKET_URL }/${ key }`;
}

export function isVideoFile(mimeType) {
   const videoMimeTypes = formatToExtention.video.map(ext => extensionToMimeType[ext.toLocaleLowerCase()]);
   return videoMimeTypes.includes(mimeType);
}

export function mimeTypeToExtension(mimeType) {
   for (const extension in extensionToMimeType) {
      if (mimeType.toLowerCase() === extensionToMimeType[extension]) {
         return extension;
      }
   }
   return false;
}

export function generateFileName(mimeType) {
   const randomFileName = generateRandomString(9);
   const fileExtension = mimeTypeToExtension(mimeType);
   if (fileExtension) {
      return `${ randomFileName }_${ Date.now() }.${ fileExtension }`;
   }
   return false;
}

export async function onDownload(src, title, isLessonDownload) {
   const a = document.createElement('a');
   if (src.startsWith('https://ucarecdn.com')) {
      const uuid = src.split('/')[3];
      const downloadSrc = `https://ucarecdn.com/${ uuid }/-/inline/no/`;
      a.href = downloadSrc;
      a.click();
   } else if (src.includes('amazonaws') || src.includes('cloudfront')) {
      if (isLessonDownload) {
         try {
            const response = await fetch(src);
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
      
            const a = document.createElement('a');
            a.style.display = 'none';
      
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = title; 
      
            document.body.appendChild(a);
      
            a.click();
      
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
         } catch (e) {
            if (isPrint('Failed To Download The File')) {
               toast.error('Failed To Download The File');
            }
         }
      } else {
         const position = getPosition(src, '/', 3);
         try {
            const { data: downloadUri } = await downloadS3File(src.substr(position + 1), title);
            a.href = downloadUri;
            a.title = title;
            a.click();
         } catch (e) {
            if (isPrint('Failed To Download The File')) {
               toast.error('Failed To Download The File');
            }
         }
      }
   }
}

export function fileToDataUrl(file) {
   return new Promise((resolve) => {
      if (file) {
         const reader = new FileReader();
         reader.addEventListener('load', () => {
            resolve(reader.result);
         }, false);
         reader.readAsDataURL(file);
      }
   });
}

export function getFilesCount(data) {
   const count = data.reduce((prev, next) => {
      if (next.videos) {
         return next.videos ? prev + next.videos.length : prev;
      }
      return next.files ? prev + next.files.length : prev;
   }, 0);
   return count;
}
