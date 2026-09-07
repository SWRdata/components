import React from 'react';
import { Mermaid as MdxMermaid } from 'mdx-mermaid/Mermaid';

export default function Mermaid({ chart }) {
	if (!chart) {
		return null;
	}
	return React.createElement(MdxMermaid, { chart });
}
