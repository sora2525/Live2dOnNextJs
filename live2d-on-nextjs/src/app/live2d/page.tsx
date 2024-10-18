'use client'
import Live2dView from '@/components/live2d/live2dView';
import { useLipSyncHandler } from '@/lib/hooks/useLipSyncHandler';

export default function Live2D() {
  const { startLipSync } = useLipSyncHandler();

  const handlePlayAudio = () => {
    const audioFilePath = '/audio/sample.wav'; // 音声ファイルのパス
    startLipSync(audioFilePath); // リップシンクを開始
  };

  return (
    <>
      <button onClick={handlePlayAudio}>音声とリップシンク開始</button>
      <div className="bg-[url('/images/school03.png')] bg-cover bg-center h-[100%] w-full">
        <Live2dView />
      </div>
    </>
  );
}
