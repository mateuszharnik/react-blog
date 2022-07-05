import { Schema, model } from 'mongoose';

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 100,
      required: true,
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 2000,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    can_manage_posts: {
      type: Boolean,
      required: true,
    },
    can_manage_categories: {
      type: Boolean,
      required: true,
    },
    can_manage_tags: {
      type: Boolean,
      required: true,
    },
    can_manage_comments: {
      type: Boolean,
      required: true,
    },
    can_manage_messages: {
      type: Boolean,
      required: true,
    },
    can_manage_contact: {
      type: Boolean,
      required: true,
    },
    can_manage_about_us: {
      type: Boolean,
      required: true,
    },
    can_manage_newsletter: {
      type: Boolean,
      required: true,
    },
    can_manage_users: {
      type: Boolean,
      required: true,
    },
    can_manage_admin_users: {
      type: Boolean,
      required: true,
    },
    can_manage_roles: {
      type: Boolean,
      required: true,
    },
    can_manage_terms_of_use: {
      type: Boolean,
      required: true,
    },
    can_manage_config: {
      type: Boolean,
      required: true,
    },
    can_manage_faqs: {
      type: Boolean,
      required: true,
    },
    can_be_banned: {
      type: Boolean,
      required: true,
    },
    can_be_modified: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export default model('Role', RoleSchema);
