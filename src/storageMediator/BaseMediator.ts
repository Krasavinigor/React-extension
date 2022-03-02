import { StorageMediatorEvents } from "@/storageMediator/StorageMediator";

interface Mediator<T> {
    notify(event: StorageMediatorEvents): Promise<T>;
}

export default Mediator;
