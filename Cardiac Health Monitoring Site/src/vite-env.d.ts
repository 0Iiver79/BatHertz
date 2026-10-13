/// <reference types="vite/client" />

interface SerialPortLike {
	readable: ReadableStream<Uint8Array> | null;
	open(options: { baudRate: number }): Promise<void>;
	close(): Promise<void>;
}

interface SerialApiLike {
	requestPort(): Promise<SerialPortLike>;
}

interface Navigator {
	serial?: SerialApiLike;
}
