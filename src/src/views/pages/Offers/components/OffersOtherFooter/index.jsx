import React from 'react';
import { OfferContext } from 'containers/pages/mixed/offers';
import Section from 'views/pages/SchoolRoomTheme/SchoolRoomComponents/Section';
import ModalNew from 'components/elements/ModalNew';
import { SafeHtml } from 'utils/sanitizeHtml';

const OffersFooter = ({
   template,
   isEditor,
   onClickElement,
   schoolRoomSettings,
   site,
}) => {
   const footerIndex = 7;
   const footer = template && template.length > footerIndex ? template[footerIndex] : null;
   
   const [isOpenTermsModal, setIsOpenTermsModal] = React.useState(false);
   const [isOpenPrivacyModal, setIsOpenPrivacyModal] = React.useState(false);

   const getFooterCustomLinksSort = () => {
      const customLinks = site?.custom_links?.items || [];
      return customLinks
         .filter(link => link.position === 'f_right' || link.position === 'f_left')
         .sort((a, b) => a.order - b.order);
   };

   const handleNavigateToMiestro = () => {
      window.open('https://miestro.com', '_blank');
   };

   const components = footer?.school_room_components || [];
   const footerSection = footer?.school_room_section || {};
   
   const privacyPolicy = components.find(comp => comp?.name === "Privacy Policy");
   const termsComponent = components.find(comp => comp?.name === "Terms");
   const copyright = components.find(comp => comp?.name === "Copyright");

   const getCurrentYear = () => new Date().getFullYear();

   const copyrightText = (() => {
      const defaultText = `Copyright © ${getCurrentYear()}`;
      const customText = copyright?.props?.text;

      if (!customText) return defaultText;

      const yearRegex = /Copyright © (20[2-3][0-9])/i;

      if (yearRegex.test(customText)) {
         return customText.replace(
            yearRegex,
            `Copyright © ${getCurrentYear()}`
         );
      }

      return customText;
   })();
   
   const privacyText = privacyPolicy?.props?.text || "Privacy Policy";
   const termsText = termsComponent?.props?.text || "Terms of Use";
   
   // Get footer background color
   const footerBgColor = footerSection?.props?.bgColor || "#27282B";
   
   // Check if dark mode using schoolRoomSettings.mode
   const isDarkMode = schoolRoomSettings?.mode === 1;
   
   // Check if branding should be shown (if remove_branding is NOT 1)
   const showBranding = schoolRoomSettings?.remove_branding !== 1;
   
   const footerContent = () => (
      <div className="footer-content">
         <div className="footer-actions">
            <button onClick={() => setIsOpenTermsModal(true)}>{termsText}</button>
            <button onClick={() => setIsOpenPrivacyModal(true)}>{privacyText}</button>
         </div>

         <div className="footer-copyright">
            {copyrightText}
         </div>

         {showBranding && (
            <div style={{display: 'flex', gap: '10px', alignItems: 'center'}} className="powered">
               <button onClick={handleNavigateToMiestro}>Powered by </button>
               
               {isDarkMode ? (
                 // SVG for dark background
                 <svg 
                   width="80" 
                   height="24" 
                   viewBox="0 0 263 84" 
                   fill="none" 
                   xmlns="http://www.w3.org/2000/svg" 
                   data-action="onClickFooterLogo"
                   onClick={handleNavigateToMiestro}
                   style={{ cursor: 'pointer' }}
                 >
                   <path d="M0 0 C9.11274556 3.03758185 18.91784693 7.3162412 26 14 C27.83300334 19.17521601 27.19497646 21.5031083 26 27 C29.96 27 33.92 27 38 27 C37.82597656 26.16597656 37.65195312 25.33195312 37.47265625 24.47265625 C37.00195113 20.55907942 36.93978699 17.81590835 38 14 C41.56573499 10.23465644 46.54182646 8.12212234 51.15771484 5.91064453 C53.49474855 4.75544499 55.64444101 3.38153187 57.8125 1.9375 C61 0 61 0 63 0 C63 25.74 63 51.48 63 78 C58.71 78 54.42 78 50 78 C49.67 59.52 49.34 41.04 49 22 C45.7 23.98 42.4 25.96 39 28 C37.98988363 32.33911907 37.6835151 35.19336036 37.8046875 39.5234375 C37.79664093 40.62475006 37.78859436 41.72606262 37.78030396 42.86074829 C37.76534113 46.3673055 37.81921825 49.86892487 37.875 53.375 C37.87694224 55.75651105 37.87438929 58.1380303 37.8671875 60.51953125 C37.8593665 66.34773316 37.9132676 72.17246917 38 78 C33.71 78 29.42 78 25 78 C25 61.17 25 44.34 25 27 C23.02 26.34 21.04 25.68 19 25 C17.35 24.01 15.7 23.02 14 22 C14 40.48 14 58.96 14 78 C9.38 78 4.76 78 0 78 C0 52.26 0 26.52 0 0 Z " fill="#80BE25" transform="translate(6,3)"/>
                   <path d="M0 0 C1.98 0.66 3.96 1.32 6 2 C6.82409363 2.26693665 7.64818726 2.53387329 8.49725342 2.80889893 C15.26890155 5.21574201 21.58777063 8.15180168 26 14 C29.15059505 23.68607313 27.97892615 34.46677218 27.37329102 44.49194336 C27.16695082 48.27103345 27.07700383 52.05281428 26.9765625 55.8359375 C26.76337449 63.23130101 26.42321807 70.61335724 26 78 C25.67 78 25.34 78 25 78 C25 61.17 25 44.34 25 27 C23.02 26.34 21.04 25.68 19 25 C17.35 24.01 15.7 23.02 14 22 C14 40.48 14 58.96 14 78 C9.38 78 4.76 78 0 78 C0 52.26 0 26.52 0 0 Z " fill="#116A30" transform="translate(6,3)"/>
                   <path d="M0 0 C2.97 0 5.94 0 9 0 C11.97 6.6 14.94 13.2 18 20 C20.1572806 17.12362587 21.47849755 15.2578548 22.82421875 12.109375 C23.13037109 11.40039062 23.43652344 10.69140625 23.75195312 9.9609375 C24.06068359 9.23132812 24.36941406 8.50171875 24.6875 7.75 C25.16799805 6.63238281 25.16799805 6.63238281 25.65820312 5.4921875 C26.44359663 3.66351009 27.22245338 1.83202764 28 0 C30.97 0 33.94 0 37 0 C37 11.55 37 23.1 37 35 C34.03 35 31.06 35 28 35 C27.505 30.05 27.505 30.05 27 25 C25.35 28.3 23.7 31.6 22 35 C19.69 35 17.38 35 15 35 C13.35 31.7 11.7 28.4 10 25 C9.67 28.3 9.34 31.6 9 35 C6.03 35 3.06 35 0 35 C0 23.45 0 11.9 0 0 Z " fill="#F0F0F0" transform="translate(82,25)"/>
                   <path d="M0 0 C4.29 0 8.58 0 13 0 C12.67 16.83 12.34 33.66 12 51 C8.04 51 4.08 51 0 51 C0 34.17 0 17.34 0 0 Z " fill="#4A9B2D" transform="translate(32,30)"/>
                   <path d="M0 0 C3.43615111 2.12017834 5.80717883 4.09622164 7 8 C7 10.64 7 13.28 7 16 C1.72 16.33 -3.56 16.66 -9 17 C-4.10024143 17.70738265 -4.10024143 17.70738265 0.8125 18.3125 C3 19 3 19 4.3125 21.0625 C4.539375 21.701875 4.76625 22.34125 5 23 C0.82468812 26.45543052 -3.14150284 26.51784445 -8.33984375 26.3359375 C-12.28539516 25.83767403 -14.21831624 24.85122585 -17 22 C-19.36103976 17.70796701 -20.45611443 13.61421052 -19.5625 8.75 C-18.17160604 4.39476327 -15.73565868 2.51585176 -12 0 C-7.81974477 -1.39341841 -4.26686312 -0.97485449 0 0 Z M-8 7 C-8.99 8.485 -8.99 8.485 -10 10 C-7.03 10 -4.06 10 -1 10 C-1.66 9.01 -2.32 8.02 -3 7 C-5.5 6.5 -5.5 6.5 -8 7 Z " fill="#E9E9E9" transform="translate(155,34)"/>
                   <path d="M0 0 C3.27593689 2.5452745 5.32676302 4.93301158 6.15625 8.98828125 C6.21482513 13.57387699 5.77390628 16.9872521 3.34375 20.92578125 C-0.95583838 24.97967886 -4.60893079 25.43656123 -10.37109375 25.30078125 C-14.09165999 24.83056751 -16.11643437 23.5160372 -18.84375 20.98828125 C-21.9394906 16.69418946 -22.27250348 13.25187705 -21.484375 8.171875 C-20.17430182 3.70644263 -17.51135559 1.05369593 -13.59375 -1.44921875 C-8.91871806 -2.40547528 -4.26301752 -2.33924055 0 0 Z M-11.59375 7.11328125 C-13.43618126 9.87692814 -13.31660472 11.74584888 -12.84375 14.98828125 C-11.28577118 17.13610796 -11.28577118 17.13610796 -8.84375 17.98828125 C-6.45111593 17.32056942 -4.62277615 16.7673074 -2.84375 14.98828125 C-2.44221177 10.81869401 -2.44221177 10.81869401 -4.09375 7.11328125 C-6.74177025 5.41098251 -8.94572975 5.41098251 -11.59375 7.11328125 Z " fill="#E9E9E9" transform="translate(250.84375,35.01171875)"/>
                   <path d="M0 0 C2.875 1.1875 2.875 1.1875 5 3 C5.8125 5.6875 5.8125 5.6875 6 8 C4.02 8.66 2.04 9.32 0 10 C0.969375 10.639375 1.93875 11.27875 2.9375 11.9375 C6 14 6 14 7 15 C7.69565217 22.07246377 7.69565217 22.07246377 5.125 25.5 C0.76656456 27.59204901 -3.23940051 27.66570985 -8 27 C-11.29833752 25.73730907 -11.95374069 25.06938896 -14 22 C-14 21.01 -14 20.02 -14 19 C-11.69 18.34 -9.38 17.68 -7 17 C-6.67 17.66 -6.34 18.32 -6 19 C-4.68 19 -3.36 19 -2 19 C-2.62648437 18.67386719 -3.25296875 18.34773438 -3.8984375 18.01171875 C-5.12433594 17.35623047 -5.12433594 17.35623047 -6.375 16.6875 C-7.18710938 16.25824219 -7.99921875 15.82898437 -8.8359375 15.38671875 C-11 14 -11 14 -13 11 C-13.375 8.0625 -13.375 8.0625 -13 5 C-9.0739479 0.15786907 -6.14399577 -0.41654209 0 0 Z M-4 7 C-4.33 7.66 -4.66 8.32 -5 9 C-3.68 9.33 -2.36 9.66 -1 10 C-1.33 9.01 -1.66 8.02 -2 7 C-2.66 7 -3.32 7 -4 7 Z " fill="#E7E7E7" transform="translate(178,33)"/>
                   <path d="M0 0 C2.64 0 5.28 0 8 0 C8 1.98 8 3.96 8 6 C9.98 6 11.96 6 14 6 C14 8.31 14 10.62 14 13 C12.02 13 10.04 13 8 13 C8.33 16.3 8.66 19.6 9 23 C10.65 23.33 12.3 23.66 14 24 C14.04241723 26.33294775 14.04092937 28.66702567 14 31 C12.43058802 32.56941198 10.85865006 32.2449847 8.6875 32.3125 C7.51767578 32.36857422 7.51767578 32.36857422 6.32421875 32.42578125 C2.99399212 31.81570612 1.93370354 30.76681844 0 28 C-0.2911521 25.26317029 -0.38322418 22.96059961 -0.25 20.25 C-0.23195312 19.55261719 -0.21390625 18.85523437 -0.1953125 18.13671875 C-0.14838554 16.42388461 -0.07664605 14.71176176 0 13 C-1.32 13 -2.64 13 -4 13 C-4 10.69 -4 8.38 -4 6 C-2.68 6 -1.36 6 0 6 C0 4.02 0 2.04 0 0 Z " fill="#EEEEEE" transform="translate(191,28)"/>
                   <path d="M0 0 C0 2.97 0 5.94 0 9 C-1.11375 9.28875 -2.2275 9.5775 -3.375 9.875 C-7.00291092 10.69241329 -7.00291092 10.69241329 -9 13 C-9.30059943 15.36509361 -9.49515012 17.74441881 -9.625 20.125 C-9.69976562 21.40632813 -9.77453125 22.68765625 -9.8515625 24.0078125 C-9.90054688 24.99523437 -9.94953125 25.98265625 -10 27 C-12.97 27 -15.94 27 -19 27 C-19 18.42 -19 9.84 -19 1 C-15 1 -11 1 -7 1 C-4.53721199 -0.231394 -2.7204945 -0.07159196 0 0 Z " fill="#ECECEC" transform="translate(227,33)"/>
                   <path d="M0 0 C2.64 0 5.28 0 8 0 C8 8.58 8 17.16 8 26 C5.36 26 2.72 26 0 26 C0 17.42 0 8.84 0 0 Z " fill="#FAFAFA" transform="translate(124,34)"/>
                   <path d="M0 0 C2.64 0 5.28 0 8 0 C8 2.31 8 4.62 8 7 C5.36 7 2.72 7 0 7 C0 4.69 0 2.38 0 0 Z " fill="#ECECEC" transform="translate(124,25)"/>
                 </svg>
               ) : (
                 // Standard SVG for light background
                 <svg
                   width="80" 
                   height="20" 
                   viewBox="0 0 129 32" 
                   fill="none" 
                   xmlns="http://www.w3.org/2000/svg" 
                   data-action="onClickFooterLogo" 
                   onClick={handleNavigateToMiestro}
                 >
                   <path d="M11.7971 13.0362L6.07795 9.65254V31.5H0.358795V6.32435V0.5L11.7971 7.21186V13.0362ZM17.5713 13.0362V7.21186L29.0646 0.5V6.32435V31.5H23.3454V9.65254L17.5713 13.0362ZM17.5713 13.0362V31.5H11.7971V13.0362H17.5713Z" fill="url(#paint0_linear_2002_69650)"/>
                   <path d="M54.9397 8.684V27.084H50.6139V18.1994L46.8874 27.084H43.2652L39.5909 18.252V27.084H35.265V8.684H39.4084L45.1154 21.4589L50.7963 8.684H54.9397ZM61.9497 8.5V11.996H57.8323V8.5H61.9497ZM61.9497 13.4154V27.084H57.8323V13.4154H61.9497ZM71.331 13.1789C74.406 13.1789 78.7057 15.5183 77.8458 21.6954H68.3863C68.8554 23.1149 70.0801 23.8509 71.7219 23.8509C73.3897 23.8509 73.9108 23.4829 74.849 23.0886L77.1161 25.2966C75.9174 26.4794 74.3017 27.3469 71.5655 27.3469C68.2039 27.3469 64.1908 25.0074 64.1908 20.3023C64.1908 15.5183 68.256 13.1789 71.331 13.1789ZM71.331 16.7274C70.1583 16.7274 68.9596 17.4109 68.4384 18.7777H74.1975C73.7805 17.4109 72.5036 16.7274 71.331 16.7274ZM86.6277 17.7263C86.2629 16.78 85.7157 16.4646 85.1163 16.4646C84.569 16.4646 84.0218 16.78 84.0218 17.3057C84.0218 17.8052 84.3345 18.0943 84.9339 18.3046L86.6538 18.9092C88.5822 19.6189 90.5366 20.3286 90.5366 23.0623C90.5366 25.8223 87.8004 27.3995 84.986 27.3995C82.4583 27.3995 80.0869 25.9012 79.5136 23.5092L82.7449 22.484C83.0837 23.2463 83.683 24.1137 84.986 24.1137C85.872 24.1137 86.4453 23.5354 86.4453 23.0097C86.4453 22.7469 86.2368 22.4052 85.5854 22.1423L83.9957 21.564C81.2856 20.5652 80.0087 19.172 80.0087 17.2269C80.0087 14.6772 82.354 13.1789 84.9339 13.1789C87.5659 13.1789 89.3118 14.6246 90.0936 16.8063L86.6277 17.7263ZM99.2404 23.6143C99.97 23.6143 100.491 23.5092 101.065 23.3514V26.7949C100.491 27.0577 99.5531 27.2417 98.172 27.2417C95.9048 27.2417 94.0025 26.4795 94.0025 22.2737V16.8326H92.1002V13.4154H94.0025V10.2086H98.1198V13.4154H101.012V16.8326H98.1198V22.2737C98.1198 22.8783 98.2762 23.6143 99.2404 23.6143ZM111.957 13.2051C112.322 13.2051 112.687 13.2051 113.026 13.284V17.2532C112.713 17.1743 112.348 17.1743 112.088 17.1743C109.586 17.1743 107.579 18.988 107.371 21.5114V27.084H103.254V13.4154H107.371V16.7537C107.996 14.7034 109.56 13.2051 111.957 13.2051ZM121.86 13.1789C124.935 13.1789 129 15.5183 129 20.3023C129 25.1126 124.935 27.3469 121.86 27.3469C118.785 27.3469 114.72 25.1126 114.72 20.3023C114.72 15.5183 118.785 13.1789 121.86 13.1789ZM121.86 16.8326C120.296 16.8326 118.707 18.0417 118.707 20.3023C118.707 22.484 120.296 23.6932 121.86 23.6932C123.423 23.6932 125.039 22.484 125.039 20.3023C125.039 18.0417 123.423 16.8326 121.86 16.8326Z" fill="#131F1E"/>
                   <defs>
                      <linearGradient id="paint0_linear_2002_69650" x1="0.358795" y1="0.5" x2="29.0646" y2="0.5" gradientUnits="userSpaceOnUse">
                         <stop stopColor="#006838"/>
                         <stop offset="1" stopColor="#96CF24"/>
                      </linearGradient>
                   </defs>
                 </svg>
               )}
            </div>
         )}
      </div>
   );

   const renderModals = () => (
      <>
         {isOpenTermsModal && site?.terms && (
            <ModalNew onCloseModal={() => setIsOpenTermsModal(false)}>
               <SafeHtml html={ site.terms } />
            </ModalNew>
         )}

         {isOpenPrivacyModal && site?.privacy && (
            <ModalNew onCloseModal={() => setIsOpenPrivacyModal(false)}>
               <SafeHtml html={ site.privacy } />
            </ModalNew>
         )}
      </>
   );

   if (!template || template.length === 0 || !footer) {
      return (
         <div className="offers__footer" style={{ backgroundColor: footerBgColor }}>
            {footerContent()}
            {renderModals()}
         </div>
      );
   }

   return (
      <Section
         slug={footer?.school_room_section?.slug || ''}
         item={footer}
         isPreview={!isEditor}
         i={footerIndex}
         className="offers__footer"
         onClick={(e) => {
            e.stopPropagation();
            onClickElement && onClickElement(e);
         }}
         style={{ backgroundColor: footerBgColor }}
      >
         {footerContent()}
         {renderModals()}
      </Section>
   );
};

export default OffersFooter;