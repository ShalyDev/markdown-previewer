import React from 'react';
import './App.css';
import { marked } from "marked";
import Prism from 'prismjs';

const defaultContent = `

# Markdown Previewer
## Second project of freeCodeCamp frontend libraries projects
### Coded by Sha!

\`<div>Inline code</div>\`

\`\`\`
const sayHello = () => {
  console.log("Hello world!")
}
\`\`\`
**Testing bold text**
`

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

const Editor = ({ content, handleTextareaChange }) => <textarea value={content} onChange={handleTextareaChange} id="editor" />

const Previewer = ({ content }) => (
  <div id="preview" dangerouslySetInnerHTML={{
    __html: marked(content, { renderer: renderer })
  }} />
);

function App() {
  const [content, setContent] = React.useState(defaultContent);

  const handleTextareaChange = (event) => {
    setContent(event.target.value)
  }
  return (
    <div className="main">
      <Editor content={content} handleTextareaChange={handleTextareaChange} />
      <Previewer content={content} />
    </div>
  );
}

export default App;
