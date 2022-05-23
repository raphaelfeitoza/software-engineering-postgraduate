#! /bin/sh

cd ./event-planner
echo 'Updating Gemfile.lock file'

bundle lock --add-platform ruby

echo 'Creating zip file'

zip ../rails-default.zip -r * .[^.]*

echo 'Ready to upload to elastic beanstalk'
