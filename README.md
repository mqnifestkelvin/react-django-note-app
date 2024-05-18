# Getting Started With the Note App App

## Features and Interfaces
**Login Page**: 
This is the page the users see when they got to the domain name `notes.mannieonline.tech`. This presents the user with login form where the user can input their email and their passwords, concluding with a log in button.

**Create an Account**:
If the user doesn't have an account, with this feature, they can create a user account using credentials such as:
{
  First name
  Last name
  user name
  email
  password
  comfirm password
}

When the user is sure of their inputed credentials, they can go ahead and create their account by clicking on register. The user can get to this feature by clickin on the link `Don't Have an Account?`.

**Forgot Password**:
This feature helps users retrieve their account incase they forgot their password. This link can be obtain from the login page where they can click on the link `Forgot Password?`. This feature presents a form where the user inputs their email address to which on click of a password reset link is sent to the users email. On click of the link in the email, the user is redirected to the password reset page where they input their new password and comfirm their password.

**Note List Page**: 
On successful login, this page loads all the users note via API call form the notes database. This also enables the user to get into their notes on click of individual notes to access them.

**Create Note**: This feature navigate the user into a new page, here the user can start writing their notes. When the user is satified with the notes they have created, they can proceed to save the note they have created.

**Save Note**: 
After creating a note they user can proceed to saving their notes by hitting the save button on the top right position of their screen.

**Update Note**:
In a case where by the user is not pleased with their current note, they user can edit already created notes by either adding new content or removing any data that already exist. After the notes has been existed, they can click on save to make the update.

**Delete Notes**: 
If the user doen't have any use for the current note, They can remove the notes from their notes using the delete button. By clicking, the notes are removed and the user will no longer see the notes.

**Log out**: 
When the user is done creating their notes, and is no longer using the app, they can then click on the logout button to deautheticate and leave their notes.

## API End Points
### Authentication Endpoints
#### Obtain Token
URL: /auth/token
Method: POST

Description: Obtain a JWT token by providing valid user credentials.

```
Request Body:
{
    "username": "string",
    "password": "string"
}

Response:
{
    "refresh": "string",
    "access": "string"
}
```

#### Refresh Token
URL: /auth/token/refresh
Method: POST

Description: Refresh the JWT token.

```
Request Body:
{
    "refresh": "string"
}

Response:
{
    "access": "string"
}
```

#### Register User
URL: /auth/user/register
Method: POST

Description: Register a new user.

```
Request Body:
{
    "username": "string",
    "email": "string",
    "password": "string"
}

Response:
{
    "message": "User registered successfully!",
    "data": {
        "username": "string",
        "email": "string"
    },
    "token": "string"
}
```

#### Login User
URL: /auth/user/login
Method: POST

Description: Login a user and obtain an authentication token.

```
Request Body:
{
    "email": "string",
    "password": "string"
}

Response:
{
    "token": "string"
}
```

#### Logout User
URL: /auth/user/logout
Method: GET

Description: Logout the current authenticated user.

```
Response:
{
    "message": "Logout successful."
}
```

#### Password Reset
URL: /auth/user/password-reset
Method: POST

Description: Request a password reset email.

```
Request Body:
{
    "email": "string"
}

Response:
{
    "message": "We have sent you a link to reset your password."
}
```

#### Password Reset Confirmation
URL: /auth/user/password-reset-confirm/<<uidb64>>/<<token>>/
Method: POST

Description: Confirm the password reset with a new password.

```
Request Body:
{
    "password": "string"
}

Response:
{
    "message": "Password has been reset successfully."
}
```

#### Get Current User
URL: /auth/user/me
Method: GET

Description: Retrieve details of the currently authenticated user.

```
Response:
{
    "username": "string",
    "email": "string"
}

Response:
{
    "username": "string",
    "email": "string"
}
```

### Notes Endpoints
#### List/Create Notes
URL: /note/notes/
Method: GET / POST

Description: List all notes for the authenticated user or create a new note.

```
Request Body (Create):
{
    "title": "string",
    "content": "string"
}

Response (List):
[
    {
        "id": 1,
        "title": "string",
        "content": "string",
        "user": "string"
    },
    ...
]

Response (Create):
{
    "id": 1,
    "title": "string",
    "content": "string",
    "user": "string"
}
```

