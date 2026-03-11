export const slug = (time) => {
   function s4() {
      return time + Math.floor(Math.random() * 1000000);
   }
   return `question-${ s4() }`;
};

export const slugAnswer = (time) => {
   function s4() {
      return time + Math.floor(Math.random() * 1000000);
   }
   return `answer-${ s4() }`;
};

export const slugAnswerMulti = (time) => {
   function s4() {
      return time + Math.floor(Math.random() * 1000000);
   }
   return `multiAnswer-${ s4() }`;
};

export const WelcomeScreen = {
   'image_src': '',
   'image_status': 0,
   'type': 'welcome_screen',
   'answers': [],
   'order': 0,
   'title': 'Welcome Screen',
};

const multAnswer1 = {
   'description': 'Correct answer',
   'is_true': 1,
   'order': 0,
   slug: slugAnswer(new Date().getTime() + 1),
};

const multAnswer2 = {
   'description': 'Second Correct answer',
   'is_true': 1,
   'order': 1,
   slug: slugAnswer(new Date().getTime() + 2),
};

const multAnswer3 = {
   'description': 'Wrong answer',
   'is_true': 0,
   'order': 2,
   slug: slugAnswer(new Date().getTime() + 3),
};

export const multiAnswers = [
   { ...multAnswer1 },
   { ...multAnswer2 },
   { ...multAnswer3 },
];

export const answers = [
   {
      'description': 'Yes',
      'is_true': 1,
      'order': 0,
      slug: slugAnswer(new Date().getTime() + 5),
   },
   {
      'description': 'No',
      'is_true': 0,
      'order': 1,
      slug: slugAnswer(new Date().getTime() + 6),
   },
];

export const MultipleChoice = {
   'title': 'Title',
   'description': '',
   'image_src': '',
   'multiple_status': 1,
   'multiple_value': 2,
   'type': 'multiple_choice',
};

export const Single = {
   'title': 'Title',
   'description': '',
   'image_src': '',
   'multiple_status': 0,
   'multiple_value': 1,
   'type': 'yes_no',
};

export const Ending = {
   'description': '',
   'image_src': '',
   'image_status': 0,
   'fail_message': '',
   'passed_message': '',
   'type': 'ending',
   'answers': [],
   'title': 'Ending Screen',
};
