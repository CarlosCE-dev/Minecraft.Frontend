export function orientationType () {
    var mql = window.matchMedia("(orientation: portrait)");
    
    // Portrait
    if(mql.matches) return true;
    // Landscape
    return false;
}