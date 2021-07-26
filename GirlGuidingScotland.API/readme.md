# Girl Guiding Scotland API

Please update this doc as the project progresses

## Flow from front to back
1. API Call received at controller
2. Controller calls services needed to perform action
3. Services call Data Access Handlers to make necessary DB calls
4. Result is returned to Handlers which process to validity of models
5. Controller returns the result in JSON format

## Points to note
* Models in API should match front end models
* DTO objects should match returning results from database
* Database project should be used to keep schema up to date.
* Database can be kept up to date with update and schema compare
* Database project can be updated via schema compare

### To-do
* Add Authentication
* Add Logging
* Add ASP.NET Roles
* Use <a src="https://www.hangfire.io/">Hangfire</a> if scheduled tasks needed