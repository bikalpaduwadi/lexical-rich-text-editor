import { create } from 'zustand';

export interface EditorState {
  value: string | null;
  setValue: (val: string) => void;
}

const useEditorState = create<EditorState>((set) => ({
  value: null,
  setValue: (val) => set({ value: val }),
}));

export default useEditorState;
