"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path = './.data/TEST';
const accno_new = '"09105019081000009080633549"';
const account_owner = 'Savex Consulting-Finanse sp. z o.o.|Jaworzyńska 254|59-220 Legnica';
fs_1.default.readdir(path, (err, ret) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    ret = ret.filter((el) => {
        return !el.includes('-new');
    });
    ret.map((el) => {
        const file = `${path}/${el}`;
        const fileName = file.split('/')[file.split('/').length - 1];
        const fileNameBase = fileName.split('.')[0];
        const fileNameExt = fileName.split('.')[fileName.split('.').length - 1];
        const filePath = file.replace(`/${fileName}`, ``);
        fs_1.default.writeFileSync(`${filePath}/${fileNameBase}-new.${fileNameExt}`, ``, {
            flag: 'w',
        });
        const data = fs_1.default
            .readFileSync(file, {
            encoding: 'utf8',
            flag: 'r',
        })
            .split('\r\n')
            .map((row) => {
            return row.split(',');
        });
        data
            .map((row) => {
            if (row.length === 16) {
                row[3] = accno_new.substring(3, 11);
                row[5] = accno_new;
                row[7] = account_owner;
                row[10] = row[6].substring(3, 11);
                return row;
            }
            return [];
        })
            .map((row) => {
            row.map((item, index) => {
                fs_1.default.writeFileSync(`${filePath}/${fileNameBase}-new.${fileNameExt}`, `${item}${index < row.length - 1 ? `,` : `\r\n`}`, {
                    flag: 'a',
                });
                return row;
            });
            return row;
        });
    });
});
