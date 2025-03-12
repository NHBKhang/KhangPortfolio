import { API_URL, realtimeDB } from "../../../configs/Firebase";
import { ref, get, update } from "firebase/database";
import axios from "axios";
import { time } from "framer-motion";

export default async function handler(req, res) {
    const { postId, content } = req.body || req.query;

    if (!postId) {
        return res.status(400).json({ error: "Missing postId" });
    }

    try {
        if (req.method === "GET") {

        }
        else if (req.method === "POST") {
            const postRef = ref(realtimeDB, `post_metrics/${postId}`);
            const totalCommentsRef = ref(realtimeDB, `post_metrics/${postId}/stats/totalComments`);

            const totalSnapshot = await get(totalCommentsRef);
            const currentTotalCount = totalSnapshot.exists() ? totalSnapshot.val() : 0;

            await update(postRef, {
                comments: {
                    avatar: Math.floor(Math.random() * 5) + 1,
                    content: content,
                    timestamp: Date.now()
                },
                stats: {
                    totalComments: currentTotalCount + 1
                }
            });

            return res.status(200).json({ message: "Comment added!", postId, content });
        }

        return res.status(405).json({ message: "Method Not Allowed" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// ✅ API Calls
export const addComment = async (postId, content) => {
    try {
        const response = await axios.post(`${API_URL}/comments`, {
            postId: String(postId),
            content: content
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}