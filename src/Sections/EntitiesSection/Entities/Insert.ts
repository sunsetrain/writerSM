import BoundingBox, { boundingBox_t } from '../../../Internals/BoundingBox';
import { Dxifier } from '../../../Internals/Dxifier';
import { point3d, vec3_t } from '../../../Internals/Utils';
import Entity, { options_t } from '../Entity';

export type insertOptions_t = options_t & {
	scaleFactor?: Partial<vec3_t>;
	rotationAngle?: number;
	columnCount?: number;
	rowCount?: number;
	columnSpacing?: number;
	rowSpacing?: number;
};

export default class Insert extends Entity {
	blockName: string;
	insertionPoint: vec3_t;
	scaleFactor: Partial<vec3_t>;
	rotationAngle: number;
	columnCount: number;
	rowCount: number;
	columnSpacing: number;
	rowSpacing: number;

	constructor(
		blockName: string,
		insertionPoint: vec3_t,
		options?: insertOptions_t
	) {
		super('INSERT', 'AcDbBlockReference', options);
		this.blockName = blockName;
		this.insertionPoint = insertionPoint;
		this.scaleFactor = options?.scaleFactor || point3d(1, 1, 1);
		this.rotationAngle = options?.rotationAngle ?? 0;
		this.columnCount = options?.columnCount || 1;
		this.rowCount = options?.rowCount || 1;
		this.columnSpacing = options?.columnSpacing ?? 0;
		this.rowSpacing = options?.rowSpacing ?? 0;
	}

	override boundingBox(): boundingBox_t {
		return BoundingBox.pointBBox(this.insertionPoint);
	}

	override dxify(dx: Dxifier): void {
		super.dxify(dx);
		dx.name(this.blockName);
		dx.point3d(this.insertionPoint);
		dx.push(41, this.scaleFactor.x);
		dx.push(42, this.scaleFactor.y);
		dx.push(43, this.scaleFactor.z);
		dx.push(50, this.rotationAngle);
		dx.push(70, this.columnCount);
		dx.push(71, this.rowCount);
		dx.push(44, this.columnSpacing);
		dx.push(45, this.rowSpacing);
	}
}
