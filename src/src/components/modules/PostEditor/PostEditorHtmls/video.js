const VideoHtml = (src) => {
   return `
        <video width="320" height="240" controls>
         <source src="${ src }" type="video/mp4">
      </video>
     `;
};

export default VideoHtml;
