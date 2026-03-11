export const slug = () => {
   function s4() {
      return new Date().getTime() + Math.floor(Math.random() * 1000000);
   }
   return `miestro-${ s4() }`;
};

// export const Class1 = (classSlug, classType) => {
//    const currentClass = {
//       slug: classSlug(0),
//       type: 'class',
//       name: 'Class',
//       props: {
//          order: 0,
//          picture_src: '',
//          course_id: '',
//          availableDelete: true,
//          justifyContent: 'flex-end',
//          alignItems: 'flex-start',
//          classType,
//       },
//       subcomponent: [
//          {
//             slug: classSlug(1),
//             type: 'slider_title',
//             name: 'Class Name',
//             props: {
//                visibility: true,
//                hasVisibility: true,
//                color: '#ffffff',
//                fontSize: '56',
//                fontFamily: 'Avenir Next',
//             },
//          },
//          {
//             slug: classSlug(2),
//             type: 'slider_description',
//             name: 'Class Description',
//             props: {
//                visibility: true,
//                hasVisibility: true,
//                color: '#b4b8bb',
//                fontSize: '24',
//                fontFamily: 'Avenir Next',
//             },
//          },
//          {
//             slug: classSlug(3),
//             type: 'slider_author',
//             name: 'Class Author',
//             props: {
//                visibility: true,
//                hasVisibility: true,
//                color: '#ffffff',
//                color_bio: '#ffffff',
//                fontSize: '16',
//                fontSize_bio: '12',
//                fontFamily: 'Avenir Next DemiBold',
//                fontFamily_bio: 'Avenir Next Regular',
//             },
//          },
//          {
//             slug: classSlug(4),
//             type: 'slider_button',
//             name: 'Class Button',
//             props: {
//                visibility: true,
//                hasVisibility: true,
//                color: '#212121',
//                bgColor: '#ffffff',
//                fontSize: '14',
//                fontFamily: 'Avenir Next',
//                width: '180',
//             },
//          },
//       ],
//    };
//    return currentClass;
// };

// export const Class2 = (classSlug, classType) => {
//    const currentClass = {
//       slug: classSlug(),
//       type: 'class',
//       name: 'Class',
//       props: {
//          order: 0,
//          picture_src: '',
//          course_id: '',
//          availableDelete: true,
//          justifyContent: 'flex-start',
//          alignItems: 'center',
//          paddingTop: '9',
//          classType,
//       },
//       subcomponent: [
//          {
//             slug: classSlug(1),
//             type: 'slider_title',
//             name: 'Class Name',
//             props: {
//                visibility: true,
//                hasVisibility: true,
//                color: '#ffffff',
//                fontSize: '56',
//                fontFamily: 'Avenir Next',
//             },
//          },
//          {
//             slug: classSlug(2),
//             type: 'slider_description',
//             name: 'Class Description',
//             props: {
//                visibility: true,
//                hasVisibility: true,
//                color: '#ffffff',
//                fontSize: '24',
//                fontFamily: 'Avenir Next',
//             },
//          },
//          {
//             slug: classSlug(3),
//             type: 'slider_author',
//             name: 'Class Author',
//             props: {
//                visibility: true,
//                hasVisibility: true,
//                color: '#ffffff',
//                color_bio: '#ffffff',
//                fontSize: '16',
//                fontSize_bio: '12',
//                fontFamily: 'Avenir Next DemiBold',
//                fontFamily_bio: 'Avenir Next Regular',
//             },
//          },
//          {
//             slug: classSlug(4),
//             type: 'slider_button',
//             name: 'Class Button',
//             props: {
//                visibility: true,
//                hasVisibility: true,
//                color: '#FFFFFF',
//                fontSize: '14',
//                fontFamily: 'Avenir Next',
//                width: '200',
//             },
//          },
//       ],
//    };
//    return currentClass;
// };

// export const Class3 = (classSlug, classType) => {
//    const currentClass = {
//       slug: classSlug(),
//       type: 'class',
//       name: 'Class',
//       props: {
//          order: 0,
//          picture_src: '',
//          course_id: '',
//          availableDelete: true,
//          paddingBottom: '1',
//          paddingLeft: '9',
//          justifyContent: 'flex-end',
//          alignItems: 'flex-start',
//          classType,
//       },
//       subcomponent: [
//          {
//             slug: classSlug(1),
//             type: 'slider_title',
//             name: 'Class Name',
//             props: {
//                visibility: true,
//                hasVisibility: true,
//                color: '#ffffff',
//                fontSize: '56',
//                fontFamily: 'Avenir Next',
//             },
//          },
//          {
//             slug: classSlug(2),
//             type: 'slider_description',
//             name: 'Class Description',
//             props: {
//                visibility: true,
//                hasVisibility: true,
//                color: '#FFFFFF',
//                fontSize: '18',
//                fontFamily: 'Avenir Next',
//             },
//          },
//          {
//             slug: classSlug(3),
//             type: 'slider_author',
//             name: 'Class Author',
//             props: {
//                visibility: true,
//                hasVisibility: true,
//                color: '#ffffff',
//                color_bio: '#ffffff',
//                fontSize: '16',
//                fontSize_bio: '12',
//                fontFamily: 'Avenir Next DemiBold',
//                fontFamily_bio: 'Avenir Next Regular',
//             },
//          },
//          {
//             slug: classSlug(4),
//             type: 'slider_button',
//             name: 'Class Button',
//             props: {
//                visibility: true,
//                hasVisibility: true,
//                color: '#FFFFFF',
//                fontSize: '14',
//                fontFamily: 'Avenir Next',
//                width: '239',
//             },
//          },
//       ],
//    };
//    return currentClass;
// };
