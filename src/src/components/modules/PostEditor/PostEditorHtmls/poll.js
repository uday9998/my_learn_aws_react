export const pollHtml = (title, subTitle, options, id) => {
   return (
      `
        <poll>
        <div class="poll__item" id='${ id }'>
          <div class="poll__item__title">
            ${ title }
          </div>
          ${ subTitle ? ` <div class="poll__item__subtitle">${ subTitle }</div>` : '' }
            ${ options }
          </div>
        `
   );
};
