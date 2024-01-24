Added features:

### MonoRepo(TurboRepo):

TurboRepo setup:
- Created TurboRepo  two work environments (Frontend/Backend).

### Backend(NestJS):

1. PrismaORM and DatabaseModule for database connection:
   - Created a Module that uses Prisma to handle the database connection inside NestJS.

2. NotesModule for handling notes CRUD:
   - Created CRUD notes routes that sync the frontend data with the database, also created a Table "notes" in the database.

3. UserModule for handle user creation/register;
   - Created a Module for handling user creation/register, also created a Table "user" in the database.

4. AuthModule for handling routes authentication:
   - Created a Modula that uses JWT to sign and verify tokens, also added auth check in NotesController routes.
  

### Frontend(Next.JS):

1. Landing page:
   - Created a landing page at "index.tsx" file.

3. Using context:
   - Created context state "User" to save the token in a way that it will be available in all the app.
   - Created context state "Notes" to persist the user's notes array. 

4. Login/Register page, using Form component:
   - Created a component "Form" for handling frontend data and get the token from the backend.
   - Created pages for handling auth.
 
4. Dashboard page, using Header/NewNote/Note/ColorBar components:
   - Created Header component for the note searching feature. 
   - Created NewNote component for the note creation feature.
   - Created Note/ColorBar components for the notes list feature.
   - Created a dashboard page based on the [layout mockup](https://www.figma.com/file/sQrUVHTlyogq3qGdkqGTXN/mockup?node-id=7%3A2&t=ANTOTiqjqGWYuoUr-0).

5. Mobile css properties:
   - Adjusted CSS properties for devices with less then 768px of width.
