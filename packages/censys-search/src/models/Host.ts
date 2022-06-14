/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { components_x_partials_hosts_Location } from './components_x_partials_hosts_Location';
import type { components_x_partials_hosts_PerspectiveID } from './components_x_partials_hosts_PerspectiveID';
import type { components_x_partials_hosts_Routing } from './components_x_partials_hosts_Routing';

export type Host = {
    ip?: string;
    services?: Array<{
        port?: number;
        service_name?: string;
        extended_service_name?: string;
        transport_protocol?: string;
        software?: Array<string>;
        truncated?: boolean;
        perspective_id?: components_x_partials_hosts_PerspectiveID;
    }>;
    location_updated_at?: string;
    location?: components_x_partials_hosts_Location;
    autonomous_system_updated_at?: string;
    autonomous_system?: components_x_partials_hosts_Routing;
    operating_system?: {
        product?: string;
        vendor?: string;
        version?: string;
        edition?: string;
        uniform_resource_identifier?: string;
        other?: any;
    };
};

