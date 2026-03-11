const FileHtml = (name, icon, url) => {
   return `
   <div class='fileView'> 
   
   <div class="fileViewIcon">
      ${ icon }
   </div>
   <div class="fileViewTitle">
      <a class='download__element' href=${ url } target='_blank' download>${ name }</a>
   </div>
   </div>
    `;
};

export default FileHtml;
