import { useState } from 'react';
import { List } from 'lucide-react';

const Editor = () => {
  const [text, setText] = useState('');

  const handleEditor = (action: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = text.slice(start, end);
    let newText = text;

    switch (action) {
      case 'bold':
        newText = text.slice(0, start) + `<b>${selectedText}</b>` + text.slice(end);
        break;
      case 'italic':
        newText = text.slice(0, start) + `<i>${selectedText}</i>` + text.slice(end);
        break;
      default:
        break;
    }

    setText(newText);

    // Refocus và đặt con trỏ tại cuối văn bản đã chèn
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + `<b>${selectedText}</b>`.length, start + `<b>${selectedText}</b>`.length);
    }, 0);
  };

  return (
    <div>
      <div className="flex items-center text-center my-2">
        <button className="text-base w-8 h-8 border" onClick={() => handleEditor('bold')}>
          <b>B</b>
        </button>
        <button className="text-base w-8 h-8 border" onClick={() => handleEditor('italic')}>
          <i>I</i>
        </button>
        <button className="text-base w-8 h-8 border">
          <List className="mx-auto" />
        </button>
      </div>

      {/* TextArea cho đầu vào văn bản */}
      <textarea
        className="border h-[200px] rounded outline-none p-3 w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            // Ngăn chặn hành vi mặc định của Enter
            e.preventDefault();
            // Thêm dấu xuống dòng vào văn bản
            setText(text + '\n');
          }
        }}
      />

      {/* Hiển thị văn bản đã định dạng trong một div */}
      <div
        className="border mt-4 p-3"
        dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }} // Render HTML đã định dạng với dấu xuống dòng
      />
    </div>
  );
};

export default Editor;
