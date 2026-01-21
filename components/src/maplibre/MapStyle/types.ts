enum AdminLevel {
	COUNTRY = 2,
	BUNDESLAND = 4
}
interface StyleOptions {
	enableBuildingExtrusions?: boolean;
	enableHillshade?: boolean;
	places?: {
		showLabels?: boolean;
	};
	admin?: {
		show?: boolean | AdminLevel[];
	};
	roads?: {
		showLabels?: boolean;
	};
}

export type { StyleOptions };
