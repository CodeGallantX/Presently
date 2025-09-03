# Presently: Smart Attendance Management

Presently is a modern, web-based attendance management system designed for educational institutions. It provides a seamless experience for lecturers to create and manage attendance sessions, and for students to mark their attendance using QR codes.

## Features

*   **Role-based access control:** Separate dashboards for students, lecturers, and class representatives.
*   **QR code attendance:** Students can easily mark their attendance by scanning a QR code.
*   **Real-time attendance tracking:** Lecturers can monitor attendance in real-time.
*   **Session management:** Lecturers can create, manage, and view attendance sessions.
*   **Notifications:** In-app notifications for important events.
*   **PWA support:** The application is a Progressive Web App and can be installed on mobile devices.
*   **Dark mode:** A sleek dark mode for a better user experience.

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