/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            width: {
                '70': '280px',
            },
            height: {
                '70': '280px',
            },
        },
    },
    plugins: [],
} 