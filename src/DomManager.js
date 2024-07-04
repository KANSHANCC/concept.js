class DomManager{
    constructor(el) {
    }
    createElement(data, value = '') {
        let el = document.createElement(data.tagName)
        for (const item in data.attrs) {
            el.setAttribute(item, data.attrs[item])
        }
        el.innerHTML = value
        return el
    }
    clearBr(target) {
        for (let i  = target.childNodes.length - 1; i >= 0; i--) {
            let node = target.childNodes[i]
            if (node instanceof HTMLBRElement || node.data === '\n') target.removeChild(node)
        }
    }
}
export default DomManager