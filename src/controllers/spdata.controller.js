import { ServiceInfo } from "../models/serviceprovider.models.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js'
// for downloading CSV files
import fastCsv from 'fast-csv';

const spsearch = async (req, res) => {

    try {
        const { spid } = req.body;
        const respond = await ServiceInfo.find({ spid: spid });

        if (!respond) {
            return res.status(404).json({ error: "No such service provider found" });
        }

        const formattedResult = respond.map(item => {
            const date = new Date(item.createdAt);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const year = date.getFullYear();

            return {
                ...item.toObject(),
                day: day,
                month: month,
                year: year
            };
        });

        res.render('admin_spdata.ejs', { db: formattedResult, message: true});

    } catch (error) {
        console.error("Error in search:", error);
        return res.status(500).json({ error: "Internal server error" });

    }
};




//for updating the sp data
const spdataupdate = async (req, res) => {

    // console.log(req.body);
    const { spid,
        email,
        phoneno,
        password,
        pincodes,
        city,
        charges,
        availability,
    } = req.body;

    //here
    const pincodesarr = pincodes.split(',').map(pin => pin.trim());
    // console.log(pincodesarr);


    if ([email, phoneno, pincodesarr, city, charges].every(field => field && field.trim() === "")) {
        return res.status(400).json({ error: "All fields are required" });
    }


    try {

        // Checking if avatar file is not provided
        if (!req.files || !req.files.avatar || req.files.avatar.length === 0) {

            const respond = await ServiceInfo.findOneAndUpdate({ spid: spid }, {
                email,
                phoneno,
                password,
                pincodes: pincodesarr,
                city: city.toLowerCase(),
                charges,
                availability,
            }, { new: true });

            if (!respond) {
                return res.status(404).json({ error: "No such service provider found" });
            }

            console.log(respond);
            console.log("Successfully updated the data of the service provider");

        } else{

            // Uploading avatar file to Cloudinary
            const avatarLocalPath = req.files.avatar[0].path;
            console.log(avatarLocalPath);

            const avatarUrl = await uploadOnCloudinary(avatarLocalPath);
            console.log(avatarUrl);

            if (!avatarUrl) {
                return res.status(400).json({error: "Failed to upload avatar to Cloudinary"});
            }

            const respond = await ServiceInfo.findOneAndUpdate({ spid: spid }, {
                email,
                phoneno,
                password,
                pincodes: pincodesarr,
                city: city.toLowerCase(),
                charges,
                availability,
                avatar:avatarUrl.url,

            }, { new: true });

            if (!respond) {
                return res.status(404).json({ error: "No such service provider found" });
            }

            console.log(respond);
            console.log("Successfully updated the data of the service provider");

        }


        res.redirect('/admin/spdata');

    } catch (error) {
        console.error("Error in update:", error);
        return res.status(500).json({ error: "Internal server error" });

    }

};



const spdataDownload = async (req,res) => {

    try{

        const jsonData = await ServiceInfo.find().lean().select("spid providername email phoneno adharno birthday category charges rating availability city pincodes "); // Fetch data from MongoDB
        console.log(jsonData);

        const formattedData = jsonData.map(item => {
            const date = new Date(item.birthday);
            const d = date.getDate();

            return {
                ...item,
                date: d
            };
        });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');

        fastCsv
            .write(formattedData, { headers: true })
            .pipe(res);


    } catch (error) {
        console.error("Error in search:", error);
        return res.status(500).json({ error: "Internal server error" });
    }

}



export { spsearch, spdataupdate, spdataDownload }
