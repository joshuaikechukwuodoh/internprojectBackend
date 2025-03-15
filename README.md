<h1 align="center">Welcome to backend code for our internship project 👋</h1>

## Written below is instruction to integrate AI chat functionality to the frontend part of the App

## First, you must signup or login on the frontend

## Clone the repo

```sh
https://github.com/PixelFlows2/intern-project-backend.git
```

## Install the dependencies

```sh
npm install
```

Before you run the backend, Create .env file and add the following values to .env file. You need to replace MONGODB_ATLAS API key by your own API key. Other .env values are provided. If you don't have API key for OpenAI, please visit https://platform.openai.com/api-keys and create API key.

```sh
OPENAI_API_KEY=open_ai_api_key
MONGODB_ATLAS="your mongodb atlas api"
PORT=5000
TOKEN_SECRET="f7184f99b71a947afe96623b9811e04c455955c734ec1e7ddb917734e03128f2126b101e60d61e4ad7
245295178378bf44fbc1e4b57092ba0e82faa73a76379c";
NODE_ENV="development"
FRONTEND_PORT="http://localhost:5173"
```

Run the Application by Navigating to 'intern-project-backend' folder then write the following

```sh
npm start
```

Check if the express server is working by visiting the following URL. If your App is working, you will get success message.

```sh
http://localhost:5000/
```

## API endpoints to have conversation with AI and retrieve conversations are given below

NB: The AI model used here is chatgpt-turbo-3.5 as it has generous free version but in the future another AI model from Hugging face will be used.

see the AI_CHAT model schema in 'models' folder to have full understanding of the schema used.

## Start new chat with AI

NB: when you make request to the backend, make sure to send cookies together with the request. Otherwise, user authentication will fail.

```sh
URL: http://localhost:5000/chat/chat_with_ai

Request Method: "POST"

Request Body should have chat_ID (string) and user_question (string).

NB: To start a new chat with AI, 'chat_ID' should be empty string.

Example of request body to be sent from frontend to the backend: {
  chat_ID: "",
  user_question: "Tell me about Typescript", }

Successful  Response from AI contains the following object:
 {
  success: true,
  message: "Successful response from AI",
  chat_ID: "679f8cd15c74af5ea1131154",
  chat_title: "Typed superset of JavaScript.",
  AI_response: "TypeScript is an open-source programming language developed and maintained by
  Microsoft. It is a superset of JavaScript that adds static typing to the language, allowing
  developers to catch errors and enforce type safety at compile time. TypeScript code is transpiled
  into plain JavaScript code that can be run in any browser or JavaScript runtime....",
}

```

## To continue the conversation with AI

NB: when you make request to the backend, make sure to send cookies together with the request. Otherwise, user authentication will fail.

```sh
URL: http://localhost:5000/chat/chat_with_ai

Request Method: "POST"

Request Body should have chat_ID (string) and user_question (string).

NB: To continue the conversation with AI, assign value to the  'chat_ID'. You get the 'chat_ID'
from the initial conversation.

For example, chat_ID: "679f8cd15c74af5ea1131154"

Example of request body to be sent from frontend to the backend: {
  chat_ID: "679f8cd15c74af5ea1131154",
  user_question: "Tell me about C#", }

Successful  Response from AI contains the following object: {
  success: true,
  message: "Successful response from AI",
  chat_ID: "679f8cd15c74af5ea1131154",
  chat_title: "Typed superset of JavaScript.",
  AI_response: ""C# (pronounced as "C sharp") is a modern, general purpose, object-oriented
  programming language developed by Microsoft as part of its .NET framework. C# was created by
  Anders Hejlsberg and his team during the early 2000s and is influenced by C++, Java, and other
  programming languages....", }

```

## Fetch all previous conversations with AI

NB: when you make request to the backend, make sure to send cookies together with the request. Otherwise, user authentication will fail.

```sh
URL: http://localhost:5000/chat/previous_chats

Request Method: "GET"

You don't need to send anything from frontend to the backend to fetch previous conversations.
It will automatically access user_ID from the jason_web_token in the browser cookies.


Successful  Response from AI contains the following object:
 { success: true, allChats: [all_chats_stored_in_array] }

```

## Fetch one conversation

NB: when you make request to the backend, make sure to send cookies together with the request. Otherwise, user authentication will fail.

```sh
URL: http://localhost:5000/chat/find_chat/:chat_ID

Request Method: "GET"
Request Body should have chat_ID (string).

 For example, http://localhost:5000/chat/find_chat/:679f8cd15c74af5ea1131154


Successful  Response from AI contains the following object: { success: true, chat: getChatByID,}

```

