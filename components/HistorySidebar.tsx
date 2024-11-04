import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

interface HistoryItem {
  url: string;
  data: any;
  timestamp: string;
}

interface HistorySidebarProps {
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
  selectedUrl?: string;
}

export default function HistorySidebar({
  history,
  onSelectHistory,
  selectedUrl,
}: HistorySidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = useMemo(
    () =>
      history.filter((item) =>
        item.url.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, history]
  );

  return (
    <div className="w-72 h-screen border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col overflow-y-auto">
      <div className="p-4 border-b space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9 text-sm"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-2 overflow-y-auto">
        {filteredHistory.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            {searchQuery ? "No matching results" : "No history yet"}
          </div>
        ) : (
          <div className="space-y-1 py-2">
            {filteredHistory.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  variant="ghost"
                  className={`w-full h-auto p-3 justify-start text-left relative group 
                  ${
                    selectedUrl === item.url
                      ? "bg-accent/80 hover:bg-accent/60 shadow-sm"
                      : "hover:bg-accent/30"
                  }
                  transition-all duration-200 ease-in-out
                `}
                  onClick={() => onSelectHistory(item)}
                >
                  <div className="flex items-start justify-between w-full">
                    <div className="min-w-0 flex-1">
                      <div
                        className={`font-medium text-sm truncate ${
                          selectedUrl === item.url ? "text-primary" : ""
                        }`}
                      >
                        {item.url
                          .replace(/^https?:\/\/(www\.)?/i, "")
                          .replace("/robots.txt", "")}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5 text-right">
                        {new Date(item.timestamp).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 transition-opacity duration-200 ${
                        selectedUrl === item.url
                          ? "opacity-100 text-primary"
                          : "text-muted-foreground/50 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
