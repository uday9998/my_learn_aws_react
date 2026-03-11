export const notifications = {
   general: [
      { not: 'When a new student joins the school', member: true, admin: true },
      { not: 'When someone cancels their account', member: true, admin: true },
      { not: 'When a subscription payment fails or a subscription is canceled due to non-payment', member: true, admin: true },
      { not: 'When an installment payment is successfully processed', member: true, admin: true },
      { not: 'Double opt-in email', member: true, admin: true },
   ],
   message: [
      { not: 'When someone comments', member: true, admin: false },
      { not: 'When someone mentions you in a comment', member: true, admin: true },
      { not: 'When someone replies to your comment', member: true, admin: true },
      { not: 'When people send you a message', member: true, admin: true },
   ],
   product: [
      { not: 'When a cart is abandoned', member: true, admin: true },
      { not: 'When a sale occurs', member: true, admin: true },
      { not: 'When a new student signs up for a free product', member: true, admin: true },
      { not: 'When a student requests a refund', member: true, admin: true },
      { not: 'When a student completes an assessment', member: true, admin: true },
      { not: 'When a student completes a course', member: true, admin: true },
      { not: 'When a student completes a quiz', member: true, admin: true },
      { not: 'When a students accepts a ‘grant offer’', member: true, admin: true },
      { not: 'Send email when a drip becomes available to students', member: true, admin: true },
      { not: 'Send weekly progress reminder email to students', member: true, admin: true },
   ],
};
