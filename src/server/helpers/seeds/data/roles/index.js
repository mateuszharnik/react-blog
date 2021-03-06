export const roleTypes = {
  ADMIN: 'ADMIN',
  SUPERUSER: 'SUPERUSER',
  USER: 'USER',
};

const adminRole = {
  name: 'administrator',
  description: 'Administrator bloga. Tej roli nie można usunąć.',
  type: roleTypes.ADMIN,
  can_manage_posts: true,
  can_manage_categories: true,
  can_manage_tags: true,
  can_manage_comments: true,
  can_manage_messages: true,
  can_manage_contact: true,
  can_manage_about_us: true,
  can_manage_newsletter: true,
  can_manage_users: true,
  can_manage_admin_users: true,
  can_manage_roles: true,
  can_manage_terms_of_use: true,
  can_manage_config: true,
  can_manage_faqs: true,
  can_be_banned: false,
  can_be_modified: false,
};

const moderatorRole = {
  name: 'moderator',
  description: 'Moderator bloga. Może zarządzać zadaniami związanymi z wpisami.',
  type: roleTypes.SUPERUSER,
  can_manage_posts: true,
  can_manage_categories: true,
  can_manage_tags: true,
  can_manage_comments: true,
  can_manage_messages: false,
  can_manage_contact: false,
  can_manage_about_us: false,
  can_manage_newsletter: false,
  can_manage_users: false,
  can_manage_admin_users: false,
  can_manage_roles: false,
  can_manage_terms_of_use: false,
  can_manage_config: false,
  can_manage_faqs: true,
  can_be_banned: true,
  can_be_modified: true,
};

const userRole = {
  name: 'użytkownik',
  description: 'Konto zarejestrowanego użytkownika. Tej roli nie można usunąć.',
  type: roleTypes.USER,
  can_manage_posts: false,
  can_manage_categories: false,
  can_manage_tags: false,
  can_manage_comments: false,
  can_manage_messages: false,
  can_manage_contact: false,
  can_manage_about_us: false,
  can_manage_newsletter: false,
  can_manage_users: false,
  can_manage_admin_users: false,
  can_manage_roles: false,
  can_manage_terms_of_use: false,
  can_manage_config: false,
  can_manage_faqs: false,
  can_be_banned: true,
  can_be_modified: false,
};

export const defaultRoles = [
  userRole,
  adminRole,
];

export const exampleRoles = [
  userRole,
  adminRole,
  moderatorRole,
];
