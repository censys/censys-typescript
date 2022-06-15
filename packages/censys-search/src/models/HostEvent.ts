/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocationUpdatedEvent } from './LocationUpdatedEvent';
import type { RoutingUpdatedEvent } from './RoutingUpdatedEvent';
import type { ServiceAddedToHostEvent } from './ServiceAddedToHostEvent';
import type { ServiceObservedEvent } from './ServiceObservedEvent';
import type { ServiceRemovedFromHostEvent } from './ServiceRemovedFromHostEvent';

export type HostEvent = (ServiceObservedEvent | LocationUpdatedEvent | RoutingUpdatedEvent | ServiceRemovedFromHostEvent | ServiceAddedToHostEvent | {
    /**
     * Discriminator which provides the type of event this object represents.
     */
    _event?: string;
    timestamp?: string;
});

