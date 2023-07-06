import { useEffect } from 'react';
import { $getSelection, LexicalCommand, createCommand } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { $createPillNode } from '../nodes/PillNode';

// Create a custom command with a typed payload.
type CommandPayload = string;
export const INSERT_PILL_COMMAND: LexicalCommand<CommandPayload> =
  createCommand();

const PillPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Similar with command listener, which returns unlisten callback
    const removeListener = editor.registerCommand(
      INSERT_PILL_COMMAND,
      (payload) => {
        // Adding custom command that will be handled by this plugin
        editor.update(() => {
          const selection = $getSelection();
          if (selection !== null) {
            const displayTexgt: string = payload;
            selection.insertNodes([$createPillNode(displayTexgt)]);
          }
        });

        // Returning true indicates that command is handled and no further propagation is required
        return true;
      },
      0
    );

    return () => {
      removeListener();
    };
  }, [editor]);

  return null;
};

export default PillPlugin;
