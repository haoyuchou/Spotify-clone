/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/index.js",
    "./components/UI/Sidebar.js",
    "./components/UI/PlayLists.js",
    "./components/UI/PlayList.js",
    "./pages/login/index.js",
    "./components/UI Center/Center.js",
    "./components/UI Center/Songs.js",
    "./components/UI Center/Song.js",
    "./components/UI Center/Player.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
