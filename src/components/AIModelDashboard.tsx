import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, 
  Eye, 
  Brain, 
  Network, 
  Database, 
  Gauge, 
  Activity, 
  Target,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Layers,
  GitBranch,
  Workflow
} from "lucide-react";

interface ModelMetrics {
  name: string;
  accuracy: number;
  latency: number;
  throughput: number;
  status: "active" | "training" | "idle";
  confidence: number;
  lastUpdated: string;
}

const AIModelDashboard = () => {
  const [models, setModels] = useState<ModelMetrics[]>([
    {
      name: "Computer Vision Engine",
      accuracy: 98.7,
      latency: 8,
      throughput: 120,
      status: "active",
      confidence: 99.1,
      lastUpdated: "2 min ago"
    },
    {
      name: "NLP Sentiment Analyzer",
      accuracy: 96.2,
      latency: 5,
      throughput: 200,
      status: "active",
      confidence: 94.8,
      lastUpdated: "1 min ago"
    },
    {
      name: "Emotion Recognition",
      accuracy: 94.8,
      latency: 12,
      throughput: 83,
      status: "active",
      confidence: 92.7,
      lastUpdated: "30 sec ago"
    },
    {
      name: "Engagement Predictor",
      accuracy: 89.5,
      latency: 15,
      throughput: 67,
      status: "training",
      confidence: 87.3,
      lastUpdated: "5 min ago"
    },
    {
      name: "Speech Recognition",
      accuracy: 96.2,
      latency: 150,
      throughput: 30,
      status: "active",
      confidence: 95.1,
      lastUpdated: "1 min ago"
    },
    {
      name: "Bias Detection Engine",
      accuracy: 92.1,
      latency: 25,
      throughput: 45,
      status: "active",
      confidence: 88.9,
      lastUpdated: "3 min ago"
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    totalModels: 12,
    activeModels: 10,
    cpuUsage: 23,
    gpuUsage: 67,
    memoryUsage: 45,
    dataProcessed: 2.3,
    averageLatency: 15,
    systemUptime: 99.9
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setModels(prev => prev.map(model => ({
        ...model,
        accuracy: Math.max(85, Math.min(99.9, model.accuracy + (Math.random() - 0.5) * 0.2)),
        latency: Math.max(1, model.latency + (Math.random() - 0.5) * 2),
        confidence: Math.max(80, Math.min(99.9, model.confidence + (Math.random() - 0.5) * 0.3))
      })));

      setSystemMetrics(prev => ({
        ...prev,
        cpuUsage: Math.max(10, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 5)),
        gpuUsage: Math.max(30, Math.min(95, prev.gpuUsage + (Math.random() - 0.5) * 3)),
        memoryUsage: Math.max(20, Math.min(80, prev.memoryUsage + (Math.random() - 0.5) * 4))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "training": return "bg-yellow-500";
      case "idle": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge className="bg-green-500/20 text-green-700">Active</Badge>;
      case "training": return <Badge className="bg-yellow-500/20 text-yellow-700">Training</Badge>;
      case "idle": return <Badge className="bg-gray-500/20 text-gray-700">Idle</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-primary" />
          AI System Performance Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{systemMetrics.totalModels}</div>
            <div className="text-sm text-muted-foreground">Total Models</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{systemMetrics.activeModels}</div>
            <div className="text-sm text-muted-foreground">Active Models</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">{systemMetrics.dataProcessed}M</div>
            <div className="text-sm text-muted-foreground">Data Points/Hr</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">{systemMetrics.averageLatency}ms</div>
            <div className="text-sm text-muted-foreground">Avg Latency</div>
          </div>
        </div>
      </Card>

      {/* Resource Usage */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium flex items-center gap-2">
              <Cpu className="w-4 h-4" /> CPU Usage
            </span>
            <span className="text-sm font-bold">{systemMetrics.cpuUsage}%</span>
          </div>
          <Progress value={systemMetrics.cpuUsage} className="h-2" />
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4" /> GPU Usage
            </span>
            <span className="text-sm font-bold">{systemMetrics.gpuUsage}%</span>
          </div>
          <Progress value={systemMetrics.gpuUsage} className="h-2" />
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium flex items-center gap-2">
              <Database className="w-4 h-4" /> Memory
            </span>
            <span className="text-sm font-bold">{systemMetrics.memoryUsage}%</span>
          </div>
          <Progress value={systemMetrics.memoryUsage} className="h-2" />
        </Card>
      </div>

      {/* Model Performance Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map((model, index) => (
          <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {model.name.includes("Vision") && <Eye className="w-5 h-5 text-primary" />}
                {model.name.includes("NLP") && <Brain className="w-5 h-5 text-accent" />}
                {model.name.includes("Emotion") && <Target className="w-5 h-5 text-secondary" />}
                {model.name.includes("Engagement") && <TrendingUp className="w-5 h-5 text-primary" />}
                {model.name.includes("Speech") && <Activity className="w-5 h-5 text-accent" />}
                {model.name.includes("Bias") && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                <h4 className="font-semibold text-sm">{model.name}</h4>
              </div>
              {getStatusBadge(model.status)}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Accuracy</span>
                <span className="text-sm font-bold text-primary">{model.accuracy.toFixed(1)}%</span>
              </div>
              <Progress value={model.accuracy} className="h-1" />

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Latency:</span>
                  <span className="font-medium ml-1">{model.latency}ms</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Throughput:</span>
                  <span className="font-medium ml-1">{model.throughput}/s</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Confidence: {model.confidence.toFixed(1)}%</span>
                <span className="text-muted-foreground">{model.lastUpdated}</span>
              </div>

              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(model.status)} animate-pulse`} />
                <span className="text-xs text-muted-foreground">
                  {model.status === "active" ? "Processing" : model.status === "training" ? "Learning" : "Standby"}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Pipeline Visualization */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Workflow className="w-5 h-5 text-primary" />
          AI Processing Pipeline
        </h3>
        <div className="flex items-center justify-between">
          {[
            { name: "Input", icon: Database, color: "text-gray-500" },
            { name: "CV Processing", icon: Eye, color: "text-primary" },
            { name: "NLP Analysis", icon: Brain, color: "text-accent" },
            { name: "ML Inference", icon: Network, color: "text-secondary" },
            { name: "Output", icon: Target, color: "text-green-600" }
          ].map((stage, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`p-3 rounded-full bg-muted ${stage.color}`}>
                <stage.icon className="w-6 h-6" />
              </div>
              <span className="text-xs mt-2 text-center">{stage.name}</span>
              {index < 4 && (
                <div className="absolute mt-6 ml-12 w-8 h-0.5 bg-gradient-to-r from-primary to-accent" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* System Health */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Gauge className="w-5 h-5 text-green-600" />
          System Health Status
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-medium text-green-800">All Systems Operational</div>
              <div className="text-sm text-green-600">Uptime: {systemMetrics.systemUptime}%</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
            <Activity className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-medium text-blue-800">Processing Active</div>
              <div className="text-sm text-blue-600">12 models running</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 border border-purple-200">
            <Layers className="w-5 h-5 text-purple-600" />
            <div>
              <div className="font-medium text-purple-800">Auto-scaling Active</div>
              <div className="text-sm text-purple-600">Load balanced</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIModelDashboard;