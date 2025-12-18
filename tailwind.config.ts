import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#f1f5f9", // Slate 100 - Soft neutral background
                foreground: "#0f172a", // Slate 900 - High contrast text
                primary: {
                    DEFAULT: "#1e3a8a", // Blue 900 - InzightEd Deep Blue
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#e2e8f0", // Slate 200 - Muted backgrounds
                    foreground: "#1e293b", // Slate 800
                },
                muted: {
                    DEFAULT: "#64748b", // Slate 500
                    foreground: "#f8fafc",
                },
                accent: {
                    DEFAULT: "#2563eb", // Blue 600 - Action Blue
                    foreground: "#ffffff",
                },
                card: {
                    DEFAULT: "#ffffff",
                    foreground: "#0f172a",
                },
                border: "#cbd5e1", // Slate 300 - Visible but subtle borders
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
            }
        },
    },
    plugins: [],
};
export default config;
