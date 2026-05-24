import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def create_resume(output_path):
    # Setup document with 36pt (0.5 inch) margins for professional, compact layout
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36,
        title="Nitin-ydv resume",
        author="Nitin Yadav"
    )
    
    styles = getSampleStyleSheet()
    
    # Elegant Corporate Palette (Navy & Dark Charcoal)
    primary_color = colors.HexColor("#1e3a8a")   # Deep navy blue for headings
    text_color = colors.HexColor("#1f2937")      # Dark charcoal for body text
    muted_color = colors.HexColor("#4b5563")     # Slate grey for subtitles/dates
    accent_color = colors.HexColor("#2563eb")    # Bright blue for links
    
    # Custom Typography Styles (Optimized for exactly 2 pages)
    name_style = ParagraphStyle(
        'NameStyle',
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color,
        alignment=TA_CENTER
    )
    
    subtitle_style = ParagraphStyle(
        'SubtitleStyle',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=11,
        textColor=muted_color,
        alignment=TA_CENTER,
        spaceAfter=5
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=text_color,
        alignment=TA_CENTER,
        spaceAfter=10
    )
    
    section_heading = ParagraphStyle(
        'SectionHeading',
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=primary_color,
        spaceBefore=7,
        spaceAfter=3,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'BodyStyle',
        fontName='Helvetica',
        fontSize=9,
        leading=11.5,
        textColor=text_color,
        spaceAfter=3.5
    )
    
    bold_body_style = ParagraphStyle(
        'BoldBodyStyle',
        parent=body_style,
        fontName='Helvetica-Bold'
    )
    
    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=body_style,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2
    )
    
    meta_style = ParagraphStyle(
        'MetaStyle',
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=9.5,
        textColor=muted_color,
        alignment=TA_RIGHT
    )

    story = []
    
    # ==================== PAGE 1 ====================
    
    # Header Info
    story.append(Paragraph("NITIN YADAV", name_style))
    story.append(Paragraph("Computer Science & Engineering Student | Full-Stack & GenAI Developer", subtitle_style))
    
    contact_text = (
        "Bhopal, India &nbsp;|&nbsp; +91 86850 69281 &nbsp;|&nbsp; "
        "<a href='mailto:ydv.nitin2401@gmail.com' color='#2563eb'>ydv.nitin2401@gmail.com</a><br/>"
        "<a href='https://github.com/Nydv01' color='#2563eb'>github.com/Nydv01</a> &nbsp;|&nbsp; "
        "<a href='https://linkedin.com/in/ydv-nitin' color='#2563eb'>linkedin.com/in/ydv-nitin</a> &nbsp;|&nbsp; "
        "<a href='https://nitin-yadav.vercel.app' color='#2563eb'>nitin-yadav.vercel.app</a>"
    )
    story.append(Paragraph(contact_text, contact_style))
    
    # Section: Profile Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.75, color=primary_color, spaceAfter=6))
    summary_p = (
        "Highly motivated Computer Science Engineering student with solid experience architecting and deploying "
        "production-grade software systems. Adept at developing secure backend APIs, optimizing database schemas, "
        "and integrating generative AI interfaces. Possesses deep understanding of Data Structures & Algorithms, "
        "Operating Systems, DBMS, and network protocols. Recognized for outstanding speed, technical competence, "
        "and modular code structures during software engineering internships."
    )
    story.append(Paragraph(summary_p, body_style))
    story.append(Spacer(1, 6))
    
    # Section: Education
    story.append(Paragraph("EDUCATION", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.75, color=primary_color, spaceAfter=6))
    
    edu_data = [
        [
            Paragraph("<b>VIT Bhopal University</b><br/>B.Tech in Computer Science Engineering (CSE Core) &nbsp;|&nbsp; <b>CGPA: 8.83 / 10.0</b>", body_style),
            Paragraph("<b>2023 – 2027</b><br/>Bhopal, India", meta_style)
        ],
        [
            Paragraph("<b>CBSE Class XII (Class 12 - PCM)</b><br/>Secondary School Education", body_style),
            Paragraph("<b>Pass (77.8%)</b><br/>Haryana, India", meta_style)
        ],
        [
            Paragraph("<b>CBSE Class X (Class 10)</b><br/>High School Education", body_style),
            Paragraph("<b>Pass (89.4%)</b><br/>Haryana, India", meta_style)
        ]
    ]
    edu_table = Table(edu_data, colWidths=[410, 130])
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
        ('TOPPADDING', (0,0), (-1,-1), 1.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu_table)
    story.append(Spacer(1, 6))
    
    # Section: Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.75, color=primary_color, spaceAfter=6))
    
    skills_data = [
        [Paragraph("<b>Programming Languages:</b>", bold_body_style), Paragraph("C++, Python, JavaScript, TypeScript, SQL, Java", body_style)],
        [Paragraph("<b>Web Frontend:</b>", bold_body_style), Paragraph("React.js, Next.js, Tailwind CSS, HTML5, CSS3, Framer Motion", body_style)],
        [Paragraph("<b>Backend & API:</b>", bold_body_style), Paragraph("FastAPI, Node.js, Express, RESTful APIs, Django", body_style)],
        [Paragraph("<b>Databases & Cloud:</b>", bold_body_style), Paragraph("PostgreSQL, MongoDB, Supabase, Vercel, Firebase", body_style)],
        [Paragraph("<b>AI & Machine Learning:</b>", bold_body_style), Paragraph("OpenAI APIs, Whisper Speech-to-Text, Prompt Engineering, RAG Architectures", body_style)],
        [Paragraph("<b>Security & Tools:</b>", bold_body_style), Paragraph("Ethical Hacking, OWASP Top 10, Git, Docker, Linux, Linux Bash Shell, Postman", body_style)]
    ]
    skills_table = Table(skills_data, colWidths=[145, 395])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
        ('TOPPADDING', (0,0), (-1,-1), 1.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 6))
    
    # Section: Professional Experience
    story.append(Paragraph("WORK EXPERIENCE", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.75, color=primary_color, spaceAfter=6))
    
    exp1_title = Paragraph("<b>Software Engineering Intern</b> &nbsp;|&nbsp; <i>Frigoglass India Pvt. Ltd.</i>", body_style)
    exp1_meta = Paragraph("<b>Nov 2025 – Jan 2026</b><br/>Gurugram, India", meta_style)
    
    exp_table_data = [[exp1_title, exp1_meta]]
    exp_table = Table(exp_table_data, colWidths=[390, 150])
    exp_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
        ('TOPPADDING', (0,0), (-1,-1), 1.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(exp_table)
    
    story.append(Paragraph("• Collaborated with the Technical (CSE/IT) Department to optimize PostgreSQL database structures and Express/FastAPI REST APIs, reducing average database query latencies by 20%.", bullet_style))
    story.append(Paragraph("• Developed modular, secure, and reusable backend microservices using Python and Django templates, ensuring sanitization of incoming client inputs.", bullet_style))
    story.append(Paragraph("• Contributed core code to the <b>Nexus</b> Smart Campus application, integrating responsive web panels with database endpoints.", bullet_style))
    story.append(Paragraph("• Configured local Dockerized testing environments and executed Postman test suites to maintain endpoint security compliance.", bullet_style))
    story.append(Spacer(1, 5))
    
    exp2_title = Paragraph("<b>Freelance / Independent Full-Stack Developer</b>", body_style)
    exp2_meta = Paragraph("<b>2023 – Present</b><br/>Remote", meta_style)
    exp_table_data2 = [[exp2_title, exp2_meta]]
    exp_table2 = Table(exp_table_data2, colWidths=[390, 150])
    exp_table2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
        ('TOPPADDING', (0,0), (-1,-1), 1.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(exp_table2)
    story.append(Paragraph("• Built and deployed 10+ interactive full-stack web applications and AI integration tools for international clients.", bullet_style))
    story.append(Paragraph("• Programmed secure authentication barriers (JWT/OAuth), role-based authorization gates, and payment gateways.", bullet_style))
    story.append(Paragraph("• Configured containerized system deployments using Docker and managed cloud hosting via Vercel.", bullet_style))
    
    story.append(Spacer(1, 5))
    
    exp3_title = Paragraph("<b>Event Management Team Member</b> &nbsp;|&nbsp; <i>Data Science Club (DSC)</i>", body_style)
    exp3_meta = Paragraph("<b>2024</b><br/>Bhopal, India", meta_style)
    exp_table_data3 = [[exp3_title, exp3_meta]]
    exp_table3 = Table(exp_table_data3, colWidths=[390, 150])
    exp_table3.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
        ('TOPPADDING', (0,0), (-1,-1), 1.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(exp_table3)
    
    # ==================== PAGE BREAK ====================
    story.append(PageBreak())
    
    # ==================== PAGE 2 ====================
    story.append(Paragraph("SELECTED PROJECTS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.75, color=primary_color, spaceAfter=6))
    
    # Project 1: Bhopal Bizlink
    p1_title = Paragraph("<b>Bhopal Bizlink</b> &nbsp;|&nbsp; <i>Next.js, Tailwind CSS, PostgreSQL, EPICS Sandbox</i>", body_style)
    p1_meta = Paragraph("<a href='https://github.com/Nydv01/Bhopal-Bizlink' color='#2563eb'>github.com/Nydv01/Bhopal-Bizlink</a>", meta_style)
    story.append(Table([[p1_title, p1_meta]], colWidths=[310, 230], style=[('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
    story.append(Paragraph("• Engineered an EPICS coding sandbox simulator allowing students to compile and test code layouts in real-time within an isolated runtime environment.", bullet_style))
    story.append(Paragraph("• Developed a local business matching bridge, linking small enterprise needs with student developers using Next.js and PostgreSQL.", bullet_style))
    story.append(Paragraph("• Configured state persistence and JWT session authorization parameters to protect admin dashboard control panels.", bullet_style))
    story.append(Spacer(1, 4))
    
    # Project 2: WanderGlow
    p2_title = Paragraph("<b>WanderGlow</b> &nbsp;|&nbsp; <i>Next.js, FastAPI, OpenAI API, Supabase, Tailwind</i>", body_style)
    p2_meta = Paragraph("<a href='https://github.com/Nydv01/WanderGlow' color='#2563eb'>github.com/Nydv01/WanderGlow</a>", meta_style)
    story.append(Table([[p2_title, p2_meta]], colWidths=[310, 230], style=[('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
    story.append(Paragraph("• Built an AI travel itinerary planner leveraging OpenAI's GPT models to dynamically generate multi-day, personalized travel maps.", bullet_style))
    story.append(Paragraph("• Designed secure vector search database indexing using Supabase PostgreSQL, reducing coordinate retrieval times by 35%.", bullet_style))
    story.append(Paragraph("• Implemented state persistence for itineraries using local storage caching and API query optimization.", bullet_style))
    story.append(Spacer(1, 4))
    
    # Project 3: DripDynamics
    p3_title = Paragraph("<b>DripDynamics</b> &nbsp;|&nbsp; <i>React, TypeScript, Supabase, Framer Motion, Web Audio API</i>", body_style)
    p3_meta = Paragraph("<a href='https://github.com/Nydv01/vintage-drip' color='#2563eb'>github.com/Nydv01/vintage-drip</a>", meta_style)
    story.append(Table([[p3_title, p3_meta]], colWidths=[310, 230], style=[('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
    story.append(Paragraph("• Engineered a comic-book style streetwear storefront using React, TypeScript, and Framer Motion with custom halftone overlays and micro-animations.", bullet_style))
    story.append(Paragraph("• Integrated live audio triggers utilizing Web Audio API and designed a dynamic sticker cursor with particle cursor collision physics.", bullet_style))
    story.append(Paragraph("• Deployed a Supabase backend for inventory control, secure database transactions, and user authentication, reducing page size payloads by 40%.", bullet_style))
    story.append(Spacer(1, 4))
 
    # Project 4: FOSSEE Socratic Tutor
    p4_title = Paragraph("<b>FOSSEE Socratic Tutor</b> &nbsp;|&nbsp; <i>Python, FastAPI, OpenAI API, AST Parsing</i>", body_style)
    p4_meta = Paragraph("<a href='https://github.com/Nydv01/fossee-python-evaluation' color='#2563eb'>github.com/Nydv01/fossee-tutor</a>", meta_style)
    story.append(Table([[p4_title, p4_meta]], colWidths=[310, 230], style=[('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
    story.append(Paragraph("• Built an AI tutoring chatbot utilizing AST (Abstract Syntax Tree) code flow validation for student python submissions.", bullet_style))
    story.append(Paragraph("• Engineered system prompt boundaries preventing direct solution exposure, guiding users socratic-style through hints.", bullet_style))
    story.append(Paragraph("• Designed asynchronous FastAPI backend modules with rate-limiting middleware to guard OpenAI API keys against abuse.", bullet_style))
    story.append(Spacer(1, 4))
 
    # Project 5: Distributed Traffic Routing System
    p5_title = Paragraph("<b>Distributed Traffic Routing System</b> &nbsp;|&nbsp; <i>C++, Multithreading, Socket Programming</i>", body_style)
    p5_meta = Paragraph("<a href='https://github.com/Nydv01/distributed-traffic-system' color='#2563eb'>github.com/Nydv01/traffic-routing</a>", meta_style)
    story.append(Table([[p5_title, p5_meta]], colWidths=[310, 230], style=[('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
    story.append(Paragraph("• Developed a multi-threaded routing simulation in C++ implementing mutex locks, condition variables, and thread-safe queues to prevent deadlocks.", bullet_style))
    story.append(Paragraph("• Transmitted simulated routing packets over custom TCP/IP socket network layers between simulated nodes.", bullet_style))
    story.append(Paragraph("• Processed simulated routing packets at 10,000+ packets/sec without any packet collisions or memory leaks.", bullet_style))
    story.append(Spacer(1, 6))
 
    # Section: Certifications
    story.append(Paragraph("CERTIFICATIONS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.75, color=primary_color, spaceAfter=6))
    
    cert_data = [
        [
            Paragraph("• <b>Google Cybersecurity Professional Certificate:</b> Network security, SIEM logs analysis, threat detection, SQL, Linux & risk mitigation (2025)", body_style),
            Paragraph("<a href='https://www.linkedin.com/in/ydv-nitin/details/certifications/' color='#2563eb'>coursera.org/verify/cybersec</a>", meta_style)
        ],
        [
            Paragraph("• <b>Industrial IoT Markets & Security Certificate:</b> IoT architectures, cyber-physical threats, and protocol security (2025)", body_style),
            Paragraph("<a href='https://www.linkedin.com/in/ydv-nitin/details/certifications/' color='#2563eb'>coursera.org/verify/iiot-sec</a>", meta_style)
        ],
        [
            Paragraph("• <b>Google Generative AI Certification:</b> LLM alignment, prompt engineering, and model application workflows (2025)", body_style),
            Paragraph("<a href='https://www.linkedin.com/in/ydv-nitin/details/certifications/' color='#2563eb'>coursera.org/verify/gen-ai</a>", meta_style)
        ],
        [
            Paragraph("• <b>Verified Credly Badges:</b> Systems administration, networking protocols, security logs analysis, and scripting automation.", body_style),
            Paragraph("<a href='https://www.credly.com/users/nitin-23bce10310' color='#2563eb'>credly.com/users/nitin</a>", meta_style)
        ]
    ]
    cert_table = Table(cert_data, colWidths=[385, 155])
    cert_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
        ('TOPPADDING', (0,0), (-1,-1), 1.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(cert_table)
    story.append(Spacer(1, 6))

    # Section: Relevant Coursework
    story.append(Paragraph("RELEVANT COURSEWORK", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.75, color=primary_color, spaceAfter=6))
    
    coursework_text = (
        "Data Structures & Algorithms &nbsp;·&nbsp; Object-Oriented Programming (C++/Java) &nbsp;·&nbsp; "
        "Database Management (DBMS) &nbsp;·&nbsp; Operating Systems &nbsp;·&nbsp; "
        "Computer Networks &nbsp;·&nbsp; Web Security & Cryptography &nbsp;·&nbsp; Software Engineering"
    )
    story.append(Paragraph(coursework_text, body_style))
    
    # Build Document
    doc.build(story)
    print("PDF generation completed successfully!")

if __name__ == "__main__":
    create_resume("/Users/ydvji/portfolio/public/resume.pdf")
