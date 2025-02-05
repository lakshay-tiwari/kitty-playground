todo backend 
------------
this project contains the backend logic of todo app. It is make only for learning purpose to know how typescript , prisma , zod used 

technology used
- express 
- typescript
- zod 
- prisma 
- database: postgres


to run this you have postgres connection string either running locally or in cloud

for cloud user
----
go to neon db 
login 
copy connection string

for running locally
---
- install postgres and make connection string according to this
postgres://<username>:<password>@localhost:port/database

or use docker 
install postges docker image from dockerhub 
run the container by doing this 
docker run -e POSTGRES_PASSWORD=<password> -d -p 5432:5432 postgres
or refer to this -> Actional docker link-> https://projects.100xdevs.com/tracks/docker-easy/docker-1


follow these commands
---bash 
git clone github@.com
cd todo 
npm install 

now you have connection string 
enter this connection string in url section of prisma/schema.prisma

then npx --bash
prima migrate dev --name <anything>
then do
 --bash npx prisma generate 

 Now you good to go 
 do this to run 
 -bash
 -- npm run dev 


 to build the project in dist folder (creating javascript code)
 -- do this 
 --bash 
 npm run build

