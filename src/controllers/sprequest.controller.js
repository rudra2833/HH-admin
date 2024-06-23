import { Sprequest } from '../models/sprequest.model.js';
// for downloading CSV files
import fastCsv from 'fast-csv';

const sprequest = async (req, res) => {
  try {
    const result = await Sprequest.find({ status: "pending" });
    res.render("admin_new-request.ejs", { db: result });
  } catch (error) {
    console.error("Error submitting the Request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateRequest = async (req, res) => {
  const { id, action } = req.body;

  try {
    const status = action === 'accept' ? 'accepted' : 'rejected';
    await Sprequest.findByIdAndUpdate(id, { status: 'checked', action: status });
    res.redirect("/admin/newrequest");
  } catch (error) {
    console.error("Error updating the Request:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


const requestDownload = async (req, res) => {
    try {
        const jsonData = await Sprequest.find().lean().select("fullname email phoneno status action createdAt "); // Fetch data from MongoDB
        console.log(jsonData);

        const formattedData = jsonData.map(item => {
            const date = new Date(item.createdAt);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const year = date.getFullYear();

            return {
                ...((({ createdAt, ...rest }) => rest)(item)),
                date: date
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
};


export { sprequest, updateRequest , requestDownload};
