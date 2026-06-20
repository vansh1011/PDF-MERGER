import { formatFileSize } from '../utils';


export default function FileList({ files, onMoveUp, onMoveDown, onRemove, disabled }) {
  if (files.length === 0) return null;

  return (
    <div className="w-full" role="list" aria-label="Uploaded PDF files">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          Files to merge
        </h2>
        <span className="rounded-full bg-violet-500/20 px-2.5 py-0.5 text-xs font-medium text-violet-300">
          {files.length} file{files.length !== 1 ? 's' : ''}
        </span>
      </div>

      <ul className="flex flex-col gap-2">
        {files.map((file, index) => (
          <li
            key={file.id}
            role="listitem"
            className="animate-slide-in flex items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-800/60 px-4 py-3 backdrop-blur-sm transition-all duration-150 hover:border-slate-600"
          >
           
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-violet-500/20 text-xs font-bold text-violet-300">
              {index + 1}
            </span>

           
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/15">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5 4.5 4.5H13V3.5zM6 20V4h5v5h5v11H6z"/>
                <path d="M8.5 14.5h.8c.3 0 .5-.1.7-.2.2-.1.2-.3.2-.5s-.1-.4-.2-.5c-.2-.1-.4-.2-.7-.2h-.8v1.4zm0 2.5v-1.8h.8c.6 0 1.1-.1 1.4-.4.3-.3.5-.7.5-1.2s-.2-.9-.5-1.2c-.3-.3-.8-.4-1.4-.4H7.8v5h.7zm4.5 0v-5h1.5c.5 0 .9.1 1.3.3.4.2.7.5.9.9.2.4.3.8.3 1.3s-.1.9-.3 1.3c-.2.4-.5.7-.9.9-.4.2-.8.3-1.3.3H13zm.7-.6h.8c.3 0 .6-.1.9-.2.3-.1.5-.4.6-.7.2-.3.2-.7.2-1s-.1-.7-.2-1c-.2-.3-.4-.5-.6-.7-.3-.1-.6-.2-.9-.2H13.7v3.8z"/>
              </svg>
            </div>

      
            <div className="min-w-0 flex-1">
              <p
                className="truncate text-sm font-medium text-slate-100"
                title={file.name}
              >
                {file.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">{formatFileSize(file.size)}</p>
            </div>

            
            <div className="flex flex-shrink-0 items-center gap-1">
              <button
                id={`move-up-${index}`}
                aria-label={`Move ${file.name} up`}
                onClick={() => onMoveUp(index)}
                disabled={disabled || index === 0}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-700 hover:text-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              </button>

              <button
                id={`move-down-${index}`}
                aria-label={`Move ${file.name} down`}
                onClick={() => onMoveDown(index)}
                disabled={disabled || index === files.length - 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-700 hover:text-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              <button
                id={`remove-${index}`}
                aria-label={`Remove ${file.name}`}
                onClick={() => onRemove(index)}
                disabled={disabled}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-red-500/15 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
