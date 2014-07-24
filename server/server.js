var fs, exec;
var writeReadDirectory = "/Users/sherwin/mimicapp/file_io/";
var publicImagesDirectory = "/Users/sherwin/mimicapp/public/media/images/";
var medicationsFileName = "step1-put-medicine.tsv";
var listOfPatientsFileName = "step2-get-listofpatients.tsv";
var patientIDFileName = "step3-put-selectedpatient.tsv";
var listOfWaveformsFileName = "step4-get-patientwfid.tsv";
var waveformIDFileName = "step5-put-selectedpatientwfid.tsv";

Meteor.startup(function() {
  fs = Npm.require("fs");
  exec = Npm.require("child_process").exec;
});

function readTSV(filePath) {
  while (true) {
    if (fs.existsSync(filePath)) {
      var fileContents = fs.readFileSync(filePath).toString();
      var fileLines = fileContents.split("\n");
      for (var i = 0; i < fileLines.length; i++) {
        var fileLine = fileLines[i];
        if (fileLine.substr(0,1) === "%") {
          continue;
        } else {
          return fileLine.split("\t");
        }
      }
    }
  }
}

Meteor.methods({
  processMedicationName: function(medicationName) {
    var fileContents = medicationName;
    var filePath = writeReadDirectory + medicationsFileName;

    fs.writeFileSync(filePath, fileContents);

    // TODO: call the matlab script
    // exec("matlab --nodisplay matlab_script_name", function(err, stdout, sterr) {});

    var patientIDs = readTSV(writeReadDirectory + listOfPatientsFileName);

    return patientIDs;
  },

  processPatientID: function(patientID) {
    var fileContents = patientID;
    var filePath = writeReadDirectory + patientIDFileName;

    fs.writeFileSync(filePath, fileContents);

    // TODO: call the matlab script
    // exec("matlab --nodisplay matlab_script_name", function(err, stdout, sterr) {});

    var waveformIDs = readTSV(writeReadDirectory + listOfWaveformsFileName);
    return waveformIDs;
  },

  processWaveformID: function(waveformID) {
    var fileContents = waveformID;
    var filePath = writeReadDirectory + waveformIDFileName;

    fs.writeFileSync(filePath, fileContents);

    // TODO: call the matlab script
    // exec("matlab --nodisplay matlab_script_name", function(err, stdout, sterr) {});

    var waveformImageURL = "output.jpg";
    return waveformImageURL;
  },
});
