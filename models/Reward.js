import { RarityTypes } from "./enums/RarityTypes";
import { CommandTypes } from "./enums/CommandTypes";

/**
 * Reward model
 */
export default class Reward {
    /**
     * Default constructor for instance
     * @param {object} The reward instance 
     */
     constructor(model = null){
        if (!model) return;
        this.name = model?.name;
        this.title = model?.title;
        this.rarity = parseInt(model?.rarity);
        this.amount = model?.amount;
        this.commandType = parseInt(model?.command_type);
        this.chance = model?.chance;
        this.img = model?.image;
        this.id = model?.id;
    }
    /**
     * 
     */
    id = 0;
    /** 
     * Unique name of the reward
     */
    name = "";
    /**
     * Display name of the reward
     */
    title = "";
    /**
     * Rarity type of the reward
     */
    rarity = RarityTypes.common;
    /**
     * The amount of item given from these rewards
     */
    amount = 1;
    /**
     * The command type for the reward
     */
    commandType = CommandTypes.item;
    /**
     * The chance of getting this item
     */
    chance = 0.00;
    /**
     * Image reference of the reward
     */
    img = "";
}