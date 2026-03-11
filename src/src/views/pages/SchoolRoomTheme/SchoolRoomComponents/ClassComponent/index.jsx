export const slug = (n) => {
   function s4() {
      return new Date().getTime() + Math.floor(Math.random() * 1000000);
   }
   return `miestro-${ s4() }-${ n }`;
};

export const Class1 = (classSlug, classType) => {
   const currentClass = {
      slug: classSlug(0),
      type: 'class',
      name: 'Product',
      props: {
         order: 0,
         picture_src: '',
         course_id: '',
         availableDelete: true,
         justifyContent: 'flex-end',
         alignItems: 'flex-start',
         classType,
      },
      subcomponent: [
         {
            slug: classSlug(1),
            type: 'slider_title',
            name: 'Product Name',
            props: {
               visibility: true,
               hasVisibility: true,
               color: '#ffffff',
               fontSize: '56',
               fontFamily: 'Avenir Next',
            },
         },
         {
            slug: classSlug(2),
            type: 'slider_description',
            name: 'Product Description',
            props: {
               visibility: true,
               hasVisibility: true,
               color: '#b4b8bb',
               fontSize: '24',
               fontFamily: 'Avenir Next',
            },
         },
         {
            slug: classSlug(3),
            type: 'slider_author',
            name: 'Product Author',
            props: {
               visibility: true,
               hasVisibility: true,
               color: '#ffffff',
               color_bio: '#ffffff',
               fontSize: '16',
               fontSize_bio: '12',
               fontFamily: 'Avenir Next DemiBold',
               fontFamily_bio: 'Avenir Next Regular',
            },
         },
         {
            slug: classSlug(4),
            type: 'slider_button',
            name: 'Product Primary Button',
            props: {
               visibility: true,
               hasVisibility: true,
               color: '#212121',
               bgColor: '#ffffff',
               fontSize: '16',
               fontFamily: 'Avenir Next',
               width: '180',
            },
         },
         {
            slug: classSlug(4),
            type: 'slider_button',
            name: 'Product Secondary Button',
            props: {
               visibility: true,
               hasVisibility: true,
               color: '#212121',
               bgColor: '#ffffff',
               fontSize: '16',
               fontFamily: 'Avenir Next',
               width: '180',
            },
         },
      ],
   };
   return currentClass;
};

export const Class2 = (classSlug, classType) => {
   const currentClass = {
      slug: classSlug(),
      type: 'class',
      name: 'Product',
      props: {
         order: 0,
         picture_src: '',
         course_id: '',
         availableDelete: true,
         justifyContent: 'center',
         alignItems: 'flex-start',
         paddingLeft: '16',
         paddingRight: '16',
         paddingTop: '50',
         paddingBottom: '50',
         classType,
      },
      subcomponent: [
         {
            slug: classSlug(1),
            type: 'slider_title',
            name: 'Product Name',
            props: {
               visibility: true,
               hasVisibility: true,
               // color: '#ffffff',
               fontSize: '40',
               fontFamily: 'Avenir Next',
            },
         },
         {
            slug: classSlug(2),
            type: 'slider_description',
            name: 'Product Description',
            props: {
               visibility: true,
               hasVisibility: true,
               // color: '#FFFFFF',
               fontSize: '14',
               fontFamily: 'Avenir Next',
            },
         },
         {
            slug: classSlug(4),
            type: 'slider_button',
            name: 'Product Primary Button',
            props: {
               visibility: true,
               hasVisibility: true,
               // color: '#FFFFFF',
               fontSize: '14',
               // bgColor: '#7B53E9',
               // width: '239',
            },
         },
         {
            slug: classSlug(4),
            type: 'slider_button',
            name: 'Product Secondary Button',
            props: {
               visibility: true,
               hasVisibility: true,
               // bgColor: 'rgba(19, 31, 30, 0.6)',
               // color: '#FFFFFF',
               fontSize: '14',
               width: '239',
            },
         },
      ],
   };
   return currentClass;
};

export const Class3 = (classSlug, classType) => {
   const currentClass = {
      slug: classSlug(),
      type: 'class',
      name: 'Product',
      props: {
         order: 0,
         picture_src: '',
         course_id: '',
         availableDelete: true,
         justifyContent: 'center',
         alignItems: 'center',
         paddingLeft: '48',
         paddingRight: '48',
         paddingTop: '106',
         paddingBottom: '64',
         classType,
      },
      subcomponent: [
         {
            slug: classSlug(1),
            type: 'slider_title',
            name: 'Product Name',
            props: {
               visibility: true,
               hasVisibility: true,
               // color: '#ffffff',
               fontSize: '48',
               fontFamily: 'Avenir Next',
            },
         },
         {
            slug: classSlug(2),
            type: 'slider_description',
            name: 'Product Description',
            props: {
               visibility: true,
               hasVisibility: true,
               // color: '#FFFFFF',
               fontSize: '14',
               fontFamily: 'Avenir Next',
            },
         },
         {
            slug: classSlug(4),
            type: 'slider_button',
            name: 'Product Primary Button',
            props: {
               visibility: true,
               hasVisibility: true,
               // color: '#FFFFFF',
               fontSize: '14',
               // bgColor: '#7B53E9',
               // width: '239',
            },
         },
         {
            slug: classSlug(4),
            type: 'slider_button',
            name: 'Product Secondary Button',
            props: {
               visibility: true,
               hasVisibility: true,
               // bgColor: 'rgba(19, 31, 30, 0.6)',
               // color: '#FFFFFF',
               fontSize: '14',
               width: '239',
            },
         },
      ],
   };
   return currentClass;
};

export const DefaultClass = (classSlug, classType) => {
   const currentClass = {
      slug: classSlug(7),
      type: 'class',
      name: 'Product',
      props: {
         order: 0,
         picture_src: '',
         course_id: '',
         availableDelete: true,
         justifyContent: 'flex-start',
         alignItems: 'center',
         paddingLeft: '45',
         classType,
      },
      subcomponent: [
         {
            slug: classSlug(1),
            type: 'slider_title',
            name: 'Name',
            props: {
               visibility: true,
               hasVisibility: true,
               // color: '#ffffff',
               fontSize: '56',
               fontFamily: 'Avenir Next',
            },
         },
         // {
         //    slug: classSlug(2),
         //    type: 'slider_description',
         //    name: 'Product Description',
         //    props: {
         //       visibility: true,
         //       hasVisibility: true,
         //       // color: '#FFFFFF',
         //       fontSize: '24',
         //       fontFamily: 'Avenir Next',
         //    },
         // },
         {
            slug: classSlug(4),
            type: 'slider_button',
            name: 'Primary Button',
            props: {
               visibility: true,
               hasVisibility: true,
               // color: '#FFFFFF',
               fontSize: '16',
               // bgColor: '#7B53E9',
               // width: '239',
            },
         },
         // {
         //    slug: classSlug(4),
         //    type: 'slider_button',
         //    name: 'Product Secondary Button',
         //    props: {
         //       visibility: true,
         //       hasVisibility: true,
         //       // bgColor: 'rgba(19, 31, 30, 0.6)',
         //       // color: '#FFFFFF',
         //       fontSize: '16',
         //       width: '239',
         //    },
         // },
      ],
   };
   return currentClass;
};
