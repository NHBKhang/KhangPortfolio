import dialogflow from 'dialogflow';
import path from 'path';

const sessionClient = new dialogflow.SessionsClient({
    keyFilename: path.join(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS),
});

const projectId = process.env.DIALOGFLOW_PROJECT_ID;

export default async (req, res) => {
    if (req.method === 'POST') {
        const { message, sessionId } = req.body;

        const sessionPath = sessionClient.sessionPath(projectId, sessionId);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: 'vi',
                },
            },
        };

        try {
            const responses = await sessionClient.detectIntent(request);
            const result = responses[0].queryResult;
            res.status(200).json({ response: result.fulfillmentText });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
