import { Component } from '../types.js';
import { interactionHandler } from './interaction-handler.js';
import { messageListener } from './message-listener.js';
import { ready } from './ready.js';

export default {
    gatewayEvents: [ready, interactionHandler, messageListener],
} satisfies Component;
