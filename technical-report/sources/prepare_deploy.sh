#! /bin/sh
cd ./event-planner
echo 'Updating Gemfile.lock file'
bundle lock --add-platform ruby

echo 'Building the frontend'
cd ./frontend
npm run build

cd ..

echo 'Creating zip file'

zip -r ../rails-app.zip * .[^.]* -x frontend/**\*  

echo 'Ready to upload to elastic beanstalk'
