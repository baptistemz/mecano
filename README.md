# README

This README will document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

## Ruby version

You may install ruby v > 2.3 and rails v > 5.0 to run this app locally.
If you work on windows you may install a Linux subset to get rails running properly. Maybe you could read this tutorial by gorails : https://gorails.com/setup/windows/10.
Or this one (using Cloud 9) by lewagon: https://c9.io/

## Ruby installation on Mac OSX

First we need to clean up any previous Ruby installation you might have:

```
rvm implode && sudo rm -rf ~/.rvm
# If you got "zsh: command not found: rvm", carry on. It means `rvm` is not
# on your computer, that's what we want!
sudo rm -rf $HOME/.rbenv /usr/local/rbenv /opt/rbenv /usr/local/opt/rbenv
```

Now let's get rbenv and ruby-build packages from Homebrew, they'll be useful.

```
brew uninstall --force rbenv ruby-build
unset RBENV_ROOT && exec zsh
brew install rbenv ruby-build && exec zsh
```

Now, you are ready to install the latest ruby version, and set it as the default version.

Run this command, it will take a while (5-10 minutes)

```rbenv install 2.3.3```

Once the ruby installation is done, run this command tell the system to use the 2.3.3 version by default.

```rbenv global 2.3.3```

Then restart your Terminal.

```ruby -v```

You should see something starting with ```ruby 2.3.3p```.

## Ruby installation on Linux

First we need to clean up any previous Ruby installation you might have:

```
rvm implode && sudo rm -rf ~/.rvm
# If you got "zsh: command not found: rvm", carry on. It means `rvm` is not
# on your computer, that's what we want!

rm -rf ~/.rbenv
```

Then in the terminal, run:

```
sudo apt-get install -y build-essential tklib zlib1g-dev libssl-dev libffi-dev libxml2 libxml2-dev libxslt1-dev libreadline-dev
sudo apt-get clean
sudo mkdir -p /usr/local/opt && sudo chown `whoami`:`whoami` $_
git clone https://github.com/rbenv/rbenv.git /usr/local/opt/rbenv
git clone https://github.com/rbenv/ruby-build.git /usr/local/opt/rbenv/plugins/ruby-build
exec zsh
```
You should get a warning in the prompt, just ignore it from now (Ruby is not installed yet).

Now, you are ready to install the latest ruby version, and set it as the default version.

Run this command, it will take a while (5-10 minutes)

```
rbenv install 2.3.3
Once the ruby installation is done, run this command tell the system to use the 2.3.3 version by default.
```

```rbenv global 2.3.3```
Then restart your Terminal.

```ruby -v```
You should see something starting with ```ruby 2.3.3p```


## Postgresql installation

### on Mac OSX

```bash
brew install postgresql
brew services start postgresql
```
Once you've done that, let's check if it worked:

```psql -d postgres```
If you enter a new prompt like this one, you're good!

```bash
psql (9.5.3)
Type "help" for help.

postgres=#
```
To quit it, type ```\q``` then ```Enter```.


### on Linux

```
sudo apt-get install -y postgresql postgresql-contrib libpq-dev build-essential
echo `whoami` > /tmp/caller
sudo su - postgres
psql --command "CREATE ROLE `cat /tmp/caller` LOGIN createdb;"
exit
rm -f /tmp/caller
```

## Configuration

## Database initialization
To create your local database, run ```$rails db:create```
Then migrate its content with ```$rails db:migrate```


## How to run the app locally


The command ```$foreman start -f Procfile.dev```will start webpack and the rails server. The visit the app on ```http://localhost:3000```.


## How to run the test suite


For the moment only the API provides tests.
These tests are written with rspec. A simple ```$rspec``` command will run all the tests. Before that, don't forget to mirate the test database with the following command : ```$rails db:migrate RAILS_ENV=test```.
If you want to run only specific tests run ```$rspec path_to_test_file```.

## Services (job queues, cache servers, search engines, etc.)

## Deployment

This app is deployed on Heroku. For a good deployment don't forget to pass the environment vars added to your application.yml to heroku. This can be done with the command ```$ figaro heroku:set -e production```or directly in the heroku dashboard. If you added changes to your local database, run ```$heroku run rails db:migrate``` after deploying to get these changes live in production.


## Useful API endpoints
All the API endpoints only accept JSON data.

### Non-protected endpoints

### Auth endpoints

The authentications endpoints will respond with "client", "uid", "access-token" and "expiry" headers. Your requests to protected endpoints must have these headers to prove the user who is making the requests is well authenticated. After each request to a protected endpoint, the "access-token" sent in response will change. So the default headers of the client must be updated between each of these requests.

* ```POST /api/auth/sign_in``` Creates a new session. Accepts ```email:string``` and ```password:string``` params.
* ```POST /api/auth``` Creates (register) a new user. Accepts ```first_name:string```, ```last_name:string```, ```email:string```, ```password:string```, ```password_confirmation:string``` params.
* ```GET /api/auth/validate_token``` checks your headers and responds with the user info and a new token in headers if they are correct.
* ```DELETE /api/auth/sign_out``` logs your user out.

### Protected endpoints
All these API endpoints are protected by authentication. The app user must be logged in and request the API with the right authenticated headers.
* ```POST /api/mecano_profiles``` creates a mecano_profile belonging to the current user. Accepts ```pro:boolean```,```price:integer```, ```company_name:string```, ```address:string```, ```city:string```, ```country:string```, ```mobile:boolean``` and ```radius:integer``` params.
* ```POST /api/mecano_profiles/:mecano_profile_id/domains/register_domains``` must be called with a list of domains. ```[{ kind:string, name:string }]```, the "kind" of each domain must be either "car_make" of "technical_skill".
* ```POST /api/mecano_profiles/:mecano_profile_id/domains/update_technical_domains``` deletes the domains of the current user's mecano_profile which kind is "technical_skill" and rewrites them. Call this endpoint with the same format than for the domain creation. All the sumbmitted domains kind value must be "technical_skill".
* ```POST /api/mecano_profiles/:mecano_profile_id/domains/update_car_domains``` deletes the domains of the current user's mecano_profile which kind is "car_make" and rewrites them. Call this endpoint with the same format than for the domain creation. All the sumbmitted domains kind value must be "car_make".
* ```GET /api/mecano_profiles/:id``` responds with the mecano profile and all its domains.
* ```GET /api/mecano_profiles/:mecano_profile_id/domains``` responds with all the domains of a mecano.
* ```GET  /api/vehicles``` responds with the current user's registered vehicles.
* ```POST /api/vehicles``` creates a new vehicle belonging to the current user. Accepts ```brand:string```, ```model:string``` and ```year:integer``` as params.
* ```DELETE /api/vehicles/:id``` deletes the vehicle only if it belongs to the current user making the request.
