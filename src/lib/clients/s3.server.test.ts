import { vi, type Mock } from 'vitest';

describe('s3Client', async () => {
	const s3Client = await import('./s3.server');
	it('should be defined', () => {
		expect(s3Client).toBeDefined();
	});
});

vi.mock('$env/dynamic/private', () => {
	return { env: { S3_CDN_URL: 'https://cdn.bababooey' } };
});

import { nanoid } from 'nanoid';
const filename = 'test' + nanoid();

const sendImplementation = async (input: any) => {
	if (input.constructor.name === 'PutObjectCommand') {
		// Return values for the two different tests
		if (input.input.ContentDisposition) {
			return 'hasContentDisposition';
		} else {
			return 'notHasContentDisposition';
		}
	}
	if (input.constructor.name === 'DeleteObjectsCommand') {
		return {};
	}
	throw new Error('Unexpected input');
};

describe('uploadFile', () => {
	let send: Mock;
	beforeEach(() => {
		vi.resetModules();

		vi.doMock('@aws-sdk/client-s3', async () => {
			const mod = await import('@aws-sdk/client-s3');
			const modifiedS3 = mod.S3;
			modifiedS3.prototype.send = send;
			return {
				...mod,
				S3: modifiedS3
			};
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('create appropriate s3 action and return link with cdn', async () => {
		send = vi.fn(sendImplementation);

		const { uploadFile } = await import('./s3.server');
		expect(uploadFile).toBeDefined();

		const file = new File([''], filename, { type: 'text/html' });
		file.arrayBuffer = () => Promise.resolve(new ArrayBuffer(8));
		const x = await uploadFile(file, filename);
		expect(send).toHaveReturnedWith('notHasContentDisposition');
		expect(x).toEqual('https://cdn.bababooey' + '/' + filename);
	});

	it('create appropriate s3 action with content disposition and return link with cdn', async () => {
		send = vi.fn(sendImplementation);

		const { uploadFile } = await import('./s3.server');
		expect(uploadFile).toBeDefined();

		const file = new File([''], filename, { type: 'text/html' });
		file.arrayBuffer = () => Promise.resolve(new ArrayBuffer(8));
		const x = await uploadFile(file, filename, filename);
		expect(send).toHaveReturnedWith('hasContentDisposition');
		expect(x).toEqual('https://cdn.bababooey' + '/' + filename);
	});
});

describe('deleteFile', () => {
	let send: Mock;
	beforeEach(() => {
		vi.resetModules();

		send = vi.fn(sendImplementation);

		vi.doMock('@aws-sdk/client-s3', async () => {
			const mod = await import('@aws-sdk/client-s3');
			const modifiedS3 = mod.S3;
			modifiedS3.prototype.send = send;
			return {
				...mod,
				S3: modifiedS3
			};
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should return nothing', async () => {
		const { deleteFiles } = await import('./s3.server');
		expect(deleteFiles).toBeDefined();
		deleteFiles(['yeah baby']);
		expect(send).toHaveBeenCalled();
	});
});
