import { useEffect, useRef } from 'react';
import { LAppDelegate } from '@/lib/live2d/demo/lappdelegate';
import { LAppWavFileHandler } from '@/lib/live2d/demo/lappwavfilehandler';
import { LAppLive2DManager } from '@/lib/live2d/demo/lapplive2dmanager';
import { CubismDefaultParameterId } from '../live2d/framework/cubismdefaultparameterid';

export function useLipSyncHandler() {
  const wavFileHandlerRef = useRef<LAppWavFileHandler | null>(null);

  useEffect(() => {
    wavFileHandlerRef.current = new LAppWavFileHandler();

    // リソースのクリーンアップ
    return () => {
      if (wavFileHandlerRef.current) {
        wavFileHandlerRef.current.releasePcmData();
      }
      wavFileHandlerRef.current = null;
    };
  }, []);

  const startLipSync = async (wavFilePath: string) => {
    console.log("startLipSync called");
  
    if (!wavFileHandlerRef.current) {
      console.error("wavFileHandlerRef is not initialized.");
      return;
    }
  
    const success = await wavFileHandlerRef.current.loadWavFile(wavFilePath);
    if (success) {
      console.log("WAV file loaded successfully");
  
      // 音声を再生するためのAudioオブジェクトを作成
      const audio = new Audio(wavFilePath);
      audio.play(); // 音声を再生
  
      wavFileHandlerRef.current.start(wavFilePath); // リップシンク用のWAVファイル処理を開始
      updateLipSync(); // リップシンク開始
    } else {
      console.error("Failed to load WAV file for lip-syncing.");
    }
  };

  const updateLipSync = () => {
    const updateInterval = 16; // 60FPSでリップシンクを更新

    const update = () => {
        const live2DManager = LAppLive2DManager.getInstance();
        const model = live2DManager.getModel(0); // 1番目のモデルを取得

        if (wavFileHandlerRef.current && model && model.getModel()) {
            const cubismModel = model.getModel();
            
            const updated = wavFileHandlerRef.current.update(updateInterval / 1000);

            if (!updated) {
                console.log("WAV file playback finished");
                clearInterval(intervalId); // WAVファイルが終了した場合、リップシンクを停止
                return;
            }

            const rms = wavFileHandlerRef.current.getRms();
            const scaledRms = Math.min(rms * 3, 1); // RMS値を調整
            cubismModel.addParameterValueById("ParamMouthOpenY", scaledRms);
            console.log("Applying scaled RMS to ParamMouthOpenY:", scaledRms);
        }
    };

    const intervalId = setInterval(update, updateInterval);
};

  return {
    startLipSync,
  };
}
