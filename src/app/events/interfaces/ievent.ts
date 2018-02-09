export interface Ievent {
    id?: number,
    title: string;
    image: string;
    date: string;
    description: string;
    price: number;
    address?: string;
    lat?: number;
    lng?: number;
    mine?: boolean;
}
