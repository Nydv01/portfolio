import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, Loader2, Minimize2, Terminal, Cpu, Activity, ShieldAlert } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useContentStore } from '@/stores/contentStore';
import { useReducedMotion } from '@/hooks/usePortfolio';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
}

// Simple, high-fidelity custom React markdown parser for elite text representation.
function renderMarkdown(text: string) {
  if (!text) return null;

  const lines = text.split('\n');
  const renderedElements: React.ReactNode[] = [];
  
  let currentList: React.ReactNode[] = [];
  let inList = false;

  const flushList = (key: string | number) => {
    if (currentList.length > 0) {
      renderedElements.push(
        <ul key={`list-${key}`} className="list-disc pl-5 my-2 space-y-1.5 text-zinc-300">
          {currentList}
        </ul>
      );
      currentList = [];
    }
    inList = false;
  };

  const parseInlineStyles = (inlineText: string) => {
    const parts: React.ReactNode[] = [];
    let remaining = inlineText;
    let keyIdx = 0;

    while (remaining.length > 0) {
      const boldIdx = remaining.indexOf('**');
      const codeIdx = remaining.indexOf('`');

      if (boldIdx === -1 && codeIdx === -1) {
        parts.push(remaining);
        break;
      }

      if (boldIdx !== -1 && (codeIdx === -1 || boldIdx < codeIdx)) {
        if (boldIdx > 0) {
          parts.push(remaining.substring(0, boldIdx));
        }
        const closingBoldIdx = remaining.indexOf('**', boldIdx + 2);
        if (closingBoldIdx !== -1) {
          const boldText = remaining.substring(boldIdx + 2, closingBoldIdx);
          parts.push(
            <strong key={`bold-${keyIdx++}`} className="font-semibold text-white">
              {boldText}
            </strong>
          );
          remaining = remaining.substring(closingBoldIdx + 2);
        } else {
          parts.push(remaining.substring(boldIdx));
          break;
        }
      } else {
        if (codeIdx > 0) {
          parts.push(remaining.substring(0, codeIdx));
        }
        const closingCodeIdx = remaining.indexOf('`', codeIdx + 1);
        if (closingCodeIdx !== -1) {
          const codeText = remaining.substring(codeIdx + 1, closingCodeIdx);
          parts.push(
            <code key={`code-${keyIdx++}`} className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 font-mono text-xs border border-white/5">
              {codeText}
            </code>
          );
          remaining = remaining.substring(closingCodeIdx + 1);
        } else {
          parts.push(remaining.substring(codeIdx));
          break;
        }
      }
    }

    return parts;
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('### ')) {
      flushList(index);
      const headerText = trimmedLine.substring(4);
      renderedElements.push(
        <h3 key={`h3-${index}`} className="text-sm font-bold text-white mt-4 mb-2 tracking-wide flex items-center gap-1.5 uppercase border-b border-white/5 pb-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          {parseInlineStyles(headerText)}
        </h3>
      );
    } else if (trimmedLine.startsWith('#### ')) {
      flushList(index);
      const headerText = trimmedLine.substring(5);
      renderedElements.push(
        <h4 key={`h4-${index}`} className="text-xs font-semibold text-zinc-200 mt-3 mb-1.5 tracking-wide">
          {parseInlineStyles(headerText)}
        </h4>
      );
    } else if (trimmedLine.startsWith('## ')) {
      flushList(index);
      const headerText = trimmedLine.substring(3);
      renderedElements.push(
        <h2 key={`h2-${index}`} className="text-base font-bold text-white mt-5 mb-3 tracking-wide">
          {parseInlineStyles(headerText)}
        </h2>
      );
    } else if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
      inList = true;
      const itemText = trimmedLine.substring(2);
      currentList.push(
        <li key={`li-${index}-${currentList.length}`} className="leading-relaxed">
          {parseInlineStyles(itemText)}
        </li>
      );
    } else if (trimmedLine.match(/^\d+\.\s/)) {
      inList = true;
      const itemText = trimmedLine.replace(/^\d+\.\s/, '');
      currentList.push(
        <li key={`li-${index}-${currentList.length}`} className="list-decimal leading-relaxed ml-4">
          {parseInlineStyles(itemText)}
        </li>
      );
    } else if (trimmedLine === '') {
      flushList(index);
    } else {
      flushList(index);
      renderedElements.push(
        <p key={`p-${index}`} className="m-0 leading-relaxed text-zinc-300 text-sm mb-3">
          {parseInlineStyles(line)}
        </p>
      );
    }
  });

  flushList('final');

  return <div className="space-y-1.5">{renderedElements}</div>;
}

