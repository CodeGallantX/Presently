# Presently: Smart Attendance Management

Presently is a modern, web-based attendance management system designed for educational institutions. It provides a seamless experience for lecturers to create and manage attendance sessions, and for students to mark their attendance using QR codes.

## Features

*   **Role-based access control:** Separate dashboards for students, lecturers, and class representatives.
*   **Enhanced Onboarding Process:** A guided setup for new users, including role-specific profile details, permission requests (location, notifications), and dark mode preference.
*   **QR code attendance:** Students can easily mark their attendance by scanning a QR code.
*   **Real-time attendance tracking:** Lecturers can monitor attendance in real-time.
*   **Student Attendance Analytics:** Comprehensive dashboards for students to view overall attendance, per-course breakdown, and historical trends.
*   **Session management:** Lecturers can create, manage, and view attendance sessions.
*   **Notifications:** In-app notifications for important events.
*   **PWA support:** The application is a Progressive Web App and can be installed on mobile devices.
*   **Dark mode:** A sleek dark mode for a better user experience.

## Enhanced Onboarding Process

The onboarding experience has been significantly improved to guide new users through a personalized setup.

### Key Steps:

1.  **Choose Your Role:** Users select their primary role (Student, Lecturer, or Class Representative).
2.  **Account Setup:**
    *   **Profile Details:** Users provide basic profile information (name, email, password).
    *   **Role-Specific Information:**
        *   **Students:** Input matriculation number, department, level, and upload a digital signature.
        *   **Lecturers:** Provide staff ID, department, and list courses taught.
        *   **Class Representatives:** Link to assigned courses and lecturers.
    *   **Google Login Option:** A convenient option to sign in using a Google account.
3.  **Permissions & Preferences:**
    *   **Location Access:** Request permission for GPS-based attendance verification.
    *   **Notifications:** Opt-in for in-app and push notifications for important updates.
    *   **Dark Mode Preference:** Set the preferred theme, with dark mode as the default.

## Settings Page Enhancements

The settings page has been significantly expanded to provide users with more control over their application experience and privacy.

### Key Sections and Features:

1.  **Account Settings:**
    *   Basic profile editing (name, department, level, institution, country).
    *   Password change functionality.
    *   Integrations (e.g., Google Account connection).
    *   Digital Signature management.
2.  **Notification Settings:**
    *   Control email notifications (attendance updates, announcements).
    *   Manage in-app notifications (Sonner popups, dashboard alerts).
    *   Toggle push notifications.
    *   Configure attendance reminders (session start, daily summary, weekly report).
3.  **Appearance & Accessibility:**
    *   **Theme:** Dark mode / Light mode toggle.
    *   **Text Size:** Option for Normal / Large text.
    *   **High Contrast Mode:** Toggle for enhanced visual contrast.
    *   **Language Preference:** Select preferred language (placeholder for future multilingual support).
4.  **Privacy & Security:**
    *   **Manage Login Devices:** View active sessions (placeholder).
    *   **Two-Factor Authentication (2FA):** Placeholder for future implementation.
    *   **Location Permissions:** Toggle GPS access for attendance verification.
    *   **Data Download/Export:** Request personal data export (placeholder).
5.  **App Preferences:**
    *   **Default Dashboard View:** Choose between Attendance, Analytics, or Courses as the default view.
    *   **Time Format:** Select 12-hour or 24-hour time format.
    *   **Attendance Reminders:** Toggle reminders for before class, daily summaries, and weekly reports.
6.  **Help & Support:**
    *   **Report an Issue:** A new functional button that opens a dialog with a form for users to report bugs or issues, with an encouraging message.
    *   FAQs, Contact Support, Legal (Terms & Conditions, Privacy Policy).

### Other Updates:

*   **404 Page Icon:** The icon displayed on 404 "Page Not Found" pages has been updated for a more user-friendly experience.
*   **Logout Button:** A dedicated logout button has been added to the base of the settings page for easy access.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
*   **State Management:** [Zustand](https://github.com/pmndrs/zustand)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/) (used for smooth UI transitions and background effects)
*   **PWA:** [next-pwa](https://www.npmjs.com/package/next-pwa)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18.x or later)
*   npm or yarn

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/CodeGallantX/Presently.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Run the development server
    ```sh
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
/app
├── (auth) # Authentication routes (signin, signup, etc.)
├── (dashboard) # Main dashboard routes
├── (landing) # Landing page
/components
├── auth # Authentication related components
├── dashboard # Dashboard specific components
├── landing # Landing page sections
├── ui # Reusable UI components from shadcn/ui
├── not-found-component.jsx # Client component for 404 page
/hooks # Custom React hooks
/lib # Utility functions and state management
/public # Static assets (images, icons, etc.)
```

## Background Animations

The application features subtle, animated background "blobs" to enhance the visual experience. These blobs vary in size, position, and animation type (e.g., floating, pulsing, rotating) and are strategically placed across the landing page (more prominent in the hero section, gradually decreasing towards the footer) and authentication pages.

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.