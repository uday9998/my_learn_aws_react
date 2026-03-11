import React, { useEffect, useState } from 'react';
import Text, { TextWithIcon, TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import ModalNew from 'components/elements/ModalNew';
import placeholderImage from 'assets/images/dashboard/board.png';

import './index.scss';

const WelcomeMiestro = () => {
   const [openModal, setIsOpenModal] = useState(false);
   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

   const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
   };

   useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   const handleStartSetup = () => {
   };

   const handleTakeTour = () => {
      if (window.Produktly) {
         const tourId = '5488';
         try {
            window.Produktly.startTour({ tourId: tourId });
         } catch (error) {
         }
      } else {
         if (!document.getElementById('produktlyScript')) {
            const script = document.createElement('script');
            script.async = true;
            script.src = "https://public.produktly.com/js/main.js";
            script.setAttribute('id', 'produktlyScript');
            script.dataset.clientToken = "bc5bb643429b83c792be2ead1a7eecb9fe51acb2d70152e0c038046793b7f6aca1fbf9491e49e0baacd6e729d95dc533ada165d2cb2e902f47b4e1b2990f4869694023edf6589b1d39e9e358fa8e9d6f1b4c142521a643e075f7a305da9920fe7937eea4";
            document.getElementsByTagName('head')[0].appendChild(script);
         }
         
         setTimeout(() => {
            if (window.Produktly) {
               const tourId = '5488';
               try {
                  window.Produktly.startTour({ tourId: tourId });
               } catch (error) {
               }
            }
         }, 2000);
      }
   };

   useEffect(() => {
      if (!document.getElementById('produktlyScript')) {
         const script = document.createElement('script');
         script.async = true;
         script.src = "https://public.produktly.com/js/main.js";
         script.setAttribute('id', 'produktlyScript');
         script.dataset.clientToken = "bc5bb643429b83c792be2ead1a7eecb9fe51acb2d70152e0c038046793b7f6aca1fbf9491e49e0baacd6e729d95dc533ada165d2cb2e902f47b4e1b2990f4869694023edf6589b1d39e9e358fa8e9d6f1b4c142521a643e075f7a305da9920fe7937eea4";
         document.head.appendChild(script);
      }
   }, []);

   useEffect(() => {
      if (openModal) {
         (function (v, i, d, a, l, y, t, c, s) {
            y = `_${d.toLowerCase()}`;
            c = `${d}L`;
            if (!v[d]) { v[d] = {}; }
            if (!v[c]) { v[c] = {}; }
            if (!v[y]) { v[y] = {}; }
            const vl = 'Loader'; let vli = v[y][vl]; let vsl = v[c][`${vl}Script`]; let vlf = v[c][`${vl}Loaded`]; const ve = 'Embed';
            if (!vsl) {
               vsl = function (u, cb) {
                  if (t) { cb(); return; }
                  s = i.createElement('script'); s.type = 'text/javascript'; s.async = 1; s.src = u;
                  if (s.readyState) {
                     s.onreadystatechange = function () {
                        if (s.readyState === 'loaded' || s.readyState === 'complete') {
                           s.onreadystatechange = null; vlf = 1; cb();
                        }
                     };
                  } else {
                     s.onload = function () { vlf = 1; cb(); };
                  }
                  i.getElementsByTagName('head')[0].appendChild(s);
               };
            }
            vsl(`${l}loader.min.js`, () => {
               if (!vli) {
                  const vlc = v[c][vl]; vli = new vlc();
               }
               vli.loadScript(`${l}player.min.js`, () => {
                  const vec = v[d][ve]; t = new vec(); t.run(a);
               });
            });
         }(window, document, 'Vidalytics', 'vidalytics_embed_NNYltDiomp7oovXy', 'https://fast.vidalytics.com/embeds/ia5wlRCR/NNYltDiomp7oovXy/'));
      }
   }, [openModal]);

   return (
      <div className="welcomeMiestro">
         <div className="welcomeMiestro__content">
            <div className="welcomeMiestro__text">
               <div>
               <Text
                  type={textType.bold133}
                  size={textSize.size_32}
                  inner="Welcome to Miestro!"
                  style={{
                     marginBottom: '16px'
                  }}
               />
               </div>
               <div>
               <Text
                  type={textType.regular}
                  size={textSize.medium}
                  inner="We're excited to help you build your membership site. Follow these simple steps to get up and running quickly. If you need any help along the way, our team is here to support you."
                  style={{
                     color: '#444C4B',
                     marginBottom: '24px'
                  }}
               />
               </div>
               <div className="welcomeMiestro__buttons">
                  {/* <button 
                     className="welcomeMiestro__button welcomeMiestro__button--primary"
                     onClick={handleStartSetup}
                  >
                     Start Setup
                  </button> */}
                  <button 
                     className="welcomeMiestro__button welcomeMiestro__button--primary"
                     onClick={handleTakeTour}
                  >
                     Take a Tour
                  </button>
               </div>
            </div>
            <div className="welcomeMiestro__image">
               <img src={placeholderImage} alt="Miestro platform preview" />
            </div>
            {openModal && (
               <ModalNew onCloseModal={() => setIsOpenModal(false)} className="tour_video">
                  <div id="vidalytics_embed_NNYltDiomp7oovXy" style={{ width: '100%', position: 'relative', paddingTop: '56.25%' }} />
               </ModalNew>
            )}
         </div>
      </div>
   );
};

export default WelcomeMiestro;