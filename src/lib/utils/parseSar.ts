import SymbolArt from 'symbol-art-parser';

export default async function parseSar(file: File) {
	try {
		const sar = new SymbolArt();
		const buffer = await file.arrayBuffer();
		sar.data = buffer;
		return sar.json;
	} catch (e) {
		console.error(e);
		throw new Error('Unable to parse SAR file');
	}
}
