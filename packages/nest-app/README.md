# nest-app

This Nest.js back-end application provides the data to the Vue front-end application which itself gets from a MySQL data,
once that is set up correctly.

# Setting up and running the application

Instructions on how to get this project up and running you can find in the [README](../../README.md) in the root of
the repository.

# OpenAPI - Swagger

Once the application is up and running, you should be able to find the OpenAPI specifications for the Rest API at the
following location (assuming you've left the back-end host and port environment variables on their default values):

http://localhost:8080/

The specification file is also generated as part of the build output, which you can find in JSON format under the build
output location, which you can find here: `/dist/nest-app`.
