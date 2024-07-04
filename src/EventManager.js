import DomManager from "./DomManager";
import {textElData} from "./elementData/elementData";

class EventManager extends DomManager {
    constructor(el) {
        super(el)
        this.el = el
    }


    textEvent(e) {
        console.log(e);
        let target = e.target || e.srcElement
        if (e.inputType === 'insertLineBreak') {
            let lastChild = target.lastChild
            target.removeChild(lastChild)
            let nl  = this.createBasic(lastChild.data)
            this.el.insertBefore(nl, target.nextSibling)
        }
        this.clearBr(target)
    }

    createBasic(value) {
        let el = this.createElement(textElData, value)
        this.bindEvent(el, 'input', this.textEvent)
        return el
    }

    bindEvent(element, eventType, eventHandler) {
        let cb = eventHandler.bind(this)
        element.addEventListener(eventType, cb)
    }

    unbindEvent(element, eventType) {
        element.removeEventListener(eventType)
    }

    handleDOMDeletion(element) {
        this.unbindEvent(element)
    }

}

export default EventManager