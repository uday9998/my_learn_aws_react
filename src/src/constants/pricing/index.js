export const PLANS__DATA = {
   // starter: {
   //    iconColor: '#2585EB',
   //    texts: [
   //       'Netflix-style catalog',
   //       '500 Members',
   //       '5 Hours of Video',
   //       '1 Site',
   //       '1 Admin User',
   //       '1 Online Course',
   //       'Community Creation with 1 Room',
   //       'Customizable Portal Rooms and Pages',
   //       'Email Support',
   //       'Analytics',
   //       'Accept Credit Cards & Payments',
   //       'Custom Domain',
   //       'Miestro Branding',
   //    ],
   // },
   essential: {
      iconColor: '#FFF6D7',
      texts: [
         'Netflix-style catalog',
            '500 Members',
            '50 Hours of Video',
            '1 Sites',
            '1 Admin Users',
            '5 Courses',
            'Community Creation with 5 Rooms',
            'Email Marketing',
            'Email + Chat Support',
            'Remove Miestro Branding',
            'Chat + Email Support',
            'Accept Credit Cards & Payments'
      ],
   },
   surge: {
      iconColor: '#379552',
      texts: [
         
            '2000 Members',
            '100 Hours of Video',
            '2 Sites',
            '3 Admin Users',
            // '1 Hour of Live Streaming',
            'Community Creation with Unlimited Rooms',
            'Affiliate Program',
            'Marketing Tools & Automations ',
            'Access to over 1000 Zapier integrations',
            '1 Onboarding Call',
            '3rd Party Integrations',
            'AI Assistant (content creation, engagement tools, content suggestions)',
            
            
      ],
   },
   infinite: {
      iconColor: '#DA47FF',
      texts: [
         
            '5,000 Members',
            '200 Hours of Video',
            'Unlimited Sites',
            'Unlimited Admin Users',
            '2 Onboarding Calls',
            'Free Member & Content Migration',
            '4 Sites',
            '2 Onboarding Calls',
            '5 Admin Users',
            'Access to over 1000 Zapier integrations',
            'Advanced Analytics & Reporting',
      ],
   },
   goat_monthly: {
      iconColor: '#379552',
      texts: [
         'Netflix-style catalog',
         '5000 Members',
         '100 Hours of Video',
         '3 Sites',
         '5 Admin Users',
         'Community Creation with Unlimited Rooms',
         'Affiliate Program',
         'Marketing Tools & Automations ',
         'Access to over 1000 Zapier integrations',
         '1 Onboarding Call',
         'Free Member & Content Migration',
         '3rd Party Integration',
      ],
   },
   goat_annual: {
      iconColor: '#379552',
      texts: [
         'Netflix-style catalog',
         '5000 Members',
         '100 Hours of Video',
         '3 Sites',
         '5 Admin Users',
         'Community Creation with Unlimited Rooms',
         'Affiliate Program',
         'Marketing Tools & Automations ',
         'Access to over 1000 Zapier integrations',
         '1 Onboarding Call',
         'Free Member & Content Migration',
         '3rd Party Integration',
      ],
   },
};

// import communityImg from '@/app/assets/images/pricing/community__img.png';
// import helpCenterImg from '@/app/assets/images/pricing/help__center__img.png';
// import supportTeam from '@/app/assets/images/pricing/support__team__img.png';
// import trainingImg from '@/app/assets/images/pricing/training__img.png';

export const typeNames = {
   essentialAnnual: 'newmiestro-essential-plan-yearly',
   essentialMonthly: 'newmiestro-essential-plan-monthly',
   surgeMonthly: 'newmiestro-surge-plan-monthly',
   surgeAnnual: 'newmiestro-surge-plan-yearly',
   infiniteAnnual: 'newmiestro-infinite-plan-yearly',
   infiniteMonthly: 'newmiestro-infinite-plan-monthly',
};

