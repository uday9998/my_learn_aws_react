const slug = () => {
   function s4() {
      return new Date().getTime() + Math.floor(Math.random() * 1000000);
   }
   return `miestro-${ s4() }`;
};

export const Text = () => {
   return (
      {
         slug: slug(),
         type: 'text',
         name: 'Text',
         props: {
            text: 'Text Example',
            textAlign: 'center',
            lineHeight: 130,
            fontWeight: '500',
            fontSize: 28,
            paddingTop: 0,
            paddingLeft: 0,
            paddingBottom: 0,
            paddingRight: 0,
            color: '#131F1E',
            bgColor: '',
            width: 100,
            availableDelete: true,
         },
      }
   );
};

export const Headline = () => {
   return (
      {
         slug: slug(),
         type: 'text',
         name: 'Title',
         props: {
            text: 'Headline Example',
            color: '#c9c9c9',
            bgColor: 'transparent',
            fontSize: '48',
            fontFamily: 'Avenir Next',
            lineHeight: '1',
            paddingTop: '0',
            paddingBottom: '0',
            paddingLeft: '0',
            paddingRight: '0',
            maxWidth: 'initial',
            width: '100',
            textAlign: 'center',
            justifyContent: 'center',
            availableDelete: true,
         },
      }
   );
};

export const Image = () => {
   return (
      {
         slug: slug(),
         type: 'image',
         name: 'Image',
         props: {
            image_src: 'https://miestro-production.s3-us-west-2.amazonaws.com/landing/mask.jpg',
            paddingTop: 0,
            paddingLeft: 0,
            paddingBottom: 0,
            paddingRight: 0,
            width: 30,
            justifyContent: 'center',
            visibility: true,
            availableDelete: true,
            borderRadius: 0,
         },
      }
   );
};

export const Button = () => {
   return (
      {
         slug: slug(),
         type: 'button',
         name: 'Call to Action',
         props: {
            isAction: true,
            isBlank: true,
            inner: 'Call to Action',
            theme: 'primary',
            background: '#24554E',
            color: 'white',
            paddingTop: '12',
            paddingBottom: '12',
            paddingLeft: '16',
            visibility: true,
            justifyContent: 'center',
            url: '',
            paddingRight: '16',
            width: '30',
            margin: '0px 0px 0px 0px',
            availableDelete: true,

         },
      }
   );
};

export const Video = () => {
   return (
      {
         slug: slug(),
         type: 'video',
         name: 'Video',
         props: {
            src: 'https://www.youtube.com/embed/RVjxFLTCngw',
            source: 'youtube',
            width: '310',
            paddingTop: '5',
            paddingBottom: '5',
            paddingLeft: '5',
            paddingRight: '5',
            borderRadius: '0',
            justifyContent: 'center',
            visibility: true,
            availableDelete: true,
         },
      }
   );
};

export const Bullet1 = () => {
   return (
      {
         slug: slug(),
         type: 'bullets',
         name: 'Bullet Points',
         props: {
            availableDelete: true,
            justifyContent: 'center',
         },
         subcomponent: [
            {
               slug: slug(),
               type: 'bullet',
               name: 'Bullet',
               props: {
                  text: 'Default Text',
                  color: '#c9c9c9',
                  font_size: 14,
               },

            },
            {
               slug: slug(),
               type: 'bullet',
               name: 'Bullet',
               props: {
                  text: 'Default Text',
                  color: '#c9c9c9',
                  font_size: 14,
               },

            },
         ],
      }
   );
};

export const Bullet2 = () => {
   return (
      {
         slug: slug(),
         type: 'bullets',
         name: 'Bullet Points',
         props: { isBullet: true },
         subcomponent: [
            {
               slug: slug(),
               type: 'bullet',
               name: 'Bullet',
               props: {
                  text: 'Default Text',
                  color: '#212121',
                  font_size: 21,
               },

            },
            {
               slug: slug(),
               type: 'bullet',
               name: 'Bullet',
               props: {
                  text: 'Default Text',
                  color: '#212121',
                  font_size: 21,
               },
            },
         ],
      }
   );
};


export const BulletEl = (classSlug) => {
   const currentBullet = {
      slug: classSlug(1),
      type: 'bullet',
      name: 'Bullet',
      props: {
         text: 'Default Text',
         color: '#c9c9c9',
         font_size: 14,
      },
   };
   return currentBullet;
};

