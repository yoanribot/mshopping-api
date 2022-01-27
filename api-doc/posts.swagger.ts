export const getPosts = {
  tags: ['Posts'],
  description: "Returns all posts",
  operationId: 'getPosts',
  responses: {
    "200": {
      description: "A list of all posts.",
      "content": {
        "application/json": {
        }
      }
    }
  }
};

export const getPost = {
  tags: ['Posts'],
  description: "Returns a post by id",
  operationId: 'getPost',
  parameters: [
    {
      name: 'postId',
      in: 'path',
      required: true,
      description: "Id of a post",
    }
  ],
  responses: {
    "200": {
      description: "A specific post",
      "content": {
        "application/json": {
        }
      }
    }
  }
};

export const createPost = {
  tags: ['Posts'],
  description: "Creates a post",
  operationId: 'createPost',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: [{
            title: {
              type: 'string',
            }
          }],
        }
      },
    }
  },
  responses: {
    "200": {
      description: "A specific post",
      "content": {
        "application/json": {
        }
      }
    }
  }
};