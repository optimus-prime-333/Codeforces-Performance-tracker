const express = require("express");
const axios = require("axios");
const estimatePerformance = require("./services/performance");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

/*
|--------------------------------------------------------------------------
| Codeforces Rating Colors
|--------------------------------------------------------------------------
*/

function getColor(rating) {
    if (rating >= 3000) return "legendary";
    if (rating >= 2400) return "red";      // Grandmaster
    if (rating >= 2100) return "orange";   // Master
    if (rating >= 1900) return "pink";   // Candidate Master
    if (rating >= 1600) return "blue";     // Expert
    if (rating >= 1400) return "cyan";     // Specialist
    if (rating >= 1200) return "green";    // Pupil

    return "gray";                         // Newbie
}

/*
|--------------------------------------------------------------------------
| Home Page
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
    res.render("home");
});
app.get("/profile", (req, res) => {
    res.redirect("/");
});
/*
|--------------------------------------------------------------------------
| Profile Page
|--------------------------------------------------------------------------
*/

app.post("/profile", async (req, res) => {
    try {
        const handle = req.body.handle.trim();

        /*
        |--------------------------------------------------------------------------
        | Fetch User Info
        |--------------------------------------------------------------------------
        */

        const userResponse = await axios.get(
            `https://codeforces.com/api/user.info?handles=${handle}`
        );

        /*
        |--------------------------------------------------------------------------
        | Fetch Contest History
        |--------------------------------------------------------------------------
        */

        const ratingResponse = await axios.get(
            `https://codeforces.com/api/user.rating?handle=${handle}`
        );

        const user = userResponse.data.result[0];

        /*
        |--------------------------------------------------------------------------
        | Latest Contest First
        |--------------------------------------------------------------------------
        */

       const contests = ratingResponse.data.result
    .reverse()
    .map((contest) => {

        const performance = estimatePerformance(
            contest.oldRating,
            contest.newRating
        );

        const ratingChange =
            contest.newRating - contest.oldRating;

        return {
            ...contest,

            ratingChange,

            performance,

            oldColor: getColor(
                contest.oldRating
            ),

            newColor: getColor(
                contest.newRating
            ),

            perfColor: getColor(
                performance
            )
        };
    });

       res.render("profile", {
    user,
    contests,

    ratingColor: getColor(
        user.rating || 0
    ),

    maxRatingColor: getColor(
        user.maxRating || 0
    )
});

    } catch (error) {

        console.error(error.message);

        res.send(`
            <h1>User Not Found</h1>
            <a href="/">Go Back</a>
        `);
    }
});

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});
