import { RarityTypes } from "./enums/RarityTypes";
import { CommandTypes } from "./enums/CommandTypes";

/**
 * Reward model
 */
export default class Reward {
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