import colors from 'colors/safe';
import Role from '@server/api/v1/roles/model';
import User from '@server/api/v1/users/model';
import { roleTypes } from '@server/helpers/seeds/data/roles';

const createExampleFAQs = async () => {
  const faqs = [];

  try {
    const roles = await Role.find({
      $or: [
        { type: roleTypes.ADMIN },
        { type: roleTypes.SUPERUSER },
      ],
      deleted_at: null,
    });

    if (!roles.length) {
      // eslint-disable-next-line no-console
      console.log(colors.red('Roles not found.'));
      process.exit(0);
    }

    const ids = roles.map(({ _id }) => _id.toString());

    const users = await User.find({ role: { $in: ids }, deleted_at: null });

    if (!users.length) {
      // eslint-disable-next-line no-console
      console.log(colors.red('Users not found.'));
      process.exit(0);
    }

    for (let i = 0; i < 50; i += 1) {
      faqs.push({
        title: `Tytuł numer ${i + 1}`,
        contents: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit obcaecati reprehenderit, consequatur similique fugiat laudantium at ea animi officia, iusto quae nulla adipisci nihil rerum officiis? Error molestiae suscipit explicabo.',
        user: users[i % users.length].id,
        is_published: !!Math.round(Math.random()),
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    process.exit(0);
  }

  return faqs;
};

export default createExampleFAQs;
