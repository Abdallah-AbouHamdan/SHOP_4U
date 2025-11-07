import {create} from "zustand";
import {persist} from "zustand/middleware";

export type Product = {
    id:string;
    title:string;
    price:number;
    compareAtPrice?:number;
    caregory:string;
    seller:string;
    tagline:string;
    image:string;
    rating:number;
    reviews:number;
    discounted?:boolean;
};

