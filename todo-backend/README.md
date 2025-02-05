# Todo Backend

This project contains the backend logic of a Todo app. It is made solely for learning purposes to understand how TypeScript, Prisma, and Zod are used.

## Technologies Used

- **Express**
- **TypeScript**
- **Zod**
- **Prisma**
- **Database:** PostgreSQL

## Prerequisites

To run this project, you need a PostgreSQL connection string, either running locally or in the cloud.

### For Cloud Users

1. Go to [Neon DB](https://neon.tech/).
2. Log in.
3. Copy your connection string.

### For Local Users

#### Install PostgreSQL Locally
1. Install PostgreSQL and create a connection string:
   ```plaintext
   postgres://<username>:<password>@localhost:<port>/<database>
   ```

#### Using Docker
1. Install the PostgreSQL Docker image from Docker Hub.
2. Run the container with the following command:
   ```bash
   docker run -e POSTGRES_PASSWORD=<password> -d -p 5432:5432 postgres
   ```
3. Alternatively, refer to this [Docker guide](https://projects.100xdevs.com/tracks/docker-easy/docker-1).

## Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/lakshay-tiwari/kitty-playground.git
cd todo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Database
- Obtain your PostgreSQL connection string.
- Enter this connection string in the `url` section of `prisma/schema.prisma`.

### 4. Run Database Migrations
```bash
npx prisma migrate dev --name <migration_name>
```

### 5. Generate Prisma Client
```bash
npx prisma generate
```

### 6. Start the Development Server
```bash
npm run dev
```

## Building the Project
To compile the project and generate JavaScript code in the `dist` folder:
```bash
npm run build
```

Now you are ready to go! 🚀

