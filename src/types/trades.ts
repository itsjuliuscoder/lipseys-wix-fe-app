export type SIGNAL_DETAILS = {
    _id: string;
    userId: string;
    symbol: string;
    amount: number;
    interval: string;
    direction: string;
    status: string;
    __v: number;
    units: number;
};

export type TRADE = {
    profit: number;
    _id: string;
    userId: string;
    signalId: string;
    amount: number;
    units: number;
    interval: number;
    status: string;
    __v: number;
    direction: string;
    processed: boolean;
    startTime: string;
    signalDetails: SIGNAL_DETAILS;
};