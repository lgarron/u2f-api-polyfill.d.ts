# `u2f-api-polyfill.d.ts`

TypeScript definitions for the [`u2f-api-polyfill`](https://www.npmjs.com/package/u2f-api-polyfill) package, maintained at <https://github.com/mastahyeti/u2f-api> and originally from <https://github.com/google/u2f-ref-code>.

## Usage

Add to `./node_modules/@types/u2f-api-polyfill` and add/import `u2f-api-polyfill` as normal.

    import "u2f-api-polyfill"

    // TypeScript should know the type for this.
    window.u2f.sign(...)
