export function getMemberRole(members, id) {
   const member = members.find((e) => e.id === id);
   return member ? (member.pivot?.user_type === 'admin' && id !== 1) ? 'subadmin' : member.pivot?.user_type : 'member';
}

export function getMemberSuspendedStatus(members, id) {
   const member = members.find((e) => e.id === id);
   return member?.pivot?.is_suspended;
}
