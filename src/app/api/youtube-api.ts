import axios from "axios"


const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
export const getYouTubeInfo = async(videoId: string) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`)
    const videoInfo = response.data.items[0]
    return videoInfo
  } catch (error) {
    console.log("youtubeAPI ERROR ", error)
    return 
 }
}