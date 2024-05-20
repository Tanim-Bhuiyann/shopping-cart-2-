import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./*.html" ],
  theme: {
    container:{
      center: true,
      padding:"20px",
     
    },
    extend: {},
  },
  plugins: [daisyui],
}

