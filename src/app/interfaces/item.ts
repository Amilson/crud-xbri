export interface ItemData {
  id?: string;
  name?: string;
  category?: string;
  quantity?: null;
  price?: null;
  status?: boolean;
}

export interface SummaryData {
  qtd: number;
  qtdActives: number;
  qtdInactives: number;
  sumQtdActives: number;
  averageActives: number;
  averageInactives: number;
  sumQtdInactives: number;
}
