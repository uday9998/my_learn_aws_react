// export default function () {
//    try {
//       const ap3ScriptDoc = document.getElementById('ap3_script');
//       if (window.location.href.includes('/admin')) {
//          if (ap3ScriptDoc) return;

//          const ap3cScript = document.createElement('script');
//          ap3cScript.setAttribute('id', 'ap3_script');

//          ap3cScript.innerHTML = `
//             window.ap3c = window.ap3c || {};
//             const ap3c = window.ap3c;
//             ap3c.cmd = ap3c.cmd || [];
//             ap3c.cmd.push(() => {
//                ap3c.init('ZKN_fNHdFy71Doh3bWllc3Ryb2luYw', 'https://capture-api.autopilotapp.com/');
//                ap3c.track({ v: 0 });
//             });
//             ap3c.activity = function (act) {
//                ap3c.act = (ap3c.act || []);
//                ap3c.act.push(act);
//             };
//             let s; let
//                t;
//             s = document.createElement('script');
//             s.type = 'text/javascript';
//             s.src = 'https://cdn2l.ink/app.js';
//             t = document.getElementsByTagName('script')[0];
//             t.parentNode.insertBefore(s, t);`;

//          document.body.append(ap3cScript);
//          if (document.getElementById('ap3-talk-widget-ui')) {
//             document.getElementById('ap3-talk-widget-ui').style.display = 'inline-flex';
//          }
//       } else if (ap3ScriptDoc) {
//          ap3ScriptDoc.remove();
//          window.ap3c = undefined;
//          if (document.getElementById('ap3-talk-widget-ui')) {
//             document.getElementById('ap3-talk-widget-ui').style.display = 'none';
//          }
//       }
//    } catch (error) {
//       ;
//    }
// }


export default function () {
   try {
      const ap3ScriptDoc = document.getElementById('liveagent_script');

      if (
         window.location.href === `${ window.location.origin }/admin`
           || window.location.href === `${ window.location.origin }/admin/account#billing`
           || window.location.href === `${ window.location.origin }/admin/app-builder`
      ) {
         if (ap3ScriptDoc) return;

         const ap3cScript = document.createElement('script');
         ap3cScript.setAttribute('id', 'liveagent_script');

         ap3cScript.src = "https://beta.leadconnectorhq.com/loader.js";
         ap3cScript.setAttribute('data-resources-url', 'https://beta.leadconnectorhq.com/chat-widget/loader.js');
         ap3cScript.setAttribute('data-widget-id', '68d477a5a4a80e267fa230d4');

         document.body.append(ap3cScript);
      } else if (ap3ScriptDoc) {
         ap3ScriptDoc.remove();
         window.LiveAgent = undefined;
      }
   } catch (error) {
   }
}
