import { ItemView, WorkspaceLeaf } from "obsidian";
import HNPlugin from "src/main";

export const VIEW_TYPE = 'hackernews-view';
export const VIEW_DISPLAY_TEXT = 'Hacker News';

export class HNView extends ItemView {
    
    plugin: HNPlugin;

    constructor(leaf: WorkspaceLeaf, plugin: HNPlugin) {
        super(leaf);
        this.plugin = plugin;
        console.log('loading HNView')
      }
    
    getViewType(): string {
        return VIEW_TYPE;
    }

    getDisplayText(): string {
        return VIEW_DISPLAY_TEXT;
    }

    async onOpen(): Promise<void> {
        const container = this.containerEl.children[1];
        container.empty();
        container.createEl('h4', { text: 'Example view' });
        const book = container.createEl('div');
        book.createEl('div', { text: 'How to Take Smart Notes' });
        book.createEl('small', { text: 'Sönke Ahrens' });
    }

    async onClose() {
    }
    
}