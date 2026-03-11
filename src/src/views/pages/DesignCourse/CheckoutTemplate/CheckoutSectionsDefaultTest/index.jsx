export const slug = () => {
   function s4() {
      return new Date().getTime() + Math.floor(Math.random() * 1000000);
   }
   return `miestro-${ s4() }`;
};


export const BulletEl1 = (classSlug) => {
   const currentBullet = {
      slug: classSlug(),
      type: 'bullet',
      name: 'Bullet',
      props: {
         text: 'Default Text',
         color: '#fff',
         font_size: 14,
      },
   };
   return currentBullet;
};

export const BulletEl2 = (classSlug) => {
   const currentBullet = {
      slug: classSlug(),
      type: 'bullet',
      name: 'Bullet',
      props: {
         text: 'Default Text',
         color: '#212121',
         font_size: 21,
      },
   };
   return currentBullet;
};

export const Testimonial1 = (classSlug) => {
   const currentTestimonial = {
      slug: classSlug(),
      type: 'testimonial',
      name: 'Testimonial',
      props: {
         picture_src: '',
         author_name: 'Author',
         author_color: '#fff',
         text: 'Default Text',
         color: '#ebebeb',
      },
   };
   return currentTestimonial;
};


export const Testimonial2 = (classSlug) => {
   const currentTestimonial = {
      slug: classSlug(),
      type: 'testimonial',
      name: 'Testimonial',
      props: {
         picture_src: '',
         author_name: 'Author',
         author_color: '#212121',
         text: 'Default Text',
         color: '#212121',
      },
   };
   return currentTestimonial;
};


export const bullet1 = {
   slug: slug(),
   type: 'bullet',
   name: 'Bullet',
   props: {
      text: 'Default Text',
      color: '#fff',
      font_size: 14,
   },

};

export const bullet2 = {
   slug: slug(),
   type: 'bullet',
   name: 'Bullet',
   props: {
      text: 'Default Text',
      color: '#212121',
      font_size: 21,
   },
};

export const testimonial2 = {
   slug: slug(),
   type: 'testimonial',
   name: 'Testimonial',
   props: {
      picture_src: '',
      author_name: 'Author',
      author_color: '#212121',
      text: 'Default Text',
      color: '#212121',
   },

};

export const testimonial1 = {
   slug: slug(),
   type: 'testimonial',
   name: 'Testimonial',
   props: {
      picture_src: '',
      author_name: 'Author',
      author_color: '#fff',
      text: 'Default Text',
      color: '#ebebeb',
   },

};
