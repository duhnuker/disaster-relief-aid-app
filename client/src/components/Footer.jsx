import React from 'react'

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-red-900 border-t-2 border-black shadow md:flex md:items-center md:justify-between md:p-6">
    <span className="text-sm text-black font-bold sm:text-center ">© 2024 <a class="hover:underline">DuhNuker</a>
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm text-black font-bold sm:mt-0">
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
            <a href="#" class="hover:underline">Contact</a>
        </li>
    </ul>
</footer>
  )
}

export default Footer