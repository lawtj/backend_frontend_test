
There is a python flask backend.

There is also a svelte api route for server functions.

We want to be able to call all of these separately, in both prod and dev, from the svelte frontend. We can manage this with env variables.

Code looks like this:

```
/{import.meta.env.VITE_API_URL}/get-posts
```

In Dev:
    Flask routes: in dev, the VITE_API_URL is localhost:8727, so the url is http://localhost:8727/get-posts
    Svelte api routes: /api

    The Svelte routes will not be replaced, and redirect to the /api route.

In Prod:
    Flask routes: in prod, the VITE_API_URL is the url of the backend, so the url is https://backend.tjl.sh/get-posts
    ** This has to be set in the env file because it is replaced during the build process. **
    Thus, setting the env in the docker compose file will have no effect, because the url has already been replaced during the build process.
    Svelte api routes: /api
