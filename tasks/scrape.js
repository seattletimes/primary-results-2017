var request = require("request");
var fs = require("fs");

module.exports = function(grunt) {

  grunt.registerTask("scrape", function() {
    var done = this.async();
    var url = "https://aqua.kingcounty.gov/elections/2017/aug-primary/results/webresults.csv";
    var oldHeader = "GEMS Contest ID,Contest Sort Seq,District Type,District Type Subheading,District Name,Ballot Title,Ballots Counted for District,Registered Voters for District,Percent Turnout for District,Candidate Sort Seq,Ballot Response,Party Preference,Votes,Percent of Votes";
    var newHeader = "raceID,raceSort,locale,sublocale,district,race,counted,registered,turnout,candidateSort,candidate,party,votes,votePercent";

    request({ url, encoding: "latin1" }, function(err, response, body) {
      var renamed = body.replace(oldHeader, newHeader);
      fs.writeFile("data/results.csv", renamed, done);
    });
  });

};