export interface Routes {
    title: string;
    items: {
        icon?: React.ReactNode;
        title: string;
        url: string;
    }[];
};