# EventPlanner Rails App

## Back-end 

This app runs on Ruby `3.0.4`;

####  Using [chruby - Changes the current Ruby](https://github.com/postmodern/chruby):

```bash
    chruby 3.0.4

    # To run the app, simply run: 
    rails s
```

## Database 

Locally, the database runs on a `podman machine` ([What is podman?](https://podman.io/whatis.html ))
#### Using [podman-compose](https://github.com/containers/podman-compose) from [../../sources/docker-compose.yml](../../sources/docker-compose.yml):

```bash
podman machine start 
podman-compose up
```

### Seeding the database:

To help testing the app, you could seed the database from the fixtures simply by running: 

```bash
 rails db:seed
```
This will run `rake db:fixtures:load`: [seeds.rb](./db/seeds.rb)

## Deployment instructions:

This prototype uses [Aws Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) and we deploy it uploading the generated _rails-app.zip on the already configured application. 
 - [Guide to setup a rails app on Aws Elastic Beanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ruby-rails-tutorial.html) 
 - To regenerate the assets to deploy, run [prepare_deploy.sh](../prepare_deploy.sh). This will create:
    - rails-app.zip : the rails app
    -  build: the react build

The front-end is deployed directly on [Amazon S3](https://aws.amazon.com/s3/)
 - [Hosting a static website using Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
