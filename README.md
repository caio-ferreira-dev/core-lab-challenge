### Core Lab Challenge -  To-do List
This is the repo of a To-do List app coded as a challenge provided by [CoreLab](https://www.corelab.com.br/pt)

### Technologies
The list bellow shows the techs that was used in the app:

1. NodeJS 18.17.1
2. MySQL 8.0.34
3. NestJS 10.0.0
4. NextJS 14.0.1
5. TurboRepo 1.10.16


### Setup
*This app uses MySQL as the database(But it's using PrismaORM so you can change the database type/connection string in schema.prisma file if you wish to use another database, for more info check the [Prisma](https://www.prisma.io/docs/orm/reference/connection-urls) docs).*

Clone/Fork the repo and make sure you are in the folder "app" in your terminal before running the commands, after that follow the next steps:

1. Run ```npm i```, to install all the dependencies

2. Create a ```.env``` file, add a variable 
```
DATABASE_URL="mysql://{dbUser}:{dbPassword}@{host}:{port}/corelab_todo"
JWT_SECRET="{secretKey}"
``` 
make sure to modify what's inside "{}" with the respective values before the next step

3. Setup Prisma: 
```
npx prisma db push
npx prisma generate
```

4. Build the app:
```
npm run build
npm run start
``` 

5. Type [localhost:3000](http://localhost:3000) in your browser and enjoy the app 🚀