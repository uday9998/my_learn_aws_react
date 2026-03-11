
const integerations = {
   MailChimp: 'mailchimp',
   ConvertKit: 'convertkit',
   AWeber: 'aweber',
   Drip: 'drip',
   ActiveCampaign: 'activecampaign',
};
export const getAuthoresponderSettingsGet = (data) => {
   if (data.autoresponder) {
      const type = integerations[data.autoresponder.autoresponder_type];
      return {
         autoresponder: data.autoresponder.autoresponder_type,
         list: `${ data.autoresponder[`${ type }_list_id`] }_${ data.autoresponder[`${ type }_list_name`] }`,
      };
   }
   return {};
};
