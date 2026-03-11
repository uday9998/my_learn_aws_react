import React from 'react';
import PropTypes from 'prop-types';

export const AudioIcon = ({ className, color }) => {
   return (
      <svg className={ className } xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
         <g fill='none' fillRule='evenodd'>
            <path d='M0 0h24v24H0z' />
            <path fill={ color } className='lessonItem__icon' fillRule='nonzero' d='M22 3.287c0-.846-.825-1.443-1.625-1.19l-12.5 3.685C7.355 5.945 7 6.425 7 6.97v10.192a5.414 5.414 0 0 0-1.25-.153C3.679 17.01 2 18.127 2 19.505 2 20.883 3.679 22 5.75 22c2.071 0 3.75-1.117 3.75-2.495v-9.11l10-2.926v7.198a5.414 5.414 0 0 0-1.25-.152c-2.071 0-3.75 1.117-3.75 2.495 0 1.378 1.679 2.495 3.75 2.495 2.071 0 3.75-1.117 3.75-2.495V3.287z' />
         </g>
      </svg>
   );
};
export const VideoIcon = ({ className, color }) => {
   return (
      <svg className={ className } xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
         <g fill='none' fillRule='evenodd'>
            <path d='M0 0h24v24H0z' />
            <path fill={ color } className='lessonItem__icon' fillRule='nonzero' d='M13.674 5.5H3.66C2.743 5.5 2 6.224 2 7.118v9.764c0 .894.743 1.618 1.66 1.618h10.014c.916 0 1.66-.724 1.66-1.618V7.118c0-.894-.744-1.618-1.66-1.618zm6.576 1.276l-3.806 2.56v5.328l3.806 2.556c.736.495 1.75-.01 1.75-.873V7.65c0-.86-1.01-1.368-1.75-.874z' />
         </g>
      </svg>
   );
};
export const MultimediaIcon = ({ className, color }) => {
   return (
      <svg className={ className } xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
         <g fill='none' fillRule='evenodd'>
            <path d='M0 0h24v24H0z' />
            <path fill={ color } className='lessonItem__icon' fillRule='nonzero' d='M13.75 7.313V2H4.937A.935.935 0 0 0 4 2.938v18.125c0 .519.418.937.938.937h14.125c.519 0 .937-.418.937-.938V8.25h-5.313a.94.94 0 0 1-.937-.938zM20 6.761V7h-5V2h.238c.25 0 .489.098.664.273l3.825 3.829a.935.935 0 0 1 .273.66z' />
         </g>
      </svg>
   );
};
export const ZoomIcon = ({ className, color }) => {
   return (

      <svg
         version='1.0'
         xmlns='http://www.w3.org/2000/svg'
         width='18.000000pt'
         height='18.000000pt'
         viewBox='0 0  512.000000 512.000000'
         preserveAspectRatio='xMidYMid meet'
         className={ className }
      >

         <g
            transform='translate(0.000000,512.000000) scale(0.100000,-0.100000)'
            fill={ color }
            stroke='none'
         >
            <path d='M1122 4260 c-49 -12 -102 -51 -217 -161 -177 -171 -284 -317 -391
-534 -106 -216 -163 -420 -186 -667 -27 -286 44 -631 189 -923 108 -219 280
-443 448 -585 105 -89 126 -100 189 -107 47 -5 64 -2 112 22 96 47 141 147
110 248 -13 42 -35 69 -164 195 -112 111 -166 172 -215 248 -110 166 -181 337
-224 535 -25 118 -25 371 1 489 71 327 238 614 481 823 44 38 90 85 102 104
69 113 7 270 -122 309 -53 15 -64 16 -113 4z'
            />
            <path d='M3881 4255 c-126 -40 -186 -197 -118 -308 12 -19 58 -66 102 -104
257 -222 428 -526 487 -868 55 -323 -26 -672 -229 -979 -49 -76 -103 -138
-215 -248 -128 -126 -152 -154 -164 -195 -30 -99 14 -200 107 -247 119 -59
194 -27 388 164 319 315 510 722 553 1182 39 421 -124 918 -422 1282 -75 92
-260 269 -314 300 -53 31 -119 39 -175 21z'
            />
            <path d='M1639 3827 c-21 -8 -48 -23 -61 -33 -267 -212 -435 -495 -493 -828
-53 -310 40 -683 237 -951 61 -83 207 -231 265 -269 55 -36 136 -45 198 -22
95 37 149 145 125 247 -11 46 -24 64 -124 163 -130 131 -192 226 -242 373 -42
124 -57 238 -44 341 30 230 115 396 299 578 108 108 129 149 116 229 -20 128
-160 215 -276 172z'
            />
            <path d='M3345 3806 c-100 -44 -151 -171 -110 -273 9 -22 51 -74 101 -122 263
-259 349 -581 240 -904 -50 -147 -112 -242 -242 -373 -100 -99 -113 -117 -124
-163 -41 -172 136 -318 294 -241 62 30 197 160 279 268 371 494 352 1140 -48
1611 -75 88 -162 166 -213 193 -43 21 -133 24 -177 4z'
            />
            <path d='M2406 3394 c-115 -28 -203 -79 -296 -173 -97 -98 -138 -171 -172
-304 -70 -276 68 -577 326 -708 l86 -44 0 -683 c0 -652 1 -684 19 -720 69
-135 243 -163 343 -56 60 64 58 41 58 781 l0 678 86 44 c99 50 198 142 252
234 85 142 113 320 74 474 -34 133 -75 206 -172 304 -95 95 -181 145 -300 173
-80 19 -225 19 -304 0z'
            />
         </g>
      </svg>


   );
};
export const ImageIcon = ({ className, color }) => {
   return (
      <svg className={ className } xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
         <g fill='none' fillRule='evenodd'>
            <path d='M0 0h24v24H0z' />
            <path fill={ color } className='lessonItem__icon' fillRule='nonzero' d='M20.125 19.5H3.875A1.875 1.875 0 0 1 2 17.625V6.375C2 5.339 2.84 4.5 3.875 4.5h16.25C21.161 4.5 22 5.34 22 6.375v11.25c0 1.036-.84 1.875-1.875 1.875zM6.375 6.687a2.187 2.187 0 1 0 0 4.375 2.187 2.187 0 0 0 0-4.374zM4.5 17h15v-4.375l-3.419-3.419a.469.469 0 0 0-.662 0L10.125 14.5l-2.169-2.169a.469.469 0 0 0-.662 0L4.5 15.125V17z' />
         </g>
      </svg>

   );
};
export const FileIcon = ({ className, color }) => {
   return (
      <svg className={ className } xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
         <g fill='none' fillRule='evenodd'>
            <path d='M0 0h24v24H0z' />
            <path fill={ color } className='lessonItem__icon' fillRule='nonzero' d='M19.313 4H4.688C3.756 4 3 4.768 3 5.714v12.572C3 19.232 3.756 20 4.688 20h14.625c.931 0 1.687-.768 1.687-1.714V5.714C21 4.768 20.244 4 19.312 4zM7.5 8.143c0 .236-.19.428-.422.428H5.672a.427.427 0 0 1-.422-.428V6.714c0-.235.19-.428.422-.428h1.406c.232 0 .422.193.422.428v1.429zm11.25 0c0 .236-.19.428-.422.428H9.61a.427.427 0 0 1-.421-.428V6.714c0-.235.19-.428.421-.428h8.72c.231 0 .421.193.421.428v1.429z' />
         </g>
      </svg>
   );
};
export const PresentationIcon = ({ className, color }) => {
   return (
      <svg className={ className } xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
         <g fill='none' fillRule='evenodd'>
            <path d='M0 0h24v24H0z' />
            <path fill={ color } className='lessonItem__icon' fillRule='nonzero' d='M21.444 3H2.556A.559.559 0 0 0 2 3.563v1.124c0 .311.249.563.556.563h.555v9c0 .621.498 1.125 1.111 1.125h6.667v1.222l-2.615 2.647a.567.567 0 0 0 0 .796l.785.795a.55.55 0 0 0 .786 0L12 18.653l2.155 2.182a.55.55 0 0 0 .786 0l.785-.795a.567.567 0 0 0 0-.796l-2.615-2.647v-1.222h6.667c.613 0 1.11-.504 1.11-1.125v-9h.556A.559.559 0 0 0 22 4.687V3.563A.559.559 0 0 0 21.444 3zm-2.777 10.125H5.333V5.25h13.334v7.875z' />
         </g>
      </svg>
   );
};
export const QuizIcon = ({ className, color }) => {
   return (
      <svg className={ className } xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
         <g fill='none' fillRule='evenodd'>
            <path d='M0 0h24v24H0z' />
            <path fill={ color } className='lessonItem__icon' fillRule='nonzero' d='M22 12c0 5.524-4.478 10-10 10S2 17.524 2 12C2 6.48 6.478 2 12 2s10 4.48 10 10zm-9.732-6.694c-2.197 0-3.599.926-4.7 2.571a.485.485 0 0 0 .11.656l1.4 1.06c.21.16.508.122.671-.085.72-.913 1.215-1.443 2.311-1.443.824 0 1.843.53 1.843 1.329 0 .604-.499.914-1.312 1.37-.949.531-2.204 1.193-2.204 2.849v.161c0 .267.217.484.484.484h2.258a.484.484 0 0 0 .484-.484v-.054c0-1.147 3.354-1.195 3.354-4.3 0-2.34-2.426-4.114-4.699-4.114zm-.268 10a1.857 1.857 0 0 0-1.855 1.855c0 1.023.832 1.855 1.855 1.855a1.857 1.857 0 0 0 1.855-1.855A1.857 1.857 0 0 0 12 15.306z' />
         </g>
      </svg>
   );
};
export const TextIcon = ({ className, color }) => {
   return (
      <svg className={ className } xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
         <g fill='none' fillRule='evenodd'>
            <path d='M0 0h24v24H0z' />
            <path fill={ color } className='lessonItem__icon' fillRule='nonzero' d='M14.857 2.702v1.754c0 .388-.32.702-.714.702H2.714A.708.708 0 0 1 2 4.456V2.702C2 2.314 2.32 2 2.714 2h11.429c.394 0 .714.314.714.702zM2 8.316v1.754c0 .388.32.702.714.702h18.572A.708.708 0 0 0 22 10.07V8.316a.708.708 0 0 0-.714-.702H2.714A.708.708 0 0 0 2 8.316zM2.714 22h18.572a.708.708 0 0 0 .714-.702v-1.754a.708.708 0 0 0-.714-.702H2.714a.708.708 0 0 0-.714.702v1.754c0 .388.32.702.714.702zm11.429-8.772H2.714A.708.708 0 0 0 2 13.93v1.754c0 .388.32.702.714.702h11.429a.708.708 0 0 0 .714-.702V13.93a.708.708 0 0 0-.714-.702z' />
         </g>
      </svg>
   );
};

