function getComissions(comissions, offers, newComissionsIds) {
   // const newComissions = newComissionsIds.map((e) => {
   //    const currentOffer = offers.find((offer) => offer.id === e);
   //    const commission = comissions.find((item) => item.plan_id === e) || {
   //       commission: 0,
   //       plan_id: e,
   //    };
   //    
   //    return {
   //       // ...currentOffer,
   //       ...commission,
   //       plan: currentOffer,
   //       program_documents: e.program_documents || [],
   //       program_promotional_documents: e.program_promotional_documents || [],
   //    };
   // });
   // return newComissions.filter((e) => e.plan !== undefined);

   return newComissionsIds.reduce((result, id) => {
      const currentOffer = offers.find((offer) => offer.id === id);

      if (!currentOffer) return result;

      const commission = comissions.find((item) => item.plan_id === id) || { commission: 0, plan_id: id };

      result.push({
         ...currentOffer,
         ...commission,
         plan: currentOffer,
         program_documents: commission.program_documents || [],
         program_promotional_documents: commission.program_promotional_documents || [],
      });

      return result;
   }, []);
}

export default getComissions;
