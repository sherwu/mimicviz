Session.set("medication-name", "");
Session.set("patient_ids", []);
Session.set("waveform_ids", []);
Session.set("waveform_image_url", "");

Template.home.patient_ids = function() {
  return Session.get("patient_ids");
}

Template.home.waveform_ids = function() {
  return Session.get("waveform_ids");
}

Template.home.waveform_image_url = function() {
  return Session.get("waveform_image_url");
}

Template.home.events = {
  "keypress .medication-name input": function(event) {
    if (event.which == 13) {
      var target = $(event.target);
      var medicationName = target.val();
      target.blur();

      if (medicationName !== Session.get("medication-name")) {
        Session.set("medication-name", medicationName);
        $("div.patient-id, div.waveform-id, div.waveform-image").hide();
        $("div.patient-id td.form-table-cell").removeClass("selected");
        $("div.waveform-id td.form-table-cell").removeClass("selected");

        var medicationName = target.val().trim();
        Meteor.call("processMedicationName", medicationName,
          function(error, result) {
            if(error) {
              console.log("[ERROR] Error on calling " +
                "processMedicationName server method.");
            } else {
              Session.set("patient_ids", result);
            }
          });

        // send medication name input and get patient ids from files

        $("div.patient-id").fadeIn("slow");
      }
    }
  },

  "click .patient-id .form-table-cell": function(event) {
    var target = $(event.target);

    if (!target.hasClass("selected")) {
      $("div.waveform-id, div.waveform-image").hide();
      $("div.waveform-id td.form-table-cell").removeClass("selected");

      $("div.patient-id td.form-table-cell").removeClass("selected");
      target.addClass("selected");

      var patientID = target.html().trim();
      Meteor.call("processPatientID", patientID,
        function(error, result) {
          if (error) {
            console.log("[ERROR] Error on calling " +
              "processPatientID server method.");
          } else {
            Session.set("waveform_ids", result);
          }
        });

      // send patient id and get waveform ids

      $("div.waveform-id").fadeIn("slow");
    }
  },

  "click .waveform-id .form-table-cell": function(event) {
    var target = $(event.target);

    if (!target.hasClass("selected")) {
      $("div.waveform-image").hide();

      $("div.waveform-id td.form-table-cell").removeClass("selected");
      target.addClass("selected");

      var waveformID = target.html().trim();
      Meteor.call("processWaveformID", waveformID,
        function(error, result) {
          if (error) {
            console.log("[ERROR] Error on calling " +
              "processWaveformID server method.");
          } else {
            Session.set("waveform_image_url", result);
          }
        });

      // send waveform id and get waveform image

      $("div.waveform-image").fadeIn("slow");
    }
  },
}
