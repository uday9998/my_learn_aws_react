
const getYoutubeId = url => {
   const regExp = /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/;
   const match = url.match(regExp);
   if (match) {
      return `https://www.youtube.com/embed/${ match[1] }`;
   }
   return 'error';
};

const getVimeoEmbed = url => {
   const regExp = /vimeo.*(?:\/|clip_id=)([0-9a-z]*)/;
   const match = url.match(regExp);
   if (match) {
      return `https://player.vimeo.com/video/${ match[1] }`;
   }
   return 'error';
};

const getWistiaEmbed = (url) => {
   const regExp = /https?:\/\/[^.]+\.(wistia\.com|wi\.st)\/(medias|embed)\/.*/;
   const match = url.match(regExp);
   if (match) {
      return `${ match[0] }`;
   }
   return 'error';
};

const getIframeEmbed = code => {
   const regExp = /<iframe>*([0-9a-z]*)/;
   const match = code.match(regExp);
   if (match) {
      return `${ code }`;
   }
   return 'error';
};

const isValidVideoUrl = (url, autoplay) => {
   const youtubeRegex = /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/;
   const vimeoRegex = /vimeo.*(?:\/|clip_id=)([0-9a-z]*)/;
   const wistiaRegex = /https?:\/\/[^.]+\.(wistia\.com|wi\.st)\/(medias|embed)\/.*/;

   if (youtubeRegex.test(url) || vimeoRegex.test(url) || wistiaRegex.test(url)) {
      if (!window.location.href.includes('admin')) {
         if (youtubeRegex.test(url)) {
            return `${ url }?autoplay=${ autoplay ? 1 : 0 }`;
         } if (vimeoRegex.test(url)) {
            return `${ url }?autoplay=${ !!autoplay }`;
         } if (wistiaRegex.test(url)) {
            return `${ url }?autoPlay=${ !!autoplay }`;
         }
      }
      return url;
   }
   return 'https://www.youtube.com/embed/RVjxFLTCngw';
};

export {
   getYoutubeId, getVimeoEmbed, getIframeEmbed, getWistiaEmbed, isValidVideoUrl,
};
