import { auth } from "../../utils/auth";
import { toWebRequest } from "h3"; // Import this utility

export default defineEventHandler(async (event) => {
    // Convert the Nuxt H3Event to a standard Web Request
    const webRequest = toWebRequest(event);
    
    // Pass the Web Request to Better-Auth
    return auth.handler(webRequest);
});