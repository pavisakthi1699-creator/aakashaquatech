// Lightweight video playback coordinator to ensure videos play "one by one"
export type VideoId = 'hero' | 'family';

export const notifyVideoPlaying = (id: VideoId) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('aakash-active-video-change', {
      detail: { activeId: id }
    }));
  }
};

export const subscribeToVideoChange = (
  currentId: VideoId,
  onShouldPause: () => void
) => {
  if (typeof window === 'undefined') return () => {};

  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<{ activeId: VideoId }>;
    if (customEvent.detail && customEvent.detail.activeId !== currentId) {
      onShouldPause();
    }
  };

  window.addEventListener('aakash-active-video-change', handler);
  return () => {
    window.removeEventListener('aakash-active-video-change', handler);
  };
};
