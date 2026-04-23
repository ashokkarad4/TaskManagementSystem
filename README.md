# Task Management System - Frontend

A simple Angular template for a Task Management System built with Angular 11.

## Prerequisites

- Node.js (compatible with npm 6.14.16)
- Angular CLI 11.2.14

## Installation

1. Install dependencies:
```bash
npm install
```

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Features

- User authentication (Login/Register)
- Task management (Create, Read, Update, Delete)
- Task filtering by status (All, Pending, Completed)
- Responsive design

## Project Structure

```
src/
  app/
    components/
      login/
      task-list/
    services/
      auth.service.ts
      task.service.ts
    app-routing.module.ts
    app.component.ts
    app.module.ts
  environments/
    environment.ts
    environment.prod.ts
```

## Technologies Used

- Angular 11.2.14
- TypeScript 4.1.5
- RxJS 6.6.7
- CSS3
