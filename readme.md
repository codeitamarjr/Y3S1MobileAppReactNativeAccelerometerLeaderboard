# Accelerometer Data Collection App with Leaderboard

## Introduction

The objective of this project is to develop a cloud-connected mobile app to collect and upload accelerometer data and display a leaderboard. The requirements are as follows and both requirements carry equal weightage:

### Authenticate using Firebase1, upload data to Firestore

- [x] Sign up using <student_id>@student.dorset-college.ie (as email) and a password
- [x] After sign up, collect and update details such as name, course, and year in Firestore > StudentID, and allow editing these details later
- [x] Collect and store locally 1000 accelerometer data points
- [x] Once 1000 data points are collected, upload to Firestore > StudentID > accelerometer_data
- [x] Repeat 3 and 4 as long as the app is open and is in the foreground (Don't record when minimized)

### Display Leaderboard

- [ ] Retrieve accelerometer_data of all users and calculate movement score for each user
- [ ] If accelerometer_data is unavailable or not in the correct format or has more than 1000 data points, show a score "N/A".
- [ ] Show recycler view to display leaderboard with columns rank, name and score (use the score for ranking)
- [ ] Refresh every minute, show information: last refreshed (in time ago format3), and refreshing in x seconds
- [ ] Show details of the user when clicked in full screen, allow going back to the leaderboard

#### Data Upload Format Example

Firestore > StudentID >

- name: "Full Name"
- course: "BSc Computer Science"
- year: 3
- accelerometer_data: [{x: float, y: float, z: float}, {x: float, y: float, z: float}, ...upto a max of 1000 datapoints]

#### Note

- 1 To prevent unintended errors in the shared firestore, you should start development with your own firebase configuration and make sure everything works. Once everything works error-free, then you can use the common firebase config and the app will automatically use the same firestore and firebase auth.

- 2 Calculating activity score in Kcal is a complex function, use this formula instead:

movement score = Σ(Σ|x| + Σ|y| + Σ|z|)/n

where,

n is the number of data points (1000 in this project)
(x, y, z) is one accelerometer data point

- 3 Feel free to use your function or an external open-source library to convert timestamps to time ago format.

#### Student ID

Name Itamar junior

ID 23952

#### Special Thanks

[React Native - Documentation](https://reactnative.dev/)
[React Natigation - Documentation](https://reactnavigation.org/)
[Firebase - Documentation](https://firebase.google.com/)
[Expo - Documentation](https://docs.expo.io/)
[Expo - Firebase](https://docs.expo.io/versions/latest/sdk/firebase/)
[Expo - Accelerometer](https://docs.expo.io/versions/latest/sdk/accelerometer/)
[React Native, Firebase v9, authentication and firestore by Born To Code](https://www.youtube.com/watch?v=20TSEoJkg5k&t=1564s)
[User Profile with Firebase Firestore DB in React Native | Social App Tutorial by Pradip Debnath](https://www.youtube.com/watch?v=aFtYsghw-1k&t=1155s)
