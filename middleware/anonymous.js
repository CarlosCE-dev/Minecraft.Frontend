export default function async ({ store, redirect, route, app }) {

    const routeName = ( route.matched.length === 0 ) ? "index" : route.name;
    
    // Save current route 
    app.context.app.$cookies.set('routePath', routeName);

    // Start validation in loading page
    if ( !store.state.auth.initApplication ) {
        return redirect({ name: "loading" });
    }

    if (store.state.auth.isAuthenticated ) {
        return redirect({ name: "index" });
    } 
}