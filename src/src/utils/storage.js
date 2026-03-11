export const getStorageFreeSize = (planName, storageLimit, uploadVideosSize) => {
   let defaultSize = 0;

   if (planName === 'Life Time Launch Codes') {
      defaultSize = storageLimit ? storageLimit * 1024 * 1024 * 1024 : 10 * 1024 * 1024 * 1024;
   } else if (planName === 'Premium Plan Lifetime Code') {
      defaultSize = storageLimit ? storageLimit * 1024 * 1024 * 1024 : 20 * 1024 * 1024 * 1024;
   } else if (planName === 'Growth Plan Lifetime Codes') {
      defaultSize = storageLimit ? storageLimit * 1024 * 1024 * 1024 : 40 * 1024 * 1024 * 1024;
   }
   return defaultSize - (uploadVideosSize * 1024 * 1024 * 1024);
};

export const isOneTimeUser = planName => {
   return planName === 'Life Time Launch Codes'
   || planName === 'Premium Plan Lifetime Code'
   || planName === 'Growth Plan Lifetime Codes';
};


export const getProgressBarData = (authUser, fileSizeInfo, mainApp) => {
   let progresPercent = 0;
   let gbSize = 0;
   let gbDefaultSize = 0;
   const size = fileSizeInfo.size * 1024;

   if (mainApp.plan_name === 'Life Time Launch Codes') {
      gbDefaultSize = authUser.storage_limit ? authUser.storage_limit : 10;
      progresPercent = size / (gbDefaultSize * 1024) * 100;
      gbSize = (gbDefaultSize * 1024) - size;
   } else if (mainApp.plan_name === 'Premium Plan Lifetime Code') {
      gbDefaultSize = authUser.storage_limit ? authUser.storage_limit : 20;
      progresPercent = size / (gbDefaultSize * 1024) * 100;
      gbSize = (gbDefaultSize * 1024) - size;
   } else if (mainApp.plan_name === 'Growth Plan Lifetime Codes') {
      gbDefaultSize = authUser.storage_limit ? authUser.storage_limit : 40;
      progresPercent = size / (gbDefaultSize * 1024) * 100;
      gbSize = (gbDefaultSize * 1024) - size;
   }
   if (gbSize <= 0) {
      progresPercent = 100;
      gbSize = 0;
   } else {
      progresPercent = Math.round(progresPercent);
      gbSize = Number((gbSize / 1024).toFixed(2));
   }
   return { gbSize, gbDefaultSize, progresPercent };
};
