import React from 'react';
import img from './sprite/sprite.png';

export default function SpriteImage({ x, y, width, height, data }) {
	let w = 0;
	Object.values(data).forEach((d) => {
		if (d.x + d.width > w) {
			w = d.x + d.width;
		}
	});

	return (
		<div
			style={{
				backgroundSize: `auto`,
				backgroundImage: `url(${img})`,
				width: `${width}px`,
				height: `${height}px`,
				backgroundPosition: `${-x}px ${-y}px`
			}}
		></div>
	);
}
