import {re} from "@babel/core/lib/vendor/import-meta-resolve";

class CacheItem{
    constructor(_value, _count) {
        this.value = _value;
        this.count = _count;
    }
}

class Cache{
    constructor() {
        this.map = new Map()
        this.history = new Array()
    }

    add(key, value, count=1) {
        this.map.set(key, new CacheItem(value, count))
    }

    take(key) {
        const val = this.map.get(key)
        if ( val && val.count > 0) {
            val.count -= 1
            this.history.push([key, val.value, val.count])
            return this.map.get(key).value
        }
        else {
            this.history.push([key, 'null'])
            return null;
        }
    }

    statistics() {
        let n = []
        this.map.forEach((value, key, map) => {
            n.push([key, value.value, value.count])
        } )
        return n
    }

}
export {Cache}