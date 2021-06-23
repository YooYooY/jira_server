import { catchErrors } from "@/errors";
import createAccount from "@/database/createGuestAccount";
import { signToken } from "@/utils/authToken";

export const getUserMsg =catchErrors(async (req, res)=>{
    res.respond(req.currentUser || {})
})

export const createGuestAccount = catchErrors(async (_req, res) => {
  const user = await createAccount();
  res.respond({
    authToken: signToken({ sub: user.id })
  });
});
