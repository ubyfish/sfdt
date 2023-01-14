"use strict";
/*
 * Copyright (c) 2022, ubyfish
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logTable = exports.prepareTable = void 0;
var Table = require('cli-table3');
function prepareTable(data, fields) {
    var table = new Table({ head: fields, wordWrap: true });
    data.forEach(row => {
        let rowData = [];
        for (const field of fields) {
            rowData.push(row[field]);
        }
        table.push(rowData);
    });
    return table.toString();
}
exports.prepareTable = prepareTable;
async function logTable(data, fields) {
    var table = new Table({ head: fields, wordWrap: true });
    data.forEach(row => {
        let rowData = [];
        for (const field of fields) {
            rowData.push(row[field]);
        }
        table.push(rowData);
    });
    console.log(table.toString());
}
exports.logTable = logTable;
//# sourceMappingURL=table.js.map