## Written below is instruction to perform Authentication and authorization and integrate the backend with the frontend part of the App

## First Clone the repo

```sh
https://github.com/PixelFlows2/intern-project-backend.git
```

## Install the dependencies

```sh
npm install
```

Before you run the backend, Create .env file and add the following values to .env file. You need to replace MONGODB_ATLAS API key by your own API key. Other .env values are provided.

```sh
MONGODB_ATLAS="your mongodb atlas api"
PORT=5000
TOKEN_SECRET="f7184f99b71a947afe96623b9811e04c455955c734ec1e7ddb917734e03128f2126b101e60d61e4ad7245295178378bf44fbc1e4b57092ba0e82faa73a76379c";
NODE_ENV="development"
FRONTEND_PORT="http://localhost:5173"
```

Run the Application. Navigate to the 'intern-project-backend' folder then write the following

```sh
npm start
```

Check if the express server is working by visiting the following URL. If your App is working, you will get success message.

```sh
http://localhost:5000/
```

## API endpoints to create, login, logout and authorize users are given below.

## Create new user

NB: passport library with passport-jwt is used for user authentication and authorization. We use Json web Token which will be automatically stored in the browser cookies under the name "internship" whenever user signup or Login is successful.

```sh
URL: http://localhost:5000/user/create_user

Request Method: "POST"

Request Body should have username (string), email (string) and password (string). Example of request body to be sent from frontend to the backend: {
  username: "pixelflow",
  email: "pixelflow@gmail.com",
  password: "ABCabc@1234"
}

Successful Signup Response contains the following object:
 {
  success: true,
  message: "Signup Successful!",
  user: { username:"string", email:"string", password:"string" },
}

```

## Login user

Json web Token will be automatically stored in the browser cookies under the name "internship" when the user login is successful.

```sh
URL: http://localhost:5000/user/login_user

Request Method: "POST"

Request Body should have only  email  and password. Example of request body to be sent from frontend to the backend:
{
  email: "pixelflow@gmail.com",
  password: "ABCabc@1234"
}

Successful Login Response  contains the following object:
{
  success: true,
  message: "Login Successful!",
  user: { username:"string", email:"string", password:"string" },
}
```

## Logout user

Json web Token will be removed from the browser-cookies user Logout is successful.

```sh
URL: http://localhost:5000/user/logout_user

Request Method: "GET"

Successful Logout Response contains the following object:
{
success: true, message: "Logout successful",
}
```

## To grant Access to protected routes (example - Dashboard)

Json web Token should be sent from browser-cookies to the backend whenever user authorization is required to give access to protected routes (Dashboard).

```sh
URL: http://localhost:5000/user/protected_route

Request Method: "GET"

Successful authorization Response contains the following object:
{
success: true,
message: "User successfully authenticated! You can access your dashboard",
}
```

## API endpoints to get moods
```sh
We have 50 questions in our MoodQuestion.json file. The format of the json file is:
  {
      "id": 13,
      "question": "How often did you feel relaxed today?",
      "type": "scale",
      "scale": [1, 2, 3, 4, 5],
      "labels": ["Not at all", "Slightly", "Moderately", "Very", "Extremely"]
  }
You can display the labels for the user to choose their answers from.
```
## Get mood questions

```sh
URL: http://localhost:5000/mood/mood_questions

Request Method: "GET"

This will randomly generate 5 questions from the MoodQuestion.json file per api call.

NB: User must be authenticated

Successfull response will return a json object with 5 questions similar to this below:
[
  {
    "id": 42,
    "question": "Did you feel physically healthy today?",
    "type": "scale",
    "scale": [
      1,
      2,
      3,
      4,
      5
    ],
    "labels": [
      "Yes",
      "No"
    ]
  },
  {
    "id": 2,
    "question": "Did you feel stressed today?",
    "type": "scale",
    "scale": [
      1,
      2,
      3,
      4,
      5
    ],
    "labels": [
      "Yes",
      "No"
    ]
  },
  ...
]

```

## Submit mood 

```sh
URL: http://localhost:5000/mood/submit_mood

Request Method: "POST"

Request Body will have 
```

## Get mood summary
```sh
URL: http://localhost:5000/mood/mood_summary

Request Method: "GET"

My main aim here is to display the average of the user's mood for the week with the following result ignore the others and send just the averageMood to the user.

{
  "averageMood": "0.00",
  "totalEntries": 0,
  "recentEntries": []
}

```
## Author

👤 **keyr** 
👤 **Victory Oseiwe**

---
