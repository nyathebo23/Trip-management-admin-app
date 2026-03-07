export class Bus {
    constructor(
        public id: string,
        public serialNumber: string,
        public brand: string,
        public capacity: number,
        public usable: boolean
    ){}

    toString() {
        return this.brand + ' - ' + this.serialNumber;
    }
}