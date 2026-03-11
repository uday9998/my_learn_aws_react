
const landings404 = [
   {
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/1200px-Lion_waiting_in_Namibia.jpg',
      preview: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/1200px-Lion_waiting_in_Namibia.jpg',
      name: 'Template One',
      id: 1,
   },
   {
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/1200px-Lion_waiting_in_Namibia.jpg',
      name: 'Template Second',
      preview: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/1200px-Lion_waiting_in_Namibia.jpg',
      id: 2,
   },
   {
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/1200px-Lion_waiting_in_Namibia.jpg',
      preview: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/1200px-Lion_waiting_in_Namibia.jpg',
      name: 'Template Third',
      id: 3,
   },
];

const landingsSignIn = [
   {
      img: '',
      name: 'Template One',
      id: 1,
   },
   {
      img: '',
      name: 'Template Second',
      id: 2,
   },
   {
      img: '',
      name: 'Template Third',
      id: 3,
   },
];

const landingsSignUp = [
   {
      img: '',
      name: 'Template One',
      id: 1,
   },
   {
      img: '',
      name: 'Template Second',
      id: 2,
   },
   {
      img: '',
      name: 'Template Third',
      id: 3,
   },
];

export function getTemplatesByType(type) {
   const types = {
      404: landings404,
      'signin': landingsSignIn,
      'signup': landingsSignUp,
   };
   return types[type];
}
