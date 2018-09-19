import * as U2FAPIPolyfill from "./u2f-api-polyfill"

declare global {
  interface Window {
    u2f: typeof U2FAPIPolyfill
  }
}
