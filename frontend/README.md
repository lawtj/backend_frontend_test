
There is a python flask backend.

There is also a svelte api route for server functions.

We want to be able to call all of these separately, in both dev and prod, from the svelte frontend. We can manage this with env variables.

Env variables:
- VITE_API_URL: the url that the CLIENT uses to call the API.
    - we cannot use docker internal routing, because the client does not have access to the host network.
- VITE_BACKEND_URL: the url that the svelte server.ts uses to call the API.
    - we CAN use docker internal routing, because the svelte server.ts is running in the same container as the backend.
    - this is preferable because it avoids a DNS round trip.

Local dev environment:
- run `docker compose up` which uses the docker-compose.yml file.
- environment variables are loaded by the vite dev server from the `.env.development` file.
    - VITE_API_URL=http://localhost:8727
    - VITE_BACKEND_URL=http://backend:8727 #note the use of docker internal routing.

Prod environment:
- run `docker compose -f docker-compose.prod.yml up` which uses the docker-compose.prod.yml file.
- environment variables are hardcoded in the docker-compose.prod.yml file. (in theory we could use a .env.production file, but then you'd have to commit that to the repo so it is available at build time.)
    - VITE_API_URL=https://backend.tjl.sh
    - VITE_BACKEND_URL=http://backend:8727 #note the use of docker internal routing.

