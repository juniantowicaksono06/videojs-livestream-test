import Joi from "@hapi/joi";

const streamList = [
    "fecnetwork/4280.flv/playlist.m3u8",
    "fecnetwork/17101.flv/playlist.m3u8",
    "fecnetwork/9974.flv/playlist.m3u8"
];

interface IStreamData {
    source: string;
}

export async function GET(req: Request, res: Response) {
    return Response.json({
        code: 200,
        data: {
            liveStreamSource: streamList,
        }
    });
}