import fs from 'fs';

const path: string = './.data/TEST';
const accno_new: string = '"09105019081000009080633549"';
const account_owner: string =
  'Savex Consulting-Finanse sp. z o.o.|Jaworzyńska 254|59-220 Legnica';

fs.readdir(path, (err, ret) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  ret = ret.filter((el: string) => {
    return !el.includes('-new');
  });

  ret.map((el: string) => {
    const file: string = `${path}/${el}`;
    const fileName: string = file.split('/')[file.split('/').length - 1];
    const fileNameBase: string = fileName.split('.')[0];
    const fileNameExt: string = fileName.split('.')[
      fileName.split('.').length - 1
    ];
    const filePath: string = file.replace(`/${fileName}`, ``);

    fs.writeFileSync(`${filePath}/${fileNameBase}-new.${fileNameExt}`, ``, {
      flag: 'w',
    });

    const data = fs
      .readFileSync(file, {
        encoding: 'utf8',
        flag: 'r',
      })
      .split('\r\n')
      .map((row: string): string[] => {
        return row.split(',');
      });

    data
      .map((row: string[]): string[] => {
        if (row.length === 16) {
          row[3] = accno_new.substring(3, 11);
          row[5] = accno_new;
          row[7] = account_owner;
          row[10] = row[6].substring(3, 11);
          return row;
        }
        return [];
      })
      .map((row: string[]): string[] => {
        row.map((item: string, index: number): string[] => {
          fs.writeFileSync(
            `${filePath}/${fileNameBase}-new.${fileNameExt}`,
            `${item}${index < row.length - 1 ? `,` : `\r\n`}`,
            {
              flag: 'a',
            }
          );
          return row;
        });
        return row;
      });
  });
});
