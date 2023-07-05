# Task for the backend

- Introduction

You're about to work on a task that encompasses 4 main components:

External Data Source: This is an external API that's the source of user and post data. These are it’s endpoints
users: `https://jsonplaceholder.typicode.com/users`
posts: `https://jsonplaceholder.typicode.com/posts?userId={userId}`

Database: A MongoDB database Docker container

Backend Server: This is your own internal API, built on top of typescript and node to communicate with both the external data source and the local MongoDB database

- Task Details

* Part 1: User Table

1. Your task begins with building a users table:
2. Set up an internal API endpoint that fetches a list of users from the external API.

- Part 2: User Posts

1. Your backend should be smart enough to first check for the user's posts in the local MySQL database. If they exist, use them. If not, fetch them from the external posts API, store them in the local database, and then use them.
2. Ensure the backend endpoint for fetching user's posts supports pagination.
3. When the Delete icon is clicked, the post should be deleted from the local database,

### To run this project

1. `git clone git@github.com:mikdadayan/task-backend.git`
2. `cd REPO_NAME`
3. `npm install`
4. `npm start`

OR

### To run this project

1. `git clone git@github.com:mikdadayan/task-backend.git`
2. `cd REPO_NAME`
3. - `docker compose -f docker-compose.prod.yml`
     OR
   - `docker-compose -f docker-compose.prod.yml`

## API Documentation

### Get All Users

Retrieve a list of all users.

- **Endpoint**: `/users`
- **Method**: GET

#### Request Parameters

| Parameter | Type   | Description                           |
| --------- | ------ | ------------------------------------- |
| page      | number | (optional) Page number                |
| limit     | number | (optional) Number of results per page |

#### Response

A successful response will contain the following:

````json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
      // Other user properties...
    },
    // Other users...
  ]
}
```

### Get User's Posts

Retrieve a list of posts for a specific user.

- **Endpoint**: `/posts/:userId`
- **Method**: GET

#### Request Parameters

| Parameter | Type   | Description         |
| --------- | ------ | ------------------- |
| userId    | string | ID of the user      |
| page      | number | (optional) Page number        |
| limit     | number | (optional) Number of results per page |

#### Response

A successful response will contain the following:

```json
{
  "posts": [
    {
      "id": 1,
      "title": "Post Title",
      "body": "Post Body"
      // Other post properties...
    },
    // Other posts...
  ]
}
```
### Delete Post

Delete a specific post by its ID.

- **Endpoint**: `/posts/:postId`
- **Method**: DELETE

#### Request Parameters

| Parameter | Type   | Description  |
| --------- | ------ | ------------ |
| postId    | string | ID of the post |

#### Response

A successful response will contain the following:

```json
{
  "message": "Post deleted successfully"
}
```
