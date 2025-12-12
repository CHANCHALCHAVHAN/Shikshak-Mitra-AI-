// src/components/ui/form.tsx
import React, { useState } from "react";

/**
 * FeedbackForm - posts rows to your SheetDB endpoint.
 * - Endpoint: https://sheetdb.io/api/v1/rbzdlplm78fjs
 *
 * IMPORTANT: Google Sheet header row must contain:
 *  lesson_clear, engaged, respectful, doubts, timestamp
 *
 * SheetDB expects JSON body: { data: [ { col1: val1, ... } ] }
 * See: SheetDB create docs.
 */

const SHEETDB_URL = "https://sheetdb.io/api/v1/rbzdlplm78fjs";

type YesNo = "Yes" | "No" | null;

export default function FeedbackForm(): JSX.Element {
  const [lessonClear, setLessonClear] = useState<YesNo>(null);
  const [engaged, setEngaged] = useState<YesNo>(null);
  const [respectful, setRespectful] = useState<YesNo>(null);
  const [doubts, setDoubts] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "info" | "error" | "success"; text: string } | null>(null);

  const isValid = lessonClear !== null && engaged !== null && respectful !== null;

  async function handleSubmit() {
    setMessage(null);

    if (!isValid) {
      setMessage({ type: "error", text: "Please answer all Yes/No questions." });
      return;
    }

    setLoading(true);

    // prepare payload in SheetDB "create" format: { data: [ { col: value } ] }
    const payload = {
      data: [
        {
          lesson_clear: lessonClear,
          engaged,
          respectful,
          doubts: doubts || "",
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      const res = await fetch(SHEETDB_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // no API key header needed for public SheetDB endpoints created via their service
        },
        body: JSON.stringify(payload),
      });

      // SheetDB returns JSON on success; treat non-2xx as error
      if (!res.ok) {
        const text = await res.text();
        console.error("SheetDB error:", res.status, text);
        throw new Error("Failed to submit (status " + res.status + ")");
      }

      const json = await res.json(); // may contain created row info
      console.log("SheetDB response:", json);

      setMessage({ type: "success", text: "Feedback submitted — saved to Google Sheet." });

      // reset
      setLessonClear(null);
      setEngaged(null);
      setRespectful(null);
      setDoubts("");
    } catch (err) {
      console.error("Submit error:", err);
      setMessage({ type: "error", text: "Submission failed. Check console or network." });
    } finally {
      setLoading(false);
    }
  }

  // simple Yes/No button component (plain, accessible)
  const YesNoPair = ({ label, value, onChange }: { label: string; value: YesNo; onChange: (v: YesNo) => void }) => (
    <div className="mb-4">
      <p className="mb-2 font-medium">{label}</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange("Yes")}
          className={`px-4 py-2 rounded-md font-semibold border ${
            value === "Yes"
              ? "bg-gradient-to-r from-green-500 to-green-400 text-black"
              : "bg-transparent text-white border-white/10"
          }`}
        >
          Yes
        </button>

        <button
          type="button"
          onClick={() => onChange("No")}
          className={`px-4 py-2 rounded-md font-semibold border ${
            value === "No"
              ? "bg-gradient-to-r from-red-500 to-red-400 text-black"
              : "bg-transparent text-white border-white/10"
          }`}
        >
          No
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto p-6 rounded-xl bg-card border border-border shadow-md">
      <h2 className="text-2xl font-display font-bold mb-3 text-gradient">Submit Feedback</h2>
      <p className="text-sm text-muted-foreground mb-4">Anonymous • Responses go to your Google Sheet via SheetDB</p>

      <YesNoPair label="Was the lesson clear?" value={lessonClear} onChange={setLessonClear} />
      <YesNoPair label="Did you feel engaged?" value={engaged} onChange={setEngaged} />
      <YesNoPair label="Was the teacher respectful?" value={respectful} onChange={setRespectful} />

      <div className="mb-4">
        <label className="block text-sm mb-2">Any doubts?</label>
        <textarea
          value={doubts}
          onChange={(e) => setDoubts(e.target.value)}
          rows={3}
          className="w-full p-3 rounded-md bg-background border border-border text-sm"
          placeholder="Optional - write any doubts"
        />
      </div>

      {message && (
        <div
          className={`mb-3 px-3 py-2 rounded ${
            message.type === "success" ? "bg-accent/10 text-accent" : message.type === "error" ? "bg-destructive/10 text-destructive" : "bg-muted/10"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-lg font-semibold bg-primary text-primary-foreground disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>

        <button
          onClick={() => {
            setLessonClear(null);
            setEngaged(null);
            setRespectful(null);
            setDoubts("");
            setMessage(null);
          }}
          type="button"
          className="px-4 py-3 rounded-lg border border-border"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
