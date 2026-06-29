enum AdminLevel {
	COUNTRY = 2,
	BUNDESLAND = 4
}

type RoadLabelDensity = 'none' | 'default' | 'dense';

interface StyleOptions {
	enableBuildingExtrusions?: boolean;
	enableHillshade?: boolean;
	places?: {
		showLabels?: boolean;
	};
	admin?: {
		show?: boolean | AdminLevel[];
		showLabels?: boolean;
	};
	roads?: {
		labels?: RoadLabelDensity;
	};
}

export type { StyleOptions, RoadLabelDensity };
