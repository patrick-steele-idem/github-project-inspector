function Meta() {
    this.maintainers = [];
    this.contributors = [];
    this.author = null;
    this.keywords = null;
    this.description = null;
    this.name = null;
    this.license = null;
    this.homepage = null;
    this.version = null;
}

Meta.prototype = {

    setProps: function(newProps) {
        for (var k in newProps) {
            if (newProps.hasOwnProperty(k)) {
                var v = newProps[k];
                this.setProp(k, v);
            }
        }
    },

    setProp: function(name, value) {
        if (value == null) {
            return;
        }

        var curValue = this[name];

        if (Array.isArray(curValue) || Array.isArray(value)) {
            this.add(name, value);
        } else {
            if (curValue == null) {
                this[name] = value;
            }
        }
    },

    add: function(prop, array) {
        if (array == null) {
            return;
        }

        if (!Array.isArray(array)) {
            array = [array];
        }

        var cur = this[prop];
        var finalArray;

        if (cur) {
            if (Array.isArray(cur)) {
                finalArray = cur.concat(array);
            } else {
                finalArray = [cur].concat(array);
            }
        } else {
            finalArray = array;
        }

        this[prop] = finalArray;
    }
};

module.exports = Meta;