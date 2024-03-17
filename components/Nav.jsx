"use client" // here we use useState and useEffect which is client functionality so we mark it as a client side functionality
// in nextjs we should write this "use client" statement on the top of the file
import Link from "next/link";
import Image from "next/image";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import{ useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
    // const isUserLoggedIn = false;
    const { data : session } = useSession(); // we get the session data using this useSession() state hook..
    // and this data we rename it as a "session"...
    const[providers,setProviders] = useState(null);
    const [open,setOpen] = useState(false);
    const [toggleDropDown, setToggleDropDown] = useState(false);
    useEffect(()=>{
        const setUpProviders = async () => {
            const response = await getProviders(); // this getProviders has the information about the which type of oth provider we want to use in our application
            // here we use only one googleOth ..that is decided by this part of the code...
    // providers: [
    //     GoogleProvider({
    //         clientId: process.env.GOOGLE_ID,
    //         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //     })
    // ], // which is written on the route.js file..so this provider is returned when getproviders() function has been called...
            setProviders(response);
        }
        setUpProviders();
    },[])
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image
                src="/assets/images/logo.svg"
                alt="Promptopia Logo"
                width={30}
                height={30}
                className="object-contain"
            />
            <p className="logo_text">Promptopia</p>
        </Link>
        {/* {alert(providers)} */}
        {/*desktop navigation*/}
        <div className="sm:flex hidden">
            {session?.user ? ( // if the session.user exist then this component is loaded..
            // when sign in button got clicked..it trigger the signIn callback int the route.js file and store the current user's data into mongoDB
            // after when here we use "useSession" hook to retrive back the data then it called the "session" callback and then update the 
            // session data by adding the current user's id which is generated in mongoDB..and return the session
            // and then we use that session here...and this component is loaded
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-prompt" className="black_btn">
                        Create Prompt
                    </Link>
                    <Link href="/" className="black_btn_home">
                        Home
                    </Link>
                    <button type="button" onClick={signOut} className="outline_btn"> 
                    {/*for signOut simple called the ready made awailable function from nextAuth 
                    which is automatically signed out the user as simple as that.. */}
                        Sign Out
                    </button>
                    <Link href="/profile">
                        <Image 
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                        />
                    </Link>
                </div>
                
            ):(
            <>
                {providers && Object.values(providers).map((provider) => (
                    // here we iterat over the all providers we have and render the sign in button for all providers..
                    // but here we have only one provider so only one sign in button get rendered..
                    // and this is rendered when user is not logged in and "session" hook is null means not defined
                      <button type="button" key={provider.name}
                        onClick={() => {signIn(provider.id)}} className="mt-5 w-full black_btn" >
                            Sign In
                    </button>     
                                  
                ))}
                {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        This is a success Alert inside a Snackbar!
                    </Alert>
                </Snackbar> */}
            </>
            )}
        </div>
        {/*mobile navigation*/}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                        <Image
                            src={session?.user.image} // render the image of that user's google profile
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => setToggleDropDown((prev) => !prev)} // for toggle drop down this toggle the state from it's previous state
                        />
                    {toggleDropDown && (
                        <div className="dropdown">
                            <Link
                                href="/profile"
                                className="dropdown_link"
                                onClick={()=> setToggleDropDown(false)}
                            >
                                My Profile
                            </Link>
                            <Link
                                href="/create-prompt" // we can direct access the route with in the app folder...
                                // means create one "create-prompt" folder inside the "app" folder always and our routing is done.. (/create-prompt)
                                // and inside that create-prompt folder create one page.jsx file to implement the functionality when this create-prompt get rendered..
                                className="dropdown_link"
                                onClick={()=> setToggleDropDown(false)} // when we clicked on any of this then 
                                // we should stop the drop down menu so that's why we set it's value to false...
                            >
                                Create Prompt
                            </Link>
                            <Link
                                href="/" // we can direct access the route with in the app folder...
                                // means create one "create-prompt" folder inside the "app" folder always and our routing is done.. (/create-prompt)
                                // and inside that create-prompt folder create one page.jsx file to implement the functionality when this create-prompt get rendered..
                                className="dropdown_link"
                                onClick={()=> setToggleDropDown(false)} // when we clicked on any of this then 
                                // we should stop the drop down menu so that's why we set it's value to false...
                            >
                                Home
                            </Link>
                            <button
                              type="button"
                              onClick={()=>{
                                setToggleDropDown(false);
                                signOut();
                              }}
                              className="mt-5 w-full black_btn">
                                Sign Out
                              </button>
                        </div>

                    )}

                </div>
            ):<>
                {providers && Object.values(providers).map((provider) => (
                      <button type="button" key={provider.name}
                        onClick={()=> signIn(provider.id)} >
                            Sign In
                    </button>                   
 
                ))}
            </>}
        </div>
    </nav>
  )
}

export default Nav