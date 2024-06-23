# Nothing notes

Brief description of what this project does and who it's for. Mention the main features, target audience, and the problem it solves.

## Features

- Home page with a clean and intuitive design.
- Internationalization support for English and French.
- Duplicate note functionality for easy note management.
- Constant redirect and error statuses throughout the app, leveraging [`$lib/constants.js`](src/lib/constants.js).
- Share note functionality to enhance collaboration.
- Loading state indicators for create note buttons, improving user experience.
- SMTP and send mail functions for notifications or password resets.
- Fuzzy search functionality to easily find notes.
- Organize notes with tags and view them by category on the home page.
- Light theme option for user preference.

## Built With

- SvelteKit - The web framework used
- Tailwind CSS - For styling
- Vite - Build tool

## Authors

[Angus Paillaugue](https://github.com/Angus-Paillaugue)

# Todo list

- [ ] Add flip transitions to checklists
- [x] Make icons match
- [x] Make a home page
- [x] Add internationalization (just english and french)
- [x] Add duplicate button
- [x] Make redirect and error statuses constants throughout the app (with the help of `$lib/constants.js`)
- [x] Add share note functionality
- [x] Add a loading state to the create note buttons
- [ ] ~~Add a possibility to get started without an account (store notes in localStorage) with a disclaimer that notes will not be accessibles from others devices~~
- [x] Add SMTP and send mail functions
- [x] Change loading state for all of the buttons
- [x] Check if the TTL index works on the reset-password collection
- [x] Fuzzy search functionality
- [x] Finish the home page
- [x] Add tags to notes
- [x] Add tags category to home page
- [ ] Add vibration when deleting note items
- [x] Make a light theme
- [x] Make better tooltips
- [ ] Fix the Nothing Notes logo color in the [feature section](<src/routes/(home)/Features.svelte>)
