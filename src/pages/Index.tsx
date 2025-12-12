import { useState } from "react";
import FeedbackForm from "@/components/ui/form";
import heroImage from "@/assets/hero.jpg";
// Video is in public folder, use direct path
const analysisVideo = "/output_accurate.mp4";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Shield, 
  Zap, 
  Brain,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Video,
  X
} from "lucide-react";

type Role = "teacher" | "admin";
type Section = "home" | "dashboard" | "feedback" | "privacy" | "live-monitoring" | "industry-alignment" | "teacher-comparison";

const Index = () => {
  const [role, setRole] = useState<Role>("teacher");
  const [section, setSection] = useState<Section>("home");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <h1 className="font-display text-xl font-bold text-gradient">Shikshak Mitra AI</h1>
          <nav className="flex items-center gap-4">
            {role === "teacher" && (["home", "dashboard", "feedback", "privacy"] as Section[]).map((s) => (
              <button
                key={s}
                onClick={() => setSection(s)}
                className={`text-sm capitalize transition-colors ${
                  section === s ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
            {role === "admin" && (["home", "dashboard", "teacher-comparison", "industry-alignment", "live-monitoring"] as Section[]).map((s) => (
              <button
                key={s}
                onClick={() => setSection(s)}
                className={`text-sm capitalize transition-colors ${
                  section === s ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.replace("-", " ")}
              </button>
            ))}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
              <span className={`text-xs ${role === "teacher" ? "text-primary" : "text-muted-foreground"}`}>Teacher</span>
              <Switch
                checked={role === "admin"}
                onCheckedChange={(checked) => setRole(checked ? "admin" : "teacher")}
              />
              <span className={`text-xs ${role === "admin" ? "text-accent" : "text-muted-foreground"}`}>Admin</span>
            </div>
          </nav>
        </div>
      </header>

      <main className="pt-16">
        {section === "home" && <HeroSection onStart={() => setSection("dashboard")} />}
        {section === "dashboard" && role === "teacher" && <TeacherDashboard />}
        {section === "dashboard" && role === "admin" && <AdminDashboard />}
        {section === "feedback" && role === "teacher" && <FeedbackSection />}
        {section === "privacy" && <PrivacySection />}
        {section === "live-monitoring" && role === "admin" && <LiveMonitoringSection />}
        {section === "industry-alignment" && role === "admin" && <IndustryAlignmentSection />}
        {section === "teacher-comparison" && role === "admin" && <TeacherComparisonSection />}
      </main>
    </div>
  );
};

const HeroSection = ({ onStart }: { onStart: () => void }) => (
  <section className="relative min-h-[calc(100vh-4rem)] flex items-center">
    <div className="container grid lg:grid-cols-2 gap-12 items-center py-12">
      <div className="space-y-6 animate-fade-in">
        <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
          Team INNOVIONS
        </span>
        <h1 className="font-display text-5xl lg:text-6xl font-bold leading-tight">
          <span className="text-gradient">SHIKSHAK</span>
          <br />
          <span className="text-foreground">MITRA</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Your Smart Partner for Better Teaching, Anytime.
        </p>
        <p className="text-xl font-medium">
          The Best mentor for the <span className="px-2 py-1 bg-muted rounded">mentors.</span>
        </p>
        <div className="flex items-center gap-3">
          <Button variant="hero" size="lg" onClick={onStart}>
            Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="flex items-center gap-2"
            onClick={() => window.open('http://127.0.0.1:5000', '_blank')}
          >
            <Video className="w-5 h-5" />
            Watch Demo
          </Button>
        </div>
      </div>
      <div className="relative animate-slide-in" style={{ animationDelay: "0.2s" }}>
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl" />
        <img
          src={heroImage}
          alt="Teacher using Shikshak Mitra"
          className="relative rounded-xl border-4 border-secondary/50 shadow-2xl"
        />
      </div>
    </div>
  </section>
);

const MetricCard = ({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: React.ElementType; color: string }) => (
  <Card className="p-4 bg-card border-border hover:border-primary/50 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  </Card>
);

