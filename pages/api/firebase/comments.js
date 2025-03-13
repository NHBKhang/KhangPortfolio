import { API_URL, realtimeDB } from "../../../configs/Firebase";
import { ref, get, update, set } from "firebase/database";
import axios from "axios";
import data from '../data/users.json';

export default async function handler(req, res) {
    const { postId, content } = req.body || req.query;

    if (!postId) {
        return res.status(400).json({ error: "Missing postId" });
    }

    try {
        if (req.method === "GET") {
            const users = getUsers();
            const commentsRef = ref(realtimeDB, `post_metrics/${postId}/comments`);

            const snapshot = await get(commentsRef);
            let value = {};
            if (snapshot.exists()) {
                value = snapshot.val();
            } else {
                await set(ref(realtimeDB, `post_metrics/${postId}/comments`), {});
            }

            const data = Object.values(value).map(item => ({
                user: users[item.user],
                content: item.content,
                timestamp: item.timestamp
            }));

            return res.status(200).json({ message: "Comments loaded!", data });
        }
        else if (req.method === "POST") {
            const postRef = ref(realtimeDB, `post_metrics/${postId}`);
            const totalSnapshot = await get(ref(realtimeDB, `post_metrics/${postId}/stats/totalComments`));
            const currentTotalCount = totalSnapshot.exists() ? totalSnapshot.val() : 0;

            const commentId = Date.now();
            const comment = {
                user: Math.floor(Math.random() * 5) + 1,
                content,
                timestamp: commentId
            };

            await update(postRef, {
                [`comments/${commentId}`]: comment,
                [`stats/totalComments`]: currentTotalCount + 1
            });

            comment.user = getUser(comment.user);

            return res.status(200).json({ message: "Comment added!", data: comment });
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

export const getComments = async (postId) => {
    try {
        const response = await axios.get(`${API_URL}/comments?postId=${postId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const getUsers = () => {
    return data;
};

const getUser = (id) => {
    return data[id] || null;
};