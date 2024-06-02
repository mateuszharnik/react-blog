const healthCheck = {
  get: {
    tags: ['/health'],
    description: 'Check if API works fine.',
    operationId: 'health',
    responses: {
      200: {
        description: 'Success request.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: '🖤',
                },
              },
              required: ['message'],
            },
          },
        },
      },
    },
  },
};

export default healthCheck;
