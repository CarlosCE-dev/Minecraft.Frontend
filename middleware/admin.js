export default function ({ store, redirect }) {
    
    // If the user is not admin il will be redirected to the index
    if (!store.getters['auth/isAdminOrModerator']) {
        return redirect({ name: "index" });
    }
  }