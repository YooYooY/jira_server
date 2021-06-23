import { catchErrors } from "@/errors";

export const getUserMsg =catchErrors(async (req, res)=>{
    res.respond(req.currentUser || {})
})