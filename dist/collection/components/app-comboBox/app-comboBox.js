export class AppComboBox {
    constructor() {
        this.dropDownClick = this.dropDownClick.bind(this);
        this.filterFunction = this.filterFunction.bind(this);
        this.selectedData = "";
    }
    componentDidLoad() {
        if (this.componentWidth) {
            this.dropDownParent.setAttribute('style', 'width:' + this.componentWidth + 'px !important');
            this.dropDownSearch.setAttribute('style', 'width:' + this.componentWidth + 'px !important');
        }
    }
    dropDownClick() {
        this.dropDown.classList.toggle("show");
    }
    filterFunction() {
        var filter = this.dropDownSearch.value.toUpperCase();
        var a = this.dropDown.getElementsByTagName("a");
        for (var i = 0; i < a.length; i++) {
            var txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "";
            }
            else {
                a[i].style.display = "none";
            }
        }
    }
    clickElement(event) {
        this.selectedData = event.target.innerText;
        this.entitySelected.emit(this.comboid + ":" + this.selectedData);
    }
    render() {
        return (h("div", null,
            h("div", { class: "dropdown", ref: el => this.dropDownParent = el },
                h("div", null,
                    h("input", { ref: el => this.dropDownSearch = el, onFocus: this.dropDownClick, onBlur: this.dropDownClick, type: "text", placeholder: "Search..", id: "myInput", onKeyUp: this.filterFunction, value: this.selectedData }),
                    h("span", { class: "input-icon" }, "\u2B9F")),
                h("div", { ref: el => this.dropDown = el, id: "myDropdown", class: "dropdown-content" }, this.combodata.length > 0 ? this.combodata.map((elementName) => h("a", { onMouseDown: (event) => this.clickElement(event) }, elementName)) : h("a", { class: "no-display" })))));
    }
    static get is() { return "app-comboBox"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "combodata": {
            "type": "Any",
            "attr": "combodata"
        },
        "comboid": {
            "type": String,
            "attr": "comboid"
        },
        "componentWidth": {
            "type": String,
            "attr": "component-width"
        },
        "selectedData": {
            "type": String,
            "attr": "selected-data",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "entitySelected",
            "method": "entitySelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:app-comboBox:**/"; }
}
