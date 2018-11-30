# Express auth app
ITMO 3rd sem task

## [heroku demo](https://aqueous-tundra-60802.herokuapp.com)

## run locally
1. Create new Facebook app
2. Get app id & secret
3. Run `CLIENT_ID=__YOUR_FB_APP_ID__ CLIENT_SECRET=__YOUR_FB_APP_SECRET__ node index.js`
4. Open `localhost:4321` (port may be specified with PORT env var)

## routes
- `/` & `/author` – comply to z7a checks
- `/hello` – accessible everywhere
- `/login` – redirects to `/users` after successful FB ogin
- `/login/check` – displays auth messages
- `/logout` – accessible only after successful login
- `/users` – accessible only after successful login

