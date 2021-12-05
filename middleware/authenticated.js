export default function async ({ store, redirect, route, app }) {

    const routePath = ( route.matched.length === 0 ) ? "index" : route.fullPath;
    
    // Save current route 
    app.context.app.$cookies.set('routePath', routePath);

    if (!store.state.auth.isAuthenticated ) {
        return redirect({ name: 'loading' });
    } 
}