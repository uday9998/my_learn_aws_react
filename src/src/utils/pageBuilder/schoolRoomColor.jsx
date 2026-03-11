/* eslint-disable max-len */
import generateRGBColor from 'utils/generateRGBColor';

export const schoolDefaultColor = (themeName) => {
   let themeColor = '#7B53E9';
   switch (themeName) {
      case 'template2': themeColor = '#7B53E9';
         break;
      case 'template3': themeColor = '#7B53E9';
         break;
      default:
   }
   return themeColor;
};

// export const activeSchoolRoomColor = (siteInfo) => {
//    return siteInfo.landing_data[5].school_room_components[0].subcomponent[3].props.bgColor
//    || schoolDefaultColor(siteInfo.active_school_room.school_room_theme_name);
// };


export const activeSchoolRoomColor = (siteInfo, templateName) => {
   const { pathname, search } = window.location;
   const isMembership = pathname.includes('membership') || pathname.includes('template1') || search.includes('?video=') || pathname.includes('playlists') || (window.location.pathname.includes('programs') && !window.location.pathname.includes('admin') && window.location.pathname.split('/').length > 3);
   return isMembership ? siteInfo.membership.active_school_room.school_color
    || schoolDefaultColor(siteInfo.membership.active_school_room.school_color) 
      : siteInfo.all_school_room.find(template => template.school_room_theme_name === templateName)?.school_color
   || schoolDefaultColor(templateName);
};

export const getSchoolButtonColor = (siteInfo, templateId) => {
   const { pathname, search } = window.location;
   const isMembership = pathname.includes('membership') || pathname.includes('template1') || search.includes('?video=') || pathname.includes('playlists') || (window.location.pathname.includes('programs') && !window.location.pathname.includes('admin') && window.location.pathname.split('/').length > 3);
   return isMembership ? siteInfo.membership.active_school_room.school_button_color : templateId ? siteInfo.all_school_room.find(template => template.school_room_theme_name === templateId)?.school_button_color : siteInfo.active_school_room.school_button_color;
};

export const newButtonBgColor = (siteInfo, templateName) => {
   return activeSchoolRoomColor(siteInfo, templateName);
};

export const primaryButtonTextColor = (siteInfo) => {
   const { pathname, search } = window.location;
   let templateName = '';
   if (!pathname.includes('checkout')) {
      templateName = pathname.split('/').find(links => links.includes('template'));
   }
   const isMembership = pathname.includes('membership') || pathname.includes('template1') || search.includes('?video=') || pathname.includes('playlists') || (window.location.pathname.includes('programs') && !window.location.pathname.includes('admin') && window.location.pathname.split('/').length > 3);
   return isMembership ? siteInfo.membership.active_school_room.school_text_color || '#fff' : templateName ? siteInfo.all_school_room.find(template => template.school_room_theme_name === templateName).school_text_color : siteInfo.active_school_room.school_text_color || '#ffffff';
};

export const primaryFont = (siteInfo) => {
   const { pathname, search } = window.location;
   const isMembership = pathname.includes('membership') || pathname.includes('template1') || search.includes('?video=') || pathname.includes('playlists') || (window.location.pathname.includes('programs') && !window.location.pathname.includes('admin') && window.location.pathname.split('/').length > 3);
   return isMembership ? siteInfo.membership.active_school_room.school_font || 'Inter' : siteInfo.active_school_room.school_font || 'Inter';
};

export const offersSliderColor = (siteInfo) => {
   const { pathname, search } = window.location;
   const isMembership = pathname.includes('membership') || pathname.includes('template1') || search.includes('?video=') || pathname.includes('playlists') || (window.location.pathname.includes('programs') && !window.location.pathname.includes('admin') && window.location.pathname.split('/').length > 3);
   return isMembership ? siteInfo.membership.active_school_room.school_color_2 || '#ffffff' : siteInfo.active_school_room.school_color_2 || '#ffffff';
};

export const mainBgColor = (siteInfo) => {
   const { pathname, search } = window.location;
   const isMembership = pathname.includes('membership') || pathname.includes('template1') || search.includes('?video=') || pathname.includes('playlists') || (window.location.pathname.includes('programs') && !window.location.pathname.includes('admin') && window.location.pathname.split('/').length > 3);
   return isMembership ? siteInfo.membership.active_school_room.school_bg_color : siteInfo.active_school_room.school_bg_color;
};

