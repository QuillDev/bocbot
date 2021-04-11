export interface NicehashBalance {
    total: NicehashBalanceTotal;
    currencies: NicehashCurrency[];
}

export interface NicehashBalanceTotal {
    currency: string;
    totalBalance: string;
    available: string;
    pending: string;
}
export interface NicehashCurrency {
    active: boolean;
    currency: string;
    totalBalance: string;
    available: string;
    pending: string;
    btcRate?: number;
    enabled?: boolean;
}