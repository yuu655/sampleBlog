"use client";

export default function PreviewButton() {
  const endPreview = async () => {
    await fetch('/api/exit-draft?redirect=/articles/');
  }
  return (<button onClick={endPreview}>Previewを終了</button>);
}