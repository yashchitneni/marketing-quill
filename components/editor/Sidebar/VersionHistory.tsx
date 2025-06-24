'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useEditorStore } from '@/lib/stores/editor-store'

export function VersionHistory() {
  const { 
    history, 
    historyIndex, 
    undo, 
    redo, 
    snapshots, 
    loadSnapshots, 
    restoreSnapshot,
    createSnapshot 
  } = useEditorStore()
  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  useEffect(() => {
    loadSnapshots()
  }, [loadSnapshots])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button 
          onClick={undo} 
          disabled={!canUndo}
          size="sm"
          className="flex-1"
        >
          Undo
        </Button>
        <Button 
          onClick={redo} 
          disabled={!canRedo}
          size="sm"
          className="flex-1"
        >
          Redo
        </Button>
      </div>
      
      <div className="text-sm text-gray-600">
        <p>History: {historyIndex + 1} / {history.length}</p>
        <p className="text-xs mt-1">Up to 50 actions stored</p>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">Daily Snapshots</h4>
          <Button 
            size="sm" 
            variant="outline"
            onClick={createSnapshot}
          >
            Create Snapshot
          </Button>
        </div>
        
        {snapshots.length === 0 ? (
          <p className="text-sm text-gray-500">
            No snapshots yet. Snapshots are created automatically daily.
          </p>
        ) : (
          <div className="space-y-2">
            {snapshots.map((snapshot) => (
              <div 
                key={snapshot.id}
                className="flex items-center justify-between p-2 rounded border hover:bg-gray-50"
              >
                <div className="text-sm">
                  <p className="font-medium">{snapshot.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(snapshot.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => restoreSnapshot(snapshot.id)}
                >
                  Restore
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <p className="text-xs text-gray-400 mt-2">
          Snapshots are kept for 7 days
        </p>
      </div>
    </div>
  )
}