const slug = () => {
   function s4() {
      return new Date().getTime() + Math.floor(Math.random() * 10000);
   }
   return `miestro-${ s4() }`;
};

const state = {
   landing_name: 'landing_13',
   landing_metas: {
      landing_favicon: require('./images/miestro.ico'),
      heading_font: 'Inter-ExtraBold',
      regular_font: 'Inter-Regular',
      heading_text_color: '#333333',
      regular_text_color: '#333333',
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      fb_pixel_code: '',
      google_anal_resource_id: '',
      head_section_tracking_codes: '',
      after_opening_body_tag: '',
      before_closing_body_tag: '',
      isNewView: true,
      isNewLogo: true,
      isCustomLinks: true,
      isNewCourseSection: true,
   },
   landing: [
      {
         section: {
            // slug unique identifier
            slug: slug(),
            // component name (used as show name for sidebar)
            name: 'Header',
            // section_props
            props: {
               // props:value
               order: 0,
               duplicated: 'header',
               visibility: true,
               bgVideoSrc: '',
               bgImgSrc: '',
               bgColor: '#ffffff',
               background_type: 'color',
               spacing: 'xs',
               backgroundLabel: 'Background Image (1900x80)',
            },
         },
         components: [
            {
               slug: slug(),
               type: 'Image',
               name: 'Image',
               props: {
                  imgUrl: 'Your Logo',
                  text: '',
                  width: '200',
                  maxSize: '200',
                  radius: '0',
                  visibility: true,
                  isLogo: true,
                  imageLabel: 'Show Image (200x60)',
               },
            },
            {
               slug: slug(),
               type: 'ButtonMi',
               name: 'Button Features',
               props: {
                  text: 'Log In',
                  bgColor: '#7cb740',
                  textColor: '#ffffff',
                  href: '',
                  size: 'medium',
                  border: 'none',
                  blanked: true,
               },
            },

         ],
      },
      {
         section: {
            // slug unique identifier
            slug: slug(),
            // component name (used as show name for sidebar)
            name: 'Hero',
            // section_props
            props: {
               // props:value
               order: 1,
               duplicated: 1,
               visibility: true,
               bgVideoSrc: '',
               bgImgSrc: require('./images/section_1_background-new.png'),
               bgColor: '#ffffff',
               background_type: 'image',
               alignmentAvalaible: true,
               spacing: 'lg',
               alignment: 'center',
               backgroundLabel: 'Background Image (1900x600)',
            },
         },
         components: [
            {
               slug: slug(),
               type: 'Text',
               name: 'Title',
               props: {
                  align: 'center',
                  text:
                            "<span style='line-height: 1.08; font-size: 48px; font-family: Inter-ExtraBold;'>Headline. Write here an attractive offer</span>",
                  color: '#ffffff',
               },
            },
            {
               slug: slug(),
               type: 'Text',
               name: 'Text',
               props: {
                  align: 'center',
                  text: "<p><span style='line-height: 1.78; font-size:18px; font-family: Inter-Regular;'>This section is the first thing your landing page’s visitors will see, so make sure you have a great title and some informative,yet brief, body copy. Choose a background image without any text or distracting imagery, and make sure there is enough contrast between your background and your text colors. </span></p>",
                  color: '#ffffff',
               },
            },
            {
               slug: slug(),
               type: 'ButtonMi',
               name: 'Button Features',
               props: {
                  text: 'Sign Up',
                  bgColor: '#7cb740',
                  textColor: '#ffffff',
                  href: '',
                  size: 'medium',
                  widthChangeable: true,
                  border: 'none',
               },
            },
         ],
      },
      {
         section: {
            slug: slug(),
            name: 'Text with image',
            props: {
               order: 2,
               duplicated: 2,
               visibility: true,
               bgVideoSrc: '',
               bgImgSrc: '',
               bgColor: 'rgb(255,255,255)',
               background_type: 'image',
               spacing: 'sm',
               reverseAvailaible: true,
               reversed: true,
            },
         },
         components: [
            {
               slug: slug(),
               type: 'Image',
               name: 'Image',
               props: {
                  imgUrl: require('./images/image-placeholder.png'),
                  width: '580',
                  radius: '0',
                  visibility: true,
                  imageLabel: 'Show Image (600x400)',
               },
            },
            {
               slug: slug(),
               type: 'Text',
               name: 'Title',
               props: {
                  align: 'left',
                  text:
                            "<span style='font-size: 48px;'>What will you learn</span>",
               },
            },
            {
               slug: slug(),
               type: 'Text',
               name: 'Text',
               props: {
                  align: 'left',
                  text:
                            "<p><span style='line-height: 1.78; font-size:18px;'>Tell about the core of the course and upload an atmospherical photo to attract the attention of your students. Tell why your course is the best for learning.</span></p>",
                  color: '#34495e',
               },
            },
            {
               slug: slug(),
               type: 'ButtonMi',
               name: 'Button Features',
               props: {
                  text: 'Sign Up',
                  bgColor: '#7cb740',
                  textColor: '#ffffff',
                  href: '',
                  size: 'medium',
                  widthChangeable: true,
                  border: 'none',
               },
            },
         ],
      },
      {
         section: {
            slug: slug(),
            name: 'Text with image',
            props: {
               order: 3,
               duplicated: 3,
               visibility: true,
               bgVideoSrc: '',
               bgImgSrc: '',
               bgColor: 'rgb(255,255,255)',
               background_type: 'image',
               reverseAvailaible: true,
               reversed: false,
               spacing: 'sm',
            },
         },
         components: [
            {
               slug: slug(),
               type: 'Image',
               name: 'Image',
               props: {
                  imgUrl: require('./images/avatar-placeholder.png'),
                  width: '580',
                  radius: '0',
                  visibility: true,
                  imageLabel: 'Show Image (600x400)',
               },
            },
            {
               slug: slug(),
               type: 'Text',
               name: 'Title',
               props: {
                  align: 'left',
                  text: "<span style='font-size: 48px;'>Your Instructor</span>",
               },
            },
            {
               slug: slug(),
               type: 'Text',
               name: 'Text',
               props: {
                  align: 'left',
                  text:
                            "<p style='line-height: 2; font-size: 16px;  max-width: 400px;'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>",
                  color: '#34495e',
               },
            },
            {
               slug: slug(),
               type: 'Text',
               name: 'Title',
               props: {
                  align: 'left',
                  text: "<h3 style=' font-size: 16px; font-family: Inter-Bold;'>Alex Parkinson</h3>",
               },
            },
            {
               slug: slug(),
               type: 'Text',
               name: 'Text',
               props: {
                  align: 'left',
                  text:
                            "<p style='line-height: 1.5;  font-size: 14px;'>Personal Life Coach </p>",
                  color: '#34495e',
               },
            },
         ],
      },
      //  FEATURES SECTIONS DEFAULT JSON
      {
         section: {
            // slug unique identifier
            slug: slug(),
            // component name (used as show name for sidebar)
            name: 'Bundle Courses',
            // section_props
            props: {
               // props:value
               order: 5,
               duplicated: 4,
               visibility: true,
               bgVideoSrc: '',
               bgImgSrc: '',
               bgColor: 'rgba(0, 109, 255, 0.1)',
               background_type: 'color',
               spacing: 'sm',
            },
         },
         components: [
            {
               slug: slug(),
               type: 'Text',
               name: 'Title',
               props: {
                  align: 'center',
                  text:
                            "<span style='line-height:initial; font-size: 48px;'>Bundle Courses</span>",
                  color: '#34495e',
               },
            },
            {
               slug: slug(),
               type: 'Text',
               name: 'Text',
               props: {
                  align: 'center',
                  text: "<p><span style='line-height: 1.5; font-size:16px;'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></p>",
                  color: '#34495e',
               },
            },
            {
               slug: slug(),
               type: 'ButtonMi',
               name: 'Button Features',
               props: {
                  text: 'Sign Up',
                  bgColor: '#7cb740',
                  textColor: '#ffffff',
                  href: '',
                  size: 'medium',
                  widthChangeable: true,
                  border: 'none',
                  blanked: true,
               },
            },
         ],
      },
      {
         section: {
            slug: slug(),
            name: 'Pricing',
            props: {
               order: 6,
               duplicated: 'pricing',
               visibility: true,
               bgVideoSrc: '',
               bgImgSrc: '',
               bgColor: '#ffffff',
               background_type: 'image',
               imageOverlay: true,
               spacing: 'sm',
               backgroundLabel: 'Background Image (1900x400)',
            },
         },
         components: [
            {
               slug: slug(),
               type: 'Text',
               name: 'Title',
               props: {
                  align: 'center',
                  text:
                            "<span style='line-height:1.08; font-size:48px;'>Ready to get started?</span>",
                  color: '#34495e',
               },
            },
            {
               slug: slug(),
               type: 'Text',
               name: 'Text',
               props: {
                  align: 'center',
                  text: "<p style='max-width: 460px'><span style='line-height:2; font-size:16px;'>Join countless coaches, consultants, teachers and experts who are creating their own online memberships!</span></p>",
                  color: '#34495e',
               },
            },
            {
               slug: slug(),
               type: 'Pricing',
               name: 'Pricing',
               props: {
                  text: 'Montly Fee Title Here',
                  price: '$99/m',
                  textColor: '#34495e',
                  textColor_selected: '#34495e',
                  bgColor: '#ffffff',
                  bgColor_selected: '#ffffff',
                  border_selected: 'solid 2px rgb(124, 183, 64)',
                  newcolor: 'pricing_color',
               },
            },
            {
               slug: slug(),
               type: 'ButtonMi',
               name: 'Button Features',
               props: {
                  text: 'Sign Up',
                  bgColor: '#7cb740',
                  textColor: '#ffffff',
                  href: '',
                  size: 'medium',
                  widthChangeable: true,
                  border: 'none',
                  blanked: true,
                  scroll_to_section: true,
                  pricing_button: true,
               },
            },
         ],
      },
      {
         section: {
            // slug unique identifier
            slug: slug(),
            // component name (used as show name for sidebar)
            name: 'Footer',
            // section_props
            props: {
               // props:value
               order: 7,
               duplicated: 'footer',
               visibility: true,
               bgVideoSrc: '',
               bgImgSrc: '',
               bgColor: '#34495e',
               background_type: 'color',
               spacing: 'sm',
            },
         },
         components: [
            {
               slug: slug(),
               type: 'ButtonMi',
               name: 'Button Features',
               props: {
                  text: 'Privacy Policy',
                  bgColor: '#34495e',
                  textColor: '#ffffff',
                  size: 'extsmall',
                  linked: true,
                  blanked: false,
                  href: '',
                  border: 'none',
               },
            },
            {
               slug: slug(),
               type: 'ButtonMi',
               name: 'Button Features',
               props: {
                  text: 'Terms',
                  bgColor: '#34495e',
                  textColor: '#ffffff',
                  size: 'extsmall',
                  linked: true,
                  blanked: false,
                  href: '',
                  border: 'none',
               },
            },
            {
               slug: slug(),
               type: 'ButtonMi',
               name: 'Button Features',
               props: {
                  text: 'Copyright © 2023 by Personal Life Coach.',
                  bgColor: '#34495e',
                  textColor: '#ffffff',
                  size: 'extsmall',
                  linked: true,
                  blanked: false,
                  href: '',
                  border: 'none',
               },
            },
         ],
      },
      {
         section: {
            slug: slug(),
            name: 'Course',
            props: {
               order: 4,
               duplicated: 'course',
               visibility: true,
               bgVideoSrc: '',
               bgImgSrc: '',
               bgColor: '#272727',
               background_type: 'color',
               spacing: 'md',
               videoAvailaible: false,
            },
         },
         components: [
            {
               slug: slug(),
               type: 'Text',
               name: "Curriculum's Colors",
               props: {
                  text: "<p><span style='style='font-size:18px; line-height: 1.78;'>Curriculum's Colors</span></p>",
                  visibility: true,
                  label: "Curriculum's Colors",
                  lessonsBgColor: '#333333',
                  lessonsColor: '#ffffff',
                  isLessonsBgColor: true,
               },
            },
            {
               slug: slug(),
               type: 'Text',
               name: 'Title',
               props: {
                  align: 'center',
                  text: "<span style='line-height:initial; font-size: 48px;'>Course Curriculum</span>",
                  color: '#ffffff',
               },
            },
         ],
      },
   ],
};

export default state;
