import '@styles/globals.css';
import { Suspense } from 'react';
import Provider from "@components/Provider"
import Nav from "@components/Nav"; // we created navbar here because we want to use this navbar thrpugh out our whole app..
// import Provider from "@components/Provider";
export const metadata = {
    title:"promptopia",
    description:'Discover & share AI Prompts'
}
// This line defines a metadata object that contains the title and description of the webpage.
//  This metadata is likely used by search engines and social media platforms to provide information about the webpage.

// the page component's content is inserted at the place where the children prop is defined within the layout.jsx file..
// The children prop is a special prop that allows you to pass content from a page component into the layout file...
// When a layout.js and page.js file are defined in the same folder. The layout will wrap the page.
// means this gradient effect and styles(other functionality) applied to actual page.jsx file which render the our home page(page.jsx)
const RootLayout = ({children}) => {
  return (

    <html lang="en">
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient'/>
                </div>
                <main className="app">
                    <Nav/>
                <Suspense fallback={<div>Loading...</div>}>
                
                    {children}
                </Suspense>
                </main>
                <link rel="icon" href="/assets/images/logo.svg" sizes="any" />
            </Provider>
        </body>
    </html>
  )
}
// The purpose of RootLayout is to maintain a consistent layout across different pages or components in your application.

export default RootLayout
// i want to see this layout applied to all files created within this app folder