export const priceInitialData = [
   // {
   //     title: 'Starter',
   //     topTitle: 'Starting point for growth',
   //     subtitle: 'Plan',
   //     pricingType: 'Free',
   //     buttonText: 'Get Started Now',
   //     topTitleColor: '#444C4B',
   //     statusColor: '#7E9997',
   //     pricingTypeColor: '#131F1E',
   //     buttonTheme: 'pricing__style__second',
   //     options: [
   //         'Netflix-style catalog',
   //         '500 Members',
   //         '5 Hours of Video',
   //         '1 Site',
   //         '1 Admin User',
   //         '1 Online Course',
   //         'Community Creation with 1 Room',
   //         'Customizable Portal Rooms and Pages',
   //         'Email Support',
   //         'Analytics',
   //         'Accept Credit Cards & Payments',
   //         'Custom Domain',
   //         'Miestro Branding'
   //     ],
   //     optionsIconsColor: '#2585EB',
   //     optionIconsBorderColor: '#A1A5A5',
   //     backgroundColor: '#fff',
   //     selectedBackgroundColor: '#36796F',
   //     buttonColor: '#fff',
   //     color: '#131F1E',
   //     optionTextColor: '#444C4B',
   // },
   //  First Section End
   {
       id: 1,
       title: 'Essential',
       topTitle: 'Build your learning foundation',
       subtitle: 'Plan',
       pricingType: 69,
       pricingTypeSectondText: '/mo',
       buttonText: 'Free Trial For 14 Days',
       optionsTitle: ' ',
       topTitleColor: '#444C4B',
       statusColor: '#7E9997',
       pricingTypeColor: '#131F1E',
       monthlyName: 'miestro-essential-monthly2',
       annualName: 'miestro-essential-yearly2',
       buttonTheme: 'pricing__style__second',
       options: [
           'Netflix-style catalog',
           '500 Members',
           '50 Hours of Video',
           '1 Sites',
           '1 Admin Users',
           '5 Courses',
           'Community Creation with 5 Rooms',
           'Email Marketing',
           'Email + Chat Support',
           'Remove Miestro Branding'
       ],
       optionsIconsColor: '#FFF6D7',
       optionIconsBorderColor: '#E7E9E9',
       backgroundColor: '#fff',
       buttonColor: '#fff',
       color: '#131F1E',
       optionTextColor: '#444C4B',
   },
   {
       id: 2,
       title: 'Surge',
       topTitle: 'Scale your learning impact',
       subtitle: 'Plan',
       pricingType: 119,
       pricingTypeSectondText: '/mo',
       buttonText: 'Free Trial For 14 Days',
       optionsTitle: 'Everything in Essential Plan, PLUS:',
       topTitleColor: '#fff',
       statusColor: '#fff',
       pricingTypeColor: '#fff',
       buttonTheme: 'privacy',
       monthlyName: 'miestro-surge-monthly2',
       annualName: 'miestro-surge-yearly2',
       isHat: true,
       options: [
           'Netflix-style catalog',
           '2000 Members',
           '100 Hours of Video',
           '2 Sites',
           '3 Admin Users',
           // '1 Hour of Live Streaming',
           'Community Creation with Unlimited Rooms',
           'Affiliate Program',
           'Marketing Tools & Automations ',
           'Access to over 1000 Zapier integrations',
           '1 Onboarding Call',
           'Free Member & Content Migration',
           '3rd Party Integrations'
       ],
       optionsIconsColor: '#379552',
       optionIconsBorderColor: '#F8FAFA',
       backgroundColor: '#36796F',
       buttonColor: '#36796F',
       color: '#fff',
       optionTextColor: '#fff',
   },
   
   {
       id: 3,
       title: 'Infinite',
       topTitle: 'without boundaries',
       subtitle: 'Plan',
       pricingType: 199,
       pricingTypeSectondText: '/mo',
       buttonText: 'Free Trial For 14 Days',
       topTitleColor: '#444C4B',
       statusColor: '#7E9997',
       pricingTypeColor: '#131F1E',
       optionsTitle: 'Everything in Surge Plan, PLUS',
       buttonTheme: 'pricing__style__second',
       monthlyName: 'miestro-infinite-monthly',
       annualName: 'miestro-infinite-yearly',
       options: [
           'Netflix-style catalog',
           'Unlimited Members',
           '4 Sites',
           '200 Hours of Video',
           'Unlimited Sites',
           '5 Admin Users',
           '2 Onboarding Calls',
           'Free Member & Content Migration',
           // '10 hours of Live Streaming',
       ],
       optionsIconsColor: '#DA47FF',
       optionIconsBorderColor: '#A1A5A5',
       optionTextColor: '#444C4B',
       backgroundColor: '#fff',
       buttonColor: '#fff',
       color: '#131F1E'
   },
   {
       id: 4,
       title: "Custom",
       topTitle: "Let's Talk",
       subtitle: 'Plan',
       pricingType: '',
       pricingTypeSectondText: '',
       buttonText: 'Free Trial For 14 Days',
       topTitleColor: '#444C4B',
       statusColor: '#7E9997',
       pricingTypeColor: '#131F1E',
       optionsTitle: 'Everything in Infinite Plan',
       buttonTheme: 'pricing__style__second',
       monthlyName: 'miestro-infinite-monthly',
       annualName: 'miestro-infinite-yearly',
       options: [
           'Custom Video Storage',
           'Unlimited Members',
           'Custom Mobile Apps (iOS & Android)',
           'Branded Push Notifications',
           'Unlimited Admin Users',
           'TV Apps',
           'Custom Integrations',
           'Dedicated Launch Team',
           'Quarterly Business Reviews',
           'Enterprise-grade Security',
           '0% Transaction Fees'
           // '10 hours of Live Streaming',
       ],
       optionsIconsColor: '#DA47FF',
       optionIconsBorderColor: '#A1A5A5',
       optionTextColor: '#444C4B',
       backgroundColor: '#fff',
       buttonColor: '#fff',
       color: '#131F1E'
   }
];

