import axios from 'axios';

export const checkCreditCardStatus = async (email) => {
   try {
      const response = await axios.post('/api/main/trial/trial/credit-card-status', {
         email,
      });

      return {
         success: true,
         data: response.data,
      };
   } catch (error) {
      const fallbackData = {
         has_credit_card: false,
         has_saved_credit_card: false,
      };

      return {
         success: false,
         error: error.response?.data?.error || 'Failed to check credit card status',
         data: fallbackData,
      };
   }
};

export const shouldShowSaveCreditCardPage = (authUser, creditCardStatus) => {
   if (!authUser || !authUser.email) {
      return false;
   }

   // Handle both string and integer role values
   const userRole = authUser.role;
   const isAdmin = ['admin', 'sub-admin', 'support', 'assistant'].includes(userRole) ||
                   [1, 2, 3, 4].includes(userRole) || // 1=admin, 2=sub-admin, 3=assistant, 4=support
                   [1, 2, 3, 4].includes(parseInt(userRole, 10));

   if (!isAdmin) {
      return false;
   }

   const hasSavedCreditCard = creditCardStatus?.has_saved_credit_card ?? creditCardStatus?.has_credit_card;
   const shouldShow = !hasSavedCreditCard;

   return shouldShow;
};