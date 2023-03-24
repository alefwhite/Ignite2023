// Importação de clientes via CSV (Excel)
// 1gb - 1.000.000
// POST / upload import.csv
// 10mb/s - 100s
// 100s -> Inserções no banco de dados
// 10mb/s -> 10.000

// Readable Streams - Leitura | Writable Streams - Escrita

// process
//     .stdin
//     .pipe(process.stdout)

import { Readable, Writable, Transform, Duplex } from 'node:stream'
import process from 'node:process'

class OneToHundredStream extends Readable {
    index = 1

    _read () {
        let i = this.index++

        setTimeout(() => {
            if (i > 10) {
                this.push(null)
            } else {
                const buffer = Buffer.from(String(i))
    
                this.push(buffer)
            }            
        }, 250);
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())

