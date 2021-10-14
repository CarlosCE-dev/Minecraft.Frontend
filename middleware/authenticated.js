export default function async ({ store, redirect, route, app }) {

    console.log("Auth middleware");

    const routeName = ( route.matched.length === 0 ) ? "index" : route.name;
    
    // Save current route 
    app.context.app.$cookies.set('routePath', routeName);

    console.log("is Auth?", store.state.auth.isAuthenticated);

    if (!store.state.auth.isAuthenticated ) {
        return redirect({ name: 'loading' });
    } 
}