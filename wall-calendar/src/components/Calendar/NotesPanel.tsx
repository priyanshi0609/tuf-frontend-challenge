'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Plus, Trash2, StickyNote, X } from 'lucide-react'
import { Note, saveNotes } from '@/lib/calendarUtils'
import { cn } from '@/lib/cn'

interface NotesPanelProps {
  notes: Note[]
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>
  startDate: Date | null
  endDate: Date | null
  currentDate: Date
}

export default function NotesPanel({
  notes,
  setNotes,
  startDate,
  endDate,
  currentDate,
}: NotesPanelProps) {
  const [activeTab, setActiveTab] = useState<'month' | 'range'>('month')
  const [input, setInput] = useState('')

  // Month key
  const monthKey = format(currentDate, 'yyyy-MM')

  // Range key
  const rangeKey =
    startDate && endDate
      ? `${format(startDate <= endDate ? startDate : endDate, 'yyyy-MM-dd')}__${format(startDate <= endDate ? endDate : startDate, 'yyyy-MM-dd')}`
      : startDate
      ? format(startDate, 'yyyy-MM-dd')
      : null

  const dateKey = activeTab === 'range' && rangeKey ? rangeKey : monthKey

  const filteredNotes = notes.filter((n) => n.dateKey === dateKey)

  const addNote = () => {
    if (!input.trim()) return
    const newNote: Note = {
      id: `${Date.now()}-${Math.random()}`,
      text: input.trim(),
      dateKey,
      createdAt: Date.now(),
    }
    const updated = [...notes, newNote]
    setNotes(updated)
    saveNotes(updated)
    setInput('')
  }

  const deleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id)
    setNotes(updated)
    saveNotes(updated)
  }

  const rangeLabel =
    startDate && endDate
      ? `${format(startDate <= endDate ? startDate : endDate, 'MMM d')} – ${format(startDate <= endDate ? endDate : startDate, 'MMM d')}`
      : startDate
      ? format(startDate, 'MMM d')
      : null

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <StickyNote size={15} className="text-[#1AACEC]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Notes
          </span>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-600">
          {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 mb-3 bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg">
        <button
          onClick={() => setActiveTab('month')}
          className={cn(
            'flex-1 text-xs py-1.5 rounded-md font-medium transition-all',
            activeTab === 'month'
              ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
          )}
        >
          {format(currentDate, 'MMMM')}
        </button>
        <button
          onClick={() => setActiveTab('range')}
          disabled={!rangeKey}
          className={cn(
            'flex-1 text-xs py-1.5 rounded-md font-medium transition-all truncate',
            activeTab === 'range'
              ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700',
            !rangeKey && 'opacity-40 cursor-not-allowed'
          )}
          title={rangeKey ? `Notes for ${rangeLabel}` : 'Select a date range first'}
        >
          {rangeLabel || 'Date Range'}
        </button>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto space-y-2 min-h-[80px] max-h-[200px] pr-0.5">
        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
              <StickyNote size={14} className="text-gray-400" />
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-600">
              {activeTab === 'range' && !rangeKey
                ? 'Select a date range to add notes'
                : 'No notes yet. Add one below.'}
            </p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="group flex items-start gap-2 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50 hover:border-[#1AACEC]/30 transition-all"
            >
              <div className="w-1 self-stretch rounded-full bg-[#1AACEC] flex-shrink-0 mt-0.5" />
              <p className="flex-1 text-sm text-gray-700 dark:text-gray-300 leading-snug break-words min-w-0">
                {note.text}
              </p>
              <button
                onClick={() => deleteNote(note.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-rose-500 transition-all flex-shrink-0 mt-0.5"
                aria-label="Delete note"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-700 my-3" />

      {/* Note input area — styled like lined paper */}
      <div className="space-y-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="border-b border-gray-200 dark:border-gray-700" style={{ minHeight: '22px' }} />
        ))}
        <div className="flex gap-2 items-end mt-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                addNote()
              }
            }}
            placeholder="Add a note..."
            rows={2}
            className="flex-1 text-sm bg-transparent border-none outline-none resize-none text-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-gray-600 font-sans leading-snug"
          />
          <button
            onClick={addNote}
            disabled={!input.trim()}
            className={cn(
              'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all',
              input.trim()
                ? 'bg-[#1AACEC] text-white hover:bg-[#0E8DC4] active:scale-95'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
            )}
            aria-label="Add note"
          >
            <Plus size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}