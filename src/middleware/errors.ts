import { CustomError } from "@/errors/customErrors";
import { ErrorRequestHandler } from "express";
import { pick } from "lodash";

export const handleError: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  const isErrorSafeForClient = error instanceof CustomError;

  const clientError = isErrorSafeForClient
    ? pick(error, ["message", "code", "status", "data"])
    : {
        message:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Something went wrong, please contact out support.",
        code: "INTERNAL_ERROR",
        status: 500,
        data: {}
      };

  res.status(clientError.status).send({ error: clientError });
};
