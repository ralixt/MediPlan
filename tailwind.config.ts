import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {

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
                'lightlightgrey' : '#EAEEF0',
            },
            borderRadius: {
                '1_25rem': '1.25rem',
            },
        },
    },
    plugins: [],
}
export default config
