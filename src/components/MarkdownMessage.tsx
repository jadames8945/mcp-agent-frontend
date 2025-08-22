import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownMessageProps {
  content: string;
}

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content }) => (
  <ReactMarkdown>{content}</ReactMarkdown>
);

export default MarkdownMessage; 