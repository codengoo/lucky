import { Store } from '../admin/store'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store
    }
}

declare global {
    interface Path {
        admin: string,
        ajax: string,
        api: string,
        assets: string,
        page: string
    }

    interface PathWithNonce extends Path {
        nonce: string
    }

    interface Window {
        WPLKPath: PathWithNonce,
        WPLKPathx: Path
    }
}