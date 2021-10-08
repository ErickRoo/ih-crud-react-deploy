// ./comopnents/Layout/Header.js

import React from 'react'
import IronhackLogo from "./../../assets/ironhack-logo.png"

import { Link } from "react-router-dom"

export default function Header() {
  return (
    <>
      <header className="bg-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
            <div className="flex items-center">
              <Link to="/">
                <img className="h-10 w-auto" src={IronhackLogo} alt="" />
              </Link>
              <div className="hidden ml-10 space-x-8 lg:block">
                <Link to="/mike" className="text-base font-medium text-white hover:text-indigo-50" key="Solutions">
                  CRUD c/Mike
                </Link>

                <Link to="/crud-me" className="text-base font-medium text-white hover:text-indigo-50" key="Pricing">
                  CRUD s/Mike
                </Link>

                <Link to="/financial-app" className="text-base font-medium text-white hover:text-indigo-50" key="Docs">
                  App Financiera
                </Link>

                <a href="#" className="text-base font-medium text-white hover:text-indigo-50" key="Company">
                  CRUD con MongoDB
                </a>
              </div>
            </div>
            <div className="ml-10 space-x-4">
              <a href="#" className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">Iniciar sesión</a>
              <a href="#" className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">Registrarme</a>
            </div>
          </div>
          <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
            <Link to="/mike" className="text-base font-medium text-white hover:text-indigo-50" key="Solutions">
              CRUD c/Mike
            </Link>

            <Link to="/crud-me" className="text-base font-medium text-white hover:text-indigo-50" key="Pricing">
              CRUD s/Mike
            </Link>

            <Link to="/financial-app" className="text-base font-medium text-white hover:text-indigo-50" key="Docs">
              App Financiera
            </Link>

            <a href="#" className="text-base font-medium text-white hover:text-indigo-50" key="Company">
              CRUD con MongoDB
            </a>
          </div>
        </nav>
      </header>

    </>
  )
}