import { Store } from '../store'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store
    }
}

declare global {
    interface Window {
        WPSFPath: {
            'admin': string,
            'ajax': string,
            'api': string,
            'assets': string,
            'page': string
        },
        WPSFPathx: {
            'admin': string,
            'ajax': string,
            'api': string,
            'assets': string,
            'page': object
        },
    }
}