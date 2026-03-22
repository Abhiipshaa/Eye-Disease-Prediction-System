// import { useEffect, useRef, useState } from "react";
// import { Bot, Send, X, MessageCircle } from "lucide-react";

// export default function Chatbot() {
//   const [open, setOpen] = useState(false);

//  const [showPopup, setShowPopup] = useState(true);
//  const [popupDismissed, setPopupDismissed] = useState(false);

//   const [messages, setMessages] = useState([
//     {
//       text: "Hey, I am your AI assistant. How can I help you?",
//       sender: "bot",
//     },
//   ]);
//   const [input, setInput] = useState("");

//   const messagesEndRef = useRef(null);

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setShowPopup(false);
// //     }, 5000);

// //     return () => clearTimeout(timer);
// //   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, open]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { text: input, sender: "user" };
//     const newMessages = [...messages, userMessage];
//     setMessages(newMessages);
//     setInput("");

//     try {
//       const res = await fetch("http://127.0.0.1:5000/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: input }),
//       });

//       const data = await res.json();

//       setMessages([
//         ...newMessages,
//         {
//           text: data.reply || "No response from server.",
//           sender: "bot",
//         },
//       ]);
//     } catch {
//       setMessages([
//         ...newMessages,
//         {
//           text: "Server error. Try again.",
//           sender: "bot",
//         },
//       ]);
//     }
//   };

//   return (
//     <>
//       {!open && showPopup && !popupDismissed && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "95px",
//             right: "24px",
//             maxWidth: "260px",
//             background: "white",
//             color: "#1e293b",
//             padding: "12px 14px",
//             borderRadius: "16px",
//             boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
//             zIndex: 99998,
//             border: "1px solid #e2e8f0",
//             fontSize: "14px",
//             lineHeight: "1.5",
//           }}
//         >
//           <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
//             <div
//               style={{
//                 width: "34px",
//                 height: "34px",
//                 borderRadius: "50%",
//                 background: "linear-gradient(135deg, #2563eb, #06b6d4)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexShrink: 0,
//               }}
//             >
//               <Bot size={18} color="white" />
//             </div>

//             <div>
//               <div style={{ fontWeight: "600", marginBottom: "2px" }}>
//                 Eye Assistant
//               </div>
//               <div>Hey, I am an AI assistant. How can I help you?</div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div
// onClick={() => {
//   setOpen(!open);
//   setShowPopup(false);
//   setPopupDismissed(true);
// }}
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           width: "64px",
//           height: "64px",
//           borderRadius: "50%",
//           background: "linear-gradient(135deg, #2563eb, #06b6d4)",
//           color: "white",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           cursor: "pointer",
//           zIndex: 99999,
//           boxShadow: "0 12px 30px rgba(37,99,235,0.35)",
//           border: "3px solid rgba(255,255,255,0.85)",
//           transition: "transform 0.2s ease",
//         }}
//       >
//         {open ? <X size={26} /> : <MessageCircle size={28} />}
//       </div>

//       {open && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "96px",
//             right: "20px",
//             width: "360px",
//             height: "500px",
//             background: "rgba(255,255,255,0.95)",
//             backdropFilter: "blur(14px)",
//             borderRadius: "24px",
//             boxShadow: "0 20px 60px rgba(15,23,42,0.18)",
//             display: "flex",
//             flexDirection: "column",
//             overflow: "hidden",
//             zIndex: 99999,
//             border: "1px solid rgba(226,232,240,0.9)",
//           }}
//         >
//           <div
//             style={{
//               padding: "16px",
//               background: "linear-gradient(135deg, #1e3a8a, #06b6d4)",
//               color: "white",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//               <div
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   borderRadius: "50%",
//                   background: "rgba(255,255,255,0.18)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <Bot size={22} />
//               </div>
//               <div>
//                 <div style={{ fontWeight: "700", fontSize: "15px" }}>
//                   Eye Assistant
//                 </div>
//                 <div style={{ fontSize: "12px", opacity: 0.9 }}>
//                   Online now
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={() => setOpen(false)}
//               style={{
//                 background: "transparent",
//                 border: "none",
//                 color: "white",
//                 cursor: "pointer",
//               }}
//             >
//               <X size={20} />
//             </button>
//           </div>

//           <div
//             style={{
//               flex: 1,
//               overflowY: "auto",
//               padding: "16px",
//               background: "#f8fafc",
//               display: "flex",
//               flexDirection: "column",
//               gap: "12px",
//             }}
//           >
//             {messages.map((msg, i) => {
//               const isUser = msg.sender === "user";

//               return (
//                 <div
//                   key={i}
//                   style={{
//                     display: "flex",
//                     justifyContent: isUser ? "flex-end" : "flex-start",
//                   }}
//                 >
//                   <div
//                     style={{
//                       maxWidth: "78%",
//                       padding: "12px 14px",
//                       borderRadius: isUser
//                         ? "18px 18px 4px 18px"
//                         : "18px 18px 18px 4px",
//                       background: isUser
//                         ? "linear-gradient(135deg, #2563eb, #0ea5e9)"
//                         : "white",
//                       color: isUser ? "white" : "#1e293b",
//                       boxShadow: isUser
//                         ? "0 8px 20px rgba(37,99,235,0.18)"
//                         : "0 4px 14px rgba(15,23,42,0.06)",
//                       border: isUser ? "none" : "1px solid #e2e8f0",
//                       fontSize: "14px",
//                       lineHeight: "1.5",
//                     }}
//                   >
//                     {msg.text}
//                   </div>
//                 </div>
//               );
//             })}
//             <div ref={messagesEndRef} />
//           </div>

