import { asyncHandler } from "../utils/AsnycHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  /*
  get user data from the frontend
  validate that data , check for empty or null or valid data
  check for existing user , username, email
  check for files , avatar, coverImage, and there validity
  upload files to cloudinary  
  create user object - create entry in db
  remove password and refresh token field from response
  check for user creation
  return the response
  */

  const { email, username, fullName, password } = req.body();

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  )
    return new ApiError(400);

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) throw new ApiError(409, "username or email already exists");

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

  const avatarUrl = await uploadOnCloudinary(avatarLocalPath);
  const coverImageUrl = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatarUrl) throw new ApiError(400, "Avatar file is required");

  const user = await User.create({
    fullName,
    avatar: avatarUrl.url,
    coverImage: coverImageUrl?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  //  use minus sign to remove any field from response : spearate each field by space

  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering a user");

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered succesffuly"));
});

export { registerUser };
