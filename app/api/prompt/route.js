import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"

//Route to fetch all prompts
export const GET = async(req, res) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch all psots" , {status: 500})
    }
}