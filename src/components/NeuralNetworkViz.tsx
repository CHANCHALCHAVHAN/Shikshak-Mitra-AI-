import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Zap, 
  Activity, 
  Network, 
  Layers,
  Play,
  Pause,
  RotateCcw,
  Settings
} from "lucide-react";

interface Neuron {
  id: string;
  x: number;
  y: number;
  activation: number;
  layer: number;
  type: "input" | "hidden" | "output";
}

interface Connection {
  from: string;
  to: string;
  weight: number;
  active: boolean;
}

const NeuralNetworkViz = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [neurons, setNeurons] = useState<Neuron[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [currentEpoch, setCurrentEpoch] = useState(1247);
  const [accuracy, setAccuracy] = useState(94.8);
  const [loss, setLoss] = useState(0.023);

  // Initialize neural network structure
  useEffect(() => {
    const newNeurons: Neuron[] = [];
    const newConnections: Connection[] = [];
    
    // Network architecture: 8-16-12-8-3 (Input-Hidden-Hidden-Hidden-Output)
    const layers = [8, 16, 12, 8, 3];
    const layerSpacing = 120;
    const neuronSpacing = 40;
    
    let neuronId = 0;
    
    // Create neurons for each layer
    layers.forEach((layerSize, layerIndex) => {
      const startY = (400 - (layerSize - 1) * neuronSpacing) / 2;
      
      for (let i = 0; i < layerSize; i++) {
        newNeurons.push({
          id: `neuron-${neuronId++}`,
          x: 50 + layerIndex * layerSpacing,
          y: startY + i * neuronSpacing,
          activation: Math.random(),
          layer: layerIndex,
          type: layerIndex === 0 ? "input" : layerIndex === layers.length - 1 ? "output" : "hidden"
        });
      }
    });
    
    // Create connections between adjacent layers
    layers.forEach((layerSize, layerIndex) => {
      if (layerIndex < layers.length - 1) {
        const currentLayerStart = layers.slice(0, layerIndex).reduce((sum, size) => sum + size, 0);
        const nextLayerStart = layers.slice(0, layerIndex + 1).reduce((sum, size) => sum + size, 0);
        
        for (let i = 0; i < layerSize; i++) {
          for (let j = 0; j < layers[layerIndex + 1]; j++) {
            newConnections.push({
              from: `neuron-${currentLayerStart + i}`,
              to: `neuron-${nextLayerStart + j}`,
              weight: (Math.random() - 0.5) * 2,
              active: false
            });
          }
        }
      }
    });
    
    setNeurons(newNeurons);
    setConnections(newConnections);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      // Update neuron activations
      setNeurons(prev => prev.map(neuron => ({
        ...neuron,
        activation: Math.max(0, Math.min(1, neuron.activation + (Math.random() - 0.5) * 0.3))
      })));
      
      // Update connections
      setConnections(prev => prev.map(conn => ({
        ...conn,
        active: Math.random() > 0.7,
        weight: Math.max(-2, Math.min(2, conn.weight + (Math.random() - 0.5) * 0.1))
      })));
      
      // Update training metrics
      setCurrentEpoch(prev => prev + 1);
      setAccuracy(prev => Math.max(90, Math.min(99.9, prev + (Math.random() - 0.5) * 0.2)));
      setLoss(prev => Math.max(0.001, Math.min(0.1, prev + (Math.random() - 0.5) * 0.005)));
    }, 200);
    
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections
    connections.forEach(conn => {
      const fromNeuron = neurons.find(n => n.id === conn.from);
      const toNeuron = neurons.find(n => n.id === conn.to);
      
      if (fromNeuron && toNeuron) {
        ctx.beginPath();
        ctx.moveTo(fromNeuron.x + 15, fromNeuron.y + 15);
        ctx.lineTo(toNeuron.x + 15, toNeuron.y + 15);
        
        // Color based on weight and activity
        const opacity = conn.active ? 0.8 : 0.3;
        const color = conn.weight > 0 ? `rgba(59, 130, 246, ${opacity})` : `rgba(239, 68, 68, ${opacity})`;
        ctx.strokeStyle = color;
        ctx.lineWidth = Math.abs(conn.weight) * 2;
        ctx.stroke();
      }
    });
    
    // Draw neurons
    neurons.forEach(neuron => {
      ctx.beginPath();
      ctx.arc(neuron.x + 15, neuron.y + 15, 15, 0, 2 * Math.PI);
      
      // Color based on activation and type
      let color;
      switch (neuron.type) {
        case "input":
          color = `rgba(34, 197, 94, ${0.3 + neuron.activation * 0.7})`;
          break;
        case "output":
          color = `rgba(239, 68, 68, ${0.3 + neuron.activation * 0.7})`;
          break;
        default:
          color = `rgba(59, 130, 246, ${0.3 + neuron.activation * 0.7})`;
      }
      
      ctx.fillStyle = color;
      ctx.fill();
      
      // Border
      ctx.strokeStyle = neuron.type === "input" ? "#22c55e" : neuron.type === "output" ? "#ef4444" : "#3b82f6";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Activation value
      if (neuron.activation > 0.7) {
        ctx.fillStyle = "white";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.fillText(neuron.activation.toFixed(1), neuron.x + 15, neuron.y + 20);
      }
    });
    
    // Draw layer labels
    const layerNames = ["Input Layer", "Hidden Layer 1", "Hidden Layer 2", "Hidden Layer 3", "Output Layer"];
    layerNames.forEach((name, index) => {
      ctx.fillStyle = "#6b7280";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(name, 50 + index * 120 + 15, 30);
    });
    
  }, [neurons, connections]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const resetNetwork = () => {
    setNeurons(prev => prev.map(neuron => ({
      ...neuron,
      activation: Math.random()
    })));
    setCurrentEpoch(0);
    setAccuracy(85);
    setLoss(0.1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold text-blue-900">Neural Network Visualization</h3>
              <p className="text-sm text-blue-700">Real-time Deep Learning Model Training</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAnimation}
              className="flex items-center gap-2"
            >
              {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isAnimating ? "Pause" : "Start"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetNetwork}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Training Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Epoch</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{currentEpoch.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Training iterations</div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-green-600" />
            <span className="font-medium">Accuracy</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{accuracy.toFixed(2)}%</div>
          <div className="text-sm text-muted-foreground">Model performance</div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Network className="w-5 h-5 text-red-600" />
            <span className="font-medium">Loss</span>
          </div>
          <div className="text-2xl font-bold text-red-600">{loss.toFixed(4)}</div>
          <div className="text-sm text-muted-foreground">Training error</div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-5 h-5 text-purple-600" />
            <span className="font-medium">Parameters</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">2.4M</div>
          <div className="text-sm text-muted-foreground">Trainable weights</div>
        </Card>
      </div>

      {/* Neural Network Canvas */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            Network Architecture: 8-16-12-8-3
          </h4>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-100 text-green-800">Input Neurons</Badge>
            <Badge className="bg-blue-100 text-blue-800">Hidden Neurons</Badge>
            <Badge className="bg-red-100 text-red-800">Output Neurons</Badge>
          </div>
        </div>
        
        <div className="relative bg-gray-50 rounded-lg p-4 overflow-x-auto">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="border border-gray-200 rounded"
          />
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>• Line thickness represents connection weight strength</p>
          <p>• Blue lines: positive weights, Red lines: negative weights</p>
          <p>• Neuron brightness indicates activation level</p>
          <p>• Real-time forward propagation simulation</p>
        </div>
      </Card>

      {/* Model Architecture Details */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-600" />
          Model Configuration
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Architecture:</span>
              <span className="text-sm font-medium">Deep Feedforward Network</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Activation Function:</span>
              <span className="text-sm font-medium">ReLU + Sigmoid</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Optimizer:</span>
              <span className="text-sm font-medium">Adam (lr=0.001)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Batch Size:</span>
              <span className="text-sm font-medium">32</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Dropout Rate:</span>
              <span className="text-sm font-medium">0.2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Regularization:</span>
              <span className="text-sm font-medium">L2 (λ=0.01)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Training Data:</span>
              <span className="text-sm font-medium">50K samples</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Validation Split:</span>
              <span className="text-sm font-medium">20%</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NeuralNetworkViz;