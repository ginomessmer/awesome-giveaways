# Awesome Giveaways
This full stack solution was used for Global Azure Bootcamp 2019 in Munich to let attendees participate in various sweepstakes during the conference.

![Preview](https://i.imgur.com/ZBY9tPz.png)

[![Build status](https://dev.azure.com/ginomessmer/AwesomeGiveaway/_apis/build/status/AwesomeGiveaways%20CI%20(master%20%26%20dev))](https://dev.azure.com/ginomessmer/AwesomeGiveaway/_build/latest?definitionId=14)

## Used Technologies
- React (v16.8, with TypeScript support)
- ASP.NET Core 2.2
- SignalR
- Entity Framework with support for SQLite

## Build and Run
- Open the solution in Visual Studio 2019 or later
- Launch the project
- You may access these routes:
  - `/`: Submission form for attendees
  - `/dashboard`: Presentation dashboard for speakers. This can be shown in front of the whole audience
  - `/winner`: Winner screen intended for speakers. This screen announces a random attendee as sweepstake winner 

### Possible Improvements
- Refactor classes
- Introduce repositories and services for submissions
- Styling, dynamic branding
