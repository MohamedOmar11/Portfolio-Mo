'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type ContentMap = Record<string, string>;

type ContentContextValue = {
  content: ContentMap;
  get: (key: string, fallback?: string) => string;
};

const ContentContext = createContext<ContentContextValue | null>(null);

function buildMap(items: any[]): ContentMap {
  const map: ContentMap = {};
  for (const item of items) {
    if (!item) continue;
    const section = typeof item.section === 'string' ? item.section : '';
    const key = typeof item.key === 'string' ? item.key : '';
    const value = typeof item.value === 'string' ? item.value : '';
    if (!section || !key) continue;
    map[`${section}.${key}`] = value;
  }
  return map;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentMap>({});

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setContent(buildMap(data));
        } else {
          setContent({});
        }
      })
      .catch(() => setContent({}));
  }, []);

  useEffect(() => {
    const accent = content['theme.accent'] || '#14f1c3';
    const accent2 = content['theme.accent2'] || '#00a3ff';
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--accent2', accent2);
  }, [content]);

  const value = useMemo<ContentContextValue>(() => {
    return {
      content,
      get: (key: string, fallback = '') => {
        const v = content[key];
        return typeof v === 'string' && v.length > 0 ? v : fallback;
      },
    };
  }, [content]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    return { content: {}, get: (_: string, fallback = '') => fallback };
  }
  return ctx;
}

