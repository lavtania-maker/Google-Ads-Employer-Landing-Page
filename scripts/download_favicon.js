import fs from 'fs';
import path from 'path';

const url = "https://s3-ap-southeast-1.amazonaws.com/ricebowl/images/marketing-campaign/image-a1eafa87-cd38-4a27-bda1-c740cab4b30a.jpg";

async function download() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    console.log("Fetching image from:", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), buffer);
    fs.writeFileSync(path.join(publicDir, 'favicon.png'), buffer);
    console.log("Favicon downloaded successfully to public/favicon.ico and public/favicon.png!");
  } catch (error) {
    console.error("Error downloading favicon:", error);
  }
}

download();
