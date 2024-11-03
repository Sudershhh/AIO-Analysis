import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HistoryItem {
  url: string;
  data: any;
  timestamp: string;
}

interface HistorySidebarProps {
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
}

export default function HistorySidebar({
  history,
  onSelectHistory,
}: HistorySidebarProps) {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <h2 className="text-xl font-semibold mb-4">History</h2>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        {history.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start mb-2 text-left"
            onClick={() => onSelectHistory(item)}
          >
            <div>
              <div className="font-medium truncate">{item.url}</div>
              <div className="text-sm text-gray-500">
                {new Date(item.timestamp).toLocaleString()}
              </div>
            </div>
          </Button>
        ))}
      </ScrollArea>
    </div>
  );
}
