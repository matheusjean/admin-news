import React, { useRef, useState } from 'react';

import { Editor } from '@tinymce/tinymce-react';

export default function RichTextEditor({ teste, onChange }) {
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState(teste);

  const handleEditorChange = (content) => {
      onChange(content);
  };

  return (
    <>
      <Editor
        // eslint-disable-next-line no-return-assign
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={editorContent}
        init={{
          directionality: 'ltr',
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'image', 'charmap', 'preview', 'anchor',
            'searchreplace', 'visualblocks', 'fullscreen',
            'insertdatetime', 'paste', 'wordcount',
            'emoticons', 'fullpage', 'codesample', 'nonbreaking', 'print',
            'table', 'lists', 'media', 'link', 'code', 'help',
            'textcolor',
          ],
          toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help | emoticons | fullpage | codesample | ' +
            'nonbreaking | print | table | lists | image | media | link | code | forecolor',
          content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
        }}
        value={teste}
        onEditorChange={handleEditorChange}
      />
    </>
  );
}
