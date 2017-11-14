## Table of Contents  
* [Ruby Version](#rubyv)  
* [Ruby installation](#rubyinst)  
  - [On Mac OSX](#rubyinst)
  - [on Linux](#rubyil)  
* [PostgreSQL installation](#pginst)  
  - [on Mac OSX](#pgim)  
  - [on Linux](#pgil)  
* [Clone the app](#clone)
* [Packages initialization](#pi)
* [Database initialization](#dbi)
* [How to run the app locally](#apploc)  
* [How to run the test suite](#test)  
  - [Testing the API](#testapi)  
  - [Testing the react app](#testreact)  
* [Deployment](#deploy)  
* [Debugging](#debug)  
  - [The API](#debugapi)  
  - [The React app](#debugreact)  
* [i18n](#i18n)  
* [Useful API endpoints](#end)  
  - [Non-protected endpoints](#npend)  
  - [Auth endpoints](#authend)  
  - [Protected endpoints](#pend)  



<a name="rubyv"/>

## Ruby version

You may install ruby v > 2.3 and rails v > 5.0 to run this app locally.
If you work on windows you may install a Linux subset to get rails running properly. Maybe you could read this tutorial by gorails : https://gorails.com/setup/windows/10.
Or this one (using Cloud 9) by lewagon: https://c9.io/

<a name="rubyinst"/>

## Ruby installation

### on Mac OSX

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

<a name="rubyil"/>

### on Linux

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

<a name="pginst"/>

## postrgeSQL installation

<a name="pgim"/>

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


<a name="pgil"/>

### on Linux

```
sudo apt-get install -y postgresql postgresql-contrib libpq-dev build-essential
echo `whoami` > /tmp/caller
sudo su - postgres
psql --command "CREATE ROLE `cat /tmp/caller` LOGIN createdb;"
exit
rm -f /tmp/caller
```

<a name="clone"/>

## Clone the app

```
git clone git@github.com:baptistemz/mecano.git
cd mecano
```

<a name="pi"/>

## Packages initialization
Install the rails gems using ```$bundle install```
And the npm packages of the client running ```$npm run postinstall```

Create your config/application.yml ignored by git using ```$bundle exec figaro install```
Then copy paste its content of another local folder. Every time the environment variables contained in this file are changed, you might apply the changes in the config/application.yml files of every local app.

<a name="dbi"/>

## Database initialization
To create your local database, run ```$rails db:create```
Then migrate its content with ```$rails db:migrate```




<a name="apploc"/>

## How to run the app locally


The command ```$npm run rails-server```will start the rails server and webpack (our React development server). Then visit the app on ```http://localhost:3000```.


<a name="test"/>

## How to run the test suite

This API contains tests written in rspec. The React app tests are run thanks to 3 npm packages. They are :
* written in javascript thanks to "chai" helpers
* run thanks to "mocha"
* on a fake dom generated by "jsdom".		

Before pushing any code, run the whole test suite using the following command :		
```		
$npm run all-tests		
```		

While developping the API and the React app, test them frequently.

<a name="testapi"/>

### Testing the API

While working on the API, you must run the tests frequently to check if you don't break any of the core features. You must also write the tests related to the features you want to develop on the API. These tests are written with rspec. A simple ```$rspec``` command will run all the API tests. Before that, don't forget to migrate the test environment database with the following command : ```$rails db:migrate RAILS_ENV=test```.
If you want to run only specific API tests run
```
$rspec path_to_test_file
```

The API test files are located in the ```spec```directory.

<a name="testreact"/>		

### Testing the react app		

While working on the react app, you must run the tests and check if you don't break any of the core features. A simple		
```		
$npm run react-tests		
```		
will start the hot reloading test environment. Each time you'll save changes to a file of the react app all the tests will be re-run automatically. You'll just have to check no test has turned red each time you save a change. You must also write the tests related to the features you want to develop on the React app.		

The React app test files are located in the ```client/test```directory.		


<a name="deploy"/>

## Deployment

This app is deployed on Heroku. For a good deployment don't forget to pass the environment vars added to your application.yml to heroku. This can be done with the command ```$ figaro heroku:set -e production```or directly in the heroku dashboard.
Deploy using ```git push heroku YOUR_BRANCH```. If you added changes to your local database, run ```$heroku run rails db:migrate``` after deploying to get these changes live in production. This will deploy the app on the staging app.
On the heroku dashboard you'll find a button "promote" to push your staging app into the "mecano-production" app. Don't forget to set new environment variables and to migrate the database if needed.

<a name="debug"/>

## Debugging

<a name="debugapi"/>

### The API

Read the logs in the rails server terminal tab. Rails will often give you the method and the line your error comes from.
To debug the rails API use Rails logger debuger to print anything in the console
For example to print the value of ```@variable``` write :
```
Rails.logger.debug("@variable: #{@variable}")
```
At the place you want to check its value and read the logs in your terminal

If you want to debug your rspec tests you must ```require 'pp'``` at the top of your spec file and then use

```
pp "@variable: #{@variable}"
```

to print @variable in the terminal

<a name="debugreact"/>

### The React app

Read the logs in your browser inspector. React often gives the component, function and line of code an error comes from.
To debug use the famous ```console.log```

<a name="i18n"/>

## i18n

You must store all the text content that your app provides in ```config/locales``` yml files.
for example
```
#config/locales/fr.yml

home:
  welcome: bienvenue
```
To call the welcome message from the rails app you must call:
```
  I18n.t('home.welcome')
```

To call the welcome message from a react component:
```
...
import { injectIntl } from 'react-intl';
import { defaultMessages } from '*path_to*/libs/i18n/default';
...
class MyComponent extends Component{
  ...
  render(){
    const { formatMessage } = this.props.intl
    return(
        <p>{formatMessage(defaultMessages.homeWelcome)}</p>
    )
  }
}
export default injectIntl(MyComponent);
```

<a name="end"/>

## Useful API endpoints
All the API endpoints only accept (and return) JSON data.

<a name="npend"/>

### Non-protected endpoints

All these API endpoints are not protected by authentication. Any visitor of the app can access them.

* ```GET /api/mecano_profiles``` search mecano profiles corresponding to params. Accepts ```full_address:string```, ```distance:integer``` (0 for "at home" search), ```domains:array``` and ```car_make:string``` as params.
* ```GET /api/mecano_profiles/:id``` responds with the mecano profile and all of its domains.
* ```GET /api/domains/:id/recommendations/pictures``` responds with the profile pictures of the users who recommended the targeted domain.

<a name="authend"/>

### Auth endpoints

The authentication endpoints will respond with "client", "uid", "access-token" and "expiry" headers. Your requests to protected endpoints must have these headers to prove the user who is making the requests is well authenticated. After each request to a protected endpoint, the "access-token" sent in response will change. So the default headers of the client must be updated between each of these requests.

* ```POST /api/auth/sign_in``` Creates a new session. Accepts ```email:string``` and ```password:string``` params.
* ```POST /api/auth``` Creates (register) a new user. Accepts ```first_name:string```, ```last_name:string```, ```email:string```, ```password:string```, ```password_confirmation:string``` params.
* ```PUT /api/auth``` Updates the user. Accepts ```first_name:string```, ```last_name:string```, ```email:string``` params.
* ```GET /api/auth/validate_token``` checks your headers and responds with the user info and a new token in headers if they are correct.
* ```DELETE /api/auth/sign_out``` logs your user out.

<a name="pend"/>

### Protected endpoints
All these API endpoints are protected by authentication. The app user must be logged in and request the API with the right authenticated headers.
* ```POST /api/mecano_profiles``` creates a mecano_profile belonging to the current user. Accepts ```pro:boolean```,```price:integer```, ```company_name:string```, ```address:string```, ```city:string```, ```country:string```, ```mobile:boolean``` and ```radius:integer``` params.
* ```PUT /api/mecano_profiles``` updates a mecano_profile belonging to the current user. (same params as POST)
* ```POST /api/mecano_profiles/:mecano_profile_id/domains/register_domains``` must be called with a list of domains. ```[{ kind:string, name:string }]```, the "kind" of each domain must be either "car_make" of "technical_skill".
* ```POST /api/mecano_profiles/:mecano_profile_id/domains/update_technical_domains``` deletes the domains of the current user's mecano_profile which kind is "technical_skill" and rewrites them. Call this endpoint with the same format than for the domain creation. All the sumbmitted domains kind value must be "technical_skill".
* ```POST /api/mecano_profiles/:mecano_profile_id/domains/update_car_domains``` deletes the domains of the current user's mecano_profile which kind is "car_make" and rewrites them. Call this endpoint with the same format than for the domain creation. All the sumbmitted domains kind value must be "car_make".
* ```GET  /api/vehicles``` responds with the current user's registered vehicles.
* ```POST /api/vehicles``` creates a new vehicle belonging to the current user. Accepts ```brand:string```, ```model:string``` and ```year:integer``` as params.
* ```DELETE /api/vehicles/:id``` deletes the vehicle only if it belongs to the current user making the request.
* ```POST /api/services``` creates a service between the current_user, one of his vehicles and a mecano_profile. It also sends an email from the current_user email address to the mecano_profile's one with the ```first_message``` param as body. Accepts ```mecano_profile_id:integer```, ```vehicle_id:integer```, ```status:string```, ```first_message:text``` as params.
* ```POST /api/services/cancel``` changes the status of the current_user and targeted mecano_profile current service to "canceled". It accepts ```mecano_profile_id:integer``` and ```cancel_reason:string``` as params.
* ```POST /api/domains/:id/recommendations``` create a recommendation from the current_user to the domain targeted. Accepts ```domain_id:integer``` as param.
* ```DELETE /api/domains/:id/recommendations/delete``` deletes the recommendation made by the current_user to the domain targeted.
* ```POST /api/mecano_profiles/:id/reviews``` create a review from the current_user to the mecano_prodile targeted and updates the service with status: "pending" between those two. Accepts ```amount:integer```, ```mark:integer```, ```comment:text```, ```status:string``` (for the service), ```cancel_reason:string``` (for the service) as params.