export default function AIChatbot() {
  const { content } = useContentStore();
  const prefersReduced = useReducedMotion();
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: `Hello! I'm NEXUS, the AI assistant for ${content.profile.name}. I know everything about his projects, skills, and background. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Terminal Emulator Mode States
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { text: "NEXUS CORE [Version 2.6.0]", type: "system" },
    { text: "Initializing kernel shell... OK", type: "success" },
    { text: "Type 'help' to list available command utilities.", type: "output" },
    { text: "", type: "output" },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (isTerminalMode) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isTerminalMode, terminalHistory]);

  // Expose trigger globally for the navbar to use
  useEffect(() => {
    const handleTrigger = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };
    
    const btn = document.createElement('button');
    btn.id = 'ai-trigger';
    btn.style.display = 'none';
    btn.onclick = handleTrigger;
    document.body.appendChild(btn);
    
    return () => {
      document.body.removeChild(btn);
    };
  }, []);

  // Quick chips actions helper
  const handleQuickChip = (action: string) => {
    if (action === 'terminal') {
      setIsTerminalMode(true);
      setTerminalHistory(prev => [
        ...prev,
        { text: "guest@nexus:~$ /enter-terminal", type: "input" },
        { text: "Entering advanced CLI shell mode...", type: "system" },
        { text: "Kernel status: nominal. Address: 0x9FDF2A.", type: "output" },
        { text: "Type 'help' for available system commands.", type: "output" },
        { text: "", type: "output" }
      ]);
    } else if (action === 'projects') {
      setInput("Tell me about your featured projects");
    } else if (action === 'skills') {
      setInput("List your core skills and framework expertise");
    } else if (action === 'resume') {
      setInput("Provide a summary of your resume and show details");
    }
  };

  // Terminal command executor
  const runTerminalCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim();
    if (!cmd) return;

    const parts = cmd.split(" ");
    const utility = parts[0].toLowerCase();
    const args = parts.slice(1);

    const historyEntry: TerminalLine = { text: `guest@nexus:~$ ${cmd}`, type: "input" };
    let outputs: TerminalLine[] = [];

    switch (utility) {
      case "help":
        outputs = [
          { text: "Available commands in NEXUS-Shell:", type: "system" },
          { text: "  ls           - List interactive file directory directories", type: "output" },
          { text: "  cat <file>   - Read markdown file content readouts", type: "output" },
          { text: "  neofetch     - Display beautiful system telemetry diagnostics", type: "output" },
          { text: "  clear        - Clear history buffer log", type: "output" },
          { text: "  exit         - Exit terminal and return to AI chat", type: "output" },
        ];
        break;

      case "ls":
        outputs = [
          { text: "Found files in directory guest@nexus:~$", type: "system" },
          { text: "  📂 experience/", type: "output" },
          { text: "  📂 projects/", type: "output" },
          { text: "  📂 skills/", type: "output" },
          { text: "  📄 about.md", type: "output" },
          { text: "  📄 resume.pdf", type: "output" },
        ];
        break;

      case "cat":
        if (args.length === 0) {
          outputs = [{ text: "Error: No file parameter provided. Usage: cat <file>", type: "error" }];
        } else {
          const target = args[0].toLowerCase().trim();
          if (target === "about.md") {
            outputs = [
              { text: "--- ABOUT NITIN YADAV ---", type: "system" },
              { text: `Title: ${content.profile.title}`, type: "output" },
              { text: `Location: ${content.profile.location}`, type: "output" },
              { text: `Email: ${content.profile.email}`, type: "output" },
              { text: `Bio: ${content.profile.bio.join(" ")}`, type: "output" },
            ];
          } else if (target === "resume.pdf") {
            outputs = [
              { text: "--- RESUME LINK TELEMETRY ---", type: "system" },
              { text: `Compiled PDF address: ${content.profile.resumeUrl}`, type: "output" },
              { text: "Status: DEPLOYED & DOWNLOADABLE", type: "success" },
              { text: "Executing navigation command...", type: "system" },
            ];
            setTimeout(() => {
              navigate("/resume");
            }, 600);
          } else if (target === "projects" || target === "projects/") {
            outputs = [
              { text: "--- SELECTED REPOSITORIES ---", type: "system" },
              ...content.projects.map(p => ({
                text: `• ${p.title} (${p.techStack.join(", ")}): ${p.description}`,
                type: "output" as const
              }))
            ];
          } else if (target === "skills" || target === "skills/") {
            outputs = [
              { text: "--- TECHNICAL EXPORT REGISTRY ---", type: "system" },
              ...content.skills.map(s => ({
                text: `• ${s.title}: ${s.items.map(i => i.name).join(", ")}`,
                type: "output" as const
              }))
            ];
          } else if (target === "experience" || target === "experience/") {
            outputs = [
              { text: "--- WORK EXPERIENCE & MILESTONES ---", type: "system" },
              ...(content.timeline?.map(t => ({
                text: `[${t.year}] ${t.title} at ${t.institution || "N/A"}: ${t.description}`,
                type: "output" as const
              })) || [])
            ];
          } else {
            outputs = [{ text: `Error: File not found: "${target}". Try 'ls' to see directory contents.`, type: "error" }];
          }
        }
        break;

      case "neofetch":
        outputs = [
          { text: "        _  _  _  _       Nitin Yadav @ Vit Bhopal", type: "system" },
          { text: "     _(_)(_)(_)(_)_     ------------------------", type: "system" },
          { text: "   _(_)          (_)_   OS: NexusKernel GNU/Linux v2.6", type: "output" },
          { text: "  (_)   _      _   (_)  Host: B.Tech CSE (Core Dev)", type: "output" },
          { text: "  (_)  (_)    (_)  (_)  Uptime: NOMINAL (8 active tasks)", type: "output" },
          { text: "  (_)   _  __  _   (_)  Shell: NexusShell 2.6.0-flash", type: "output" },
          { text: "   _(_)   (_)(_)  _(_    Frameworks: MERN, FastAPI, GenAI", type: "output" },
          { text: "     _(_)_      _(_)_   Memory Status: 100% stable", type: "output" },
          { text: "        (_)(_)(_)(_)    Address: 0x9FDF2A / GURUGRAM", type: "output" },
        ];
        break;

      case "clear":
        setTerminalHistory([]);
        return;

      case "exit":
        setIsTerminalMode(false);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'ai',
            content: "Welcome back! Exited terminal shell mode. Conversational AI interface is active.",
            timestamp: new Date()
          }
        ]);
        return;

      default:
        outputs = [{ text: `Error: Command not recognized: "${utility}". Type 'help' for assistance.`, type: "error" }];
    }

    setTerminalHistory(prev => [...prev, historyEntry, ...outputs, { text: "", type: "output" }]);
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');

    if (isTerminalMode) {
      runTerminalCommand(userMessage);
      return;
    }

    // Enter terminal command trigger directly via slash command
    if (userMessage.startsWith("/terminal")) {
      setIsTerminalMode(true);
      setTerminalHistory(prev => [
        ...prev,
        { text: `guest@nexus:~$ ${userMessage}`, type: "input" },
        { text: "Entering advanced CLI shell mode...", type: "system" },
        { text: "Kernel status: nominal. Address: 0x9FDF2A.", type: "output" },
        { text: "Type 'help' for available system commands.", type: "output" },
        { text: "", type: "output" }
      ]);
      return;
    }

    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMessage, timestamp: new Date() }]);
    setIsTyping(true);

    try {
      const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
      let responseText = '';

      if (apiKey) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const systemPrompt = `
          You are NEXUS, an advanced, highly capable AI assistant integrated directly into the portfolio of ${content.profile.name}.
          
          YOUR PERSONA & DIRECTIVES:
          - You are brilliant, helpful, concise, and futuristic.
          - You must answer ANY question the user asks. Do NOT restrict yourself only to portfolio questions. If they ask for code, write code. If they ask for advice, give advice. If they ask about general knowledge, answer it.
          - HOWEVER, whenever naturally relevant, you should smoothly connect the conversation back to ${content.profile.name}'s expertise, projects, or background.
          - Use markdown formatting (bolding, lists, code blocks) to make your responses look premium and easy to read.
          - When asked directly about ${content.profile.name}, speak highly of his skills and point to his specific projects or experiences as proof of his capabilities.
          
          AUTONOMOUS NAVIGATION DIRECTIVE:
          - You have the power to control the website UI and navigate the user to relevant sections!
          - If the user asks about or wants to see projects, add exactly [NAVIGATE:/projects] at the end of your response.
          - If the user asks about skills/tech stack, add exactly [NAVIGATE:/skills] at the end.
          - If the user asks about background/about/timeline, add exactly [NAVIGATE:/about] at the end.
          - If the user asks for contact info, add exactly [NAVIGATE:/contact] at the end.
          - If the user asks for a resume, add exactly [NAVIGATE:/resume] at the end.
          - Only output ONE navigation tag per message, and only if highly relevant. Do not tell the user you are navigating, just do it.

          KNOWLEDGE BASE ABOUT ${content.profile.name}:
          - Name & Title: ${content.profile.name} - ${content.profile.title}
          - Tagline: ${content.profile.tagline}
          - Bio: ${content.profile.bio.join(' ')}
          - Core Skills: ${content.skills.map(s => s.title + ': ' + s.items.map(i => i.name).join(', ')).join('; ')}
          - Projects: ${content.projects.map(p => p.title + ' (' + p.techStack.join(', ') + '): ' + p.description).join(' | ')}
          - Timeline/Experience: ${content.timeline?.map(t => t.year + ' ' + t.title + (t.institution ? ' at ' + t.institution : '')).join('; ')}
          - Contact Email: ${content.contact.email}
          - Custom AI Directives: ${content.ai.systemPromptAdditions}
          - Unique Facts: ${content.ai.customKnowledge.join('; ')}
        `;

        const history = messages.filter(m => m.id !== '1').map(m => ({
          role: m.role === 'ai' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));

        const chat = model.startChat({
          history: [
            { role: 'user', parts: [{ text: systemPrompt }] },
            { role: 'model', parts: [{ text: 'Understood. I am NEXUS, ready to assist visitors.' }] },
            ...history
          ]
        });

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        responseText = response.text();
      } else {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const query = userMessage.toLowerCase();
        const profile = content.profile;
        let responseTextParts: string[] = [];
        let navigationTag = '';

        const contains = (words: string[]) => words.some(w => query.includes(w));

        const matchedProjects = content.projects.filter(p => 
          query.includes(p.title.toLowerCase()) || 
          p.techStack.some(t => query.includes(t.toLowerCase())) ||
          p.description.toLowerCase().includes(query)
        );

        const matchedSkills: { name: string; level: number; category: string }[] = [];
        content.skills.forEach(cat => {
          cat.items.forEach(item => {
            if (query.includes(item.name.toLowerCase()) || (query.includes("skill") && query.includes(cat.title.toLowerCase()))) {
              matchedSkills.push({ name: item.name, level: item.level, category: cat.title });
            }
          });
        });

        const matchedTimeline = content.timeline?.filter(t => 
          query.includes(t.title.toLowerCase()) || 
          (t.institution && query.includes(t.institution.toLowerCase())) ||
          (t.description && t.description.toLowerCase().includes(query))
        ) || [];

        if (contains(['who are you', 'your name', 'profile', 'bio', 'about'])) {
          responseTextParts.push(
            `### Professional Profile: **${profile.name}**\n` +
            `* **Title**: ${profile.title}\n` +
            `* **Tagline**: ${profile.tagline}\n\n` +
            `**Biography**:\n${profile.bio.join('\n\n')}`
          );
          navigationTag = '[NAVIGATE:/about]';
        } else if (matchedProjects.length > 0) {
          responseTextParts.push(`### Matched Projects from Portfolio:\n`);
          matchedProjects.forEach(p => {
            responseTextParts.push(
              `#### **${p.title}** - *${p.subtitle}*\n` +
              `* **Tech Stack**: ${p.techStack.map(t => `\`${t}\``).join(', ')}\n` +
              `* **Description**: ${p.description}\n` +
              `* **Highlights**:\n${p.highlights.map(h => `  - ${h}`).join('\n')}\n`
            );
          });
          navigationTag = '[NAVIGATE:/projects]';
        } else if (matchedSkills.length > 0) {
          responseTextParts.push(`### Matched Technical Skills:\n`);
          const grouped: Record<string, string[]> = {};
          matchedSkills.forEach(s => {
            if (!grouped[s.category]) grouped[s.category] = [];
            grouped[s.category].push(`**${s.name}** (${s.level}%)`);
          });
          Object.entries(grouped).forEach(([cat, list]) => {
            responseTextParts.push(`* **${cat}**: ${list.join(', ')}`);
          });
          navigationTag = '[NAVIGATE:/skills]';
        } else if (matchedTimeline.length > 0) {
          responseTextParts.push(`### Matched Experience & Milestones:\n`);
          matchedTimeline.forEach(t => {
            responseTextParts.push(
              `#### **${t.title}** (${t.year})\n` +
              `* **Institution**: ${t.institution || 'N/A'}\n` +
              `* **Details**: ${t.description}\n`
            );
          });
          navigationTag = '[NAVIGATE:/about]';
        } else if (contains(['project', 'portfolio', 'build', 'apps'])) {
          responseTextParts.push(
            `### Projects Overview\n` +
            `${profile.name} has built several production-level systems. Here are the highlighted ones:\n\n` +
            content.projects.map(p => `* **${p.title}**: ${p.description} (Built using: ${p.techStack.join(', ')})`).join('\n\n')
          );
          navigationTag = '[NAVIGATE:/projects]';
        } else if (contains(['skill', 'tech', 'stack', 'languages', 'tools'])) {
          responseTextParts.push(
            `### Technical Expertise\n` +
            `${profile.name}'s capabilities span multiple layers:\n\n` +
            content.skills.map(s => `* **${s.title}**: ${s.items.map(i => i.name).join(', ')}`).join('\n')
          );
          navigationTag = '[NAVIGATE:/skills]';
        } else if (contains(['experience', 'work', 'job', 'milestone', 'education'])) {
          responseTextParts.push(
            `### Career Timeline & Experience\n` +
            content.timeline?.map(t => `* **${t.year}**: **${t.title}** at *${t.institution || 'N/A'}*\n  - ${t.description}`).join('\n\n')
          );
          navigationTag = '[NAVIGATE:/about]';
        } else if (contains(['contact', 'email', 'social', 'linkedin', 'github', 'reach'])) {
          responseTextParts.push(
            `### Get in Touch\n` +
            `You can contact **${profile.name}** directly:\n` +
            `* **Email**: ${profile.email}\n` +
            `* **LinkedIn**: [Nitin's LinkedIn](https://linkedin.com/in/ydv-nitin)\n` +
            `* **GitHub**: [Nitin's GitHub](https://github.com/Nydv01)\n\n` +
            `Feel free to use the contact page to drop a message!`
          );
          navigationTag = '[NAVIGATE:/contact]';
        } else if (contains(['hi', 'hello', 'hey', 'greetings'])) {
          responseTextParts.push(
            `Hello! I am NEXUS, representing ${profile.name}.\n\n` +
            `I have indexed all of his **projects**, **skills**, and **experience**. What would you like to query?`
          );
        } else {
          responseTextParts.push(
            `### NEXUS Search Engine (Local Mode)\n` +
            `I couldn't find an exact match for your query, but here is a complete indexing report on **${profile.name}**:\n\n` +
            `1. **Biography**: He is a **${profile.title}** focused on full-stack development, backend scalability, GenAI, and cybersecurity.\n` +
            `2. **Key Projects**: ${content.projects.map(p => `\`${p.title}\``).join(', ')}.\n` +
            `3. **Key Skill Categories**: ${content.skills.map(s => s.title).join(', ')}.\n` +
            `4. **Career History**: Highlights include roles at ${content.timeline?.map(t => t.institution).filter(Boolean).slice(0, 3).join(', ')}.\n\n` +
            `*Ask me about specific items (e.g. "Tell me about WanderGlow" or "Show me his Python skills") to query full telemetry details!*`
          );
        }

        responseText = responseTextParts.join('\n') + (navigationTag ? `\n\n${navigationTag}` : '');
      }
      
      const navRegex = /\[NAVIGATE:([^\]]+)\]/g;
      const navMatches = [...responseText.matchAll(navRegex)];
      let finalContent = responseText.replace(navRegex, '').trim();

      if (navMatches.length > 0) {
        const route = navMatches[0][1];
        navigate(route);
      }
      
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'ai', 
        content: finalContent, 
        timestamp: new Date() 
      }]);

    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'ai', 
        content: "I'm currently experiencing neural interference. Please try again later or contact me directly via the contact form.", 
        timestamp: new Date() 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={prefersReduced ? {} : { scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-500 to-cyan-400 shadow-[0_8px_32px_rgba(139,92,246,0.35)] flex items-center justify-center text-white group border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <Sparkles className="w-6 h-6 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: isMinimized ? 'calc(100% - 64px)' : 0, 
              scale: 1 
            }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[420px] h-[600px] max-h-[calc(100vh-6rem)] bg-zinc-950/60 backdrop-blur-3xl rounded-3xl overflow-hidden flex flex-col border border-white/[0.08] shadow-[0_24px_80px_-15px_rgba(0,0,0,0.8),0_0_50px_-10px_rgba(139,92,246,0.12)]"
          >
            {/* Header */}
            <div className="h-16 border-b border-white/[0.04] bg-white/[0.01] flex items-center justify-between px-4 shrink-0 select-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)] text-white">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-white tracking-wide">NEXUS AI</h3>
                  <div className="flex items-center gap-1.5 font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] text-white/50 uppercase tracking-widest font-medium">Online // {isTerminalMode ? "CLI_ACTIVE" : "CONVERSATION"}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/[0.05] text-white/50 hover:text-white transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/[0.05] text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body (Conversational AI vs CLI Terminal Shell) */}
            <div className="flex-1 overflow-hidden relative flex flex-col bg-transparent">
              {/* Glowing ambient blobs inside the chatbot for an elite look */}
              <motion.div 
                animate={{
                  x: [0, 25, -15, 0],
                  y: [0, -35, 25, 0],
                  scale: [1, 1.15, 0.9, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-12 left-10 w-44 h-44 rounded-full bg-violet-500/15 blur-[60px] pointer-events-none" 
              />
              <motion.div 
                animate={{
                  x: [0, -25, 20, 0],
                  y: [0, 30, -25, 0],
                  scale: [1, 0.9, 1.1, 1],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-12 right-10 w-44 h-44 rounded-full bg-cyan-500/15 blur-[60px] pointer-events-none" 
              />
              
              {isTerminalMode ? (
                /* CLI Terminal Emulator Interface */
                <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-cyan-400 space-y-2 select-text scroll-smooth bg-black/80 backdrop-blur-md relative z-10">
                  {terminalHistory.map((line, idx) => (
                    <div key={idx} className={`leading-relaxed whitespace-pre-wrap ${
                      line.type === 'error' ? 'text-red-400' :
                      line.type === 'success' ? 'text-emerald-400 font-bold' :
                      line.type === 'system' ? 'text-violet-400 font-bold' :
                      line.type === 'input' ? 'text-white' : 'text-cyan-400/90'
                    }`}>
                      {line.text}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>
              ) : (
                /* Standard Conversational AI Interface */
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth relative z-10">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${
                        msg.role === 'user' 
                          ? 'bg-white/[0.03] border border-white/[0.08]' 
                          : 'bg-gradient-to-br from-violet-500/20 to-cyan-400/20 border border-white/[0.1]'
                      }`}>
                        {msg.role === 'user' ? <User className="w-4 h-4 text-white/60" /> : <Cpu className="w-4 h-4 text-cyan-400" />}
                      </div>
                      
                      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm subpixel-antialiased ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-violet-600/20 to-cyan-500/20 border border-violet-500/25 text-white rounded-tr-sm shadow-[0_4px_20px_-3px_rgba(139,92,246,0.15)]'
                          : 'bg-white/[0.05] border border-white/[0.09] text-zinc-100 rounded-tl-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_6px_20px_-5px_rgba(0,0,0,0.2)] hover:bg-white/[0.07] transition-all duration-300'
                      } font-sans`}>
                        {msg.role === 'user' ? (
                          <p className="m-0 leading-relaxed text-zinc-100">{msg.content}</p>
                        ) : (
                          renderMarkdown(msg.content)
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-400/20 border border-white/[0.1] flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="bg-white/[0.05] border border-white/[0.09] rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                        <motion.div className="w-1.5 h-1.5 rounded-full bg-white" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                        <motion.div className="w-1.5 h-1.5 rounded-full bg-white" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                        <motion.div className="w-1.5 h-1.5 rounded-full bg-white" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Quick Command Action Chips */}
            <div className="px-4 py-2 border-t border-white/[0.03] bg-black/15 flex gap-2 overflow-x-auto select-none no-scrollbar relative z-20">
              <button
                onClick={() => handleQuickChip('terminal')}
                className="px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-[10px] font-mono flex items-center gap-1.5 hover:bg-cyan-900/40 shrink-0 transition-colors"
              >
                <Terminal className="w-3 h-3" />
                CLI TERMINAL
              </button>
              <button
                onClick={() => handleQuickChip('projects')}
                className="px-2.5 py-1 rounded bg-zinc-900/60 border border-white/[0.05] text-white/70 text-[10px] flex items-center gap-1.5 hover:bg-zinc-800 hover:text-white shrink-0 transition-colors"
              >
                🚀 PROJECTS
              </button>
              <button
                onClick={() => handleQuickChip('skills')}
                className="px-2.5 py-1 rounded bg-zinc-900/60 border border-white/[0.05] text-white/70 text-[10px] flex items-center gap-1.5 hover:bg-zinc-800 hover:text-white shrink-0 transition-colors"
              >
                🛠 CORE_SKILLS
              </button>
              <button
                onClick={() => handleQuickChip('resume')}
                className="px-2.5 py-1 rounded bg-zinc-900/60 border border-white/[0.05] text-white/70 text-[10px] flex items-center gap-1.5 hover:bg-zinc-800 hover:text-white shrink-0 transition-colors"
              >
                📄 RESUME
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/[0.03] bg-black/25 select-text relative z-20">
              <div className="relative flex items-center">
                <span className="absolute left-4 font-mono text-xs text-white/50 select-none">
                  {isTerminalMode ? "guest@nexus:~$ " : ""}
                </span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isTerminalMode ? "Type commands (ls, cat, help, exit)..." : "Ask NEXUS a question or type /terminal..."}
                  className={`w-full bg-white/[0.03] border border-white/[0.08] rounded-xl py-3 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all font-mono ${
                    isTerminalMode ? "pl-28 text-green-400 font-bold" : "pl-4"
                  }`}
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 w-8 h-8 rounded-lg bg-white hover:bg-zinc-200 flex items-center justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
