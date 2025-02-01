import AppLayout  from  '../../AppLayout';
import { Row, Col } from 'antd';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirName = path.basename(__dirname); 


export default function Home() {
  return (
    <AppLayout>
      {/* Main Container */}
      <div className="flex flex-col h-screen justify-center items-center gap-4 ">
        {/* First Div (Preserves Existing Content) */}
        <div className="text-center mb-8 bg-gray-600 w-full h-50"> {/* Added margin-bottom for spacing */}
          ⚠️ This is {dirName}, authentication yet to be implemented
        </div>

        {/* Second Div (New Content) */}
        <div className="text-center">
          This is the second div with additional content.
        </div>
      </div>
    </AppLayout>
  );
}