//           <div
//             style={{
//               padding: "12px",
//               borderTop: "1px solid #e2e8f0",
//               background: "white",
//               display: "flex",
//               gap: "10px",
//               alignItems: "center",
//             }}
//           >
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") sendMessage();
//               }}
//               placeholder="Type your message..."
//               style={{
//                 flex: 1,
//                 padding: "12px 14px",
//                 border: "1px solid #cbd5e1",
//                 borderRadius: "14px",
//                 outline: "none",
//                 fontSize: "14px",
//                 background: "#f8fafc",
//               }}
//             />
//             <button
//               onClick={sendMessage}
//               style={{
//                 width: "46px",
//                 height: "46px",
//                 borderRadius: "14px",
//                 border: "none",
//                 background: "linear-gradient(135deg, #2563eb, #06b6d4)",
//                 color: "white",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 cursor: "pointer",
//                 boxShadow: "0 8px 20px rgba(37,99,235,0.22)",
//               }}
//             >
//               <Send size={18} />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }








import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, MessageCircle, Upload } from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [popupDismissed, setPopupDismissed] = useState(false);

  const [messages, setMessages] = useState([
    {
      text: "Hey, I am your AI assistant. How can I help you?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Function to send user text message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages([
        ...newMessages,
        { text: data.reply || "No response from server.", sender: "bot" },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        { text: "Server error. Try again.", sender: "bot" },
      ]);
    }
  };

  // Function to handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const userMessage = { text: `Uploaded a report: ${file.name}`, sender: "user" };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    const formData = new FormData();
    formData.append("report", file);

    try {
      const res = await fetch("/api/upload_report", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessages([
        ...newMessages,
        { text: data.summary || "Failed to summarize report.", sender: "bot" },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        { text: "Server error while uploading report.", sender: "bot" },
      ]);
    }
  };

  return (
    <>
      {/* Popup */}
      {!open && showPopup && !popupDismissed && (
        <div style={{ position: "fixed", bottom: "95px", right: "24px", maxWidth: "260px", background: "white", color: "#1e293b", padding: "12px 14px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.12)", zIndex: 99998, border: "1px solid #e2e8f0", fontSize: "14px", lineHeight: "1.5" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #2563eb, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Bot size={18} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: "600", marginBottom: "2px" }}>Eye Assistant</div>
              <div>Hey, I am an AI assistant. How can I help you?</div>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <div onClick={() => { setOpen(!open); setShowPopup(false); setPopupDismissed(true); }} style={{ position: "fixed", bottom: "20px", right: "20px", width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg, #2563eb, #06b6d4)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 99999, boxShadow: "0 12px 30px rgba(37,99,235,0.35)", border: "3px solid rgba(255,255,255,0.85)", transition: "transform 0.2s ease" }}>
        {open ? <X size={26} /> : <MessageCircle size={28} />}
      </div>

      {/* Chat window */}
      {open && (
        <div style={{ position: "fixed", bottom: "96px", right: "20px", width: "360px", height: "500px", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(14px)", borderRadius: "24px", boxShadow: "0 20px 60px rgba(15,23,42,0.18)", display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 99999, border: "1px solid rgba(226,232,240,0.9)" }}>
          <div style={{ padding: "16px", background: "linear-gradient(135deg, #1e3a8a, #06b6d4)", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bot size={22} />
              </div>
              <div>
                <div style={{ fontWeight: "700", fontSize: "15px" }}>Eye Assistant</div>
                <div style={{ fontSize: "12px", opacity: 0.9 }}>Online now</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", background: "#f8fafc", display: "flex", flexDirection: "column", gap: "12px" }}>
            {messages.map((msg, i) => {
              const isUser = msg.sender === "user";
              return (
                <div key={i} style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "78%", padding: "12px 14px", borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: isUser ? "linear-gradient(135deg, #2563eb, #0ea5e9)" : "white", color: isUser ? "white" : "#1e293b", boxShadow: isUser ? "0 8px 20px rgba(37,99,235,0.18)" : "0 4px 14px rgba(15,23,42,0.06)", border: isUser ? "none" : "1px solid #e2e8f0", fontSize: "14px", lineHeight: "1.5" }}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input + send + upload */}
          <div style={{ padding: "12px", borderTop: "1px solid #e2e8f0", background: "white", display: "flex", gap: "10px", alignItems: "center" }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }} placeholder="Type your message..." style={{ flex: 1, padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: "14px", outline: "none", fontSize: "14px", background: "#f8fafc" }} />
            
            {/* Upload button */}
            <label htmlFor="reportUpload" style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: "46px", height: "46px", borderRadius: "14px", background: "linear-gradient(135deg, #16a34a, #4ade80)", color: "white", boxShadow: "0 8px 20px rgba(22,163,52,0.22)" }}>
              <Upload size={18} />
            </label>
            <input id="reportUpload" type="file" style={{ display: "none" }} onChange={handleFileUpload} />

            <button onClick={sendMessage} style={{ width: "46px", height: "46px", borderRadius: "14px", border: "none", background: "linear-gradient(135deg, #2563eb, #06b6d4)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 8px 20px rgba(37,99,235,0.22)" }}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}