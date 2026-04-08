'use client';

import { memo, useState, useRef, useCallback } from 'react';
import { Plus, Trash2, Edit3, Check, X, StickyNote } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import clsx from 'clsx';
import { THEME_COLORS, NOTE_COLORS } from '@/data/calendar';
import { formatRange } from '@/utils/calendarUtils';
import type { Note, NoteColor, DateRange, ThemeAccent } from '@/types';

interface NotesProps {
  notes:    Note[];
  range:    DateRange;
  accent:   ThemeAccent;
  onAdd:    (text: string, color: NoteColor, range?: DateRange) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

const COLOR_OPTIONS: NoteColor[] = ['yellow', 'blue', 'green', 'pink', 'purple'];

/**
 * Notes
 *
 * Full notes panel with:
 *  - Textarea for new note input (Cmd/Ctrl+Enter to save)
 *  - Color swatch picker (5 colors)
 *  - Attaches note to the current selected range (if any)
 *  - List of saved notes with hover-revealed edit + delete actions
 *  - Inline editing (click edit icon → textarea replaces text)
 *  - Persisted via parent useCalendar hook → localStorage
 */
export const Notes = memo(function Notes({
  notes,
  range,
  accent,
  onAdd,
  onDelete,
  onUpdate,
}: NotesProps) {
  const colors = THEME_COLORS[accent];

  // New note state
  const [draft, setDraft]         = useState('');
  const [noteColor, setNoteColor] = useState<NoteColor>('yellow');

  // Edit state
  const [editId, setEditId]   = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editRef     = useRef<HTMLTextAreaElement>(null);

  const rangeLabel = range.start ? formatRange(range) : null;

  // ── Add note ──────────────────────────────────────────────────────────────
  const handleAdd = useCallback(() => {
    if (!draft.trim()) return;
    onAdd(draft, noteColor, range.start ? range : undefined);
    setDraft('');
  }, [draft, noteColor, range, onAdd]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleAdd();
    },
    [handleAdd]
  );

  // ── Edit note ─────────────────────────────────────────────────────────────
  const startEdit = useCallback((note: Note) => {
    setEditId(note.id);
    setEditText(note.text);
    // Focus the edit textarea on next tick
    setTimeout(() => editRef.current?.focus(), 0);
  }, []);

  const confirmEdit = useCallback(() => {
    if (editId && editText.trim()) {
      onUpdate(editId, editText.trim());
    }
    setEditId(null);
    setEditText('');
  }, [editId, editText, onUpdate]);

  const cancelEdit = useCallback(() => {
    setEditId(null);
    setEditText('');
  }, []);

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* ── Panel Header ───────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b border-paper-100 dark:border-paper-800 shrink-0"
        style={{ borderLeftColor: colors.primary, borderLeftWidth: '3px' }}
      >
        <StickyNote size={14} style={{ color: colors.primary }} />
        <h2 className="text-[11px] font-bold text-paper-700 dark:text-paper-300 tracking-widest uppercase">
          Notes
        </h2>
        {notes.length > 0 && (
          <span
            className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: colors.light, color: colors.dark }}
          >
            {notes.length}
          </span>
        )}
      </div>

      {/* ── New Note Input ──────────────────────────────────────────────────── */}
      <div className="px-3 py-3 border-b border-paper-100 dark:border-paper-800 bg-paper-50 dark:bg-paper-900/60 shrink-0">

        {/* Range badge — shows which range this note will be attached to */}
        {rangeLabel && (
          <div
            className="inline-flex items-center gap-1 mb-2 px-2 py-0.5 rounded-full text-[10px] font-semibold"
            style={{ backgroundColor: colors.light, color: colors.dark }}
          >
            📅 {rangeLabel}
          </div>
        )}

        {/* Draft textarea */}
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            rangeLabel
              ? `Note for ${rangeLabel}… (⌘↵)`
              : 'New note… (⌘↵ to save)'
          }
          rows={2}
          className={clsx(
            'w-full resize-none rounded-lg p-2.5',
            'text-[12px] font-mono leading-relaxed',
            'bg-white dark:bg-paper-800',
            'text-paper-800 dark:text-paper-100',
            'placeholder:text-paper-300 dark:placeholder:text-paper-600',
            'border border-paper-200 dark:border-paper-700',
            'focus:outline-none focus:ring-2 transition-shadow duration-150',
          )}
          style={{ '--tw-ring-color': colors.ring } as React.CSSProperties}
        />

        {/* Color picker + Save button */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-1.5" role="group" aria-label="Note color">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c}
                onClick={() => setNoteColor(c)}
                aria-label={`${c} color`}
                aria-pressed={noteColor === c}
                className={clsx(
                  'w-[14px] h-[14px] rounded-full border-2 transition-transform duration-150',
                  noteColor === c
                    ? 'scale-125 border-paper-500 dark:border-paper-300'
                    : 'border-transparent hover:scale-110'
                )}
                style={{ backgroundColor: NOTE_COLORS[c].border }}
              />
            ))}
          </div>

          <button
            onClick={handleAdd}
            disabled={!draft.trim()}
            className={clsx(
              'flex items-center gap-1 px-3 py-1 rounded-lg',
              'text-[11px] font-semibold',
              'border transition-all duration-150',
              'disabled:opacity-40 disabled:cursor-not-allowed',
            )}
            style={{
              backgroundColor: draft.trim() ? colors.primary : 'transparent',
              borderColor:     colors.primary,
              color:           draft.trim() ? '#fff' : colors.primary,
            }}
          >
            <Plus size={11} />
            Add
          </button>
        </div>
      </div>

      {/* ── Notes List ──────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">

        {/* Empty state */}
        {notes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <StickyNote
              size={30}
              className="mb-2 text-paper-300 dark:text-paper-700"
            />
            <p className="text-xs text-paper-400 dark:text-paper-600">
              No notes yet.
            </p>
            <p className="text-[10px] text-paper-300 dark:text-paper-700 mt-0.5">
              Select dates then add a note above.
            </p>
          </div>
        )}

        {/* Note cards */}
        {notes.map((note) => {
          const nc       = NOTE_COLORS[note.color] ?? NOTE_COLORS.yellow;
          const isEditing = editId === note.id;

          return (
            <div
              key={note.id}
              className="group rounded-xl border transition-shadow duration-150 hover:shadow-sm animate-fade-in"
              style={{
                backgroundColor: nc.bg,
                borderColor:     nc.border,
              }}
            >
              <div className="p-2.5">

                {isEditing ? (
                  /* ── Edit mode ─────────────────────────────────────────── */
                  <>
                    <textarea
                      ref={editRef}
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      rows={3}
                      className="w-full resize-none rounded-lg p-1.5 text-xs font-mono leading-relaxed bg-white/60 focus:outline-none"
                      style={{ color: nc.text }}
                    />
                    <div className="flex justify-end gap-1.5 mt-1.5">
                      <button
                        onClick={cancelEdit}
                        className="p-1 rounded hover:bg-black/10 transition-colors"
                        aria-label="Cancel edit"
                      >
                        <X size={11} style={{ color: nc.text }} />
                      </button>
                      <button
                        onClick={confirmEdit}
                        className="p-1 rounded hover:bg-black/10 transition-colors"
                        aria-label="Save edit"
                      >
                        <Check size={11} style={{ color: nc.text }} />
                      </button>
                    </div>
                  </>
                ) : (
                  /* ── View mode ─────────────────────────────────────────── */
                  <>
                    <p
                      className="text-[12px] font-mono leading-relaxed whitespace-pre-wrap"
                      style={{ color: nc.text }}
                    >
                      {note.text}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Timestamp / range key */}
                      <span
                        className="text-[9px] opacity-50"
                        style={{ color: nc.text }}
                      >
                        {note.dateKey
                          ? note.dateKey.replace('_', ' → ')
                          : format(parseISO(note.createdAt), 'MMM d, h:mm a')}
                      </span>

                      {/* Action buttons — revealed on hover */}
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <button
                          onClick={() => startEdit(note)}
                          aria-label="Edit note"
                          className="p-1 rounded hover:bg-black/10 transition-colors"
                        >
                          <Edit3 size={10} style={{ color: nc.text }} />
                        </button>
                        <button
                          onClick={() => onDelete(note.id)}
                          aria-label="Delete note"
                          className="p-1 rounded hover:bg-black/10 transition-colors"
                        >
                          <Trash2 size={10} style={{ color: nc.text }} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});