export const LinkEl = (classSlug) => {
   const currentBullet = {
      slug: classSlug(1),
      type: 'link',
      name: 'Link',
      props: {
         text: 'Default Text',
         bgColor: 'transparent',
         color: '#ffffff',
         href: '',
         fontSize: '16',
         visibility: true,
         hasVisibility: true,
         blanked: true,
      },
   };
   return currentBullet;
};


// FAQ JSON
export const FAQ = (classSlug) => {
   const currentFAQ = {
      slug: classSlug(1),
      type: 'FAQ',
      name: 'FAQ',
      props: {
         bgColor: '#edf5ff',
         availableDelete: true,
      },
      subcomponent: [
         {
            slug: classSlug(2),
            type: 'questionanswer',
            name: 'Question',
            props: {
               visibility: true,
               label: 'Show question',
               bgColor: '#ffffff',
            },
            subcomponent: [
               {
                  slug: classSlug(3),
                  type: 'question',
                  name: 'Question Title',
                  props: {
                     align: 'left',
                     text: 'Where do I host my class?',
                     color: '#34495e',
                     lineHeight: '1',
                     fontSize: '20',
                  },
               },
               {
                  slug: classSlug(4),
                  type: 'answer',
                  name: 'Answer',
                  props: {
                     align: 'left',
                     text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                     color: '#34495e',
                     lineHeight: '1',
                     fontSize: '18',
                  },
               },
            ],
         },
         {
            slug: classSlug(5),
            type: 'questionanswer',
            name: 'Question',
            props: {
               visibility: true,
               label: 'Show question',
               bgColor: '#ffffff',
            },
            subcomponent: [
               {
                  slug: classSlug(6),
                  type: 'question',
                  name: 'Question Title',
                  props: {
                     align: 'left',
                     text: 'Are there any transaction fees?',
                     color: '#34495e',
                     lineHeight: '1',
                     fontSize: '20',
                  },
               },
               {
                  slug: classSlug(7),
                  type: 'answer',
                  name: 'Answer',
                  props: {
                     align: 'left',
                     text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                     color: '#34495e',
                     lineHeight: '1',
                     fontSize: '18',
                  },
               },
            ],
         },
         {
            slug: classSlug(8),
            type: 'questionanswer',
            name: 'Question',
            props: {
               visibility: true,
               label: 'Show question',
               bgColor: '#ffffff',
            },
            subcomponent: [
               {
                  slug: classSlug(9),
                  type: 'question',
                  name: 'Question Title',
                  props: {
                     align: 'left',
                     text: 'Can I use my own domain?',
                     color: '#34495e',
                     lineHeight: '1',
                     fontSize: '20',
                  },
               },
               {
                  slug: classSlug(10),
                  type: 'answer',
                  name: 'Answer',
                  props: {
                     align: 'left',
                     text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                     color: '#34495e',
                     lineHeight: '1',
                     fontSize: '18',
                  },
               },
            ],
         },
         {
            slug: classSlug(11),
            type: 'questionanswer',
            name: 'Question',
            props: {
               visibility: true,
               label: 'Show question',
               bgColor: '#ffffff',
            },
            subcomponent: [
               {
                  slug: classSlug(12),
                  type: 'question',
                  name: 'Question Title',
                  props: {
                     align: 'left',
                     text: 'Do you offer any money back guarantees?',
                     color: '#34495e',
                     lineHeight: '1',
                     fontSize: '20',
                  },
               },
               {
                  slug: classSlug(13),
                  type: 'answer',
                  name: 'Answer',
                  props: {
                     align: 'left',
                     text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                     color: '#34495e',
                     lineHeight: '1',
                     fontSize: '18',
                  },
               },
            ],
         },
      ],
   };
   return currentFAQ;
};


//  Countdown JSON
export const CountDown = (classSlug) => {
   const currentCountdown = {
      slug: classSlug(1),
      type: 'countdown',
      name: 'CountDown',
      props: {
         bgColor: '#ffffff',
         availableDelete: true,
      },
      subcomponent: [
         {
            slug: classSlug(2),
            type: 'timer',
            name: 'Days',
            props: {
               align: 'center',
               text: 'Days',
               color: '#34495e',
               visibility: true,
               label: 'Days',
               number: 0,
               date: Math.round(Date.now() / 1000),
            },
         },
         {
            slug: classSlug(3),
            type: 'timer',
            name: 'Hours',
            props: {
               align: 'center',
               text: 'Hours',
               color: '#34495e',
               visibility: true,
               label: 'Hours',
               number: 0,
               isCountdown: true,
               date: Math.round(Date.now() / 1000),

            },
         },
         {
            slug: classSlug(4),
            type: 'timer',
            name: 'Minutes',
            props: {
               align: 'center',
               text: 'Minutes',
               color: '#34495e',
               visibility: true,
               label: 'Minutes',
               number: 0,
               isCountdown: true,
               date: Math.round(Date.now() / 1000),
            },
         },
         {
            slug: classSlug(4),
            type: 'timer',
            name: 'Seconds',
            props: {
               align: 'center',
               text: 'Seconds',
               color: '#34495e',
               visibility: true,
               label: 'Seconds',
               number: 0,
               isCountdown: true,
               date: Math.round(Date.now() / 1000),
            },
         },
      ],
   };
   return currentCountdown;
};


