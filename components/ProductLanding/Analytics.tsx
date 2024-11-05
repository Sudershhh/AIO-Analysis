import { Card, CardContent } from "../ui/card";
import { analytics, performanceData } from "@/config/landingPage";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { FileText, BarChart, RefreshCw, Bot } from "lucide-react";
function Analytics() {
  return (
    <section className="mt-32" aria-labelledby="analytics-heading">
      <h2
        id="analytics-heading"
        className="text-3xl font-bold text-gray-900 mb-12 text-center"
      >
        Powerful Analytics Dashboard
      </h2>
      <Card className="max-w-6xl mx-auto">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Chart Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Crawler Performance
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Optimization Score"
                      stroke="url(#colorGradient)"
                      strokeWidth={3}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="crawlers"
                      name="Crawler Activity"
                      stroke="url(#colorGradient2)"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                    />
                    <defs>
                      <linearGradient
                        id="colorGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                      <linearGradient
                        id="colorGradient2"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Metrics Grid */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                {analytics.map((metric) => (
                  <Card key={metric.label}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <metric.icon
                          className="h-5 w-5 text-violet-500"
                          aria-hidden="true"
                        />
                        <span
                          className={`text-sm ${
                            metric.trend === "up"
                              ? "text-green-500"
                              : "text-blue-500"
                          }`}
                        >
                          {metric.trend === "up" && "↑"}
                          {metric.trend === "down" && "↓"}
                          {metric.trend === "stable" && "→"}
                        </span>
                      </div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div className="text-sm text-gray-600">
                        {metric.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default Analytics;
