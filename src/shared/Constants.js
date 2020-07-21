/**
 * Size of a users batch
 */
export const BATCH_SIZE = 50;
/**
 * Size of the users catalog (when so many users have been loaded no more will).
 */
export const CATALOG_SIZE = 20 * BATCH_SIZE;
/**
 * Seed for the generation of the users (on randomuser.me service).
 * We're passing a seed to ensure that randomuser.me generates batches
 * of users consistend among each other (e.g. it doesn'r regenerate the same user multiple times)
 */
export const SEED = "XYZ";
/**
 * Base URI of the randomuser.me service.
 */
export const RANDOMUSER_ME_BASE_URL = "https://randomuser.me/api/";
/**
 * Nubmer of the columns in the user grid
 */
export const NUMBER_OF_COLUMNS = 5;
