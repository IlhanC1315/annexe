import "./style.css"
type Attrs = Record<string, string>

export class Toolbox {
    static createElement<K extends keyof HTMLElementTagNameMap>(
        tag: K,
        options?: {
            classes?: string[];
            attrs?: Attrs;
            text?: string;
            children?: HTMLElement[];
            onClick?: (e: Event) => void;
        }
    ): HTMLElementTagNameMap[K] {
        const el = document.createElement(tag);

        if(options?.classes) el.classList.add(...options.classes);
        if(options?.attrs) Object.entries(options.attrs).forEach(([k, v]) => el.setAttribute(k, v));
        if(options?.text) el.textContent = options.text;
        if(options?.children) options.children.forEach(c => el.appendChild(c));
        if(options?.onClick) el.addEventListener('click', options.onClick);

        return el;
    }

    static createButton(text: string, classes: string[], onClick?: (e: Event) => void): HTMLButtonElement {
        return this.createElement('button', { text, classes, onClick }) as HTMLButtonElement
    }
}