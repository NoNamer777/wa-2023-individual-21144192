# wa-2023-individual-21144192

Vue Project: [![Build and Deploy](https://github.com/NoNamer777/wa-2023-individual-21144192/actions/workflows/build-and-deploy.yaml/badge.svg)](https://github.com/NoNamer777/wa-2023-individual-21144192/actions/workflows/build-and-deploy.yaml)

This project houses 4 projects.

For more information about the individual projects and how to run them, or develop on them, please refer to the README's
of the projects themselves.

The projects can be found here:

| Project name    | Location                      | Technologies used                         |
| --------------- | ----------------------------- | ----------------------------------------- |
| static          | [static](packages/static)     | HTML, CSS, and vanilla JavaScript         |
| --------------- | ----------------------------- | ----------------------------------------- |
| app-data        | [app-data](packages/app-data) | TypeScript                                |
| vue-app         | [vue-app](packages/vue-app)   | HTML, SCSS, TypeScript, and Vue           |
| nest-app        | [nest-app](packages/nest-app) | Nest.js, TypeORM, Joi, TypeScript, Rxjs   |

## Nx

This repository is by definition a multi-project repository, or mono-repository, and is managed by Nx. Nx optimizes build,
test and other actions by looking at how the different projects depend on each other and makes sure that the required
artifacts of the different tasks are there in the right order, but doesn't make the task wait unnecessarily. This it,
achieves by parallelization of the different tasks when they're run.

For more info, check out Nx at: https://nx.dev/

## Getting the stack up and running

In order to get the full stack application up and running you'll need to do the following things:

1. Make sure you have the latest dependencies installed by running:

```shell
npm install
```

2. After that you'll need to provide the environment details for the back-end. Find the environment file
   [here](packages/nest-app/src/environments/environment.ts) and provide the information that suits your local environment
   best using the following format:

```typescript
export const environment: EnvironmentValues = {
    database: {
        type: 'mysql', // No other type of database is supported at this time.
        host: 'localhost',
        port: 3306,
        database: '<database/schema>',
        username: '<database username>',
        password: '<database password>',
    },
    server: {
        host: 'localhost',
        port: 8080,
        cors: {
            allowedOrigins: ['http://localhost:4200'],
        },
    },
};
```

3. Make sure to grab the sql script, that you can find [here](documentation/data/data.sql), and run that script on your
   lokal MySQL database so that it will be populated with some initial data.

NOTE: Make sure that the name of the database/schema that will be created via that script is the same that is provided
in the back-end environment setup in step 3.

4. Next is running the back- and front-end applications. This you can do by running the following commands in two different
   terminals:

```shell
# This will serve the front-end application
nx run vue-app:serve
```

```shell
# This will serve the back-end application
nx run nest-app:serve
```

At this point you'll have both the front- and back-end running and they should be able to work together to show you the
part of the available Race options for when a player creates a new player character in Dungeons and Dragons, 5th edition.

## Icons

A couple of icons are used from FontAwesome library, these are copied from the website and have their own license included
in their own files.

The logo and favicon for the application is created as a Casino icon and created by Freepik, the creator can be found
over on [Flaticon](https://www.flaticon.com/free-icons/casino).
