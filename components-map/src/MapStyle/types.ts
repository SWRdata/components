enum AdminLevel {
	COUNTRY = 2,
	BUNDESLAND = 4
}

type LabelDensity = 'none' | 'default' | 'dense';

type AdminOptions = {
	show?: boolean | AdminLevel[];
	showLabels?: boolean | AdminLevel[];
};

interface StyleOptions {
	enableBuildingExtrusions?: boolean;
	enableHillshade?: boolean;
	places?: {
		labels: LabelDensity;
	};
	admin?: AdminOptions;
	roads?: {
		labels?: LabelDensity;
	};
}

export type { StyleOptions, LabelDensity, AdminOptions };
