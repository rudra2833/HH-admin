import { ServiceInfo } from "../models/serviceprovider.models.js";
import { ApiError } from '../utils/APIerror.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'

const spadd = async (req, res) => {

    console.log(req.body);

    const { providername,
        email,
        phoneno,
        adharno,
        birthday,
        password,
        category, 
        pincodes,
        city,
        charges,
        availability } = req.body;

    //here
    const pincodesarr = pincodes.split(',').map(pin => pin.trim());
    console.log(pincodesarr);


    if ([ providername, category, pincodesarr , city ,charges ].every(field => field && field.trim() === "")) {
        return res.status(400).json({ error: "All fields are required" });
    }


    // checkking the existing user
    const existuser = await ServiceInfo.findOne({
        $or: [{ email }, { adharno }]
    })
    if (existuser) {
        throw new ApiError(409, "User with email or adharno already exists")
    }


    // Checking if avatar file is not provided
    if (!req.files || !req.files.avatar || req.files.avatar.length === 0) {
        throw new ApiError(400, "Avatar file not found");
    }

    // Uploading avatar file to Cloudinary
    const avatarLocalPath = req.files.avatar[0].path;
    const avatarUrl = await uploadOnCloudinary(avatarLocalPath);
    if (!avatarUrl) {
        throw new ApiError(400, "Failed to upload avatar to Cloudinary");
    }


    // for spid number
    const totalId = await ServiceInfo.find().countDocuments();
    const SPID = `HH${totalId + 1}`; 

    console.log(SPID);


    try {

        // Create new feedback
        const newprovider = await ServiceInfo.create({
            spid: SPID,
            providername,
        email,
        phoneno,
        adharno,
        birthday,
        password,
        category, 
        pincodes: pincodesarr,
        city: city.toLowerCase(),
        charges,
        availability,
        avatar:avatarUrl.url,
        });

        console.log("Provider is Successfully ADDED!!")
        res.redirect("/admin/spadd");
        
        
    } catch (error) {
        console.error("Error in adding new provider:", error);
        return res.status(500).json({ error: "Internal server error" });
    }

}

export { spadd }