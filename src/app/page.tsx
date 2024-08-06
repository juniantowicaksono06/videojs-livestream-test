"use client"
import VideoPlayer from "@/components/VideoPlayer";
import { useEffect, useState } from "react";

interface IListStream {
    liveStreamSource: string[];
}

export default function Home() {
  const [listSource, setListSource] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>("");
  async function getAllSource() {
    const response = await fetch(`${window.location.origin}/api/livestream`);
    if(response.ok) {
      const result: {
        code: number;
        data: IListStream;
      } = await response.json();
      if(result.code == 200) {
        setListSource(result.data.liveStreamSource);
      }
    }
  }
  useEffect(() => {
    getAllSource();
  }, []);
  return (
    <main className="w-full lg:w-1/2 mx-auto pt-5">
      <div>
        <h1 className="text-2xl mb-5 text-center">VideoJS Livestream Tes</h1>
        <div className="flex justify-center" id="listAllSource">
          {
            listSource.map((source, index) => {
              return (
                <button className={selectedSource == source ? "bg-green-500 hover:bg-green-700 px-3 py-2 mr-2 rounded-xl" : "bg-blue-500 hover:bg-blue-700 px-3 py-2 mr-2 rounded-xl"} key={index} onClick={() => {
                  if(source != selectedSource) {
                    setSelectedSource(source);
                  }
                }}>
                  Source {index + 1}
                </button>
              )
            })
          }
        </div>
        <div className="flex justify-center mt-5">
          {
            selectedSource != "" ?
            <VideoPlayer src={`${window.location.origin}/api/livestream/${selectedSource}`} />
            : <></>
          }
        </div>
      </div>
    </main>
  );
}
