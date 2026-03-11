function isPrint(error) {
   const errors = document.getElementsByClassName('Toastify__toast-body');
   let isError = true;
   for (let i = 0; i < errors.length; i++) {
      if (errors[i].innerHTML === error) {
         isError = false;
      }
   }
   return isError;
}
export default isPrint;
