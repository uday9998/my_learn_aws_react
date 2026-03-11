export const colorPallete1 = {
   body_bg_color: '#272727',
   header_bg_color: '#3d4f65',
   header_text_color: '#ffffff',
   item_bg_color: '#ffffff',
   item_text_color: '#3d4f65',
   item_title_color: '#3d4f65',
   item_button_color: '#5099ff',
   main_hub_subtitle_color: '#5099ff',
   main_hub_title_color: '#5099ff',
};

export const colorPallete2 = {
   body_bg_color: '#272727',
   header_bg_color: '#ffffff',
   header_text_color: '#3d4f65',
   item_bg_color: '#3d4f65',
   item_text_color: '#ffffff',
   item_title_color: '#ffffff',
   item_button_color: '#ffffff',
   main_hub_subtitle_color: '#ffffff',
   main_hub_title_color: '#ffffff',
};


export const compareColors = (mainhubSettings, setSwitchColorPalette) => {
   if (mainhubSettings.body_bg_color === colorPallete1.body_bg_color
      && mainhubSettings.header_bg_color === colorPallete1.header_bg_color
      && mainhubSettings.header_text_color === colorPallete1.header_text_color
      && mainhubSettings.item_bg_color === colorPallete1.item_bg_color
      && mainhubSettings.item_text_color === colorPallete1.item_text_color
      && mainhubSettings.item_title_color === colorPallete1.item_title_color
      && mainhubSettings.item_button_color === colorPallete1.item_button_color
      && mainhubSettings.main_hub_subtitle_color === colorPallete1.main_hub_subtitle_color
      && mainhubSettings.main_hub_title_color === colorPallete1.main_hub_title_color) {
      setSwitchColorPalette(1);
   } else if (mainhubSettings.body_bg_color === colorPallete2.body_bg_color
        && mainhubSettings.header_bg_color === colorPallete2.header_bg_color
        && mainhubSettings.header_text_color === colorPallete2.header_text_color
        && mainhubSettings.item_bg_color === colorPallete2.item_bg_color
        && mainhubSettings.item_text_color === colorPallete2.item_text_color
        && mainhubSettings.item_title_color === colorPallete2.item_title_color
        && mainhubSettings.item_button_color === colorPallete2.item_button_color
        && mainhubSettings.main_hub_subtitle_color === colorPallete2.main_hub_subtitle_color
        && mainhubSettings.main_hub_title_color === colorPallete2.main_hub_title_color) {
      setSwitchColorPalette(2);
   } else {
      setSwitchColorPalette(null);
   }
};
