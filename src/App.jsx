import { useCallback, useState } from 'react';
import DropZone from './components/DropZone';
import FileList from './components/FileList';
import Footer from './components/Footer';
import { mergePDFs, downloadBlob } from './pdfMerger';

let nextId = 0;
const withId = (file) => Object.assign(file, { id: ++nextId });

export default function App() {
  const [files, setFiles] = useState([]);
  const [nonPdfErrors, setNonPdfErrors] = useState([]);
  const [merging, setMerging] = useState(false);
  const [mergeError, setMergeError] = useState(null);
  const [mergeSuccess, setMergeSuccess] = useState(false);



  const handleFiles = useCallback((validFiles, invalidNames) => {
    setMergeSuccess(false);
    setMergeError(null);

    if (invalidNames.length > 0) {
      setNonPdfErrors(invalidNames);
   
      setTimeout(() => setNonPdfErrors([]), 6000);
    }

    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles.map(withId)]);
    }
  }, []);

  const handleMoveUp = useCallback((index) => {
    if (index === 0) return;
    setFiles((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }, []);

  const handleMoveDown = useCallback((index) => {
    setFiles((prev) => {
      if (index === prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }, []);

  const handleRemove = useCallback((index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setMergeError(null);
    setMergeSuccess(false);
  }, []);

  const handleMerge = useCallback(async () => {
    if (files.length < 2) return;
    setMerging(true);
    setMergeError(null);
    setMergeSuccess(false);
    try {
      const blob = await mergePDFs(files);
      downloadBlob(blob, 'merged.pdf');
      setMergeSuccess(true);
    } catch (err) {
      setMergeError(err.message || 'An unexpected error occurred while merging.');
    } finally {
      setMerging(false);
    }
  }, [files]);

  const handleClearAll = () => {
    setFiles([]);
    setNonPdfErrors([]);
    setMergeError(null);
    setMergeSuccess(false);
  };


  const canMerge = files.length >= 2 && !merging;
  const needsMoreFiles = files.length === 1;

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-12">
  
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl">
      
        <header className="mb-10 text-center animate-fade-in">
         
          <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
            <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            PDF Merger
          </h1>
          <p className="mt-2.5 text-base text-slate-400">
            Combine multiple PDFs into one — entirely in your browser, no uploads needed.
          </p>
        </header>

        <main>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-md animate-fade-in">

           
            <DropZone onFiles={handleFiles} disabled={merging} />

            
            {nonPdfErrors.length > 0 && (
              <div
                id="non-pdf-error"
                role="alert"
                className="mt-4 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 animate-fade-in"
              >
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-amber-300">Non-PDF files ignored</p>
                  <p className="mt-0.5 text-xs text-amber-400/80">
                    {nonPdfErrors.join(', ')}
                  </p>
                </div>
                <button
                  onClick={() => setNonPdfErrors([])}
                  aria-label="Dismiss error"
                  className="ml-auto flex-shrink-0 text-amber-400/60 hover:text-amber-300 transition-colors"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

           
            {files.length > 0 && (
              <div className="mt-6">
                <FileList
                  files={files}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  onRemove={handleRemove}
                  disabled={merging}
                />
              </div>
            )}

            
            {needsMoreFiles && (
              <p
                id="needs-more-files"
                role="status"
                className="mt-4 rounded-xl border border-sky-500/25 bg-sky-500/10 px-4 py-2.5 text-center text-sm text-sky-300 animate-fade-in"
              >
                Add at least one more PDF to enable merging.
              </p>
            )}

          
            {mergeError && (
              <div
                id="merge-error"
                role="alert"
                className="mt-4 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 animate-fade-in"
              >
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-red-300">Merge failed</p>
                  <p className="mt-0.5 text-xs text-red-400/80">{mergeError}</p>
                </div>
              </div>
            )}

            
            {mergeSuccess && (
              <div
                id="merge-success"
                role="status"
                className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 animate-fade-in"
              >
                <svg className="h-5 w-5 flex-shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p className="text-sm font-medium text-emerald-300">
                  Merged PDF downloaded successfully!
                </p>
              </div>
            )}

         
            <div className="mt-6 flex items-center gap-3">
              {files.length > 0 && (
                <button
                  id="clear-all-btn"
                  onClick={handleClearAll}
                  disabled={merging}
                  className="flex-shrink-0 rounded-xl border border-slate-600 px-4 py-2.5 text-sm font-medium text-slate-400 transition-all hover:border-slate-500 hover:text-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Clear all
                </button>
              )}

              <button
                id="merge-btn"
                onClick={handleMerge}
                disabled={!canMerge}
                className={`
                  relative flex flex-1 items-center justify-center gap-2.5
                  rounded-xl px-6 py-3 text-sm font-semibold
                  transition-all duration-200
                  ${canMerge
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/40 active:scale-[0.98]'
                    : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                  }
                `}
              >
                {merging ? (
                  <>
                    <svg className="h-4 w-4 spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Merging…
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                    </svg>
                    Merge PDFs
                  </>
                )}
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
