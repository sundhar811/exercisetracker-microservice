# Exercise Tracker REST API

#### A microservice project, part of Free Code Camp's curriculum

### User Stories

1. I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and _id.
2. I can get an array of all users by getting api/exercise/users with the same info as when creating a user.
3. I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. Returned will the the user object with also with the exercise fields added.
4. I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id). Return will be the user object with added array log and count (total exercise count).
5. I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)

## Challenge link:
https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/exercise-tracker

### Sample APIs
#### GET
https://sundhar811-exercisetracker-microservice.glitch.me/api/exercise/log?userId=LHagJY6m&from=2018-03-10&to=2018-09-11&limit=3

https://sundhar811-exercisetracker-microservice.glitch.me/api/exercise/log?userId=LHagJY6m&from=2018-03-10&to=2018-09-11

https://sundhar811-exercisetracker-microservice.glitch.me/api/exercise/log?userId=LHagJY6m&from=2018-08-10&to=2018-09-11

https://sundhar811-exercisetracker-microservice.glitch.me/api/exercise/log?userId=LHagJY6m

https://sundhar811-exercisetracker-microservice.glitch.me/api/exercise/log?userId=LHagJY6m&limit=2

https://sundhar811-exercisetracker-microservice.glitch.me/api/exercise/users

#### POST
https://sundhar811-exercisetracker-microservice.glitch.me/api/exercise/new-user
`{ username: 'abc' }`

https://sundhar811-exercisetracker-microservice.glitch.me/api/exercise/add

`{ 
userId: 'LHagJY6m',
description: 'Description of the exercise', 
duration: 12, 
date: '2017-11-11'
}`