export const featuresCardsData = [
   {
      title: 'Live Streaming',
      subtitle: 'Engage your audience in real-time.',
      iconName: 'Stream',
   },
   {
      title: 'Video Membership',
      subtitle: 'Deliver exclusive content with ease.',
      iconName: 'Playlist',
   },
   {
      title: 'Community',
      subtitle: 'Build a vibrant, interactive member network.',
      iconName: 'Community',
   },
   {
      title: 'Membership Tools',
      subtitle: 'Manage your users effectively.',
      iconName: 'Membership',
   },
   {
      title: 'Payment Processing',
      subtitle: 'Simplify transactions for seamless operations.',
      iconName: 'Price',
   },
];

export const featuresLimits = [
   {
      title: 'Usage Limits',
      isTopSection: true,
      options: [
         {
            title: 'Number Of Users',
            values: ['500', '2,000', '5,000', 'Unlimited'],
         },
         {
            title: 'Storage Limit',
            values: ['50 HOURS OF VIDEO', '100 HOURS OF VIDEO', '200 HOURS OF VIDEO', 'CUSTOM'],
         },
         {
            title: 'Number Of Sites',
            values: ['1', '2', '3', 'Unlimited'],
         },
         {
            title: 'Number Of Admins',
            values: ['1', '3', '5', 'Unlimited'],
         },
         {
            title: 'White Labeling',
            values: ['-', '-', '#379552', '#DA47FF'],
         },
         {
            title: 'Global CDN',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Uploading & Optimization',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Upload Audio, Assets, Resources',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Remove Miestro Branding',
            values: ['-', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Custom Domain',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
      ],
   },
   {
      title: 'Products',
      options: [
         {
            title: 'Video Membership',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            boldTitle: true,
         },
         {
            title: 'Playlists & Categories',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Customizable Watch Room',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Netflix-style Video Portal',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Upload or Auto-generate Trailers',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Add Authors',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Course',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            boldTitle: true,
         },
         {
            title: 'Number of Courses',
            values: ['1 Course', '5 Courses', '20 Courses', 'Unlimited Course'],
            isListItem: true,
         },
         {
            title: 'Certificates',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Student Quizzes',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Add Instructors',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Communities',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            boldTitle: true,
         },
         {
            title: 'Member Profiles',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Number Of Rooms',
            values: ['1 Room', '5 Rooms', 'Unlimited Rooms', 'Unlimited Rooms'],
            isListItem: true,
         },
         {
            title: 'Direct Messaging',
            values: ['-', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Group Profile',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Weekly Digest',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Spaces',
            values: ['1', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Events',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Customization',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Notify Members',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Add Moderators',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Customizable Portal Themes',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Customizable Other Pages',
            values: ['-', '#FFF6D7', '#379552', '#DA47FF'],
            boldTitle: true,
         },
         {
            title: '404 Page',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Sign Up Page',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Sign In Page',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Unsubscribe Page',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Thank You Page',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Categories',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Media Library',
            values: ['-', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Drip & Schedule Content',
            values: ['-', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Built-in Comment Feature',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Add Terms & Conditions Page',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Custom Filters',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'SEO Meta-data',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
      ],
   },
   {
      title: 'Video',
      options: [
         {
            title: 'High Quality Video Player',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Resume Watching',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Closed Captions',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Video Speed Adjustment',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Change Video Quality',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Picture In Picture',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         // {
         //    title: 'Live Streaming',
         //    values: ['-', '-', '#379552', '#DA47FF'],
         //    boldTitle: true,
         // },
         // {
         //    title: '404 Page',
         //    values: ['-', '-', '1 Hour', '10 Hours'],
         //    isListItem: true,
         // },
      ],
   },
   {
      title: 'PAYMENTS & MONETIZATION',
      options: [
         {
            title: 'Customizable Checkout Pages',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            boldTitle: true,
         },
         {
            title: 'Multiple Checkout Designs',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: 'Custom Checkout Fields',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            isListItem: true,
         },
         {
            title: '0% Processing Fees',
            values: ['-', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Sales And Tax Support',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Multiple Payment Options',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            boldTitle: true,
         },
         {
            title: 'One-Time Payment',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Subscription Capability',
            values: ['-', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Freemium',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Multiple Payment Method',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
            boldTitle: true,
         },
         {
            title: 'All Credit & Debit Cards',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Accept PayPal',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Accept Stripe',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Accept International Payments',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         // {
         //     title: 'Link',
         //     values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF']
         // },
         {
            title: 'Free Trials',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Order Bumps',
            values: ['-', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Upsells/ Downsells',
            values: ['-', '#FFF6D7', '#379552', '#DA47FF'],
         },
      ],
   },
   {
      title: 'MEMBER MANAGEMENT',
      options: [
         {
            title: 'CRM Capabilities',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Member Portal',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'User Profiles & Pages',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Import Contacts',
            values: ['-', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Export Contacts',
            values: ['-', '#FFF6D7', '#379552', '#DA47FF'],
         },
      ],
   },
   {
      title: 'REPORTING & ANALYTICS',
      options: [
         {
            title: 'Sales Reporting',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'UTM Tracking',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Data Export',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Subscription Metrics',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Progress Metrics',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Video Metrics',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Email Metrics',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Page Views',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
      ],
   },
   {
      title: 'SUPPORT & SECURITY',
      options: [
         {
            title: 'Help Center',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Live Chat Support',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Email Support',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: '1-on-1 Onboarding Calls',
            values: ['-', '-', '1 ONBOARDING CALL', '2 ONBOARDING CALLS'],
         },
         {
            title: 'Miestro University',
            values: ['#2585EB', '#2585EB', '#379552', '#DA47FF'],
         },
         {
            title: '99.9% Uptime',
            values: ['#2585EB', '#2585EB', '#379552', '#DA47FF'],
         },
         {
            title: 'Full Control & Ownership Of Data',
            values: ['#2585EB', '#2585EB', '#379552', '#DA47FF'],
         },
         {
            title: 'Migration',
            values: ['-', '-', '#379552', '#DA47FF'],
         },
         {
            title: 'Encryption',
            values: ['#2585EB', '#2585EB', '#379552', '#DA47FF'],
         },
         {
            title: 'SSL Certificate',
            values: ['#2585EB', '#2585EB', '#379552', '#DA47FF'],
         },
      ],
   },
   {
      title: 'INTEGRATIONS',
      options: [
         {
            title: 'Access to over 1000 Zapier integrations',
            values: ['-', '-', '#379552', '#DA47FF'],
         },
         {
            title: 'Stripe/ Paypal/ Braintree / Paystack Integration',
            values: ['#2585EB', '#2585EB', '#379552', '#DA47FF'],
         },
         {
            title: 'MailChimp Integration',
            values: ['#2585EB', '#2585EB', '#379552', '#DA47FF'],
         },
         {
            title: 'Active Campaign Integration',
            values: ['#2585EB', '#2585EB', '#379552', '#DA47FF'],
         },
         {
            title: 'Aweber Integration',
            values: ['#2585EB', '#2585EB', '#379552', '#DA47FF'],
         },
         {
            title: 'Convert Kit Integration',
            values: ['#2585EB', '#2585EB', '#379552', '#DA47FF'],
         },
         {
            title: 'Drip Integration',
            values: ['#2585EB', '#2585EB', '#379552', '#DA47FF'],
         },
         {
            title: 'Google Analytics',
            values: ['#2585EB', '#2585EB', '#379552', '#DA47FF'],
         },
         {
            title: 'Google Tag Manager',
            values: ['#2585EB', '#2585EB', '#379552', '#DA47FF'],
         },
         {
            title: 'Facebook Pixel Integration',
            values: ['#2585EB', '#2585EB', '#379552', '#DA47FF'],
         },
         {
            title: 'Order & Tracking Conversion',
            values: ['-', '#2585EB', '#379552', '#DA47FF'],
         },
         {
            title: 'API',
            values: ['-', '#2585EB', '#379552', '#DA47FF'],
         },
         {
            title: 'Webhooks',
            values: ['-', '#2585EB', '#379552', '#DA47FF'],
         },
      ],
   },
   {
      title: 'MARKETING TOOLS',
      isLastSection: true,
      options: [
         {
            title: 'Automations',
            values: ['-', '-', '#379552', '#DA47FF'],
         },
         {
            title: 'Upsell/ Downsell Capabilites',
            values: ['-', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Order Bumps',
            values: ['-', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Affiliate Program',
            values: ['-', '-', '#379552', '#DA47FF'],
         },
         {
            title: 'Unlimited Coupons',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Blog Capabilites',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Landing Page Builder',
            values: ['#2585EB', '#FFF6D7', '#379552', '#DA47FF'],
         },
         {
            title: 'Email Marketing',
            values: ['-', '#FFF6D7', '#379552', '#DA47FF'],
         },
      ],
   },
];

// export const helpCardsData = [
//    {
//       title: 'Support Team',
//       description: 'A team of support professionals is available to assist you with any questions or concerns.',
//       buttonText: 'Contact Support',
//       imgSrc: supportTeam,
//       navigateSrc: 'https://support.miestro.com/',
//    },
//    {
//       title: 'Community ',
//       description: 'What are you waiting for? Join our community and become a part of something truly great!',
//       buttonText: 'Join Our Community',
//       imgSrc: communityImg,
//       navigateSrc: 'https://www.facebook.com/miestrohq',
//    },
//    {
//       title: 'Help Center ',
//       description: "Still have questions? You can find what you're looking for by going to the Help Center.",
//       buttonText: 'Visit Help Center',
//       imgSrc: helpCenterImg,
//       navigateSrc: 'https://support.miestro.com/',
//    },
//    {
//       title: 'Training',
//       description: 'Learn the ins and outs of Miestro with dedicated tutorials and guides.',
//       buttonText: 'Explore Training',
//       imgSrc: trainingImg,
//       navigateSrc: 'http://training.miestro.com/',
//    },
// ];

export const currencySymbols = {
   'USD': '$',
   'EUR': '€',
   'JPY': '¥',
   'BGN': 'лв',
   'CZK': 'Kč', 
   'DKK': 'kr',
   'GBP': '£',
   'HUF': 'Ft', 
   'PLN': 'zł', 
   'RON': 'lei',
   'SEK': 'kr',
   'CHF': 'CHF', 
   'ISK': 'kr', 
   'NOK': 'kr',
   'HRK': 'kn',
   'RUB': '₽', 
   'TRY': '₺', 
   'AUD': '$', 
   'BRL': 'R$',
   'CAD': '$',
   'CNY': '¥',
   'HKD': '$', 
   'IDR': 'Rp',
   'ILS': '₪',
   'INR': '₹', 
   'KRW': '₩',
   'MXN': '$', 
   'MYR': 'RM', 
   'NZD': '$', 
   'PHP': '₱', 
   'SGD': '$', 
   'THB': '฿', 
   'ZAR': 'R',  
   'ARS': '$', 
   'DZD': 'د.ج',
   'MAD': 'د.م.', 
   'TWD': 'NT$', 
   'BTC': '₿', 
   'ETH': 'Ξ', 
   'BNB': 'BNB', 
   'DOGE': 'Ð',
   'XRP': 'XRP',
   'BCH': 'BCH', 
   'LTC': 'Ł', 
};

export const getPlanName = (planId) => {
   if (planId.includes('essential') && planId.includes('new')) {
      return 'Old Essential';
   } if (planId.includes('essential')) {
      return 'Essential';
   } if (planId.includes('infinite') && planId.includes('new')) {
      return 'Old Infinite';
   } if (planId.includes('infinite')) {
      return 'Infinite';
   } if (planId.includes('surge') && planId.includes('new')) {
      return 'Old Surge';
   } if (planId.includes('surge')) {
      return 'Surge';
   } if (planId.includes('price_1PjSgRApMyK85UEAXIsFrWPS')) {
      return 'Goat University Monthly';
   } if (planId.includes('price_1PjTDvApMyK85UEA2Iyzl71k')) {
      return 'Goat University Annual';
   } if (planId.includes('price_1QDBr4ApMyK85UEAATty4Cml')) {
      return 'Webinar Exclusive Offer - Starter Package';
   } if (planId.includes('price_1QDBr5ApMyK85UEAqfpXu0hC')) {
      return 'Webinar Exclusive Offer - Superstar Package';
   } if (planId.includes('price_1QFcwaApMyK85UEASrb0mCTm')) {
      return 'Webinar Exclusive Offer -High Level Plan';
   }
};

export const STEPS_DATA = {
   questions: [
      {
         text: 'I never got a chance to use it',
         isChecked: true,
      },
      {
         text: 'Technical issue',
         isChecked: false,
      },
      {
         text: 'I didn’t make any sales',
         isChecked: false,
      },
      {
         text: 'I didn’t see the value',
         isChecked: false,
      },
      {
         text: 'Missing features',
         isChecked: false,
      },
      {
         text: 'I am taking a break',
         isChecked: false,
      },
      {
         text: 'Other',
         isChecked: false,
      },
   ],
   options: [
      {
         text: 'Keep The Subscription',
         isChecked: true,
      },
      {
         text: 'Pause Subscription',
         isChecked: false,
      },
      {
         text: 'Downgrade My Plan',
         isChecked: false,
      },
      {
         text: 'Cancel Subscription',
         isChecked: false,
      },
   ],
};

export const STEPS_NAMES = ['questions', 'options'];

export const CANCEL_MODAL_DATA = [
   {
      text: 'Our "Getting Started Course',
      iconName: 'Book',
      link: 'https://miestrouniversity.miestro.com/',
   },
   {
      text: 'Join the facebook Group',
      iconName: 'Facebook',
      link: 'https://www.facebook.com/groups/miestro',
   },
   {
      text: 'Miestro Knowledge Base',
      iconName: 'Copy',
      link: 'https://support.miestro.com/',
   },
   {
      text: 'Miestro Customer Support',
      iconName: 'Wrench',
      link: 'https://support.miestro.com/',
   },
   // {
   //    text: 'Cancel Subscription',
   //    iconName: 'Cancel',
   // },
];