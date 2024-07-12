import React from 'react'
import { toast } from 'sonner';

function useCopyText() {
  const copyToClipboard = async (text: string, config?: {
    customSuccessMessage?: string
  }) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        toast.success(config?.customSuccessMessage || 'Text berhasil disalin');
        return;
      } catch (err) {
        toast.error('Gagal menyalin text');
      }
    }

    // Fallback method for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; // Avoid scrolling to bottom of the page
    textArea.style.opacity = '0'; // Hide the textarea
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      toast.success(config?.customSuccessMessage || 'Text berhasil disalin');
    } catch (err) {
      toast.error('Gagal menyalin text');
    } finally {
      document.body.removeChild(textArea);
    }
  };

  return { copyToClipboard };
}

export default useCopyText