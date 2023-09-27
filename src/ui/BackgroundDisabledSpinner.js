import React from 'react';
import {Dimmer, Loader} from "semantic-ui-react";
import 'semantic-ui-css/components/dimmer.min.css'
import 'semantic-ui-css/components/loader.min.css'
import log from 'loglevel';

export default function BackgroundDisabledSpinner() {
    log.info(`[BackgroundDisabledSpinner] Rendering BackgroundDisabledSpinner Component...`)
    return (
        <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
        </Dimmer>
    );
}
