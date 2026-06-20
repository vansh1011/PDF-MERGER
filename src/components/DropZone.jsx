import { useCallback, useRef, useState } from 'react';
import { isPDF } from '../utils';


export default function DropZone({ onFiles, disabled }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const processFiles = useCallback(
    (rawFiles) => {
      const valid = [];
      const invalid = [];
      Array.from(rawFiles).forEach((f) => {
        if (isPDF(f)) valid.push(f);
        else invalid.push(f.name);
      });
      onFiles(valid, invalid);
    },
    [onFiles]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) processFiles(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    processFiles(e.target.files);
   
    e.target.value = '';
  };

  return (
    <div
      id="drop-zone"
      role="button"
      tabIndex={0}
      aria-label="Upload PDF files by clicking or dragging them here"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => e.key === 'Enter' && !disabled && inputRef.current?.click()}
      className={`
        relative flex flex-col items-center justify-center gap-4
        w-full rounded-2xl border-2 border-dashed p-10 cursor-pointer
        transition-all duration-200 select-none
        ${isDragging
          ? 'border-violet-500 bg-violet-500/10 scale-[1.01]'
          : 'border-slate-600 hover:border-violet-400 hover:bg-violet-500/5'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
      `}
    >
     
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-200
          ${isDragging ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-700/60 text-slate-400'}`}
      >
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
        </svg>
      </div>

      <div className="text-center">
        <p className="text-base font-medium text-slate-200">
          {isDragging ? 'Drop your PDFs here' : 'Drag & drop PDF files here'}
        </p>
        <p className="mt-1 text-sm text-slate-400">
          or{' '}
          <span className="text-violet-400 font-medium underline underline-offset-2">
            click to browse
          </span>
        </p>
      </div>

      <input
        ref={inputRef}
        id="file-input"
        type="file"
        accept=".pdf,application/pdf"
        multiple
        className="sr-only"
        onChange={handleChange}
        disabled={disabled}
        aria-label="File input"
      />
    </div>
  );
}
