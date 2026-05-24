/* =========================================================
   DRAG LIST — Reorderable List Component
   Uses native HTML drag-and-drop API for reordering.
   Includes grip handles, delete buttons, and add button.
   No external drag library dependency.
========================================================= */

import { useState, useCallback, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GripVertical, Trash2, Plus } from 'lucide-react';

interface DragListItem {
  id: string;
  order: number;
}

interface DragListProps<T extends DragListItem> {
  /** Array of items with id and order */
  items: T[];
  /** Callback fired when items are reordered. Receives array with updated order values. */
  onReorder: (items: T[]) => void;
  /** Render function for each item's content */
  renderItem: (item: T, index: number) => ReactNode;
  /** Callback to add a new item */
  onAdd?: () => void;
  /** Callback to delete an item by id */
  onDelete?: (id: string) => void;
  /** Label for the add button */
  addLabel?: string;
}

/**
 * DragList — Drag-and-drop reorderable list for the admin panel.
 * Uses native HTML5 drag-and-drop. Items animate on reorder.
 */
export default function DragList<T extends DragListItem>({
  items,
  onReorder,
  renderItem,
  onAdd,
  onDelete,
  addLabel = 'Add Item',
}: DragListProps<T>) {
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragItemRef = useRef<string | null>(null);
  const dragNodeRef = useRef<HTMLDivElement | null>(null);

  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, id: string) => {
      dragItemRef.current = id;
      dragNodeRef.current = e.currentTarget;
      e.dataTransfer.effectAllowed = 'move';
      // Make the dragged element semi-transparent
      requestAnimationFrame(() => {
        if (dragNodeRef.current) {
          dragNodeRef.current.style.opacity = '0.4';
        }
      });
    },
    []
  );

  const handleDragEnd = useCallback(() => {
    if (dragNodeRef.current) {
      dragNodeRef.current.style.opacity = '1';
    }
    dragItemRef.current = null;
    dragNodeRef.current = null;
    setDragOverId(null);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (dragItemRef.current && dragItemRef.current !== targetId) {
        setDragOverId(targetId);
      }
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
      e.preventDefault();
      const sourceId = dragItemRef.current;
      if (!sourceId || sourceId === targetId) {
        setDragOverId(null);
        return;
      }

      const sourceIndex = sortedItems.findIndex((item) => item.id === sourceId);
      const targetIndex = sortedItems.findIndex((item) => item.id === targetId);

      if (sourceIndex === -1 || targetIndex === -1) {
        setDragOverId(null);
        return;
      }

      // Reorder: remove source, insert at target position
      const reordered = [...sortedItems];
      const [removed] = reordered.splice(sourceIndex, 1);
      reordered.splice(targetIndex, 0, removed);

      // Reassign order values
      const updated = reordered.map((item, idx) => ({
        ...item,
        order: idx,
      }));

      onReorder(updated);
      setDragOverId(null);
    },
    [sortedItems, onReorder]
  );

  const handleDragLeave = useCallback(() => {
    setDragOverId(null);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      if (onDelete) {
        onDelete(id);
      }
    },
    [onDelete]
  );

  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {sortedItems.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            draggable
            onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>, item.id)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e as unknown as React.DragEvent<HTMLDivElement>, item.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e as unknown as React.DragEvent<HTMLDivElement>, item.id)}
            className={`group flex items-start gap-3 p-4 rounded-xl border transition-all ${
              dragOverId === item.id
                ? 'border-violet-500/40 bg-violet-500/5'
                : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
            }`}
          >
            {/* Drag Handle */}
            <div className="cursor-grab active:cursor-grabbing pt-0.5 text-white/20 hover:text-white/40 transition-colors shrink-0">
              <GripVertical className="w-5 h-5" />
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">{renderItem(item, index)}</div>

            {/* Delete Button */}
            {onDelete && (
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="shrink-0 pt-0.5 text-white/15 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                title="Delete item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Button */}
      {onAdd && (
        <motion.button
          type="button"
          onClick={onAdd}
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.995 }}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-dashed border-white/15 text-white/40 hover:text-white/70 hover:border-white/25 hover:bg-white/[0.02] transition-all text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          {addLabel}
        </motion.button>
      )}
    </div>
  );
}
