# Field Builder

This project is an implementation of the UI Interview Demo as given by Quickbase

## Available Scripts

The project can be deployed on a local host by running the following commands:

### `yarn start`

or

### `npm start`

## List of Features

- Label (title) field that is required by the builder to submit a form
- Type field that allows the builder to choose if it's a single or multiselect form
- Type field that allows the builder to choose whether a choice is required by a user
- Default Value field that allows the builder to set a default choice for the user
- Choices field as a text area that allows line-separated options (No empty strings, no more than 50 options)
- Order field that allows the builder to select if the choices should be sorted alphabetically or not
- Submit button that posts and returns data in the console if the label field is filled, a success button shows up if it posts the data successfully
- Cancel button that resets the form to it's default, empty state
