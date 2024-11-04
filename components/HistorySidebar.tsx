import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Globe, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-[calc(100vh-48px)]">
      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Analysis History
        </h2>
      </div>

      <ScrollArea className="h-[calc(100vh-6rem)] px-2">
        <div className="space-y-1 py-2">
          {history.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Button
                variant="ghost"
                className="w-full h-auto p-3 justify-start text-left relative group hover:bg-accent"
                onClick={() => onSelectHistory(item)}
              >
                <div className="flex gap-3 items-start min-w-0">
                  <div className="shrink-0 mt-0.5">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm truncate">
                      {item.url}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {new Date(item.timestamp).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
