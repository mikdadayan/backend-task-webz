import { RequestHandler } from "express";
import axios from "axios";

import { sendSuccessResponse } from "../../../utils/createResponse";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const apiUrl = `${process.env.BASE_FETCH_API}/users?_page=${page}&_limit=${limit}`;

    const response = await axios.get(apiUrl);
    const users = response.data;

    if (!Array.isArray(users)) {
      throw new Error("Invalid response from external API");
    }

    return sendSuccessResponse(res, "List of all users...", 200, { users });
  } catch (error) {
    let err = error as Error;
    console.error(error);
    next(err);
  }
};
