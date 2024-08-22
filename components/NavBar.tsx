'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from '@/hooks/useProviders'

const NavBar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false)

  const { session, providers, signIn, signOut, isLoading, isError } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading providers</div>

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sm:flex justify-around items-center hidden overflow-x-hidden py-2 my-2 border-y-2 border-blue-900">
        <Link href="/" className="mx-2">
          Discover
        </Link>
        <Link href="/post-location" className="mx-2">
          Add Location
        </Link>
        {session?.user && (
          <Link href="/my-locations" className="mx-2">
            My Locations
          </Link>
        )}
        <Link href="/about" className="mx-2">
          About
        </Link>
        {session?.user ? (
          <div className="flex gap-3 md:gap-5 mx-2">
            <button type="button" className="log-btn" onClick={() => signOut()}>
              Sign Out
            </button>

            <Image
              src={session?.user.image ?? ''}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
            />
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="log-btn"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id)
                  }}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </nav>

      {/* Mobile Navigation */}
      <nav className="sm:hidden fixed right-0 top-0 flex justify-around transform-translate-x-1/2 py-1 z-10 overflow-hidden">
        {/* <nav className="sm:hidden fixed right-0 mr-16 top-0 flex justify-around transform -translate-x-1/2 py-1 bg-[#f4fbfe] w-[70%] z-10 box-border overflow-hidden"> */}
        {!toggleDropdown ? (
          <div
            className="relative w-16 pt-1"
            id=""
            onClick={() => setToggleDropdown(true)}
          >
            <div className="open-icon leading-5 py-2 rounded">
              <h5>━</h5>
              <h5>━</h5>
              <h5>━</h5>
            </div>
          </div>
        ) : (
          <>
            <div
              className="relative small-navbar w-16 pt-1 py-2 rounded"
              id=""
              onClick={() => setToggleDropdown(false)}
            >
              <h5 className="fixed p-0 top-1.5 leading-3 right-2.5 text-3xl">
                x
              </h5>
            </div>
            <Link href="/" className="mx-2">
              Discover
            </Link>
            <Link href="/post-location" className="mx-2">
              Add Location
            </Link>
            {session?.user && (
              <Link href="/my-locations" className="mx-2">
                My Locations
              </Link>
            )}
            <Link href="/about" className="mx-2">
              About
            </Link>
            {session?.user ? (
              <div className="flex gap-3 md:gap-5 mx-2">
                <button
                  type="button"
                  className="log-btn"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>

                <Image
                  src={session?.user.image ?? ''}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              </div>
            ) : (
              <>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      type="button"
                      className="log-btn"
                      key={provider.name}
                      onClick={() => {
                        signIn(provider.id)
                      }}
                    >
                      Sign in
                    </button>
                  ))}
              </>
            )}
          </>
        )}
      </nav>
    </>
  )
}

export default NavBar
