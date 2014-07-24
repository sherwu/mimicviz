mimicviz
========

Quick Visualization Interface for MimicDB

# INSTALLATION INSTRUCTIONS

Make sure you have Meteor installed:
> curl https://install.meteor.com/ | sh

Next install Meteorite, a Meteor package installer
(this uses npm, which should have been installed with meteor)
> sudo -H npm install -g meteorite

Install the packages that mimicviz uses:
> mrt add iron-router
> mrt add scss
> mrt add font-awesome

Run the Meteor server:
> meteor


# VARIABLES TO CHANGE

The file you'll want to pay attention to is server/server.js

At the top of the file are a bunch of string variables.
- Change writeReadDirectory to the pwd of the file-io folder.

- Change publicImagesDirectory to the pwd of the public/images folder.

- The file names of the intermediate files are listed there too.

- Farther down the file, there are commented out lines alone the lines
  of exec("matlab ...", function(...){...}). To have the server make
  a system call, just uncomment that line and change the string command
  that is passed to it to call the desired script.

- The output image should be in the public/images/ folder (meteor reads
  images from the public folder).


