import { Search, Presentation, ChartNoAxesCombined, MessagesSquare, PanelsTopLeft } from 'lucide-react';
export const student = { name: 'Aarush Dadhwal', email: 'aarush.dadhwal@example.com', college: 'Your College Name' };
export const capabilities = [
  { title: 'Business research', icon: Search, description: 'Finding reliable sources, exploring market trends, and turning information into clear, structured insights.', detail: 'Source evaluation · Market overviews · Research summaries' },
  { title: 'Presentation design', icon: Presentation, description: 'Building thoughtful slides that make ideas easy to follow, with a focus on clarity and visual storytelling.', detail: 'Slide structure · Visual hierarchy · PowerPoint & Canva' },
  { title: 'Basic data analysis', icon: ChartNoAxesCombined, description: 'Organizing spreadsheets, working with basic formulas, and making sense of numbers through simple charts.', detail: 'Excel & Sheets · Basic formulas · Charts and summaries' },
  { title: 'Communication', icon: MessagesSquare, description: 'Sharing ideas clearly, listening thoughtfully, and contributing positively to classroom and group projects.', detail: 'Written communication · Teamwork · Presenting ideas' },
  { title: 'Digital productivity', icon: PanelsTopLeft, description: 'Using everyday digital tools to organize tasks, manage documents, and collaborate more effectively.', detail: 'Document creation · Task organization · Collaboration tools' },
];
export function pageHead(title: string, description: string) {
  return { meta: [{ title: `${title} — Aarush Dadhwal | BCom Student` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} — Aarush Dadhwal | BCom Student` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}
export function prepareEmail(name: string, email: string, subject: string, message: string) {
  return `mailto:${student.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hello Aarush,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`)}`;
}
