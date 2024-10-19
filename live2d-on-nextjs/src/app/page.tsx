import Live2dView from '@/components/live2d/live2dView';
import { useLipSyncHandler } from '@/lib/hooks/useLipSyncHandler';
import Main from '@/components/voicevox/main';

export default function Home() {
  return (
   <>
   <div className="relative bg-[url('/images/school03.png')] bg-cover bg-center h-[100vh] w-full">
        <div className="absolute top-0 left-0 w-full h-full">
          <Live2dView />
        </div>

        <div className="w-[50%] opacity-75 absolute left-1/2 top-[60%] transform -translate-x-1/2 -translate-y-1/2">
          <Main />
        </div>

      </div>
   </>
  );
}
