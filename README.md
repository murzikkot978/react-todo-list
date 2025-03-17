# ToDo List Web Application

## Description

This is a simple and interactive Todo List web application that allows users to manage their tasks efficiently.\
Users can add, delete, and sort tasks based on different criteria.\
The application also provides category management with customizable colors for categories and stores data using an API.

## Features

**Add todo**: Users can add tasks with a title, due dat and category\
**Delete todo**: Users can delete todo with button (delete). Or user can delete all todos with button (delete all)\
**Change status**: Users can change status for each todo with checkbox\
**Change title and date for each todo**: Users can change title and due_date by click on task.\
**Sort Tasks**: Tasks can be sorted by name, date, or status (done/undone).\
**Category Management**: User can select category for each task.\

## Instalation

#### Clone the repository:

```bash
git clone https://github.com/murzikkot978/react-todo-list.git
```

#### Navigate to the project directory:

```bash
cd react-todo-list
```

#### Install the dependencies:

```bash
pnpm install
```

#### Start the dev server:

```bash
pnpm dev
```

#### Build the app for production:

```bash
pnpm build
```

#### Preview the production build locally:

```bash
pnpm preview
```

## Usage

- Open the application in a web browser.
- Add a new to-do item by entering a task name, selecting a due date and press on the button (addTodo).
- Sort tasks by clicking on the sorting options (name, date, or status).
- Change the status of tasks using the checkbox.
- Delete individual tasks or clear all tasks with a single button.

- Entering category name, choose color and press on the button (addCategory).

- After in the task you can choose category

## Technology used

- CSS: add style
- React: is responsible for all the logic used in this programme.
  - useState: used for auto update
  - library zustand: is used to access information on all folders.
- API swager: external server to which all information is saved.
