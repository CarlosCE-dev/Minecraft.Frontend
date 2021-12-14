/**
 * The event status types
 */
 export const EventStatusTypes = {
    /**
     * First status when a event is created
     */
    created: 0,
    /**
     * Represents when a event has started
     */
    started: 1,
    /**
     * Pause event that can be available when a event is active
     */
    paused: 2,
    /**
     * Cancel current ongoing event
     */
    canceled: 3,
    /**
     * Represents when a event has finished
     */
    finished: 4
}