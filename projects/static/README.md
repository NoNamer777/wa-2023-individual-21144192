# DnD 5e - Races Collection (Static)

This is the static web application which is made by only using vanilla JavaScript, HTML and CSS.

---

## Running the application

First, make sure that you've installed the dependencies for the repository, if you've not done this already,
by running the following command in the root of the repository (`./wa-2023-individual-21144192/`):

```shell
npm install
```

After that it's only a matter of running Servor by using the following command in the directory of the static web application
(`./wa-2023-individual-21144192/projects/static/`) and using the link in the terminal output to open the web application
is your browser:

```shell
npm run start:static
```

Alternatively, you can run the command above, and open a browser yourself and navigate to the following address:

http://localhost:4200/

### Availability local private network

By using Servor, the web application is also available on your local network, and thus you can also try it out on other
devices, besides the machine you have cloned the repo to. For the available local private address that the web application
is running on, I advise you to look at the terminal output after you've run the command above to start Servor.

### Running from File Explorer (or Finder)

Because the web application is making use of the `fetch` method, opening the web application by finding the `index.html`
in your File Explorer or Finder, and opening it that way is not advisable, because that will break the application.  
