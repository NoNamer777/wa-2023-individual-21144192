# vue-project

This project is created with Vue 3 in vite. On top of that, this project uses Bootstrap for styling, TypeScript, and SCSS.

---

### To do list:

- Filter on multiple Racial traits
- Add Racial descriptions where ever possible
- Add source books info
- Fix position of the filter btn on smaller devices
- Fix the title of the app
- Add unit tests
- Lazy load the overview.page

---

## Running the application

First, make sure that you've installed the dependencies for the repository, if you've not done this already,
by running the following command in the root of the repository (`./wa-2023-individual-21144192/`):

```shell
npm install
```

Now you need to make a build of the project. This, you can do by running the following command in your terminal, while
in the vue-project directory (`./wa-2023-individual-21144192/projects/vue-project/`):

```shell
npm run vue-project:build
```

If all goes well, in the project structure panel (directories and files), you should find a build output in the root of
the repository under the following path: `dist/vue-project/`.

After that it's only a matter of running Servor by using the following command in the same directory as the previous command
and using the link in the terminal output to open the web application is your browser:

```shell
npm run vue-project:start
```

Alternatively, you can run the command above, and open a browser yourself and navigate to the following address:

http://localhost:4200/

### Availability local private network

By using Servor, the web application is also available on your local network, and thus you can also try it out on other
devices, besides the machine you have cloned the repo to. For the available local private address that the web application
is running on, I advise you to look at the terminal output after you've run the command above to start Servor.

### Running from File Explorer (or Finder)

Because the web application makes use of the `fetch` method, opening the web application by finding the `index.html`
in your File Explorer or Finder, and opening it that way is not advisable, because that will break the application.
