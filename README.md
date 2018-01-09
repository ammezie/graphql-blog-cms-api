# graphql-blog-cms-api

A Blog CMS API powered by GraphQL and Apollo server

## Getting Started

Clone the project repository by running the command below if you use SSH

```bash
git clone git@github.com:ammezie/graphql-blog-cms-api.git
```

If you use https, use this instead

```bash
git clone https://github.com/ammezie/graphql-blog-cms-api.git
```

After cloning, run:

```bash
npm install
```

Rename `.env.example` to `.env` then fill in your database detail and your JWT secret:

```txt
NODE_ENV=development
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=graphql_blog_cms
JWT_SECRET=somereallylongsecretkey
```

And finally, start the application:

```bash
npm start
```

Then visit [http://localhost:3000/graphiql](http://localhost:3000/graphiql) to see the application in action.
