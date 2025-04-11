"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Bell, Home, Info, Menu, MessageSquare, Search, X } from "lucide-react"
import { usePathname } from "next/navigation"


const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const { data: session, status } = useSession()
  const pathname = usePathname()


  const MenuList = [
    { name: "Home", url: "/", icon: <Home size={20} /> },
    { name: "About", url: "/about", icon: <Info size={20} /> },
  ]

  const profileList = [
    { name: "Profile", url: "/profile" },
    { name: "Settings", url: "#" },
    { name: "Sign out", url: "/api/auth/signout" },
  ]

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-10 top-0 left-0 shadow-sm">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-2">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 mr-4">
            <div className="bg-orange-500 rounded-full w-8 h-8 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-xl hidden sm:block text-gray-600">
              Collab<span className="text-orange-500">Connect</span>
            </span>
          </Link>

          <button type="button" className="md:hidden p-2 text-gray-500" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Search Bar */}
        <div className={`relative flex-1 max-w-xl mx-4 `}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:outline-none"
              placeholder="Search CollabConnect"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {MenuList.filter(item => item.url !== pathname).map((item, ind) => (
            <Link
              key={ind}
              href={item.url}
              className="flex items-center space-x-1 text-gray-700 hover:bg-gray-100 p-2 rounded-md"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-full">
            <Bell size={20} />
          </button>

          <div className="flex items-center relative">
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
            ) : session ? (
              <>
                <button
                  type="button"
                  className="flex items-center space-x-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full p-1 focus:ring-2 focus:ring-orange-300"
                  onClick={toggleUserDropdown}
                >
                  <Image
                    className="w-7 h-7 rounded-full"
                    src={session.user.image || "/placeholder.svg"}
                    alt="User photo"
                    width={28}
                    height={28}
                  />
                  <span className="hidden md:block pr-2 text-black">{session.user.name?.split(" ")[0]}</span>
                </button>
                {isUserDropdownOpen && (
                  <div className="z-50 absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <span className="block text-sm font-medium text-black">{session.user.name}</span>
                      <span className="block text-xs text-gray-500 truncate">{session.user.email}</span>
                    </div>
                    <ul className="py-2">
                      {profileList.map((item, ind) => (
                        <li key={ind}>
                          <Link href={item.url} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link
                href="/signin"
                className="text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-full text-sm px-4 py-2"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white w-full p-4 border-t border-gray-200">
          {MenuList.map((item, ind) => (
            <Link
              key={ind}
              href={item.url}
              className="flex items-center space-x-2 py-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          {status === "authenticated" && (
            <div className="border-t border-gray-200 mt-2 pt-2">
              {profileList.map((item, ind) => (
                <Link
                  key={ind}
                  href={item.url}
                  className="flex items-center py-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar

