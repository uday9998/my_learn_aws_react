import mixpanel from 'mixpanel-browser';

const apiUrl = process.env.REACT_APP_MAIN_DOMAIN;
const isLive = apiUrl === 'miestro.com';

export const customLogout = (authUser) => {
   if (isLive) {
      if (authUser && authUser.uuid && authUser.role === 1) {
         const customEvents = document.createElement('script');
         customEvents.innerHTML = 'usermaven("track", "logged_out");';
         document.querySelector('head').append(customEvents);
         mixpanel.track('Logged Out');
      }
   }
};

export const customLogIn = (location) => {
   if (isLive) {
      if ((location && location.state && location.state.role && location.state.role === 'admin') || (!!localStorage.getItem('login') && +localStorage.getItem('login'))) {
         const customEvents = document.createElement('script');
         customEvents.innerHTML = 'usermaven("track", "logged_in");';
         document.querySelector('head').append(customEvents);
         mixpanel.track('Logged In');
         localStorage.setItem('login', 0);
      }
   }
};


export const customChangePlan = (editPlan, subscription) => {
   if (isLive) {
      let changeablePlan = 0;
      let currentPlan = 0;
      if (editPlan.includes('essential')) {
         changeablePlan = 1;
      } else if (editPlan.includes('surge')) {
         changeablePlan = 2;
      } else if (editPlan.includes('infinite')) {
         changeablePlan = 3;
      }
      if (subscription && subscription.current && subscription.current.plan_name) {
         const subscriptionPlan = subscription.current.plan_name;
         if (subscriptionPlan.includes('essential')) {
            currentPlan = 1;
         } else if (subscriptionPlan.includes('surge')) {
            currentPlan = 2;
         } else if (subscriptionPlan.includes('business')) {
            currentPlan = 3;
         }
      }

      if (changeablePlan > currentPlan) {
         const customEvents = document.createElement('script');
         customEvents.innerHTML = 'usermaven("track", "plan_upgraded");';
         document.querySelector('head').append(customEvents);
         mixpanel.track('Plan Upgraded');
      } else if (changeablePlan < currentPlan) {
         const customEvents = document.createElement('script');
         customEvents.innerHTML = 'usermaven("track", "plan_downgraded");';
         document.querySelector('head').append(customEvents);
         mixpanel.track('Plan Downgraded');
      }
   }
};

export const userMaven = (authUser) => {
   if (isLive) {
      if (authUser && authUser.uuid && authUser.role === 1) {
         const scriptExists = [...document.getElementsByTagName('script')].some(script => script.src.includes('https://t.usermaven.com/lib.js'));
         if (!scriptExists) {
            const userMavenScript = document.createElement('script');
            const userScript = document.createElement('script');
            userMavenScript.innerHTML = `(function () {
         window.usermaven = window.usermaven || (function () { (window.usermavenQ = window.usermavenQ || []).push(arguments); })
         var t = document.createElement('script'),
             s = document.getElementsByTagName('script')[0];
         t.defer = true;
         t.id = 'um-tracker';
         t.setAttribute('data-tracking-host', "https://events.usermaven.com")
         t.setAttribute('data-key', 'UM4NiB6BoT');
         t.setAttribute('data-autocapture', 'true')
         t.src = 'https://t.usermaven.com/lib.js';
         s.parentNode.insertBefore(t, s);
     })();`;
            userScript.innerHTML = `
     usermaven('id', {
      id: "${ authUser.uuid }",
      email: "${ authUser.email }",
      created_at: "${ authUser?.created_at || '' }",
      first_name: "${ authUser.name }",
      custom: {
         'company_name': '${ authUser.company_name }',
         'plan_name': '${ authUser.plan_name }',
         'storage_limit': '${ authUser.storage_limit }',
         'trial_days': '${ authUser.trial_days }',
         'last_login_at': '${ authUser.last_login_at }',
       }
   });`;

            document.querySelector('head').append(userMavenScript);
            document.querySelector('head').append(userScript);
            mixpanel.init('bb6be68464397c730ef621dd366fa00b', { track_pageview: true });
            mixpanel.identify(authUser.uuid);
            mixpanel.register({
               'Id': authUser.uuid,
               'Name': authUser.name,
               'Email': authUser.email,
               'Company Name': authUser.company_name,
               'Plan Name': authUser.plan_name,
               'Storage Limit': authUser.storage_limit,
               'Trial Days': authUser.trial_days,
               'Last Login At': authUser.last_login_at,
               'Created At': authUser?.created_at,
            });
            mixpanel.people.set({
               'Id': authUser.uuid,
               '$name': authUser.name,
               '$email': authUser.email,
               'Company Name': authUser.company_name,
               'Plan Name': authUser.plan_name,
               'Storage Limit': authUser.storage_limit,
               'Trial Days': authUser.trial_days,
               'Last Login At': authUser.last_login_at,
               'Created At': authUser?.created_at,
            });
            mixpanel.track('Page View');
         }
      }
   }
};
