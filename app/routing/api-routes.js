
var friends = require('../data/friends.js');

module.exports = function (app) {
    app.get('/api/friends', function (req,res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req,res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference : 1000
        };
        console.log(req.body);

        // Taking the users results from the survey

        var userData = req.body;
        var userScore = userData.scores;

        // This var will calculate the difference between the users scores and the scores of the each user in the database

        var totalDifference = 0;

        // Here we loop through all the friend possibilities in the database


        for (var i = 0; i < friends.length; i++ ){
            console.log(friends[i].name);
            totalDifference  = 0;

            // we then loop through all the scores of each friend
            for (var j = 0; j<friends[i].scores[i]; j++ ){
                totalDifference += Math.abs(parseInt(userScore[j]) - parseInt(friends[i].scores[j]));

                // if the sum of difference is less then the difference of the current "best match"
                if(totalDifference <= bestMatch.friendDifference){
                    //reset the best match to bt the new friend
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference  = totalDifference;
                }
            }

        }
        // Save the user data to the database
        friends.push(userData);

        // Return JSON with the user's bestmatch'

        res.json(bestMatch);
    });
};