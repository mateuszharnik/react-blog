const about = {
  get: {
    tags: ['/about'],
    description: 'Get information about blog.',
    operationId: 'getAbout',
    responses: {
      200: {
        description: 'Success request.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '63e1287cf258401c8210e363',
                },
                contents: {
                  type: 'string',
                  maxLength: 20000,
                  example: '# Hello World !',
                },
                html_contents: {
                  type: 'string',
                  example: '<h1>Hello World !</h1>',
                },
                created_at: {
                  type: 'string',
                  example: '2023-02-06T16:19:08.352Z',
                },
                updated_at: {
                  type: 'string',
                  example: '2023-06-24T15:53:34.815Z',
                },
                deleted_at: {
                  nullable: true,
                  type: 'string',
                  example: null,
                },
              },
              required: ['id', 'contents', 'html_contents', 'created_at', 'updated_at', 'deleted_at'],
            },
          },
        },
      },
      404: {
        description: 'Not found information about blog.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                messages: {
                  type: 'array',
                  minItems: 1,
                  items: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                      },
                    },
                  },
                  example: [{ message: 'Nie znaleziono informacji o blogu.' }],
                },
              },
              required: ['messages'],
            },
          },
        },
      },
    },
  },
  put: {
    tags: ['/about'],
    operationId: 'updateAbout',
    description: 'Update information about blog.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              contents: {
                type: 'string',
                maxLength: 20000,
                example: '# Hello World !',
              },
            },
            required: ['contents'],
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Correct update information about blog.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '63e1287cf258401c8210e363',
                },
                contents: {
                  type: 'string',
                  maxLength: 20000,
                  example: '# Hello World !',
                },
                html_contents: {
                  type: 'string',
                  example: '<h1>Hello World !</h1>',
                },
                created_at: {
                  type: 'string',
                  example: '2023-02-06T16:19:08.352Z',
                },
                updated_at: {
                  type: 'string',
                  example: '2023-06-24T15:53:34.815Z',
                },
                deleted_at: {
                  nullable: true,
                  type: 'string',
                  example: null,
                },
              },
              required: ['id', 'contents', 'html_contents', 'created_at', 'updated_at', 'deleted_at'],
            },
          },
        },
      },
      404: {
        description: 'Not found information about blog.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                messages: {
                  type: 'array',
                  minItems: 1,
                  items: {
                    type: 'string',
                  },
                  example: ['Nie znaleziono informacji o blogu.'],
                },
              },
              required: ['messages'],
            },
          },
        },
      },
    },
  },
};

export default about;
