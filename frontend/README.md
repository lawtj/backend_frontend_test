
There is a python flask backend.

There is also a svelte api route for server functions.

We want to be able to call all of these separately, in both dev and prod, from the svelte frontend. We can manage this with env variables.

Env variables:
- VITE_API_URL: the url that the FRONTEND uses to call the API. this gets dynamically replaced at build time.
- VITE_BACKEND_URL: the url that the svelte server.ts uses to call the API.

Local dev environment:
- run `docker compose up` which uses the docker-compose.yml file.
- environment variables are loaded by the vite dev server from the `.env.development` file.
    - VITE_API_URL=http://localhost:8727
    - VITE_BACKEND_URL=http://localhost:8727