//  Custom Code
export const CustomCode = (classSlug) => {
   const currentCustomCode = {
      slug: classSlug(1),
      type: 'customcode',
      name: 'Custom Code',
      props: {
         bgColor: '#edf5ff',
         availableDelete: true,
      },
      subcomponent: [
         {
            slug: classSlug(2),
            type: 'customcode_subcomponent',
            name: 'Text',
            props: {
               align: 'center',
               text: "<p><span style='font-size:18px; line-height: 1.78; color: #c9c9c9'>Custom code goes here...</span></p>",
               color: '#34495e',
            },
         },
      ],
   };
   return currentCustomCode;
};

// Banner
export const Banner = (classSlug) => {
   const currentBanner = {
      slug: classSlug(1),
      type: 'banner',
      name: 'Banner',
      props: {
         school_banner_src: 'https://miestro-production.s3.us-west-2.amazonaws.com/landing/schoolroom/template1.png',
         school_show_banner: true,
         availableDelete: true,
      },
      subcomponent: [
         {
            slug: classSlug(2),
            type: 'banner_title',
            name: 'Title',
            props: {
               text: 'Banner Title',
               color: '#ffffff',
               visibility: true,
               justifyContent: 'flex-end',
               alignItems: 'flex-start',
            },
         },
      ],
   };
   return currentBanner;
};


//  Call To Action
export const CallToAction = (classSlug) => {
   const currentCallToAction = {
      slug: classSlug(1),
      type: 'calltoaction',
      name: 'Call to Action',
      props: {
         bgColor: '#ffffff',
         paddingTop: '16',
         paddingBottom: '16',
         availableDelete: true,
      },
      subcomponent: [
         {
            slug: classSlug(2),
            type: 'sub_text',
            name: 'Title',
            props: {
               textAlign: 'center',
               text: 'Default title',
               color: '#34495e',
               lineHeight: '1',
               fontSize: '48',
               paddingTop: '10',
               paddingBottom: '10',
               paddingLeft: '0',
               paddingRight: '0',
               maxWidth: 'none',
               centerText: false,
            },
         },
         {
            slug: classSlug(3),
            type: 'sub_textarea',
            name: 'Text',
            props: {
               textAlign: 'center',
               text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
               color: '#34495e',
               lineHeight: '1',
               fontSize: '18',
               paddingTop: '10',
               paddingBottom: '10',
               paddingLeft: '0',
               paddingRight: '0',
               maxWidth: 'none',
               centerText: false,
            },
         },
         {
            slug: classSlug(4),
            type: 'sub_button',
            name: 'Call to Action',
            props: {
               text: 'Default Button',
               bgColor: '#7cb740',
               textColor: '#ffffff',
               widthChangeable: true,
               href: '',
               size: 'medium',
               border: 'none',
               blanked: true,
               linked: true,
               alignment: 'center',
               marginTop: 10,
               marginBottom: 10,
               marginLeft: 0,
               marginRight: 0,
               justifyContent: 'center',
               width: '283',
               fontSize: '16',
               borderRadius: '0',
            },
         },
      ],
   };
   return currentCallToAction;
};


export const VideoSection = (classSlug) => {
   return (
      {
         slug: classSlug(1),
         type: 'videosection',
         name: 'Video Section',
         props: {
            bgColor: '#ffffff',
            availableDelete: true,
         },
         subcomponent: [
            {
               slug: classSlug(2),
               type: 'sub_video',
               name: 'Video',
               props: {
                  src: 'https://www.youtube.com/embed/RVjxFLTCngw',
                  source: 'youtube',
                  width: '310',
                  spacing: '5',
                  borderRadius: '0',
                  justifyContent: 'center',
                  visibility: true,
                  availableDelete: true,
               },
            },
         ],
      }
   );
};
