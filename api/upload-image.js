import { createClient } from "@supabase/supabase-js";
import formidable from "formidable";
import fs from "fs";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY 
);

export const config = {
    api: {
        bodyParser: false, // disable Next.js body parsing
    },
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: "File parse error" });

        const file = files.file;
        if (!file) return res.status(400).json({ error: "No file uploaded" });

        try {
            const fileData = fs.readFileSync(file.filepath); // read file buffer
            const ext = file.originalFilename.split(".").pop();
            const fileName = `products/images/${Date.now()}-${Math.random()
                .toString(36)
                .slice(2)}.${ext}`;

            const { error } = await supabase.storage
                .from("products")
                .upload(fileName, fileData, {
                    contentType: file.mimetype,
                    upsert: false,
                });

            if (error) throw error;

            const { data } = supabase.storage.from("products").getPublicUrl(fileName);

            res.status(200).json({ url: data.publicUrl });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    });
}
