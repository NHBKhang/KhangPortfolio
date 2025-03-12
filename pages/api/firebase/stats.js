import { API_URL, realtimeDB } from "../../../configs/Firebase";
import { ref, get, set } from "firebase/database";
import axios from "axios";

export default async function handler(req, res) {
    const { postId, postIds } = req.body || req.query;

    try {
        if (req.method === "GET") {
            if (postIds) {
                const ids = postIds.split(",").map(id => id.trim());
                const results = {};

                for (const id of ids) {
                    results[id] = await getPostStat(id);
                }

                return res.status(200).json(results);
            }

            if (postId) {
                return res.status(200).json(await getPostStat(postId));
            }

            return res.status(400).json({ error: "Missing postId or postIds" });
        }

        return res.status(405).json({ message: "Method Not Allowed" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getPostStat = async (postId) => {
    const snapshot = await get(ref(realtimeDB, `post_metrics/${postId}/stats`));
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        const defaultData = {
            reactions: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
            views: 0,
            totalReactions: 0,
            totalComments: 0,
        };
        await set(ref(realtimeDB, `post_metrics/${postId}/stats`), defaultData);
        return defaultData;
    }
}

// ✅ API Calls
export const getPostMetrics = async (postId) => {
    try {
        const response = await axios.get(`${API_URL}/stats?postId=${postId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPostsMetrics = async (postIds) => {
    try {
        const ids = postIds.join(",");
        const response = await axios.get(`${API_URL}/stats?postIds=${ids}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
