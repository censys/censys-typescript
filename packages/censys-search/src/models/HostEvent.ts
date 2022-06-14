/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { components_x_partials_hosts_LocationUpdatedEvent } from './components_x_partials_hosts_LocationUpdatedEvent';
import type { components_x_partials_hosts_RoutingUpdatedEvent } from './components_x_partials_hosts_RoutingUpdatedEvent';
import type { components_x_partials_hosts_ServiceAddedToHostEvent } from './components_x_partials_hosts_ServiceAddedToHostEvent';
import type { components_x_partials_hosts_ServiceObservedEvent } from './components_x_partials_hosts_ServiceObservedEvent';
import type { components_x_partials_hosts_ServiceRemovedFromHostEvent } from './components_x_partials_hosts_ServiceRemovedFromHostEvent';

export type HostEvent = (components_x_partials_hosts_ServiceObservedEvent | components_x_partials_hosts_LocationUpdatedEvent | components_x_partials_hosts_RoutingUpdatedEvent | components_x_partials_hosts_ServiceRemovedFromHostEvent | components_x_partials_hosts_ServiceAddedToHostEvent | {
    /**
     * Discriminator which provides the type of event this object represents.
     */
    _event?: string;
    timestamp?: string;
});

