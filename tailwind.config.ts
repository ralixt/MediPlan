import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        fontFamily: {
            //   <style>
            //   @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            // </style>
        },

        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                'light-blue': '#52CBF7',
                'dark-blue': '#009BD4',
                'positive': '#52F7D0',
                'negative': '#F75279',
                'white' : '#F7FBFC',
                'black' : '#061013',
                'grey':'#7995A0',
                'lightgrey':'#C4D0D4',
            },
            borderRadius: {
                '1_25rem': '1.25rem',
            },
        },
    },
    plugins: [],
}
export default config
