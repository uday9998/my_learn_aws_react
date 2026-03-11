import React from 'react';

export const questions = [
   {
      question: 'Where do I host my class?',
      answer: 'With Miestro, of class! All Miestro plans come with secure reliability. We host your class on reliable servers and have 99.9% uptime. In other words, you’re safe with us.',
   },
   {
      question: 'Are there any transaction fees?',
      answer: 'Unlike other platforms, with Miestro there are no transaction fees at all other than your processor. Some class platforms try to charge ridiculous fees, but not us. Usually Stripe charges 2.9% plus 30 cents per transaction.',
   },
   {
      question: 'Can I use my own domain?',
      answer: 'Yes. Your site can use a domain name that you own and we also provide a free yourname.miestro.com domain name.',
   },
   {
      question: 'Can I upgrade or downgrade if I feel like a',
      answer: 'Absolutely… You can go into your member’s area and upgrade or downgrade any plan if you’d like.',
   },
   {
      question: 'Do you offer any money back guarantees?',
      answer: 'Yes, we’re so confident in Miestro that if in the first 30 days you decide it isn’t for you, we will refund your money.',
   },
   {
      question: 'Who can I contact if I have any trouble at all?',
      answer: ['You can reach out to our award-winning support ', <span style={ { color: '#006dff', cursor: 'pointer' } }>here</span>],
   },
];

export const planCards = [
   {
      title: 'PROFESSIONAL',
      price: '99',
      annuallyPrice: '89',
      orders: [
         'Unlimited Classes & Students',
         '2 Admin Site Accounts',
         'No Transaction Fee',
         'Unlimited Landing Pages',
         'Ability to Remove Miestro Branding',
         'Custom domain',
         'Coupon codes',
         'Memberships and classes',
         'Quiz Options',
         'Basic Zapier Options',
         'Gamification Options',
      ],
   },
   {
      title: 'PREMIUM',
      price: '199',
      annuallyPrice: '189',
      orders: [
         'Priority Phone Support',
         '10 admin Site Accounts',
         'Affiliate Program',
      ],
   },
   {
      title: 'BUSINESS',
      price: '189',
      annuallyPrice: '199',
      orders: [
         'Custom Pricing',
         'Request A Demo',
         'Customized training for you and your team',
         'Custom design options for your site',
      ],
   },
];
