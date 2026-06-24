# Codeforces Performance Tracker

A modern Node.js and Express.js web application that displays a Codeforces user's contest history and estimated performance for each contest.

## Features

* Search any Codeforces handle
* View contest history from newest to oldest
* Display old rating and new rating
* Show rating change for every contest
* Estimated performance calculation
* Actual Codeforces rating colors

### Rating Colors

* Gray → Newbie
* Green → Pupil
* Cyan → Specialist
* Blue → Expert
* Pink → Candidate Master
* Orange → Master
* Red → Grandmaster
* Legendary → Legendary Grandmaster

## Tech Stack

* Node.js
* Express.js
* EJS
* Axios
* Codeforces API

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/codeforces-performance-tracker.git
```

Move into the project directory:

```bash
cd codeforces-performance-tracker
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Open your browser:

```text
http://localhost:3000
```

## Project Structure

```text
├── public/
│   └── style.css
├── services/
│   └── performance.js
├── views/
│   ├── home.ejs
│   └── profile.ejs
├── server.js
├── package.json
└── README.md
```

## How It Works

1. Enter a Codeforces handle.
2. The application fetches user information using the Codeforces API.
3. Contest rating history is retrieved.
4. Estimated performance is calculated for each contest.
5. Results are displayed with official Codeforces rating colors.

## Future Improvements

* Live contest performance tracking
* Rating graphs and analytics
* Contest filtering
* Problem-solving statistics
* Monthly performance reports

 