const ScoreBar = ({ label, score, color }: { label: string; score: number; color: string }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{score}%</span>
    </div>
    <Progress value={score} className={`h-2 ${color}`} />
  </div>
);

const TeacherDashboard = () => (
  <section className="container py-12 space-y-8">
    <h2 className="font-display text-3xl font-bold">Teacher Dashboard</h2>
    
    {/* Teaching Metrics */}
    <div>
      <h3 className="text-lg font-semibold text-muted-foreground mb-4">Teaching Metrics</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard label="WPM" value={142} icon={Zap} color="bg-primary/20 text-primary" />
        <MetricCard label="Questions" value={24} icon={MessageSquare} color="bg-secondary/20 text-secondary" />
        <MetricCard label="Doubts" value={8} icon={Brain} color="bg-accent/20 text-accent" />
        <MetricCard label="Focus Score" value="87%" icon={TrendingUp} color="bg-tan/20 text-tan" />
        <MetricCard label="Sentiment" value="Positive" icon={Users} color="bg-primary/20 text-primary" />
        <MetricCard label="Interactions" value={156} icon={BarChart3} color="bg-secondary/20 text-secondary" />
      </div>
    </div>

    {/* Evaluations */}
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold mb-4">Evaluations</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <ScoreBar label="Clarity Score" score={85} color="[&>div]:bg-primary" />
          <ScoreBar label="Engagement Score" score={78} color="[&>div]:bg-secondary" />
        </div>
        <div className="space-y-4">
          <ScoreBar label="Curiosity Index" score={72} color="[&>div]:bg-accent" />
          <ScoreBar label="Teacher Impact" score={91} color="[&>div]:bg-tan" />
        </div>
      </div>
    </Card>

    {/* Suggestions */}
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold mb-4">Personalized Tips</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
          Try more visual examples for complex topics
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
          Pause after key concepts for better retention
        </li>
      </ul>
    </Card>

    {/* Transcript Preview */}
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold mb-4">Transcript Preview</h3>
      <p className="text-sm text-muted-foreground italic">
        "...so when we look at the quadratic formula, notice how the discriminant tells us..."
      </p>
    </Card>
  </section>
);

