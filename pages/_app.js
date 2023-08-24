import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

import 'styles/globals.css';

import { userService } from 'services';
import { Nav, Alert } from 'components';
import Header from 'components/Header';
import Footer from 'components/Footer';

export default App;

function App({ Component, pageProps }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, []);

    function authCheck(url) {

        // redirect to login page if accessing a private page and not logged in 
        setUser(userService.userValue);
        // toute les pages que peut visiter l'utilisateur sans  etre connecter
        const publicPaths = ['/account/login', '/account/register', '/', '/monclub', '/abonnement'];
        const path = url.split('?')[0];
        // si il n y a pas de user si le chemin n apartient pas au chemin public il renvoi a la page connexion
        // dans le cas contraire il renvoie true
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/account/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }
// toutes les pages viennent dans component at sont soumis a l 'authorisation
    return (
        <>
            <Head>
                <title>Mpower Gym</title>
            </Head>

                <Header />
            <div className={`app-container ${user ? 'bg-light' : ''}`}>
                <Alert />
                  <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"/>
                {authorized &&
                    <Component {...pageProps} />
                }
                <Footer />
            </div>
        </>
    );
}