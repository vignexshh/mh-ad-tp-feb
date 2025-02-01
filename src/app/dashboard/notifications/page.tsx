import AppLayout  from  '../../AppLayout';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirName = path.basename(__dirname); 


export default function Home() {
  return (
    <AppLayout > 
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        ⚠️ This is  {dirName}, authentication yet to be implemented
      </div>
    </div>
    </AppLayout>

  );
}