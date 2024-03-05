import { Store } from '../admin/store'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store
    }
}

declare global {
    interface Window {
        WPLKPath: {
            'admin': string,
            'ajax': string,
            'api': string,
            'assets': string,
            'page': string
        }
    }
}