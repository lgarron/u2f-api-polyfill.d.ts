// Base 64 using `-` and `_`, without trailing `=`.
// See:
// - https://fidoalliance.org/specs/fido-u2f-v1.2-ps-20170411/fido-u2f-javascript-api-v1.2-ps-20170411.html#key-words
// - https://tools.ietf.org/html/rfc4648#section-5
type WebSafeBase64 = string;

// Polyfill-specific types for `u2f-api-polyfill.d.ts` that are not defined in
// `u2f-api-polyfill` itself.

type PolyfillVersion = "U2F_V2"; // TODO: are other values supported?
type AppID = string; // A URL
type Challenge = WebSafeBase64;
type ClientData = string; // TODO
type ErrorMessage = string;
type KeyHandle = WebSafeBase64;
type RequestID = number;
type Seconds = number;
type SignatureData = string; // TODO

// Types from `u2f-api-polyfill`.

export const EXTENSION_ID: string = "kmendfapggjehodndflmmgagdbamhnfd";

export enum MessageType {
  U2F_REGISTER_REQUEST = "u2f_register_request",
  U2F_REGISTER_RESPONSE = "u2f_register_response",
  U2F_SIGN_REQUEST = "u2f_sign_request",
  U2F_SIGN_RESPONSE = "u2f_sign_response",
  U2F_GET_API_VERSION_REQUEST = "u2f_get_api_version_request",
  U2F_GET_API_VERSION_RESPONSE = "u2f_get_api_version_response"
}

export enum ErrorCode {
  OK = 0,
  OTHER_ERROR = 1,
  BAD_REQUEST = 2,
  CONFIGURATION_UNSUPPORTED = 3,
  DEVICE_INELIGIBLE = 4,
  TIMEOUT = 5
}

type Request = {
  type: MessageType,
  appId?: AppID,
  timeoutSeconds?: Seconds,
  requestId?: RequestID
}

type Response = {
  type: MessageType,
  responseData: (U2FError | RegisterResponse | SignResponse),
  requestId?: RequestID
}

type U2FError = {
  errorCode: ErrorCode,
  errorMessage?: ErrorMessage
}

// TODO: What are the values?
export enum Transport {
  BLUETOOTH_RADIO,
  BLUETOOTH_LOW_ENERGY,
  USB,
  NFC
}

type SignRequest = {
  version: PolyfillVersion,
  challenge: Challenge,
  keyHandle: KeyHandle,
  appId: AppID
}

type SignResponse = {
  keyHandle: KeyHandle,
  signatureData: SignatureData,
  clientData: ClientData
}

type RegisterRequest = {
  version: PolyfillVersion,
  challenge: Challenge
}


type RegisterResponse = {
  version: PolyfillVersion,
  keyHandle: KeyHandle,
  transports: Transport[],
  appId: AppID
}

type RegisteredKey = {
  version: PolyfillVersion,
  keyHandle: KeyHandle,
  transports: Transport[],
  appId?: AppID
}

type GetJsApiVersionResponse = {
  js_api_version: number
}

// TODO: WrappedChromeRuntimePort_?
export function getMessagePort(
  callback: (m: MessagePort) => void
): void;

// TODO: function formatSignRequest_ is not marked as private?
// TODO: function formatRegisterRequest_ is not marked as private?

//  Default extension response timeout in seconds.
export const EXTENSION_TIMEOUT_SEC: Seconds = 30;

// Dispatches an array of sign requests to available U2F tokens. If the JS API
// version supported by the extension is unknown, it first sends a message to
// the extension to find out the supported API version and then it sends the
// sign request.
export function sign(
  appId: AppID | undefined,
  challenge: Challenge | undefined,
  registeredKeys: RegisteredKey[],
  callback: (response: (U2FError | SignResponse)) => void,
  timeout?: Seconds
): void;

// Dispatches an array of sign requests to available U2F tokens.
export const sendSignRequest: typeof sign;

// Dispatches register requests to available U2F tokens. An array of sign
// requests identifies already registered tokens. If the JS API version
// supported by the extension is unknown, it first sends a message to the
// extension to find out the supported API version and then it sends the
// register request.
export function register(
  appId: AppID | undefined,
  registerRequests: RegisterRequest[],
  registeredKeys: RegisteredKey[],
  callback: (response: (U2FError | RegisterResponse)) => void,
  timeout?: Seconds
): void;

// Dispatches register requests to available U2F tokens. An array of sign
// requests identifies already registered tokens.
export const sendRegisterRequest: typeof register;

// Dispatches a message to the extension to find out the supported JS API
// version. If the user is on a mobile phone and is thus using Google
// Authenticator instead of the Chrome extension, don't send the request and
// simply return 0.
export function getApiVersion(
  callback: (response: (U2FError | GetJsApiVersionResponse)) => void,
  timeout?: Seconds
): void;