const AdminDashboard = () => (
  <section className="container py-12 space-y-8">
    <h2 className="font-display text-3xl font-bold">Admin Dashboard</h2>

    {/* Teacher Summaries Heatmap */}
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold mb-4">Teacher Performance Heatmap</h3>
      <div className="grid grid-cols-5 gap-2">
        {["Clarity", "Engagement", "Impact", "Doubts", "Sentiment"].map((metric) => (
          <div key={metric} className="text-center">
            <p className="text-xs text-muted-foreground mb-2">{metric}</p>
            {["T1", "T2", "T3", "T4"].map((teacher) => (
              <div
                key={teacher}
                className="h-8 rounded mb-1"
                style={{
                  backgroundColor: `hsl(var(--primary) / ${Math.random() * 0.5 + 0.3})`,
                }}
                title={`${teacher}: ${Math.floor(Math.random() * 30 + 70)}%`}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4">Hover for details • No ranking, only comparison</p>
    </Card>

    {/* Bias Detection */}
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-secondary" />
        Bias Detection Report
      </h3>
      <div className="space-y-2 text-sm">
        <p className="flex items-center gap-2 text-muted-foreground">
          <Shield className="w-4 h-4 text-accent" />
          2 feedback entries flagged for review
        </p>
        <p className="text-xs text-muted-foreground">Unfair feedback patterns automatically detected</p>
      </div>
    </Card>

    {/* Student Analytics */}
    <div className="grid md:grid-cols-3 gap-4">
      <MetricCard label="Retention Rate" value="94%" icon={TrendingUp} color="bg-accent/20 text-accent" />
      <MetricCard label="Avg Attendance" value="89%" icon={Users} color="bg-primary/20 text-primary" />
      <MetricCard label="Participation" value="High" icon={BarChart3} color="bg-secondary/20 text-secondary" />
    </div>
  </section>
);
const FeedbackSection = () => {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [doubts, setDoubts] = useState("");

  const handleSubmit = async () => {
    const lessonClear = answers[0] === true ? "Yes" : answers[0] === false ? "No" : "";
    const engaged = answers[1] === true ? "Yes" : answers[1] === false ? "No" : "";
    const respectful = answers[2] === true ? "Yes" : answers[2] === false ? "No" : "";

    if (!lessonClear || !engaged || !respectful) {
      alert("Please answer all questions!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonClear, engaged, respectful, doubts }),
      });

      if (response.ok) {
        alert("Feedback submitted successfully!");
        setAnswers({});
        setDoubts("");
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting feedback. Make sure the server is running.");
    }
  };

  return (
    <section className="container py-12 max-w-xl mx-auto">
      <h2 className="font-display text-3xl font-bold mb-6 text-center">Student Feedback</h2>
      <Card className="p-6 bg-card border-border space-y-6">
        <p className="text-sm text-muted-foreground text-center">Anonymous • Auto-analyzed</p>
        
        {[
          "Was the lesson clear?",
          "Did you feel engaged?",
          "Was the teacher respectful?",
        ].map((question, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-sm">{question}</span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className={`gap-1 transition-colors ${
                  answers[i] === true 
                    ? "bg-accent text-accent-foreground border-accent" 
                    : ""
                }`}
                onClick={() => setAnswers({ ...answers, [i]: true })}
              >
                <CheckCircle2 className="w-4 h-4" /> Yes
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`gap-1 transition-colors ${
                  answers[i] === false 
                    ? "bg-destructive text-destructive-foreground border-destructive" 
                    : ""
                }`}
                onClick={() => setAnswers({ ...answers, [i]: false })}
              >
                <XCircle className="w-4 h-4" /> No
              </Button>
            </div>
          </div>
        ))}

        <div>
          <label className="text-sm block mb-2">Any doubts?</label>
          <textarea
            className="w-full p-3 rounded-lg bg-muted border border-border text-sm resize-none"
            rows={3}
            placeholder="Share your question..."
            value={doubts}
            onChange={(e) => setDoubts(e.target.value)}
          />
        </div>

        <Button variant="hero" className="w-full" onClick={handleSubmit}>Submit Feedback</Button>
      </Card>
    </section>
  );
};

const PrivacySection = () => (
  <section className="container py-12 max-w-2xl mx-auto">
    <h2 className="font-display text-3xl font-bold mb-6 text-center">Privacy & Data</h2>
    <Card className="p-6 bg-card border-border space-y-4">
      <div className="flex items-start gap-3">
        <Shield className="w-6 h-6 text-accent mt-1" />
        <div>
          <h3 className="font-semibold">Anonymized Data</h3>
          <p className="text-sm text-muted-foreground">
            All student feedback is fully anonymous. No personal identifiers are stored.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Shield className="w-6 h-6 text-accent mt-1" />
        <div>
          <h3 className="font-semibold">Secure Processing</h3>
          <p className="text-sm text-muted-foreground">
            AI analysis happens in encrypted environments with no data retention.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Shield className="w-6 h-6 text-accent mt-1" />
        <div>
          <h3 className="font-semibold">Fair Evaluation</h3>
          <p className="text-sm text-muted-foreground">
            Bias detection ensures teacher evaluations remain objective.
          </p>
        </div>
      </div>
    </Card>
  </section>
);

const LiveMonitoringSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleViewVideo = () => {
    setShowVideo(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    console.error('Video failed to load');
    setVideoError(true);
  };

  return (
    <section className="container py-12 space-y-8">
      <div>
        <h2 className="font-display text-4xl font-bold mb-2">Real-Time Classroom Intelligence</h2>
        <p className="text-muted-foreground">Monitor ongoing classes and get instant insights on engagement and understanding</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { subject: "Computer Science", teacher: "Dr. Priya Sharma", topic: "Object Oriented Programming", room: "12A", engagement: 88, confusion: 22, pace: "Optimal", status: "GREEN", video: "/output_accurate.mp4" },
          { subject: "Mathematics", teacher: "Prof. Rajesh Kumar", topic: "Calculus - Derivatives", room: "11B", engagement: 75, confusion: 35, pace: "Too Fast", status: "YELLOW", video: "/output_accurate.mp4" },
          { subject: "Physics", teacher: "Ms. Anita Desai", topic: "Quantum Mechanics", room: "12C", engagement: 65, confusion: 48, pace: "Too Slow", status: "RED", video: "/output_accurate.mp4" },
        ].map((cls, i) => (
          <Card key={i} className="p-6 bg-card border-border space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  cls.status === "GREEN" ? "bg-accent" : cls.status === "YELLOW" ? "bg-secondary" : "bg-destructive"
                }`} />
                <span className="text-xs font-medium">LIVE</span>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                cls.status === "GREEN" ? "bg-accent/20 text-accent" : cls.status === "YELLOW" ? "bg-secondary/20 text-secondary" : "bg-destructive/20 text-destructive"
              }`}>{cls.room}</span>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold mb-1">{cls.subject}</h3>
              <p className="text-sm text-muted-foreground">{cls.teacher}</p>
              <p className="text-sm text-muted-foreground">{cls.topic}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Engagement
                </span>
                <span className="font-bold text-primary">{cls.engagement}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  <Brain className="w-4 h-4" /> Confusion Index
                </span>
                <span className="font-bold text-secondary">{cls.confusion}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Pace
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  cls.pace === "Optimal" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
                }`}>{cls.pace}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                cls.status === "GREEN" ? "bg-accent/20 text-accent" : cls.status === "YELLOW" ? "bg-secondary/20 text-secondary" : "bg-destructive/20 text-destructive"
              }`}>TIS Pulse: {cls.status}</span>
            </div>

            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">View Detailed Metrics</Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-2"
                onClick={handleViewVideo}
              >
                <Video className="w-4 h-4" /> View Analysis Video
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Full Screen Video Monitor */}
      {showVideo && (
        <div 
          className="fixed inset-0 z-50 bg-background"
          style={{ background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)' }}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="bg-background/95 backdrop-blur-sm border-b border-border">
              <div className="container flex items-center justify-between h-16">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <h1 className="font-display text-xl font-bold text-gradient">Live Classroom Monitoring</h1>
                </div>
                <button
                  onClick={() => setShowVideo(false)}
                  className="p-2 rounded-lg bg-background/80 hover:bg-background transition-colors border border-border"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 container py-6">
              <div className="grid lg:grid-cols-[1fr_350px] gap-6 h-full">
                {/* Video Section */}
                <Card className="p-6 bg-card/95 backdrop-blur-sm border-border flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        AI LIVE MONITORING
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded bg-primary/20 text-primary text-xs">
                        <Cpu className="w-3 h-3" />
                        <span>12 AI Models Active</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded bg-secondary/20 text-secondary text-xs">
                        <Network className="w-3 h-3" />
                        <span>Real-time Processing</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Bot className="w-4 h-4 mr-1" /> AI Insights
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                        🔄 Refresh
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-black rounded-lg overflow-hidden border border-border">
                    {videoError ? (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <div className="text-center space-y-4">
                          <AlertTriangle className="w-16 h-16 mx-auto text-secondary" />
                          <p className="text-lg">Video failed to load</p>
                          <p className="text-sm text-muted-foreground">Path: {analysisVideo}</p>
                          <Button variant="outline" onClick={() => window.location.reload()}>
                            Retry
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <video 
                        controls 
                        autoPlay
                        loop
                        className="w-full h-full object-contain"
                        src={analysisVideo}
                        onError={handleVideoError}
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </Card>

                {/* Info Panel */}
                <div className="space-y-4">
                  <Card className="p-6 bg-card/95 backdrop-blur-sm border-border">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Camera className="w-5 h-5 text-primary" /> AI Video Analytics
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 border-l-4 border-accent">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <Activity className="w-4 h-4" /> AI Status:
                        </span>
                        <span className="text-sm text-accent font-bold flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                          Processing
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border-l-4 border-primary">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <Eye className="w-4 h-4" /> CV Accuracy:
                        </span>
                        <span className="text-sm font-bold text-primary">98.7%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-secondary/10 to-accent/10 border-l-4 border-secondary">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <Brain className="w-4 h-4" /> Neural Load:
                        </span>
                        <span className="text-sm font-bold text-secondary">23% CPU</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 border-l-4 border-accent">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <Database className="w-4 h-4" /> Data Rate:
                        </span>
                        <span className="text-sm font-bold text-accent">2.3M pts/hr</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border-l-4 border-primary">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <Gauge className="w-4 h-4" /> Inference:
                        </span>
                        <span className="text-sm font-bold text-primary">15ms avg</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-card/95 backdrop-blur-sm border-border">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Radar className="w-5 h-5 text-secondary" /> Real-time AI Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-lg text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)' }}>
                        <div className="absolute top-1 right-1">
                          <Eye className="w-3 h-3 text-white/60" />
                        </div>
                        <h4 className="text-xs text-white/80 mb-1">CV Engagement</h4>
                        <div className="text-2xl font-bold text-white">85%</div>
                        <div className="text-xs text-white/60">±2.3% accuracy</div>
                      </div>
                      <div className="p-4 rounded-lg text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%)' }}>
                        <div className="absolute top-1 right-1">
                          <Brain className="w-3 h-3 text-white/60" />
                        </div>
                        <h4 className="text-xs text-white/80 mb-1">Neural Attention</h4>
                        <div className="text-2xl font-bold text-white">78%</div>
                        <div className="text-xs text-white/60">ML predicted</div>
                      </div>
                      <div className="p-4 rounded-lg text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--accent)) 100%)' }}>
                        <div className="absolute top-1 right-1">
                          <Target className="w-3 h-3 text-white/60" />
                        </div>
                        <h4 className="text-xs text-white/80 mb-1">AI Hand Detection</h4>
                        <div className="text-2xl font-bold text-white">12</div>
                        <div className="text-xs text-white/60">96.8% confidence</div>
                      </div>
                      <div className="p-4 rounded-lg text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)' }}>
                        <div className="absolute top-1 right-1">
                          <Users className="w-3 h-3 text-white/60" />
                        </div>
                        <h4 className="text-xs text-white/80 mb-1">Face Recognition</h4>
                        <div className="text-2xl font-bold text-white">30</div>
                        <div className="text-xs text-white/60">Active tracking</div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <Cpu className="w-3 h-3" /> AI Processing:
                        </span>
                        <span className="font-medium">12 models running</span>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="flex items-center gap-1">
                          <Network className="w-3 h-3" /> Inference Speed:
                        </span>
                        <span className="font-medium">15ms average</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-background/95 backdrop-blur-sm border-t border-border">
              <div className="container py-4 text-center">
                <p className="text-sm text-muted-foreground">Shikshak Mitra AI - Making Teaching Evaluation Fair & Unbiased</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const IndustryAlignmentSection = () => (
  <section className="container py-12 space-y-8">
    <div>
      <h2 className="font-display text-4xl font-bold mb-2">Institution Insights, Simplified</h2>
      <p className="text-muted-foreground">Comprehensive overview of your institution's teaching performance</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Institution Health Score</span>
          <div className="p-2 rounded-lg bg-accent/20">
            <BarChart3 className="w-5 h-5 text-accent" />
          </div>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-primary">84</span>
          <span className="text-sm text-accent mb-1">+8%</span>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Total Teachers</span>
          <div className="p-2 rounded-lg bg-primary/20">
            <Users className="w-5 h-5 text-primary" />
          </div>
        </div>
        <span className="text-4xl font-bold">45</span>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Avg Retention</span>
          <div className="p-2 rounded-lg bg-accent/20">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-accent">88%</span>
          <span className="text-sm text-accent mb-1">+6%</span>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Avg Engagement</span>
          <div className="p-2 rounded-lg bg-accent/20">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-accent">82%</span>
          <span className="text-sm text-accent mb-1">+4%</span>
        </div>
      </Card>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" /> Top Performers
        </h3>
        <div className="space-y-4">
          {[
            { name: "Dr. Priya Sharma", subject: "Computer Science", score: 94 },
            { name: "Prof. Rajesh Kumar", subject: "Mathematics", score: 92 },
            { name: "Ms. Anita Desai", subject: "Physics", score: 90 },
          ].map((teacher, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{teacher.name}</p>
                <p className="text-sm text-muted-foreground">{teacher.subject}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground font-bold text-sm">{teacher.score}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-secondary" /> Needs Attention
        </h3>
        <div className="space-y-4">
          {[
            { name: "Mr. Amit Verma", subject: "Chemistry", score: 65 },
            { name: "Ms. Neha Singh", subject: "Biology", score: 68 },
          ].map((teacher, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{teacher.name}</p>
                <p className="text-sm text-muted-foreground">{teacher.subject}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-bold text-sm">{teacher.score}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>

    <Card className="p-6 bg-card border-border">
      <h3 className="font-semibold mb-4">Critical Alerts</h3>
      <div className="space-y-2">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10">
          <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
          <div className="flex-1">
            <p className="text-sm">Chemistry department retention dropped 15%</p>
          </div>
          <span className="text-xs text-muted-foreground">1h ago</span>
        </div>
      </div>
    </Card>
  </section>
);

const TeacherComparisonSection = () => (
  <section className="container py-12 space-y-8">
    <div>
      <h2 className="font-display text-4xl font-bold mb-2">Find the Right Teacher for the Right Subject</h2>
      <p className="text-muted-foreground">Compare teachers side-by-side with AI-powered subject fit analysis</p>
    </div>

    <Card className="p-6 bg-card border-border">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" /> Teacher Comparison
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium">Teacher</th>
              <th className="text-left py-3 px-4 font-medium">Subject</th>
              <th className="text-left py-3 px-4 font-medium">Impact Score</th>
              <th className="text-left py-3 px-4 font-medium">Retention</th>
              <th className="text-left py-3 px-4 font-medium">Engagement</th>
              <th className="text-left py-3 px-4 font-medium">Subject Fit</th>
              <th className="text-left py-3 px-4 font-medium">Experience</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Dr. Priya Sharma", subject: "Computer Science", impact: 94, retention: "95%", engagement: "92%", fit: "98%", exp: "12 years" },
              { name: "Prof. Rajesh Kumar", subject: "Mathematics", impact: 92, retention: "93%", engagement: "90%", fit: "96%", exp: "15 years" },
              { name: "Ms. Anita Desai", subject: "Physics", impact: 90, retention: "91%", engagement: "88%", fit: "94%", exp: "8 years" },
            ].map((teacher, i) => (
              <tr key={i} className="border-b border-border hover:bg-muted/50">
                <td className="py-3 px-4 font-medium">{teacher.name}</td>
                <td className="py-3 px-4 text-muted-foreground">{teacher.subject}</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground font-bold text-sm">{teacher.impact}</span>
                </td>
                <td className="py-3 px-4 text-accent font-medium">{teacher.retention}</td>
                <td className="py-3 px-4 text-secondary font-medium">{teacher.engagement}</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground font-bold text-sm">{teacher.fit}</span>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{teacher.exp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>

    <Card className="p-6 bg-card border-border">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Brain className="w-5 h-5 text-secondary" /> AI Recommendations
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 rounded-lg border border-border">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Best Fit for New AI/ML Course</h4>
              <p className="text-sm text-muted-foreground">Based on technical background, teaching style, and student feedback analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground font-medium text-sm">Dr. Priya Sharma</span>
            <span className="text-sm text-muted-foreground">98% Subject Fit Score</span>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-border">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 rounded-lg bg-accent/20">
              <BarChart3 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold">Best Fit for Advanced Mathematics</h4>
              <p className="text-sm text-muted-foreground">Strong analytical approach and proven track record with complex topics</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground font-medium text-sm">Prof. Rajesh Kumar</span>
            <span className="text-sm text-muted-foreground">96% Subject Fit Score</span>
          </div>
        </div>
      </div>
    </Card>
  </section>
);

export default Index;
