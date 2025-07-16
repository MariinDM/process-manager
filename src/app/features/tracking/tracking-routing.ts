import { Routes } from "@angular/router";
import { TrackingLayout } from "./layout/tracking-layout/tracking-layout";

export const trackingRoutes: Routes = [
    {
        path: '',
        component: TrackingLayout,
        children: [
            // {
            //     path: 'overview',
            //     component: OverviewComponent
            // },
            // {
            //     path: 'details/:id',
            //     component: DetailsComponent
            // }
        ]
    }
];