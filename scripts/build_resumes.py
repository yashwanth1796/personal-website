"""Build the two public resumes from the portfolio's shared career history.

Run with Python plus reportlab: python scripts/build_resumes.py
The PDFs intentionally use selectable text and a single-column reading order.
"""
from pathlib import Path
import json
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
EXPERIENCES = json.loads((ROOT / 'src/data/experiences.json').read_text())
INK = colors.HexColor('#101828')
BLUE = colors.HexColor('#2459db')
GRAY = colors.HexColor('#475467')
STYLES = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=21, leading=25, textColor=INK, spaceAfter=7),
    'headline': ParagraphStyle('headline', fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=BLUE, spaceAfter=8),
    'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=9, leading=13, textColor=GRAY),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=BLUE, spaceBefore=15, spaceAfter=8, keepWithNext=True),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=10, leading=14, textColor=INK, spaceAfter=5),
    'skill': ParagraphStyle('skill', fontName='Helvetica', fontSize=9.5, leading=13.2, textColor=INK, spaceAfter=4),
    'role': ParagraphStyle('role', fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=INK, spaceBefore=10, spaceAfter=3, keepWithNext=True),
    'date': ParagraphStyle('date', fontName='Helvetica', fontSize=9, leading=12, textColor=GRAY, spaceAfter=6, keepWithNext=True),
    'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=9.7, leading=13.5, leftIndent=10, firstLineIndent=-10, textColor=INK, spaceAfter=5),
}

VARIANTS = {
    'Frontend': {
        'headline': 'FRONT-END ENGINEERING | ARCHITECTURE & TECHNICAL LEADERSHIP',
        'summary': 'Senior Software Engineer with 9+ years of experience building enterprise web platforms. Leads modular React, Next.js, and TypeScript architecture, reusable components, and accessible user experiences. Combines hands-on delivery with mentoring, cross-functional collaboration, and Nx build and release automation. Brings production AI integration experience from SurveyMonkey and a broad foundation in APIs and data systems.',
        'skills': [
            ('Front-end', 'React, Next.js, TypeScript, JavaScript, Vue 3, Redux, Pinia, HTML, CSS, Nx, Storybook'),
            ('Architecture & quality', 'Micro-frontends, reusable components, performance optimization, Jest, React Testing Library, Cypress, WCAG 2.2 AA, AODA, NVDA, VoiceOver'),
            ('Delivery & integration', 'GitHub Actions, Jenkins, Node.js, REST APIs, GraphQL, PostgreSQL, MongoDB'),
            ('AI integration at SurveyMonkey', 'OpenAI APIs, LangChain, streaming interfaces, tool calling, RAG'),
            ('AI-assisted development', 'Claude Code, Codex, Cursor, GitHub Copilot, ChatGPT, Claude'),
        ],
        'sm_order': [0,1,2,3,6,4],
    },
    'FullStack': {
        'headline': 'FULL-STACK ENGINEERING | PLATFORM ARCHITECTURE & LEADERSHIP',
        'summary': 'Senior Software Engineer with 9+ years of experience delivering enterprise platforms across SaaS, financial services, telecom, and healthcare. Builds React and Next.js applications, Node.js and Python APIs, and SQL/NoSQL integrations. Combines modular architecture, infrastructure automation, and engineer mentoring with hands-on delivery. Recent work at SurveyMonkey includes production AI workflows and cloud deployments in partnership with platform teams.',
        'skills': [
            ('Applications & APIs', 'TypeScript, JavaScript, React, Next.js, Vue, Node.js, Python, Express, REST, GraphQL'),
            ('Data & infrastructure', 'PostgreSQL, MongoDB, MySQL, AWS, Terraform, Ansible, Docker'),
            ('Architecture & delivery', 'Nx monorepos, micro-frontends, GitHub Actions, Jenkins, Jest, Cypress, React Testing Library, WCAG 2.2 AA'),
            ('AI integration at SurveyMonkey', 'OpenAI APIs, LangChain, RAG, embeddings, tool calling, streaming UX'),
            ('AI-assisted development', 'Claude Code, Codex, Cursor, GitHub Copilot, ChatGPT, Claude'),
        ],
        'sm_order': [0,5,3,4,2,6],
    },
}

def clean(s):
    return escape(s.replace('\u2013', '-').replace('\u2014', '-').replace('\u2011', '-'))

def paragraph(text, style='body'):
    return Paragraph(text, STYLES[style])

def role(exp, highlights):
    content = [paragraph(clean(exp['company']) + ' | ' + clean(exp['role']), 'role'), paragraph(clean(exp['period']) + ' | ' + clean(exp['location']) + (' | ' + clean(exp['employment']) if exp.get('employment') else ''), 'date')]
    content += [paragraph('- ' + clean(item), 'bullet') for item in highlights]
    return KeepTogether(content)

def footer(canvas, doc):
    canvas.saveState()
    width, height = letter
    canvas.setStrokeColor(colors.HexColor('#d5dce6'))
    canvas.line(42, 35, width-42, 35)
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(GRAY)
    canvas.drawString(42, 22, 'Yashwanth Kumar Vandanapu')
    canvas.drawRightString(width-42, 22, f'Page {doc.page}')
    if doc.page > 1:
        canvas.setFont('Helvetica-Bold', 9)
        canvas.drawString(42, height-31, 'YASHWANTH KUMAR VANDANAPU | EXPERIENCE CONTINUED')
    canvas.restoreState()

def build(variant, config):
    output = ROOT / 'public' / f'Resume - {variant}.pdf'
    doc = SimpleDocTemplate(str(output), pagesize=letter, topMargin=45, bottomMargin=48, leftMargin=42, rightMargin=42, title=f'Yashwanth Kumar Vandanapu - {variant} Engineering', author='Yashwanth Kumar Vandanapu')
    story = [paragraph('Yashwanth Kumar Vandanapu','name'), paragraph(config['headline'],'headline')]
    story += [paragraph('Toronto, Canada | 416-820-5970 | <link href="mailto:yashwanth.vandanapu@gmail.com">yashwanth.vandanapu@gmail.com</link>', 'contact'), paragraph('<link href="https://yashwanth-vandanapu.dev">yashwanth-vandanapu.dev</link> | <link href="https://linkedin.com/in/Yashwanth-Vandanapu">linkedin.com/in/Yashwanth-Vandanapu</link>', 'contact')]
    story += [paragraph('PROFILE','section'), paragraph(config['summary'])]
    story += [paragraph('TECHNICAL EXPERTISE','section')]
    story += [paragraph('<b>' + clean(label) + ':</b> ' + clean(value), 'skill') for label,value in config['skills']]
    story += [paragraph('PROFESSIONAL EXPERIENCE','section')]
    story += [role(EXPERIENCES[0], [EXPERIENCES[0]['highlights'][i] for i in config['sm_order']])]
    story += [role(EXPERIENCES[1], EXPERIENCES[1]['highlights'])]
    for exp in EXPERIENCES[2:]:
        story += [role(exp, exp['highlights'][:3])]
    story += [paragraph('TECHNICAL LEADERSHIP','section'), paragraph('Mentoring engineers on architecture and coding standards; partnering across functions on product delivery; improving developer workflows through shared components, automated testing, and CI/CD. Experience working in globally distributed Agile teams.')]
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(output)

if __name__ == '__main__':
    for name, config in VARIANTS.items():
        build(name, config)
