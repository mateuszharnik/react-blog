const createExampleMessages = () => {
  const messages = [];

  for (let i = 0; i < 50; i += 1) {
    messages.push({
      first_name: 'Imię',
      last_name: 'Nazwisko',
      email: 'email@domain.com',
      subject: `Temat numer ${i + 1}`,
      contents: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit obcaecati reprehenderit, consequatur similique fugiat laudantium at ea animi officia, iusto quae nulla adipisci nihil rerum officiis? Error molestiae suscipit explicabo.',
    });
  }

  return messages;
};

export default createExampleMessages();
