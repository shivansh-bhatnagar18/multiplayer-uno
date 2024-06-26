/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
    content: ['./src/**/*.{tsx,ts}'],
    theme: {
        extend: {
            fontFamily: {
                kavoon: ['Kavoon', 'serif'],
            },
        },
        extend: {
            borderWidth: {
                3: '3px',
            },
        },
        extend: {
            backgroundImage: {
                'uno-bg': "url('/src/assets/bg.jpg')",
                'table-bg': "url('/playBackground.jpeg')",
                'player-icon-bg': "url('/playerIcon.png')",
            },
        },
    },
    plugins: [],
};
