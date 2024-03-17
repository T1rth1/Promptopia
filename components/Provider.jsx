"use client"
import { SessionProvider } from 'next-auth/react'
const Provider = ({ children, session }) => {
  return (
    // It receives "children" as a prop, which represents the components or elements that are wrapped by the Provider component.
    // In the context of the "RootLayout", the children prop refers to the content of the all pages or components rendered within the RootLayout..
    // and this session prop which is passed using sessionprovider is awalable for all pages or components which is rendered within the rootlayout
    <SessionProvider session={session}>
    {/* The SessionProvider componentis used for providing session information to its children components. */}
  {/* this "session" prop that contains information about the user's session, such as authentication status, user data */}
    {/* and it is part of next.js authentication */}
      {children}
    </SessionProvider>
  )
}

export default Provider