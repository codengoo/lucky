import { Store } from '../admin/store'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store
    }
}