/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plugin, WorkspaceLeaf, addIcon } from 'obsidian';
import { HNSettings } from './interfaces';
import { HNView, VIEW_TYPE } from './ui/hackernews/hackernewsView';


export const icons: Record<string, string> = {
    hackernews: `<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30.961 30.961" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M21.27,0c-1.174,2.021-5.5,9.464-5.532,9.499h-0.11C15.595,9.464,11.424,2.073,10.253,0H3.148l9.253,15.034v15.927h6.157 V15.034L27.812,0H21.27z"></path> </g> </g> </g></svg>`,
};

export const addIcons = (): void => {
    Object.keys(icons).forEach((key) => {
        addIcon(key, icons[key]);
    });
};

export default class HNPlugin extends Plugin {
	settings: HNSettings;
	statusBar: HTMLElement;

	async onload() {
		console.log('loading HN Plugin')
		addIcons();

		this.registerView(VIEW_TYPE, (leaf) => {
            return new HNView(leaf, this);
        });

		this.app.workspace.onLayoutReady(this.openWindowLeaf.bind(this))
	}

	onunload() {
		console.log("onunload method called")
		for(let leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE)) {
			leaf.detach()
		}
	}

	async openWindowLeaf() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE);

		if (leaves.length == 0) {
			leaf = workspace.getRightLeaf(false);
			if(leaf) {
				await leaf.setViewState({ 
					type: VIEW_TYPE, 
				});
			}
			
		}

		const targetLeaf = workspace.getLeavesOfType(VIEW_TYPE).first();
		if (targetLeaf) {
			workspace.revealLeaf(targetLeaf);
		}
		
    }

}