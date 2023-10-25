import React, { useRef, useState, useEffect } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import { Editor } from '@tinymce/tinymce-react';

import Button from '../Button';
import { FormButtons } from './styles';

export default function RichTextEditor({ teste, onChange }) {
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState(teste);
  const [tweetHTML, setTweetHTML] = useState('');

  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load();
    }
  }, []);

  const handleEditorChange = (content) => {
    setEditorContent(content);
    onChange(content);
  };

  const renderTweet = (e) => {
    e.preventDefault();
    const tweetId = editorContent.match(/status\/(\d+)/);
    if (tweetId && tweetId[1]) {
      setTweetHTML(tweetId[1]);
    }
  };

  const copyRenderedTweetToClipboard = (e) => {
    e.preventDefault();
    const tweetRenderContainer = document.getElementById('tweet-render-container');

    if (tweetRenderContainer) {
      const tweetRenderHTML = tweetRenderContainer.innerHTML;

      const textArea = document.createElement('textarea');
      textArea.value = tweetRenderHTML;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Render do tweet copiado para a área de transferência!');
    }
  };

  return (
    <div>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
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
            'nonbreaking | print | table | lists | image | media | link | code | forecolor | tweet', // Certifique-se de adicionar 'tweet' ao botão da barra de ferramentas
          content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
        }}
        value={teste}
        onEditorChange={handleEditorChange}
      />
      <FormButtons>
        <Button type='reset' onClick={copyRenderedTweetToClipboard}>Copiar Render do Tweet</Button>
        <Button type='reset' onClick={renderTweet}>Renderizar Tweet</Button>
      </FormButtons>
      <div id="tweet-render-container">
        {tweetHTML && (
          <TwitterTweetEmbed tweetId={tweetHTML} options={{ width: 400 }} />
        )}
      </div>
    </div>
  );
}
