const ids = {
   'email_general_notify_new_student_join_school': 'When a new student joins the school',
   'email_general_notify_someone_cancels_account': 'When someone cancels their account',
   'email_general_notify_subscription_fails_or_canceled': 'When a subscription payment fails or a subscription is canceled due to non-payment',
   'email_message_notify_someone_comments': 'When someone comments',
   'email_message_notify_someone_mentions_comments': 'When someone mentions you in a comment',
   'email_message_notify_someone_replies_comments': 'When someone replies to your comment',
   'email_message_notify_people_send_message': 'When people send you a message in community chat',
   'email_product_notify_student_singup_for_free_product': 'When a new student signs up for a free program',
   'email_product_notify_student_completes_course': 'When a student completes a course ',
   'email_product_notify_student_completes_quiz': 'When a student completes a quiz',
   'email_product_notify_student_accepts_grant_offer': 'When a students accepts a ‘grant offer’',
   'email_product_notify_drip_becomes_available_students': 'Send email when a drip becomes available to students',
};

export function getNotificationsById(notifications, id) {
   const filteredNotifications = notifications.filter((notify) => notify.id.includes(id));
   return filteredNotifications;
}


export function getProperlyNotifyName(id) {
   return ids[id];
}

export function getIdNotify(key) {
   const keys = Object.keys(ids);
   return keys.indexOf(key);
}

export function getKeyNotify(id) {
   const keys = Object.keys(ids);
   return keys[id];
}
