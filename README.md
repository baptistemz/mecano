# README

This README will document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

You may install ruby > v2.3 to run this app locally.
If you work on windows you may install a Linux subset to get rails running properly. Maybe you could read this tutorial by gorails : https://gorails.com/setup/windows/10.

* System dependencies



* Configuration

* Database creation

To initialize the database, run ```$rails db:create```

* Database initialization

Then migrate its content with ```$rails db:migrate```


* How to run the test suite

For the moment only the API is provides tests. A simple $rspec command will run all the tests. Before that don't forget to mirate the test database with the following command : ```$rails db:migrate RAILS_ENV=test```

* Services (job queues, cache servers, search engines, etc.)

* Deployment

This app is deployed on Heroku. For a good deployment don't forget to pass the environment vars added to your application.yml to heroku. This can be done with the command ```$ figaro heroku:set -e production```or directly in the heroku dashboard. If you added changes to your local database, run ```$heroku run rails db:migrate``` after deploying to get these changes live in production.
