# ideas-creation
Full stack app to capture the ideas 👾
#### Summary
An ideas app for people to capture their ideas. It supports CRUD for the ideas. 
<br />It is mainly for learning purpose only.

#### Features
1. Authentication and Registration of the user
1. CRUD of ideas
2. Installabel PWA (pending)
3. Containerize using Docker (pending)
4. Deployment (pending)

#### Stack 
1. Node and Express
2. React
3. Postgres
4. Typeorm
5. JWT
6. Tailwind CSS

#### Setup
1. Clone the repository
2. Create a new postgres db and update the database details in the ormconfig.js file.
3. Navigate to api directory and run following command<br />
`npm install`
4. Once all the deps are installed, run following command in one command prompt<br />
`npm run watch`<br />
This command runs the typescript compiler in watch mode.
5. Now in another command prompt, run <br />
`npm run dev`<br />
This command runs the nodemon

6. Navigate to ui directory and run the following command<br />
`npm install`
7. Once all the deps are installed, run following command to start the UI server which is a Create React App server<br/>
`npm start`

8. Open the browser, and go to `localhost:3000/register` for signup page.
9. Once signup is done, go to `localhost:3000` and enter the credentials. It should redirect to Home page.

#### Note
Update the JWT_SECRET if you want to use different jwt secret



