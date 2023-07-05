import { Router } from "express";

import { getAllUsers } from "../../controllers/user";

const router = Router();
router.get("/users", getAllUsers);

export default router;
