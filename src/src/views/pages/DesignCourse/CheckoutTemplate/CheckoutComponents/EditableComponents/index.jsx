import TextEditable from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Text/Editable';
import ImageEditable from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Image/Editable';
import ButtonEditable from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Button/Editable';
import BulletEditable from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Bullet/Editable';
import TestimonialEditable from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Testimonial/Editable';
import BulletsEditable from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Bullets/Editable';
import TestimonialsEditable from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Testimonials/Editable';
import VideoEditable from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Video/Editable';
import LogoEditable from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Logo/Editable';
import PricingsEditable from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Pricings/Editable';
import DividerEditable from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/Divider/Editable';
import FaqElementEditable from 'views/pages/DesignCourse/CheckoutTemplate/CheckoutComponents/FaqElement/Editable';

const EditableComponents = (type) => {
   const showComponentByType = () => {
      let Component = Text;
      switch (type) {
         case 'button': Component = ButtonEditable;
            break;
         case 'image': Component = ImageEditable;
            break;
         case 'bullets': Component = BulletsEditable;
            break;
         case 'testimonials': Component = TestimonialsEditable;
            break;
         case 'bullet': Component = BulletEditable;
            break;
         case 'testimonial': Component = TestimonialEditable;
            break;
         case 'text': Component = TextEditable;
            break;
         case 'video': Component = VideoEditable;
            break;
         case 'logo': Component = LogoEditable;
            break;
         case 'pricing': Component = PricingsEditable;
            break;
         case 'divider': Component = DividerEditable;
            break;
         case 'faqElement': Component = FaqElementEditable;
            break;
         default: Component = TextEditable;
      }
      return Component;
   };
   return (
      showComponentByType()
   );
};

export default EditableComponents;
