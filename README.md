# Calendar App

This is a React 19 calendar application built with Vite that allows users to manage events. Key features include:

- Interactive calendar interface using `react-big-calendar`
- Event creation, editing, and deletion functionality
- Modal forms for event management with date/time selection
- Redux state management with RTK
- React Router for navigation
- Bootstrap for styling

The app has a simple authentication system (currently hardcoded as "authenticated") with login and calendar pages. The calendar displays events with custom styling, and users can add new events via a floating action button or by double-clicking on the calendar. The project uses modern React patterns and is set up with ESLint for code quality.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo.git
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:

   ```bash
   yarn dev
   ```

5. Open your browser and navigate to ` http://localhost:5173/` to view the app.
