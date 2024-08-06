import { NextRequest } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateRandomString } from '@/shared/helper';


export async function GET(req: NextApiRequest, { params }: { params: { source: string, type: string; filename: string } }, res: NextApiResponse) {
    const { source, type, filename } = params;

    let id = generateRandomString(24);
  
    const response = await fetch(`https://videos-3.earthcam.com/${source}/${type}/${filename}?t=${id}`, {
        headers: {
            'Referer': 'https://www.earthcam.com/'
        }
    });
    if(response.ok) {
        const m3u8Content = response.body;
        return new Response(m3u8Content, {
            headers: {
                'Content-Type': filename.endsWith('m3u8') ? 'application/vnd.apple.mpegurl' : 'video/MP2T'
            }
        });
    }

    return Response.json({
        code: 400,
        message: "Bad Request"
    });
}