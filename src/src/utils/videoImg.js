export const videoImg = (lesson, defaultImg) => {
   // Ensure we always have a fallback image
   const fallbackImage = 'https://d1h8t4w16bjw27.cloudfront.net/landing/offer_default.png';
   let imageUrl = defaultImg || fallbackImage;
   
   // Return early if lesson is null/undefined
   if (!lesson) {
      return imageUrl;
   }
   
   try {
      if (lesson.is_playlist) {
         if (lesson.file && lesson.file.src) {
            return lesson.file.src;
         }
         return imageUrl;
      }
      
      if (lesson.css_attributes && lesson.css_attributes.image_src) {
         imageUrl = lesson.css_attributes.image_src;
      } else if (lesson.poster) {
         const s3Url = process.env.REACT_APP_AWS_BUCKET_URL;
         if (s3Url) {
            const folderName = lesson.poster.split('.')[0];
            const imageName = lesson.poster;
            imageUrl = `${s3Url}/videos/${folderName}/outputs/thumbnails/${imageName}`;
         }
      } else if (lesson?.blocks?.[0]?.css_attributes?.image_src) {
         imageUrl = lesson.blocks[0].css_attributes.image_src;
      } else if (lesson?.blocks?.[0]?.videos?.[0]?.poster) {
         const s3Url = process.env.REACT_APP_AWS_BUCKET_URL;
         if (s3Url) {
            const folderName = lesson.blocks[0].videos[0].poster.split('.')[0];
            const imageName = lesson.blocks[0].videos[0].poster;
            imageUrl = `${s3Url}/videos/${folderName}/outputs/thumbnails/${imageName}`;
         }
      }
   } catch (error) {
      return fallbackImage;
   }
   
   // Final safety check - ensure we're not returning null/undefined/empty string
   return imageUrl || fallbackImage;
};


export const videoAdminImg = (lesson, defaultImg) => {
   let imageUrl = defaultImg || '';
   if (lesson.css_attributes && lesson.css_attributes.image_src) {
      imageUrl = lesson.css_attributes.image_src;
   } else if (lesson.poster) {
      const s3Url = process.env.REACT_APP_AWS_BUCKET_URL;
      const folderName = lesson.poster.split('.')[0];
      const imageName = lesson.poster;
      imageUrl = `${ s3Url }/videos/${ folderName }/outputs/thumbnails/${ imageName }`;
   } else if (lesson.videos && lesson.videos[0] && lesson.videos[0].poster) {
      const s3Url = process.env.REACT_APP_AWS_BUCKET_URL;
      const folderName = lesson.videos[0].poster.split('.')[0];
      const imageName = lesson.videos[0].poster;
      imageUrl = `${ s3Url }/videos/${ folderName }/outputs/thumbnails/${ imageName }`;
   }
   return imageUrl;
};


export const videoRealtedImg = (lesson) => {
   let imageUrl = 'https://d1h8t4w16bjw27.cloudfront.net/landing/offer_default.png';
   if (lesson.css_attributes && lesson.css_attributes.image_src) {
      imageUrl = lesson.css_attributes.image_src;
   } else if (lesson.poster) {
      const s3Url = process.env.REACT_APP_AWS_BUCKET_URL;
      const folderName = lesson.poster.split('.')[0];
      const imageName = lesson.poster;
      imageUrl = `${ s3Url }/videos/${ folderName }/outputs/thumbnails/${ imageName }`;
   }
   return imageUrl;
};