export const headerColor = (siteInfo) => {
   const { pathname, search } = window.location;
   const isMembership = pathname.includes('membership') || pathname.includes('template1') || search.includes('?video=') || pathname.includes('playlists') || (window.location.pathname.includes('programs') && !window.location.pathname.includes('admin') && window.location.pathname.split('/').length > 3);
   return isMembership ? siteInfo.membership.landing_data[1].school_room_section.props.bgColor : siteInfo.landing_data[1].school_room_section.props.bgColor;
};

export const isLight = (color) => {
   let r; let g; let
      b;

   if (color?.startsWith('#')) {
      let hex = color.substring(1);
      // Check if the hex code is of length 3 or 6
      if (hex.length === 3) {
         // Expand short hex color notation (e.g., #FFF to #FFFFFF)
         hex = hex.split('').map(c => c + c).join('');
      }
      r = parseInt(hex.substring(0, 2), 16) / 255;
      g = parseInt(hex.substring(2, 4), 16) / 255;
      b = parseInt(hex.substring(4, 6), 16) / 255;
   } else if (color?.startsWith('rgb')) {
      const match = color.match(/(\d+), (\d+), (\d+)/);
      if (match) {
         r = parseInt(match[1], 10) / 255;
         g = parseInt(match[2], 10) / 255;
         b = parseInt(match[3], 10) / 255;
      } else {
         return color;
      }
   } else {
      return color;
   }

   const max = Math.max(r, g, b);
   const min = Math.min(r, g, b);
   const l = (max + min) / 2;

   let h; let
      s;

   if (max === min) {
      s = 0;
      h = s;
   } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
         case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
         case g:
            h = (b - r) / d + 2;
            break;
         case b:
            h = (r - g) / d + 4;
            break;
         default:
            break;
      }

      h /= 6;
   }

   return l > 0.5;
};

export const cardBgColor = (siteInfo, isTemplate = false) => {
   if (!isTemplate) {
      if (isLight(mainBgColor(siteInfo))) {
         return '#ffffff';
      }
   } else if (isLight(siteInfo)) {
      return '#ffffff';
   }

   return 'rgba(255, 255, 255, 0.05)';
};

export const borderColor = (siteInfo) => {
   if (isLight(mainBgColor(siteInfo))) {
      return '#e7e9e9';
   }
   return 'rgba(255, 255, 255, 0.5)';
};

export const subtitleText = (siteInfo) => {
   if (isLight(mainBgColor(siteInfo))) {
      return generateRGBColor(primaryButtonTextColor(siteInfo), 0.7);
   }
   return 'rgba(255, 255, 255, 0.60)';
};

export const placeholderText = (siteInfo) => {
   if (isLight(mainBgColor(siteInfo))) {
      return '#727978';
   }
   return borderColor(siteInfo);
};


export const giveBackgroundColors = (checkColor, siteInfo) => {
   if (checkColor) {
      document.body.style.setProperty('--inputBg008', '#ffffff');
      document.body.style.setProperty('--inputMemberTextColor', '#131F1E');
      document.body.style.setProperty('--borderColor', 'rgba(19, 31, 30, 0.1)');
   } else {
      document.body.style.setProperty('--inputBg008', 'rgba(255, 255, 255, 0.08)');
      document.body.style.setProperty('--inputMemberTextColor', primaryButtonTextColor(siteInfo));
      document.body.style.setProperty('--borderColor', borderColor(siteInfo));
   }
};

export const mainCardBorderColor = (siteInfo) => {
   if (isLight(mainBgColor(siteInfo))) {
      return '#E7E9E9';
   }
   return 'rgba(255, 255, 255, 0.05)';
};

export const setCardBorderColor = (siteInfo) => {
   if (siteInfo) {
      document.body.style.setProperty('--mainCardBorderColor', mainCardBorderColor(siteInfo));
   }
};

export const setPrimaryColors = (siteInfo, templateId) => {
   let templateIdOnlyForPortal = templateId;
   if (window.location.pathname.includes('checkout')) {
      templateIdOnlyForPortal = '';
   }
   document.body.style.setProperty('--bulletBorderColor', '#131F1E');
   document.body.style.setProperty('--mainBgColorTransparent', 'rgba(255, 255, 255, 0.05)');
   if (siteInfo) {
      document.body.style.setProperty('--mainCardBorderColor', mainCardBorderColor(siteInfo));
      document.body.style.setProperty('--subtitleTextColor060', subtitleText(siteInfo));
      document.body.style.setProperty('--mainBg005', cardBgColor(siteInfo));
      document.body.style.setProperty('--mainBgColor', mainBgColor(siteInfo));
      document.body.style.setProperty('--headerColor', headerColor(siteInfo));
      document.body.style.setProperty('--cardColor', generateRGBColor(mainBgColor(siteInfo), 0.5));
      document.body.style.setProperty('--buttonBgcolor', newButtonBgColor(siteInfo, templateIdOnlyForPortal));
      document.body.style.setProperty('--textColor', primaryButtonTextColor(siteInfo, templateIdOnlyForPortal));
      document.body.style.setProperty('--secondaryButtonBgcolor', 'transparent');
      document.body.style.setProperty('--secondaryTextColor', activeSchoolRoomColor(siteInfo));
      document.body.style.setProperty('--textColor20', generateRGBColor(primaryButtonTextColor(siteInfo), 0.2));
      document.body.style.setProperty('--textColor10', generateRGBColor(primaryButtonTextColor(siteInfo), 0.1));
      document.body.style.setProperty('--textColor5', generateRGBColor(primaryButtonTextColor(siteInfo), 0.05));
      document.body.style.setProperty('--textColor40', generateRGBColor(primaryButtonTextColor(siteInfo), 0.4));
      document.body.style.setProperty('--textColor60', generateRGBColor(primaryButtonTextColor(siteInfo), 0.6));
      document.body.style.setProperty('--textColor70', generateRGBColor(primaryButtonTextColor(siteInfo), 0.7));
      document.body.style.setProperty('--offersSliderColor', offersSliderColor(siteInfo));
      document.body.style.setProperty('--offersSliderColor20', generateRGBColor(offersSliderColor(siteInfo), 0.2));
      document.body.style.setProperty('--offersSliderColor10', generateRGBColor(offersSliderColor(siteInfo), 0.1));
      document.body.style.setProperty('--activeColor', generateRGBColor(activeSchoolRoomColor(siteInfo), 0.2));
      document.body.style.setProperty('--schoolButtonColor', getSchoolButtonColor(siteInfo, templateIdOnlyForPortal));

      if (window.location.href.includes('admin') || window.location.href.includes('affiliate') || window.location.href.includes('my-account') || (window.location.href.includes('community') && window.location.href.includes('portal/community/')) || window.location.href.includes('temp-checkout') || window.location.href.includes('checkout/template')) {
         document.body.style.setProperty('--primaryFont', 'Roboto');
         document.body.style.setProperty('--memberTextColorSecond', '#131f1e');
         document.body.style.setProperty('--memberButtonBgcolor', '#24554e');
         document.body.style.setProperty('--memberTextColorGrey', '#727978');
         document.body.style.setProperty('--memberTextColorGrey04', '#727978');
         document.body.style.setProperty('--memberTextColor', 'var(--greyscale_90)');
      } else {
         document.body.style.setProperty('--primaryFont', primaryFont(siteInfo));
         document.body.style.setProperty('--memberTextColorSecond', primaryButtonTextColor(siteInfo, templateIdOnlyForPortal));
         document.body.style.setProperty('--memberButtonBgcolor', activeSchoolRoomColor(siteInfo));
         document.body.style.setProperty('--memberTextColorGrey', generateRGBColor(primaryButtonTextColor(siteInfo, templateIdOnlyForPortal), 0.8));
         document.body.style.setProperty('--memberTextColorGrey04', generateRGBColor(primaryButtonTextColor(siteInfo, templateIdOnlyForPortal), 0.4));
         document.body.style.setProperty('--memberTextColor', primaryButtonTextColor(siteInfo, templateIdOnlyForPortal));
      }

      if ((window.location.href.includes('admin') && !window.location.href.includes('admin/other-page/edit')) || window.location.href.includes('my-account') || window.location.href.includes('affiliate') || (window.location.href.includes('community') && window.location.href.includes('portal/community/')) || window.location.href.includes('temp-checkout') || window.location.href.includes('checkout/template')) {
         document.body.style.setProperty('--borderColor', '#e7e9e9');
         document.body.style.setProperty('--placeholderColor', '#727978');
         document.body.style.setProperty('--inputBg008', '#ffffff');
         document.body.style.setProperty('--inputMemberTextColor', 'var(--greyscale_90)');
         document.body.style.setProperty('--filterBg', '#ffffff');
      } else {
         document.body.style.setProperty('--borderColor', borderColor(siteInfo));
         document.body.style.setProperty('--placeholderColor', placeholderText(siteInfo));
         document.body.style.setProperty('--inputBg008', 'rgba(255, 255, 255, 0.08)');
         document.body.style.setProperty('--inputMemberTextColor', primaryButtonTextColor(siteInfo, templateIdOnlyForPortal));
         document.body.style.setProperty('--filterBg', mainBgColor(siteInfo));
      }
   }
};
