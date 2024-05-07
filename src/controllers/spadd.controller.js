import { ServiceInfo } from "../models/serviceprovider.models.js";

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

    try {

        // Create new feedback
        const newprovider = await ServiceInfo.create({
            providername,
        email,
        phoneno,
        adharno,
        birthday,
        password,
        category, 
        pincodes,
        city,
        charges,
        availability
        });

        console.log("Provider is Successfully ADDED!!")
        res.redirect("/admin/spadd");
        
        
    } catch (error) {
        console.error("Error in adding new provider:", error);
        return res.status(500).json({ error: "Internal server error" });
    }

}

export { spadd }