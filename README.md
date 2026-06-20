# PDF Merger

A simple, free tool to merge multiple PDF files into one — right in your browser. No uploads to any server, no sign-up, no backend. Everything happens client-side.

🔗 **Live demo: [Live Link](https://pdf-merger-nu-roan.vercel.app/) ** 

## Why I built this

I've used PDF merge tools before and always found them slower than they needed to be — extra steps, ads, or sign-ups for something that should just work in two clicks. This tool does exactly that: pick your files, choose your pages, merge, done.

## Features

- Upload multiple PDF files via drag-and-drop or file picker
- See page count and file size for each uploaded PDF
- Select specific pages to include from each file
- Reorder files before merging
- Remove files before merging
- Merge into a single downloadable PDF
- Clear error handling for invalid files or page ranges

## Tech stack

- React (Vite)
- pdf-lib — for all PDF parsing and merging, done entirely in the browser
- Tailwind CSS

## Running locally

```bash
git clone https://github.com/vansh1011/PDF-MERGER.git
cd PDF-MERGER
npm install
npm run dev
```

## Built for

This project was built as a trial task for [Digital Heroes](https://digitalheroesco.com).

---

**Vansh Parmar **
