const mentionHtml = (domain, name, id, communityId) => {
   return `
       <a class='mention-user' id='${ id }' href='${ domain }/admin/community/${ communityId }/member/${ id }' target='_blank'>@${ name }</a>
       `;
};

export default mentionHtml;
