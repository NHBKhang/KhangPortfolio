import { API_URL, realtimeDB } from "../../../configs/Firebase";
import { ref, get, update } from "firebase/database";
import axios from "axios";

export default async function handler(req, res) {
    const { postId, reactionType } = req.body || req.query;

    try {
        if (req.method === "POST") {
            if (!postId || !reactionType) {
                return res.status(400).json({ error: "Missing postId or reactionType" });
            }

            const postRef = ref(realtimeDB, `post_metrics/${postId}/stats`);
            const reactionRef = ref(realtimeDB, `post_metrics/${postId}/stats/reactions/${reactionType}`);
            const totalReactionsRef = ref(realtimeDB, `post_metrics/${postId}/stats/totalReactions`);

            const reactionSnapshot = await get(reactionRef);
            const totalSnapshot = await get(totalReactionsRef);

            const currentReactionCount = reactionSnapshot.exists() ? reactionSnapshot.val() : 0;
            const currentTotalCount = totalSnapshot.exists() ? totalSnapshot.val() : 0;

            await update(postRef, {
                [`reactions/${reactionType}`]: currentReactionCount + 1,
                totalReactions: currentTotalCount + 1
            });

            return res.status(200).json({
                message: "Reaction added!",
                data: { reactionType }
            });
        }

        return res.status(405).json({ message: "Method Not Allowed" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// ✅ API Calls
export const addReaction = async (postId, reactionType) => {
    try {
        const response = await axios.post(`${API_URL}/reactions`, {
            postId: String(postId),
            reactionType: String(reactionType)
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}