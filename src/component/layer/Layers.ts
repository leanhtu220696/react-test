export const clusterConstructionLayer = {
    id: 'constructionCluster',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': ['step', ['get', 'point_count'], '#99C8F8', 6, '#4D9EF3', 11, '#0075EE'],
        'circle-radius': ['step', ['get', 'point_count'], 20, 6, 25, 11, 30],
        'circle-opacity': 0.8,
    },
};
export const clusterCountConstructionLayer = {
    id: 'constructionCount',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['Roboto Regular'],
        'text-size': 12,
        'text-allow-overlap': true,
    },
    paint: {},
};
export const constructionLayer = {
    id: 'constructions',
    paint: {},
    layout: {
        'icon-image': 'construction',
    },
};
export const clusterWaterIntakeLayer = {
    id: 'waterIntakeCluster',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': ['step', ['get', 'point_count'], '#FF6668', 6, '#FF3335', 11, '#FF0003'],
        'circle-radius': ['step', ['get', 'point_count'], 20, 6, 25, 11, 30],
        'circle-opacity': 0.8,
    },
};
export const clusterCountWaterIntakeLayer = {
    id: 'waterIntakeCount',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['Roboto Regular'],
        'text-allow-overlap': true,
        'text-size': 12,
    },
    paint: {},
};

export const waterIntakeLayer = {
    id: 'waterIntakes',
    paint: {},
    layout: {
        'icon-image': 'waterIntake',
    },
};
export const clusterFireDepartmentLayer = {
    id: 'fireDepartmentCluster',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': ['step', ['get', 'point_count'], '#99D0A1', 6, '#4DAC5A', 11, '#008913'],
        'circle-radius': ['step', ['get', 'point_count'], 20, 6, 25, 11, 30],
        'circle-opacity': 0.8,
    },
};
export const clusterCountFireDepartmentLayer = {
    id: 'fireDepartmentCount',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['Roboto Regular'],
        'text-allow-overlap': true,
        'text-size': 12,
    },
    paint: {},
};

export const fireDepartmentLayer = {
    id: 'fireDepartments',
    paint: {},
    layout: {
        'icon-image': 'fireDepartment',
    },
};
export const fireHappeningLayer = {
    id: 'fireHappening',
    paint: {},
    layout: {
        'icon-image': 'fireHappening',
        'icon-allow-overlap': true,
    },
};

export const roundedLayer = {
    id: 'rounded',
    filter: ['has', 'count'],
    paint: {
        'circle-color': '#0189bb',
        'circle-opacity': 0.63,
        'circle-radius': ['step', ['get', 'count'], 0, 1, 10, 5, 15, 11, 20],
    },
};

export const drawLayer = {
    id: 'route',
    layout: {
        'line-join': 'round',
        'line-cap': 'round',
    },
    paint: {
        'line-color': '#1e88e5',
        'line-width': 5,
    },
};
