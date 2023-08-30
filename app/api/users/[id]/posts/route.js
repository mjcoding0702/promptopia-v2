import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";


// Route to fetch all posts for a specific user
export const GET = async (req, {params}) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({creator: params.id}).populate('creator');

        return new Response(JSON.stringify(prompts), {status: 200})

        
    } catch(error) {
        return new Response("Failed to fetch posts for a user", {status: 500})
    }
}
