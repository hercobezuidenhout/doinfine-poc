# CHANGELOG

## v0.6.0 <font size=1>`08/12/2022`</font>
### Changed
- Required responses for a fine request and payment request is only more than 2 if the team is more than 3 people.

## v0.5.0 <font size=1>`30/11/2022`</font>
### Fixed
- Fixes API authentication depending on environment.

## v0.4.0 <font size=1>`30/11/2022`</font>
### Changed
- Added proper routing for auth state.
- Only one workflow for api build and deployment.

### Fixed
- Render bug on team page.
- Update deployment environments to properly set the `ASPNETCORE_ENVIRONMENT` variable.

## v0.3.0 <font size=1>`30/11/2022`</font>
### Added
- Added test deployment environment.

## v0.2.0 <font size=1>`20/11/2022`</font>
### Added
- Display app version at bottom of menu.
- A placeholder when a user does not have any fines.
- Deployment step to deploy to preview if on pull request
- Web notifications

### Removed
- <LinkListItem /> test to test for <Link /> role since it is not relevant anymore.

### Changed
- Updated logo and favicon.
- Update `<LinkListItem />` to be clickable everywhere and not just on the icon.
- Updated fine request logic to only accept responding team responses.
- Removed anonymousness from the fine request logic.


### Fixed
- Bug that returned requests for all teams. Now, viewing active requests on Menu will only render requests relevant to the user's team.

## v0.1.1 <font size=1>`10/11/2022`</font>

### Fixed
- Fixed failing requests because of api-key being added more than once to the configuration.

## v0.1.0 <font size=1>`10/11/2022`</font>

### Added
- View the fines for a team member.
- View the leaderboard for teams and users. 
- Submit a new fine request or payment request. 
- Respond to a fine request or payment request.
- In-app notifications.
- Sign in and reset password. 
- Basic PWA support.
