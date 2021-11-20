
const getTomorrowDate = () => {
    const date = new Date();
    return date.setDate(date.getDate() + 1);
}

const addDaysToDate = (days = 1) => {
    const date = new Date();
    return date.setDate(date.getDate() + days);
}

export {
    getTomorrowDate,
    addDaysToDate
}