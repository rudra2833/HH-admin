import { Feedback } from '../models/feedback.model.js';
// for downloading CSV files
import fastCsv from 'fast-csv';

const customerfeedback = async (req, res) => {
    try {
        const result = await Feedback.find({});
        console.log(result);

        const formattedResult = result.map(item => {
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

        // console.log(formattedResult)

        res.render("admin_customerfeed.ejs", {
            db: formattedResult
        });

    } catch (error) {
        console.error("Error in search:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const feedbackDownload = async (req, res) => {
    try {
        const jsonData = await Feedback.find().lean().select("name email message rating createdAt"); // Fetch data from MongoDB
        console.log(jsonData);

        const formattedData = jsonData.map(item => {
            const date = new Date(item.createdAt);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const year = date.getFullYear();

            return {
                ...item,
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

export { customerfeedback, feedbackDownload };
