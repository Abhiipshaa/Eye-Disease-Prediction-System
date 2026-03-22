import { useState, useEffect } from "react";
import { User, Users, History, ChevronDown, ChevronUp, Copy, Check, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const SEV_BADGE = {
  high:   "bg-red-50 text-red-700 border border-red-200",
  medium: "bg-amber-50 text-amber-700 border border-amber-200",
  low:    "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

function ReportCard({ report }) {
  const [open, setOpen] = useState(false);
  const date = report.timestamp
    ? new Date(report.timestamp).toLocaleString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      })
    : "—";

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-50 transition text-left"
      >
        <div className="flex items-center gap-3">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${SEV_BADGE[report.severity] || SEV_BADGE.low}`}>
            {report.disease}
          </span>
          <span className="text-xs text-slate-400">{date}</span>
          {report.patient?.name && (
            <span className="text-xs text-slate-500 font-medium">{report.patient.name}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">{report.confidence}%</span>
          {open ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
        </div>
      </button>

      {open && (
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 space-y-2">
          {report.patient?.eye && (
            <p className="text-xs text-slate-500">Eye: <span className="font-medium text-slate-700">{report.patient.eye}</span></p>
          )}
          {report.patient?.age && (
            <p className="text-xs text-slate-500">Age: <span className="font-medium text-slate-700">{report.patient.age}</span></p>
          )}
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1">Recommendations:</p>
            <ul className="space-y-1">
              {(report.recommendations || []).map((r, i) => (
                <li key={i} className="text-xs text-slate-600 flex gap-1.5">
                  <span className="text-blue-500 font-bold">·</span>{r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("eyescreen_user") || "{}");
  const token = user.token || "";

  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  // History
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  // Family
  const [family, setFamily] = useState([]);
  const [refInput, setRefInput] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [familyReports, setFamilyReports] = useState({});
  const [viewingMember, setViewingMember] = useState(null);

  const authHeaders = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch("/api/reports/history", { headers: authHeaders })
      .then((r) => r.json())
      .then((d) => { setHistory(Array.isArray(d) ? d : []); setHistoryLoading(false); })
      .catch(() => setHistoryLoading(false));

    fetch("/api/family/members", { headers: authHeaders })
      .then((r) => r.json())
      .then((d) => setFamily(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  const copyRefId = () => {
    navigator.clipboard.writeText(user.ref_id || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const connectFamily = async () => {
    if (!refInput.trim()) return;
    setConnecting(true);
    try {
      const res = await fetch("/api/family/connect", {
        method: "POST",
        headers: { ...authHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ ref_id: refInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Failed to connect"); return; }
      toast.success(`Connected with ${data.name}!`);
      setFamily((f) => [...f, { name: data.name, ref_id: data.ref_id }]);
      setRefInput("");
    } catch {
      toast.error("Server unreachable");
    } finally {
      setConnecting(false);
    }
  };

  const viewMemberReports = async (member) => {
    if (viewingMember === member.email) { setViewingMember(null); return; }
    setViewingMember(member.email);
    if (familyReports[member.email]) return;
    try {
      const res = await fetch(`/api/family/reports?email=${encodeURIComponent(member.email)}`, { headers: authHeaders });
      const data = await res.json();
      setFamilyReports((p) => ({ ...p, [member.email]: Array.isArray(data) ? data : [] }));
    } catch {
      setFamilyReports((p) => ({ ...p, [member.email]: [] }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-24 px-4 pb-12 space-y-6">

      {/* Profile Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="text-blue-600" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">{user?.name || "User"}</h2>
              {!showDetails ? (
                <button onClick={() => setShowDetails(true)} className="text-sm text-blue-600 hover:underline">
                  Show details
                </button>
              ) : (
                <div className="text-sm text-slate-500">
                  <p>{user?.email}</p>
                  <button onClick={() => setShowDetails(false)} className="text-blue-600 hover:underline mt-1">
                    Hide details
                  </button>
                </div>
              )}
            </div>
          </div>

          {user.ref_id && (
            <div className="text-right">
              <p className="text-xs text-slate-400 mb-1">Your Reference ID</p>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg text-sm tracking-widest">
                  {user.ref_id}
                </span>
                <button onClick={copyRefId} className="text-slate-400 hover:text-blue-600 transition">
                  {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">Share to connect family</p>
            </div>
          )}
        </div>
      </div>

      {/* History Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <History size={18} className="text-blue-600" />
          <h2 className="text-lg font-semibold text-slate-800">Scan History</h2>
          {history.length > 0 && (
            <span className="ml-auto text-xs bg-blue-50 text-blue-600 font-semibold px-2.5 py-0.5 rounded-full">
              {history.length}
            </span>
          )}
        </div>

        {historyLoading ? (
          <p className="text-sm text-slate-400 text-center py-6">Loading history…</p>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center py-8 text-slate-400">
            <AlertCircle size={28} className="mb-2 opacity-40" />
            <p className="text-sm">No scans yet. Run your first analysis!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((r, i) => <ReportCard key={i} report={r} />)}
          </div>
        )}
      </div>

      {/* Family Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Users size={18} className="text-blue-600" />
          <h2 className="text-lg font-semibold text-slate-800">Family Members</h2>
        </div>

        <div className="flex gap-2 mb-5">
          <input
            type="text"
            placeholder="Enter family member's Reference ID (e.g. AB12CD)"
            value={refInput}
            onChange={(e) => setRefInput(e.target.value.toUpperCase())}
            className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
            maxLength={6}
          />
          <button
            onClick={connectFamily}
            disabled={connecting || !refInput.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm disabled:opacity-50 whitespace-nowrap"
          >
            {connecting ? "Connecting…" : "Connect"}
          </button>
        </div>

        {family.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">No family members connected yet.</p>
        ) : (
          <div className="space-y-3">
            {family.map((member, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => viewMemberReports(member)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-blue-50 transition text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User size={14} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{member.name}</p>
                      <p className="text-xs text-slate-400 font-mono">{member.ref_id}</p>
                    </div>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">
                    {viewingMember === member.email ? "Hide reports ▲" : "View reports ▼"}
                  </span>
                </button>

                {viewingMember === member.email && (
                  <div className="px-4 py-3 bg-white border-t border-slate-100 space-y-2">
                    {!familyReports[member.email] ? (
                      <p className="text-xs text-slate-400">Loading…</p>
                    ) : familyReports[member.email].length === 0 ? (
                      <p className="text-xs text-slate-400">No reports found.</p>
                    ) : (
                      familyReports[member.email].map((r, j) => <ReportCard key={j} report={r} />)
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
