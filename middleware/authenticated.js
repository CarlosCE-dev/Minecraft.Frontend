export default function async ({ store, redirect, route, app }) {

    const routeName = ( route.matched.length === 0 ) ? "index" : route.name;
    
    // Save current route 
    app.context.app.$cookies.set('routePath', routeName);

    if (!store.state.auth.isAuthenticated ) {
        return redirect({ name: 'loading' });
    } 
}