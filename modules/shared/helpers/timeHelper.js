const getTimeInSeconds = (timeUnit = "", unit = 0) => {
    switch (timeUnit) {
        case "minutes":
            return unit * 60;
        case "hours":
            return unit * 60 * 60;
        default:
            return unit;
    }
}

export {
    getTimeInSeconds
}