#### Retrieve/Update/Delete Note
URL: /note/notes/<int:pk>/
Method: GET / PUT / DELETE

Description: Retrieve, update, or delete a specific note by ID.

```
Request Body (Update):
{
    "title": "string",
    "content": "string"
}

Response (Retrieve/Update):
{
    "id": 1,
    "title": "string",
    "content": "string",
    "user": "string"
}

Response (Delete):
{
    "message": "Note deleted successfully."
}
```
## Cloning Our Repository into Our Local Machine
To get started with using and testing the project on our local machine, we have to clone the remote repository onto our local repostory, We can get this done by copy and pasting this code to our terminal:

```
https://github.com/mqnifestkelvin/react-django-note-app.git
```

**Note**: If you don't have git installed on your local machine follow the direction below according to the platform you currently make use of
   * For windows, click [here](https://git-scm.com/download/win) to install and get started and start using git. Also for those who are new to using git here is a useful [video](https://www.simplilearn.com/tutorials/git-tutorial/git-installation-on-windows) on how to get started using git for cloning on windows.
   
   * For Linux all you need to do is run the codes below and you are all set:
    
```
sudo apt-get update
```

```
apt-get install git
```

## Creating Our Virtual Environment
This is very important as it helps isolate certain project dependencies from another preventing the overwriting of important dependencies necessary for the proper functioning of various other packages and application. Therefore, getting a virtual environment setup is necessary to get this project up and running as it suppose to. This can be done by copy pasting and running the command below:

```
pip install virtualenv
```

```
virualenv env
```
**Note**: The keyword env could be any word at all, this just depends on you. Although the use of env is just a naming convention

**Note**: Change directory into the location where the virtual environment was created then run the code below:

### For Windows
```
env\Scripts\activate
```

### For Linux
```
source env/bin/activate
```

## Installing Necessary Dependencies
For the application to function as intended, it is important the required dependencies are installed onto the virtual environment we created earlier. To do this we can simple run the code below:

```
pip install -r requirements.txt
```

## Creating a Superuser
This is import for managing the local database the project depends on. For the sake of simplicity and for the sake of the project we will be making use of sqlite. We can create a superuser account by running the command:

```
python manage.py createsuperuser
```

While doing this, this will prompt us to input our name email address and input suitable passwords. You can skip inputing a user name if you prefer to make use of the default name.

**Note**: This makes use of the computer's default name. Input your password and hit enter and you are all set.


## Making Migration 
Our model have already been setup, all we need to do is instanciate it to add structure all we need to do is instanciate it to add structure to our database. We can achieve this by running the following commands.

```
python manage.py makemigrations
```

```
python manage.py migrate
```

## Creating .env File
This file stands in as a link between important pass keys that are essential to the proper functioning of the program. For instance, the app has functionalities which enable sending of OTPs to user email address for authetication. As a result of these functionality, there is a need to conceal the user private information, This is where the `.env` file comes in.

Before we create a `.env` file in the root of the project, we have to import this library into the settings.py file in the CertificateVerification directory. We import the library by pasting the code at the top of the settings.py file:

```
from decouple import config
```

After this we open the `.env` file we created and update the file with the necessary information

```
SECRET_KEY=security_key
DEBUG=True
ALLOWED_HOSTS=your_desired_local_host
CSRF_TRUSTED_ORIGINS=trusted_csrf_trusted_origins
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST_USER=your_desired_email_address
EMAIL_HOST_PASSWORD=your_smtp_password
```

**Note**: It is important to setup our email address to get the application up and running like it ought to. To get our smtp password and **EMAIL_HOST_PASSWORD** get the mailing side of things all setup, we can follow the instructions in the [link](https://drive.google.com/file/d/1qpT1-ttUIz_MqCZnrb8opILXQw1-oXW_/view?usp=share_link).

## Running a Local Instance of the Application
If everything has been properly setup this should spawn a web instance of the certificate verification web application. To get this up and running we need to run the command:

```
python manage.py runserver
```
This will automaticall create a server at 

```
http://127.0.0.1:8000/
```

**Note**: If a brower instance is not automatically started, we can easily copy paste the IP address above to view the running instance.
After we have successfully creaated the server.
