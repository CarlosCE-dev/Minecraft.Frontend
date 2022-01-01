import { addDaysToDate } from "@/modules/shared/helpers/dateHelper";

/**
 * Group of rewards
 */
export default class Group {
    /**
     * Default constructor for instance
     * @param {object} The group instance 
     */
     constructor(model = null){
        if (!model) return;
        this.id = model?.id;
        this.title = model?.title;
        this.description = model?.description;
        this.isActive = model?.isActive;
        this.type = model?.type;
        this.price = model?.price;

        if (!model?.start_date || !model?.end_date) return
        this.startDate = new Date(model?.start_date).toISOString().substr(0, 10);
        this.endDate = new Date(model?.end_date).toISOString().substr(0, 10);
    }
    /**
     * Primary key of group
     */
    id = 0;
    /**
     * Title of the group
     */
    title = "";
    /**
     * Description of the group
     */
    description = "";
    /**
     * Flag that indicates if the group is active
     */
    isActive = false;
    /**
     * Start date of the group
     */
    startDate = new Date().toISOString().substr(0, 10);
    /**
     * End date of the group
     */
    endDate = new Date(addDaysToDate(5)).toISOString().substr(0, 10);
    /**
     * Type based on the event types
     */
    type = 0;
    /**
     * Price cost for event
     */
    price = 20;
}
