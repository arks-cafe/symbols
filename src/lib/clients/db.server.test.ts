import prisma from './db.server';

describe('prisma', () => {
	it('should be defined', () => {
		expect(prisma).toBeDefined();
	});
});
