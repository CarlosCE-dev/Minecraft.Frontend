
const getTomorrowDate = () => {
    const date = new Date();
    return date.setDate(date.getDate() + 1);
}

const addDaysToDate = (days = 1) => {
    const date = new Date();
    return date.setDate(date.getDate() + days);
}

const reverseDateRepresentation = (date) => {
    let parts = date.split('-');
    return `${parts[0]}-${parts[1]}-${parts[2]}`;
};

export {
    getTomorrowDate,
    addDaysToDate,
    reverseDateRepresentation
}