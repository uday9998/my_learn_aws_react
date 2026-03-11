import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';

export const copyToClipBoard = (text) => {
   navigator.clipboard.writeText(text);
   if (isPrint('Link copied succesfully!')) {
      toast.success('Link copied succesfully!');
   }
};
