export default function async ({ store, redirect, route, app }) {

    const routePath = ( route.matched.length === 0 ) ? "/" : route.path;
    
    // Save current route 
    app.context.app.$cookies.set('routePath', routePath);

    // Start validation in loading page
    if ( !store.state.auth.initApplication ) {
        return redirect('/loading');
    }

    if (store.state.auth.isAuthenticated ) {
        return redirect('/');
    } 
}