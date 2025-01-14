# Flask + SvelteKit + PocketBase Application

This application consists of three services that work together:

## Services

### 1. Flask Backend (Python)
- Port: 8727
- Development: Runs with Flask development server
- Production: Runs with Gunicorn
- Purpose: Handles main API endpoints and business logic
- Location: `/backend` directory

### 2. SvelteKit Frontend (TypeScript)
- Port: 3000
- Development: Runs with Vite dev server
- Production: Runs as a Node server
- Features:
  - Server-side API routes for server functions
  - Client-side rendering capabilities
  - TypeScript support
- Location: `/frontend` directory

### 3. PocketBase
- Port: 8081
- Purpose: Provides database and authentication services
- Features:
  - Built-in authentication
  - Admin UI available at http://localhost:8081/_/
- Persistence: Uses Docker volumes for data storage
- Location: Runs from Docker image

## Environment Configuration

There is a python flask backend.

There is also a svelte api route for server functions.

We want to be able to call all of these separately, in both dev and prod, from the svelte frontend. We can manage this with env variables.

### Environment Variables
- `VITE_API_CLIENT_URL`: the url that the CLIENT uses to call the API.
    - we cannot use docker internal routing, because the client does not have access to the host network.
- `VITE_API_SERVER_URL`: the url that the svelte server.ts uses to call the API.
    - we CAN use docker internal routing, because the svelte server.ts is running in the same container as the backend.
    - this is preferable because it avoids a DNS round trip.
- `VITE_PB_SERVER_URL`: the url that the svelte server.ts uses to call the PocketBase server.
- `VITE_PB_CLIENT_URL`: the url that the svelte client uses to call the PocketBase server.

### Local Development
- run `docker compose up` which uses the docker-compose.yml file.
- environment variables are loaded by the vite dev server from the `.env.development` file.
    - VITE_API_CLIENT_URL=http://localhost:8727
    - VITE_API_SERVER_URL=http://backend:8727 #note the use of docker internal routing.

### Production
- run `docker compose -f docker-compose.prod.yml up` which uses the docker-compose.prod.yml file.
- environment variables are hardcoded in the docker-compose.prod.yml file. (in theory we could use a .env.production file, but then you'd have to commit that to the repo so it is available at build time.)
    - VITE_API_CLIENT_URL=https://backend.tjl.sh
    - VITE_API_SERVER_URL=http://backend:8727 #note the use of docker internal routing.

### Instructions
- update the docker-compose-prod.yml file with the correct domain name for your services.
- create .env.development
