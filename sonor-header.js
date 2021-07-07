import {templateHeaderContent} from './templateheader.js';

import {templateStyle} from './style.js';

const $ = window.$;

export class SonorHeader extends HTMLElement {
    constructor() {
        super();

        
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(this.createTemplate(templateStyle).content.cloneNode(true))
        shadowRoot.appendChild(this.createTemplate(templateHeaderContent).content.cloneNode(true))
        //this.handleTemplateSearchEvents(shadowRoot)
    }

    createTemplate(html){
        const template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        return template;
    }
}

window.customElements.define('sonor-header', SonorHeader);