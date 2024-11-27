/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // mode: "jit",

  darkMode: 'class',
  
  theme: {

    extend: {

      screens: {
        'hp': '420px',
        // => @media (min-width: 400px) { ... }
      },

      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
      },

      keyframes: {
        bag: {
          '0%': {  opacity: '0' },
          '100%': {  opacity: '1' },
        },
        modal: {
          '0%': {  opacity: '0' },
          '100%': {  opacity: '1' },
        },
        source: {
          '0%': { transform: 'translateX(30%)', opacity:'0'},
          '100%': { transform: 'translateX(0%)', opacity:'1' },
        },
        fall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' },
        },
        spin_slow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        lompat: {
          '100%, 80%, 60%, 50%, 40%, 20%, 10%, 0%': {
            transform: 'translateY(0) scaleY(1)', // Posisi awal dan akhir, dan posisi tengah
          },
          '30%': {
            transform: 'translateY(-6px) scaleY(0.95)', // Posisi puncak lompatan, mengurangi tinggi elemen
          },
          '70%': {
            transform: 'translateY(-1px) scaleY(1.05)', // Kembali ke posisi normal sambil menambah tinggi elemen
          },
        },

        muncul: {
          '0%': { opacity: 0, transform: 'scale(0.5) translateY(-40px)' },
          '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        bag: 'bag .7s ease-in-out forwards',
        modal: 'bag 1s ease-in-out forwards',
        source: 'source 1s ease-in-out ', 
        falls: 'fall 3s linear infinite',
        spin_slow: 'spin_slow 5s linear infinite',
        jumps:'lompat 2s ease-in-out infinite',
    
        buttons: 'muncul 1s ease-in-out forwards',
        jump1: 'lompat 2s ease-in-out infinite',
        jump2: 'lompat 2.2s ease-in-out infinite',
        jump3: 'lompat 2.3s ease-in-out infinite',
        jump4: 'lompat 2.4s ease-in-out infinite',
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
        varela: ['Varela', 'sans-serif'],
        lora: ['Lora', 'sans-serif'],
        Twinkle: ['Twinkle Star','cursive'],

        
      },
      transitionProperty: {
        'opacity': 'opacity',
        'transform': 'transform',
      },     
       opacity: {
        '90': '0.9',
      },
      fontWeight: {
        'lora': '500',
        'varela': '700',
        'Twinkle': '400',
        '': '',
      },
      fontStyle: {
        'lora': 'SemiBold',
        'varela': 'Normal',
        'Twinkle': 'Semibold',
      },
      colors: {
        "black-100": "#2B2C35",
        "primary-blue": {
          DEFAULT: "#1C6CB2",
          100: "#F5F8FF",
        },
        "reds": "#FF3C00FF",
        "primary1": "#E42727",
        "biru": "#293F90",
        "biru2": "#25A7E0",
        "biru3": "#288FCD",
        "biru4": "#1C6CB2",
        "biru5": "#2B7FC7",
        "bg1": "#F3F4F6FF",
        "abu": "#F4F7FE",
        
        "secondary-orange": "#f79761",
        "light-white": {
          DEFAULT: "rgba(59,60,152,0.03)",
          100: "rgba(59,60,152,0.02)",
        },
        grey: "#747A88",
      },
      backgroundImage: {
        
        'hero-bg': "url('/hero-bg.png')",
        'cpns-bg': "url('/assets/bg-cpns.png')",
        'auth-bg1': "url(/assets/background/snow.jpg)",
        'auth-bg2': "url(/assets/background/bg2.png)",
        'auth-bg3': "url(/assets/background/bg3.jpg)",
        'auth-bg4': "url(/assets/background/bg4.png)",
        'auth-bg': "url(/assets/background/bg5.png)",
      },
      listStyleImage: {
        pens: 'url("/assets/icons/pen.png")',
      },
    },
  },
  plugins: [],
};