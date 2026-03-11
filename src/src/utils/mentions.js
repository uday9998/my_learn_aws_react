/* eslint-disable no-useless-escape */
import _clone from 'lodash/clone';
import _escapeRegExp from 'lodash/escapeRegExp';

export function swapTags(text) {
   let displayText = _clone(text);
   const tags = text.match(/@\{\{[^\}]+\}\}/gi) || [];
   tags.map(myTag => {
      const tagData = myTag.slice(3, -2);
      const tagDataArray = tagData.split('||');
      const tagDisplayValue = tagDataArray[2];
      displayText = displayText.replace(new RegExp(_escapeRegExp(myTag), 'gi'), tagDisplayValue);
      return myTag;
   });
   return displayText;
}

export function swapPrintTags(text) {
   let displayText = _clone(text);
   const tags = text.match(/@\{\{[^\}]+\}\}/gi) || [];
   tags.map(myTag => {
      const tagData = myTag.slice(3, -2);
      const tagDataArray = tagData.split('||');
      const onClick = () => {
         return `${ window.location.origin }/admin/members/member/${ tagDataArray[1] }/#general`;
      };
      const tagDisplayValue = `<a style="background-color:#F1F6FF; cursor: pointer; padding:0px 4px; border-radius: 4px;color:#3060BD" target='_blank'  href='${ onClick() }'>${ tagDataArray[2] }</a>`;
      displayText = displayText.replace(new RegExp(_escapeRegExp(myTag), 'gi'), tagDisplayValue);
      return myTag;
   });
   return displayText;
}


export function getUsersFromTags(text) {
   const tags = text.match(/@\{\{[^\}]+\}\}/gi) || [];
   const returnIds = [];
   const allUserIds = tags.map(myTag => {
      const tagData = myTag.slice(3, -2);
      const tagDataArray = tagData.split('||');
      return { id: Number.parseFloat(tagDataArray[1]), name: tagDataArray[2] };
   });
   allUserIds.forEach(element => {
      const ids = returnIds.map((i) => i.id);
      if (!ids.includes(element.id)) {
         returnIds.push(element);
      }
   });
   return returnIds;
}
