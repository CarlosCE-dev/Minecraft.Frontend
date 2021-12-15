import { EventStatusTypes } from "~/models/enums/EventStatusTypes";

const colorEventStatusTypes = {
    [EventStatusTypes.created]: "info",
    [EventStatusTypes.started]: "green",
    [EventStatusTypes.paused]: "blue-grey",
    [EventStatusTypes.canceled]: "amber",
    [EventStatusTypes.finished]: "indigo",
}

const nameEventStatusTypes = {
    [EventStatusTypes.created]: "Created",
    [EventStatusTypes.started]: "Started",
    [EventStatusTypes.paused]: "Paused",
    [EventStatusTypes.canceled]: "Canceled",
    [EventStatusTypes.finished]: "Finished",
}

const getColorForEventStatusType = (eventStatusType = 0) => {
    return colorEventStatusTypes[eventStatusType];
}

const getNameForEventStatusType = (eventStatusType = 0) => {
    return nameEventStatusTypes[eventStatusType];
}

export {
    getColorForEventStatusType,
    getNameForEventStatusType
}