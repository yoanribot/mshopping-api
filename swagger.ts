import { getPosts, getPost, createPost } from './api-doc/posts.swagger';

export const swaggerDoc = {
  "swagger": "2.0",
  "info": {
    "version": "0.1.0",
    "title": "iTeam API Documentation",
    "description": "Full description of Iteam restful api",
    "license": {
      "name": "MIT",
      "url": "https://opensource.org/licenses/MIT"
    }
  },
  "host": "http://localhost:3010",
  "basePath": "/api",
  "schemes": ["http"],
  "consumes": ["application/json"],
  "produces": ["application/json"],
  servers: [
    {
      url: 'http://localhost:3010/api',
      description: 'Local server'
    }
  ],
  tags: [
    {
      name: 'Posts'
    }
  ],
  paths: {
    "/posts": {
      "get": getPosts,
      "post": createPost,
    },
    "/posts/{id}": {
      "get": getPost,
    },
  }
}