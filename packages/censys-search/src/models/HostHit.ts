/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { components_x_partials_hosts_Location } from './components_x_partials_hosts_Location';
import type { components_x_partials_hosts_Routing } from './components_x_partials_hosts_Routing';

export type HostHit = {
    ip?: string;
    services?: Array<{
        port?: number;
        service_name?: string;
        transport_protocol?: string;
        certificate?: string;
    }>;
    location?: components_x_partials_hosts_Location;
    autonomous_system?: components_x_partials_hosts_Routing;
};

