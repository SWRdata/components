enum AdminLevel {
	COUNTRY = 2,
	BUNDESLAND = 4
}

type RoadLabelDensity = 'none' | 'default' | 'dense';
type AdminOptions = {
	show?: boolean | AdminLevel[];
	showLabels?: boolean;
};

interface StyleOptions {
	enableBuildingExtrusions?: boolean;
	enableHillshade?: boolean;
	places?: {
		showLabels?: boolean;
	};
	admin?: AdminOptions;
	roads?: {
		labels?: RoadLabelDensity;
	};
}

export type { StyleOptions, RoadLabelDensity, AdminOptions };
