import { API_URL, realtimeDB } from "../../../configs/Firebase";
import { ref, get, update } from "firebase/database";
import axios from "axios";

export default async function handler(req, res) {
    const { postId } = req.body || req.query;

    if (!postId) {
        return res.status(400).json({ error: "Missing postId" });
    }

    try {
        if (req.method === "POST") {

            const viewRef = ref(realtimeDB, `post_metrics/${postId}/stats/views`);
            const snapshot = await get(viewRef);
            const currentViews = snapshot.exists() ? snapshot.val() : 0;

            await update(ref(realtimeDB, `post_metrics/${postId}/stats`), {
                views: currentViews + 1
            });

            return res.status(200).json({ message: "View added!" });
        }

        return res.status(405).json({ message: "Method Not Allowed" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// ✅ API Calls
export const addView = async (postId) => {
    try {
        const response = await axios.post(`${API_URL}/views`, {
            postId: String(postId)
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}