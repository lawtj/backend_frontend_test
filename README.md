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

### Environment Variables in SvelteKit

SvelteKit provides two main ways to handle environment variables:

1. `$env/static/public` - For public variables available at build time
   - Must be prefixed with `PUBLIC_`
   - Available on both client and server
   - In Docker, these must be provided as build args
   - Cannot be changed after build

2. `$env/static/private` - For private server-only variables available at build time
   - Not prefixed
   - Only available on server
   - In Docker, these must be provided as build args
   - Cannot be changed after build

3. `$env/dynamic/private` - For private server-only variables available at runtime
   - Not prefixed
   - Only available on server
   - Can be provided as regular Docker environment variables
   - Can be changed at runtime

Our configuration uses:
- `PUBLIC_API_CLIENT_URL`: Public static variable for client-side API calls
    - Must be provided at build time
    - Cannot use Docker internal routing (client needs public URL)
- `PUBLIC_PB_CLIENT_URL`: Public static variable for client-side PocketBase calls
    - Must be provided at build time
    - Cannot use Docker internal routing

- `API_SERVER_URL`: Server-side API URL (can be static or dynamic)
    - If static: Must be provided at build time
    - If dynamic: Can be provided as runtime environment variable
    - Can use Docker internal routing (e.g., http://backend:8727)
- `PB_SERVER_URL`: Server-side PocketBase URL (can be static or dynamic)
    - If static: Must be provided at build time
    - If dynamic: Can be provided as runtime environment variable
    - Can use Docker internal routing

### Local Development
- Run `docker compose up` which uses the docker-compose.yml file
- Environment variables are loaded from `.env.local` in the frontend directory
    ```
    PUBLIC_API_CLIENT_URL=http://localhost:8727
    PUBLIC_PB_CLIENT_URL=http://localhost:8081
    API_SERVER_URL=http://backend:8727
    PB_SERVER_URL=http://pb:8081
    ```

### Production
- Run `docker compose -f docker-compose.prod.yml up`
- Public variables must be provided as build args in Dockerfile.frontend and docker-compose.prod.yml
- Server variables can either be:
  1. Provided as build args if using static imports
  2. Provided as runtime environment variables if using dynamic imports
- Example docker-compose.prod.yml values:
    ```
    ARGS:
    - PUBLIC_API_CLIENT_URL #will be entered as https://api.example.com on deployment system
    - PUBLIC_PB_CLIENT_URL #will be entered as https://pb.example.com on deployment system
    - API_SERVER_URL #will be entered as http://backend:8727 on deployment system
    - PB_SERVER_URL #will be entered as http://pb:8081 on deployment system
    ```
- Example Dockerfile.frontend:
    ```
    ARG PUBLIC_API_CLIENT_URL
    ARG PUBLIC_PB_CLIENT_URL
    ARG API_SERVER_URL
    ARG PB_SERVER_URL
    ```

### Instructions
1. Update docker-compose.prod.yml with your domain names
2. Create .env.local in the frontend directory for development
3. Choose between static or dynamic server variables based on your needs:
   - Static: Add as build args in Dockerfile.frontend and docker-compose.prod.yml
   - Dynamic: Add as environment variables in docker-compose.prod.yml
