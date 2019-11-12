This project is based on Express and NodeJs [Express JS](https://expressjs.com/es/) in the Backend and React in the Frontend.  [Create React App](https://github.com/facebook/create-react-app).
The database used is [Sqlite3](https://www.sqlite.org/index.html)

## Installation

To run this application it is necessary to open a terminal and execute the following:  

### `npm install`

Install all the necessary modules to run the application.

### `npm start`

Runs the Backend.<br />
Open [http://localhost:4000](http://localhost:4000).

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

In the package.json file you can see the dependencies used.

The server will respond to the following requests:

### `(Create user)` 
### `POST http://localhost:4000/signup` 
    It is necessary to send a Json with the following format:
    {
      "name": name,
      "email": email,
      "password": password
    }

    If the data is correct, it will save it in the database.
    
    Error 403: The email already exists


(View user)
-GET http://localhost:4000/me 
    
    As well as a Json Token (JWT authentication) in the header x-access-token
    (This Token is provided at the time of login and lasts one day)
    
    In addition the user must be authenticated on the server

    If the data is correct it will show the data saved in the DB.



(Login)
POST http://localhost:4000/signin 
    It is necessary to send a Json with the following format:
    {
      "email": email,
      "password": password
    }

    Verifies username and password validity and returns a JWT when correct 

    Error 403: The email already exists.
    Error 401: User/password combination is incorrect.

(See all users in the DB) -for practical purposes only
-GET http://localhost:4000/users 
    It will show all the data saved in the DB from the browser. 


## FRONTEND     

Then in a new terminal it is necessary to execute the following scripts:

### `cd frontend`

Change the directory to the frontend folder

### `npm install`

Install all the necessary modules to run the application.

### `npm start`

Runs the Frontend.<br />
Open [http://localhost:3000](http://localhost:4000).

The application allows you to create new users, register in the application and manage users (for this you need to be authenticated).