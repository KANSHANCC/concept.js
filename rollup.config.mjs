import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import serve from "rollup-plugin-serve";
import MagicString from "magic-string";

function header() {
    return {
        renderChunk( code ) {

            code = new MagicString( code );

            code.prepend( `/**
* @license
* Copyright 2010-2024 Concept.js Authors
* SPDX-License-Identifier: MIT
*/\n` );

            return {
                code: code.toString(),
                map: code.generateMap()
            };

        }
    };
}
const builds = [
    {
        input: 'src/index.js',
        plugins: [
            header(),
            babel()
        ],
        output: [
            {
                format: 'esm',
                file: 'build/concept.module.js'
            }
        ]
    },
    {
        input: 'src/index.js',
        plugins: [
            header(),
            babel(),
            terser()
        ],
        output: [
            {
                format: 'esm',
                file: 'build/concept.module.min.js'
            }
        ]
    },
    {
        input: 'src/index.js',
        plugins: [
            header(),
            babel()
        ],
        output: [
            {
                format: 'cjs',
                name: 'Concept',
                file: 'build/concept.cjs',
                indent: '\t'
            }
        ]
    },
    {
        input: 'src/index.js',
        plugins: [
            header(),
            babel(),
            // terser(),
            serve(
                {
                    contentBase: ['build'],
                    port: 3000
                }
            )
        ],
        output: [
            {
                name: 'Concept',
                format: 'iife',
                file: 'build/concept.min.js'
            }
        ]
    },
]

export default () => builds