AudioIcon.propTypes = {
   className: PropTypes.string,
   color: PropTypes.string,
};

VideoIcon.propTypes = {
   className: PropTypes.string,
   color: PropTypes.string,
};

FileIcon.propTypes = {
   className: PropTypes.string,
   color: PropTypes.string,
};

ImageIcon.propTypes = {
   className: PropTypes.string,
   color: PropTypes.string,
};

MultimediaIcon.propTypes = {
   className: PropTypes.string,
   color: PropTypes.string,
};

ZoomIcon.propTypes = {
   className: PropTypes.string,
   color: PropTypes.string,
};

PresentationIcon.propTypes = {
   className: PropTypes.string,
   color: PropTypes.string,
};

QuizIcon.propTypes = {
   className: PropTypes.string,
   color: PropTypes.string,
};

TextIcon.propTypes = {
   className: PropTypes.string,
   color: PropTypes.string,
};

// Default props

AudioIcon.defaultProps = {
   color: '#C2CEDB',
};
VideoIcon.defaultProps = {
   color: '#C2CEDB',
};
FileIcon.defaultProps = {
   color: '#C2CEDB',
};
ImageIcon.defaultProps = {
   color: '#C2CEDB',
};
MultimediaIcon.defaultProps = {
   color: '#C2CEDB',
};
ZoomIcon.defaultProps = {
   color: '#C2CEDB',
};
PresentationIcon.defaultProps = {
   color: '#C2CEDB',
};
QuizIcon.defaultProps = {
   color: '#C2CEDB',
};
TextIcon.defaultProps = {
   color: '#C2CEDB',
};
