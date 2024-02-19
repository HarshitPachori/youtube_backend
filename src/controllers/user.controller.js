import { asyncHandler } from "../utils/AsnycHandler.js";
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "OK" });
});

export { registerUser };
