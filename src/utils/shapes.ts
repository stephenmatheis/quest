import { Shape } from 'three';

export function createLeftShape(width: number, height: number) {
    const shape = new Shape();

    const bevel = 0.125;

    shape.moveTo(0, 0);
    shape.lineTo(width - bevel, 0);
    shape.lineTo(width, bevel);
    shape.lineTo(width, height - bevel);
    shape.lineTo(width, height);
    shape.lineTo(bevel, height);
    shape.lineTo(0, height - bevel);

    return shape;
}

export function createRightShape(width: number, height: number) {
    const shape = new Shape();

    const bevel = 0.125;

    shape.moveTo(bevel, 0);
    shape.lineTo(0, bevel);
    shape.lineTo(0, height);
    shape.lineTo(width - bevel, height);
    shape.lineTo(width, height - bevel);
    shape.lineTo(width, 0);

    return shape;
}

export function createRect(width: number, height: number) {
    const shape = new Shape();
    const bevel = 0;

    shape.moveTo(bevel, 0);
    shape.lineTo(0, bevel);
    shape.lineTo(0, height);
    shape.lineTo(width - bevel, height);
    shape.lineTo(width, height - bevel);
    shape.lineTo(width, 0);

    return shape;
}
