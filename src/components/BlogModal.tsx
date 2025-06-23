import React from 'react';
import { X, Clock, User, ArrowLeft } from 'lucide-react';
import { blogPosts, BlogPost } from '../data/blog';

interface BlogModalProps {
  postId: string | null;
  onClose: () => void;
}

export function BlogModal({ postId, onClose }: BlogModalProps) {
  const post = blogPosts.find(p => p.id === postId);
  
  if (!post) return null;

  const renderMarkdownContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl font-display font-bold mb-6 text-slate-800 dark:text-slate-200">
            {paragraph.substring(2)}
          </h1>
        );
      }
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-display font-bold mb-4 mt-8 text-slate-800 dark:text-slate-200">
            {paragraph.substring(3)}
          </h2>
        );
      }
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <p key={index} className="font-bold text-slate-800 dark:text-slate-200 mb-4">
            {paragraph.substring(2, paragraph.length - 2)}
          </p>
        );
      }
      if (paragraph.trim() === '') {
        return <div key={index} className="mb-4" />;
      }
      
      // Handle inline markdown formatting
      const processInlineMarkdown = (text: string) => {
        // Handle **bold** text
        return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={i} className="font-bold text-slate-800 dark:text-slate-200">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });
      };
      
      return (
        <p key={index} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          {processInlineMarkdown(paragraph)}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-slate-700/50 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="text-2xl">{post.emoji}</div>
            <div>
              <h3 className="font-display text-xl font-bold text-slate-800 dark:text-slate-200">
                {post.title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readingTime} min read
                </div>
                <span>{post.publishedAt}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {renderMarkdownContent(post.content)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogModal;