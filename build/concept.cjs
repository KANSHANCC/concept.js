/**
* @license
* Copyright 2010-2024 Concept.js Authors
* SPDX-License-Identifier: MIT
*/
'use strict';

class DomManager {
  constructor(el) {}
  createElement(data, value = '') {
    let el = document.createElement(data.tagName);
    for (const item in data.attrs) {
      el.setAttribute(item, data.attrs[item]);
    }
    el.innerHTML = value;
    return el;
  }
  clearBr(target) {
    for (let i = target.childNodes.length - 1; i >= 0; i--) {
      let node = target.childNodes[i];
      if (node instanceof HTMLBRElement || node.data === '\n') target.removeChild(node);
    }
  }
}

const textElData = {
  tagName: 'div',
  attrs: {
    class: 'concept-basic concept-text',
    id: '',
    style: 'width: 100%;',
    contenteditable: 'plaintext-only',
    placeholder: "Write something"
  }
};

class EventManager extends DomManager {
  constructor(el) {
    super(el);
    this.el = el;
  }
  textEvent(e) {
    console.log(e);
    let target = e.target || e.srcElement;
    if (e.inputType === 'insertLineBreak') {
      let lastChild = target.lastChild;
      target.removeChild(lastChild);
      let nl = this.createBasic(lastChild.data);
      this.el.insertBefore(nl, target.nextSibling);
    }
    this.clearBr(target);
  }
  createBasic(value) {
    let el = this.createElement(textElData, value);
    this.bindEvent(el, 'input', this.textEvent);
    return el;
  }
  bindEvent(element, eventType, eventHandler) {
    let cb = eventHandler.bind(this);
    element.addEventListener(eventType, cb);
  }
  unbindEvent(element, eventType) {
    element.removeEventListener(eventType);
  }
  handleDOMDeletion(element) {
    this.unbindEvent(element);
  }
}

class ConceptCore {
  constructor(el) {
    this.el = el;
    this.event = new EventManager(this.el);
    this.el.appendChild(this.event.createBasic());
  }
}

module.exports = ConceptCore;
