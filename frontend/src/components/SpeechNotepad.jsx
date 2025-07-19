// SpeechNotepad.jsx
import React, { useState, useEffect, useRef } from 'react';

const SpeechNotepad = () => {
  const [paragraphs, setParagraphs] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState('#000000');
  const [fontStyle, setFontStyle] = useState('normal');
  const [isUnderline, setIsUnderline] = useState(false);
  const [language, setLanguage] = useState('en-IN');
  const recognitionRef = useRef(null);
  const editableRefs = useRef([]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onresult = async (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('').trim();
      const punctuated = await addPunctuation(transcript);
      setParagraphs(prev => [...prev, punctuated]);
    };
    recognitionRef.current = recognition;
  }, [language]);

  const addPunctuation = async (text) => {
  //future work
  return text;
};

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  const handleCopy = () => {
    const fullText = editableRefs.current.map(ref => ref?.innerText).join('\n');
    navigator.clipboard.writeText(fullText);
    alert('Text copied to clipboard');
  };

  const handleSave = () => {
    const fullText = editableRefs.current.map(ref => ref?.innerText).join('\n');
    const blob = new Blob([fullText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'note.txt';
    link.click();
  };

 

  const captureSelection = () => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      setSelectionRange(sel.getRangeAt(0));
    }
  };

  const handleTranslate = async (index) => {
  const original = editableRefs.current[index]?.innerText;
  try {
    const res = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: original,
        source: language.startsWith('hi') ? 'hi' : 'en',
        target: language.startsWith('hi') ? 'en' : 'hi',
        format: 'text'
      })
    });
    const data = await res.json();
    editableRefs.current[index].innerText = data.translatedText || 'Translation failed';
  } catch (error) {
    console.error('Translation error:', error);
    editableRefs.current[index].innerText = 'Error during translation';
  }
};

  return (
   <div className="bg-gray-900 w-full rounded-4xl my-10 p-4 space-y-4 flex flex-col items-center text-white">
  <h1 className="text-3xl font-bold text-center">🗣️ Smart Speech Notepad</h1>

  <div className="flex flex-wrap gap-3 items-center justify-center">
    <button onClick={toggleListening} className={`px-4 py-2 rounded text-white ${isListening ? 'bg-red-600' : 'bg-green-600'}`}>
      {isListening ? 'Stop Listening' : 'Start Listening'}
    </button>
    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border p-1 bg-gray-700 text-white">
      <option value="en-IN">English (India)</option>
      <option value="hi-IN">Hindi</option>
    </select>
    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
    <select value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="border p-1 bg-gray-700 text-white">
      {[14, 16, 18, 20, 24, 30].map(size => <option key={size} value={size}>{size}px</option>)}
    </select>
    <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)} className="border p-1 bg-gray-700 text-white">
      <option value="normal">Normal</option>
      <option value="italic">Italic</option>
      <option value="bold">Bold</option>
    </select>
    <button onClick={() => setIsUnderline(!isUnderline)} className="border px-3 py-1 rounded text-white bg-gray-700">
      {isUnderline ? 'Remove Underline' : 'Underline'}
    </button>
    <button onClick={handleCopy} className="bg-blue-500 text-white px-3 py-1 rounded">Copy</button>
    <button onClick={handleSave} className="bg-gray-800 text-white px-3 py-1 rounded">Save</button>
  </div>

  <div className="space-y-4 w-full">
    {paragraphs.map((para, idx) => (
      <div key={idx} className="relative">
        <div
          ref={(el) => editableRefs.current[idx] = el}
          contentEditable
          suppressContentEditableWarning
          onMouseUp={captureSelection}
          className="w-full border p-3 rounded shadow bg-gray-800 min-h-[80px] whitespace-pre-wrap"
          style={{
            fontSize: `${fontSize}px`,
            color: color,
            fontStyle: fontStyle === 'italic' ? 'italic' : 'normal',
            fontWeight: fontStyle === 'bold' ? 'bold' : 'normal',
            textDecoration: isUnderline ? 'underline' : 'none'
          }}
        >
          {para}
        </div>
        <button
          className="absolute top-2 right-2 text-sm bg-yellow-400 text-black px-2 py-1 rounded"
          onClick={() => handleTranslate(idx)}
        >
          Translate
        </button>
      </div>
    ))}
  </div>
</div>

  );
};

export default SpeechNotepad;
