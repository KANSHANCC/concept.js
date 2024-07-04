import EventManager from "./EventManager";
import {textElData} from "./elementData/elementData";

class ConceptCore {
    constructor(el) {
        this.el = el
        this.event = new EventManager(this.el);
        this.el.appendChild(this.event.createBasic())
    }
}

export default ConceptCore