# HSR-management
HSR (Honkai Star Rail) management app made with Express, EJS and PostgreSQL.

[View it here.](https://hsr-management.onrender.com/) Hosted on Render and Neon.

### Run locally

Copy the `.env.example` file to create your own `.env` file. Also check the `db/config.js` file. `NODE_ENV` should be set to `development`.

Then run the following commands:

```bash
npm install
npm run populate
node app.js
```

The app should be running on `http://localhost:3000`.
