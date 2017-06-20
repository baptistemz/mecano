# README

This README will document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

## Ruby version

You may install ruby v > 2.3 and rails v > 5.0 to run this app locally.
If you work on windows you may install a Linux subset to get rails running properly. Maybe you could read this tutorial by gorails : https://gorails.com/setup/windows/10.

## Ruby installation on Mac OSX

First we need to clean up any previous Ruby installation you might have:

```rvm implode && sudo rm -rf ~/.rvm
# If you got "zsh: command not found: rvm", carry on. It means `rvm` is not
# on your computer, that's what we want!
sudo rm -rf $HOME/.rbenv /usr/local/rbenv /opt/rbenv /usr/local/opt/rbenv```

Now let's get rbenv and ruby-build packages from Homebrew, they'll be useful.

```brew uninstall --force rbenv ruby-build
unset RBENV_ROOT && exec zsh
brew install rbenv ruby-build && exec zsh```

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

```rvm implode && sudo rm -rf ~/.rvm
# If you got "zsh: command not found: rvm", carry on. It means `rvm` is not
# on your computer, that's what we want!

rm -rf ~/.rbenv```

Then in the terminal, run:

```sudo apt-get install -y build-essential tklib zlib1g-dev libssl-dev libffi-dev libxml2 libxml2-dev libxslt1-dev libreadline-dev
sudo apt-get clean
sudo mkdir -p /usr/local/opt && sudo chown `whoami`:`whoami` $_
git clone https://github.com/rbenv/rbenv.git /usr/local/opt/rbenv
git clone https://github.com/rbenv/ruby-build.git /usr/local/opt/rbenv/plugins/ruby-build
exec zsh```
You should get a warning in the prompt, just ignore it from now (Ruby is not installed yet).

Now, you are ready to install the latest ruby version, and set it as the default version.

Run this command, it will take a while (5-10 minutes)

```rbenv install 2.3.3
Once the ruby installation is done, run this command tell the system to use the 2.3.3 version by default.```

```rbenv global 2.3.3```
Then restart your Terminal.

```ruby -v```
You should see something starting with ```ruby 2.3.3p```


## Postgresql installation

### on Mac OSX

```bash
brew install postgresql
brew services start postgresql```
Once you've done that, let's check if it worked:

```psql -d postgres```
If you enter a new prompt like this one, you're good!

```bash
psql (9.5.3)
Type "help" for help.

postgres=#```
To quit it, type ```\q``` then ```Enter```.


### on Linux

```sudo apt-get install -y postgresql postgresql-contrib libpq-dev build-essential
echo `whoami` > /tmp/caller
sudo su - postgres
psql --command "CREATE ROLE `cat /tmp/caller` LOGIN createdb;"
exit
rm -f /tmp/caller```

## Configuration

## Database initialization
To create your local database, run ```$rails db:create```
Then migrate its content with ```$rails db:migrate```


## How to run the test suite

For the moment only the API is provides tests. A simple $rspec command will run all the tests. Before that don't forget to mirate the test database with the following command : ```$rails db:migrate RAILS_ENV=test```

## Services (job queues, cache servers, search engines, etc.)

## Deployment

This app is deployed on Heroku. For a good deployment don't forget to pass the environment vars added to your application.yml to heroku. This can be done with the command ```$ figaro heroku:set -e production```or directly in the heroku dashboard. If you added changes to your local database, run ```$heroku run rails db:migrate``` after deploying to get these changes live in production.
