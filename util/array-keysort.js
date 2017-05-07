Array.prototype.keySort = function(keys) {

    keys = keys || {};
    
    var obLength = function(obj) {
        var size = 0;
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                size++;
        }
        return size;
    };
    
    
    var obIndex = function(obj, index) {
        var size = 0;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (size == index)
                    return key;
                size++;
            }
        }
        return false;
    };
    
    var keySort = function(a, b, d) {
        d = d !== null ? d : 1;
    
        if (a == b)
            return 0;
        return a > b ? 1 * d : -1 * d;
    };
    
    var KL = obLength(keys);
    
    if (!KL)
        return this.sort(keySort);
    
    for ( var k in keys) {
        // asc unless desc or skip
        keys[k] = 
                keys[k] == 'desc' || keys[k] == -1  ? -1 
              : (keys[k] == 'skip' || keys[k] === 0 ? 0 
              : 1);
    }
    
    this.sort(function(a, b) {
        var sorted = 0, index = 0;
    
        while (sorted === 0 && index < KL) {
            var k = obIndex(keys, index);
            if (k) {
                var dir = keys[k];
                sorted = keySort(a[k], b[k], dir);
                index++;
            }
        }
        return sorted;
    });
    
    return this;
};