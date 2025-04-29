
import React from 'react';

type SyntaxHighlighterProps = {
    children: React.ReactNode;
    language?: string;
    className?: string;
}

const SyntaxHighlighter = (props: SyntaxHighlighterProps) => {
    const { children, className } = props;

    return (
        <pre className={`bg-gray-800 text-white p-4 rounded-md overflow-auto ${className || ''}`}>
            <code>{children}</code>
        </pre>
    );
};

export default SyntaxHighlighter;
