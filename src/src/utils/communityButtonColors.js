
function hexToRgba(hex, alpha) {
   // Remove the hash (#) if present
   hex = hex.replace('#', '');

   // Parse the r, g, b values from the HEX string
   const r = parseInt(hex.substring(0, 2), 16);
   const g = parseInt(hex.substring(2, 4), 16);
   const b = parseInt(hex.substring(4, 6), 16);

   // Return the RGBA color with the provided transparency
   return `rgba(${ r }, ${ g }, ${ b }, ${ alpha })`;
}

export const communityButtonColors = (community) => {
   return {
      color: community?.community_settings?.branding?.color || '#fff',
      backgroundColor: community?.community_settings?.branding?.bg_color || '#24554E',
      borderColor: community?.community_settings?.branding?.bg_color || '#24554E',
   };
};

export const communitySecondaryButtonColors = (community) => {
   return {
      backgroundColor: 'transparent',
      color: community?.community_settings?.branding?.bg_color || '#24554E',
   };
};


export const communityButtonTextColor = (community) => {
   return community?.community_settings?.branding?.color;  
};

export const communityButtonIconColor = (community) => {
   return community?.community_settings?.branding?.color || '#24554E';  
};


export const communityButtonTransparentColors = (community) => {
   return {
      backgroundColor: community?.community_settings?.branding?.bg_color || '#F8FAFA',
      color: community?.community_settings?.branding?.color || '#24554E',
   };
};


export const communityButtonTransparentColor = (community) => {
   return {
      backgroundColor: 'inherit',
      color: community?.community_settings?.branding?.color || '#24554E',
   };
};