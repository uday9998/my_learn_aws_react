import regular from 'assets/images/studentsRoom/regular.png';
import john from 'assets/images/studentsRoom/avatars/john.png';

import alice from 'assets/images/studentsRoom/avatars/alice.png';
import patrice from 'assets/images/studentsRoom/avatars/patrice.png';
import susan from 'assets/images/studentsRoom/avatars/susan.png';
import chen from 'assets/images/studentsRoom/avatars/chen.png';
import jamie from 'assets/images/studentsRoom/avatars/jamie.png';

export const author = {
   avatar: regular,
   name: 'Justin Burns',
   info: 'Justin Burns is the CEO of Miestro and has helped companies scale with their online content using courses.',
};

export const commentsData = {

   comments: [
      {
         id: 1,
         avatar: alice,
         writer: 'Alice Miredo',
         text: 'This is so informative and inspiring. Hope to make some meaningful life changes through it.',
      },
      {
         id: 2,
         avatar: patrice,
         writer: 'Patrice Touboul',
         text: 'This was helpful. Thank you for the tips.',
      },
      {
         id: 3,
         avatar: susan,
         writer: 'Susan Park',
         text: 'wow. thanks for this. Found them really insightful and helpful. Thumbs up',
      },
      {
         id: 4,
         avatar: chen,
         writer: 'Chen Ming',
         text: 'Copying to my notes because your advice is amazing. Tks for sharing.',
      },
      {
         id: 5,
         avatar: jamie,
         writer: 'Jamie Hottag',
         text: 'Thank you for providing this information..Great nuggets.',
      },
   ],

   user: {
      avatar: john,
      name: 'John Doe',
   },

};

// Sidebar data

export const sidebarData = {
   playlist: [
      [
         {
            id: 1,
            title: 'Welcome To Cracking The Course Code Masterclass',
            duration: '8:49',
            active: true,
            viewed: false,
         },
         {
            id: 2,
            title: 'The Action Learning Process',
            duration: '6:32',
            active: false,
            viewed: false,
         },
         {
            id: 3,
            title: 'Setting Present Tense Goalss',
            duration: '2:56',
            active: false,
            viewed: false,
         },
         {
            id: 4,
            title: 'Introduction To Cracking The Course Code Masterclass',
            duration: '4:55',
            active: false,
            viewed: false,
         },
         {
            id: 5,
            title: 'Cracking The Course Code Introduction Class ',
            duration: '2:48',
            active: false,
            viewed: false,
         },
         {
            id: 6,
            title: '30 Day Course Launch Blueprint',
            duration: '4:55',
            active: false,
            viewed: false,
         },
      ],
      [
         {
            id: 1,
            title: 'Welcome To Cracking The Course Code Masterclass',
            duration: '5:31',
            active: true,
            viewed: true,
         },
         {
            id: 2,
            title: 'The Action Learning Process',
            duration: '5:51',
            active: false,
            viewed: true,
         },
      ],
   ],
   headerData: [
      {
         id: 1,
         title: 'Course Course',
         videoCount: 3,
         videoDuration: '31:16',
      },
      {
         id: 2,
         title: 'Bonus Training',
         videoCount: 2,
         videoDuration: '11:22',
      },
      {
         id: 3,
         title: 'Recorded Training Calls',
         videoCount: 4,
         videoDuration: '18:24',
      },
   ],
};

// NavCards Data

export const navCards = [
   {
      id: 1,
      title: 'Discussion',
      icon: 'Comment',
      content: '5 Comment',
   },
   {
      id: 2,
      title: 'Meet The Professor',
      content: 'Justin Burns',
      img: regular,
   },
   {
      id: 3,
      title: 'Achievements',
      icon: 'Achievement',
      content: 'New Badge',
   },
   {
      id: 4,
      title: 'Resources',
      icon: 'Resource',
      content: 'PDF',
   },
];
